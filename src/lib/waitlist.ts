export type WaitlistEntry = {
  email: string;
  name?: string;
  role?: string;
  submittedAt: string;
};

/**
 * Delivers a waitlist signup to the configured destination.
 *
 * The destination is a config swap via env vars (no code changes needed):
 *   - WAITLIST_WEBHOOK_URL  -> POST JSON to a Google Sheet / Zapier / CRM webhook
 *   - RESEND_API_KEY (+ WAITLIST_NOTIFY_EMAIL, WAITLIST_FROM_EMAIL) -> email notification
 *   - (none set)            -> logged to the server console (safe default for dev)
 *
 * Returns true if at least one provider accepted the entry (or if running in
 * the console-only default, which always "succeeds").
 */
export async function deliverWaitlistEntry(
  entry: WaitlistEntry
): Promise<boolean> {
  const tasks: Promise<boolean>[] = [];
  let configured = false;

  const webhook = process.env.WAITLIST_WEBHOOK_URL;
  if (webhook) {
    configured = true;
    tasks.push(sendWebhook(webhook, entry));
  }

  const resendKey = process.env.RESEND_API_KEY;
  const notify = process.env.WAITLIST_NOTIFY_EMAIL;
  const from = process.env.WAITLIST_FROM_EMAIL;
  if (resendKey && notify && from) {
    configured = true;
    tasks.push(sendResend(resendKey, from, notify, entry));
  }

  if (!configured) {
    console.info("[waitlist] new signup (no provider configured):", entry);
    return true;
  }

  const results = await Promise.allSettled(tasks);
  return results.some((r) => r.status === "fulfilled" && r.value);
}

async function sendWebhook(
  url: string,
  entry: WaitlistEntry
): Promise<boolean> {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(entry),
    });
    return res.ok;
  } catch (err) {
    console.error("[waitlist] webhook delivery failed:", err);
    return false;
  }
}

async function sendResend(
  apiKey: string,
  from: string,
  to: string,
  entry: WaitlistEntry
): Promise<boolean> {
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to,
        subject: `New Mini Techies waitlist signup: ${entry.email}`,
        text: [
          `Email: ${entry.email}`,
          `Name: ${entry.name || "-"}`,
          `Role: ${entry.role || "-"}`,
          `Submitted: ${entry.submittedAt}`,
        ].join("\n"),
      }),
    });
    return res.ok;
  } catch (err) {
    console.error("[waitlist] email delivery failed:", err);
    return false;
  }
}
