import { NextResponse } from "next/server";
import { deliverWaitlistEntry } from "@/lib/waitlist";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real users never fill this hidden field.
  if (typeof body.company === "string" && body.company.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const email = typeof body.email === "string" ? body.email.trim() : "";
  if (!EMAIL_RE.test(email) || email.length > 254) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  const name =
    typeof body.name === "string" ? body.name.trim().slice(0, 120) : undefined;
  const role =
    typeof body.role === "string" ? body.role.trim().slice(0, 40) : undefined;

  try {
    const ok = await deliverWaitlistEntry({
      email,
      name: name || undefined,
      role: role || undefined,
      submittedAt: new Date().toISOString(),
    });

    if (!ok) {
      return NextResponse.json(
        { error: "We couldn't save your spot. Please try again." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[waitlist] unexpected error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
