"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { TutorAvatar } from "@/components/brand/TutorAvatar";
import { fireConfetti } from "@/lib/confetti";
import { cn } from "@/lib/cn";

type Status = "idle" | "submitting" | "success" | "error";

const roles = [
  { id: "parent", label: "Parent" },
  { id: "teacher", label: "Teacher" },
  { id: "student", label: "Student" },
  { id: "other", label: "Other" },
];

export function Waitlist() {
  const reduce = useReducedMotion();
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [role, setRole] = useState("parent");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const form = e.currentTarget;
    const data = new FormData(form);

    const email = String(data.get("email") || "").trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      setStatus("error");
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          name: data.get("name"),
          role: data.get("role"),
          company: data.get("company"), // honeypot
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Something went wrong.");
      }
      setStatus("success");
      if (!reduce) fireConfetti();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <Section id="waitlist" tone="primary" className="scroll-mt-20 overflow-hidden">
      <div className="bg-dotgrid pointer-events-none absolute inset-0 opacity-10" />
      <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-2xl" />

      <div className="relative mx-auto max-w-3xl text-center text-white">
        <motion.div
          className="mx-auto w-20"
          animate={reduce ? undefined : { y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <TutorAvatar
            tutor={status === "success" ? "siren" : "mini"}
            float={false}
          />
        </motion.div>

        <h2 className="mt-4 text-balance text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
          Be first in line at mini-techies.ca
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-white/85">
          Join the waitlist for early access, launch updates, and a founding-member
          surprise. No spam, no ads — just the good stuff.
        </p>

        <div className="mx-auto mt-8 max-w-xl">
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                initial={reduce ? false : { opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-3xl bg-white p-8 text-ink shadow-card"
              >
                <div className="text-5xl" aria-hidden="true">
                  🎉
                </div>
                <h3 className="mt-3 font-display text-2xl font-bold">
                  You’re on the list!
                </h3>
                <p className="mt-2 text-ink/70">
                  Welcome, founding Mini Techie. We’ll email you the moment early
                  access opens. Tell a friend who’d love this too.
                </p>
                <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-mint-soft px-4 py-2 font-display font-bold text-ink">
                  🏅 Founding Member badge unlocked
                </div>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={onSubmit}
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                className="rounded-3xl bg-white p-6 text-left shadow-card sm:p-7"
                noValidate
              >
                {/* honeypot */}
                <div className="absolute -left-[9999px]" aria-hidden="true">
                  <label htmlFor="company">Company</label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Your name (optional)" htmlFor="name">
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder="Alex Rivera"
                      className="input"
                    />
                  </Field>
                  <Field label="Email" htmlFor="email" required>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="you@example.com"
                      className="input"
                    />
                  </Field>
                </div>

                <fieldset className="mt-4">
                  <legend className="mb-2 text-sm font-semibold text-ink/70">
                    I’m a...
                  </legend>
                  <div className="flex flex-wrap gap-2">
                    {roles.map((r) => (
                      <label
                        key={r.id}
                        className={cn(
                          "cursor-pointer rounded-full px-4 py-2 text-sm font-semibold ring-1 transition",
                          role === r.id
                            ? "bg-primary text-white ring-primary"
                            : "bg-cream text-ink/70 ring-ink/10 hover:ring-primary"
                        )}
                      >
                        <input
                          type="radio"
                          name="role"
                          value={r.id}
                          checked={role === r.id}
                          onChange={() => setRole(r.id)}
                          className="sr-only"
                        />
                        {r.label}
                      </label>
                    ))}
                  </div>
                </fieldset>

                {error && (
                  <p
                    role="alert"
                    className="mt-3 rounded-xl bg-coral-soft px-4 py-2 text-sm font-semibold text-ink"
                  >
                    {error}
                  </p>
                )}

                <div className="mt-5">
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={status === "submitting"}
                  >
                    {status === "submitting"
                      ? "Joining..."
                      : "Join the waitlist 🚀"}
                  </Button>
                </div>
                <p className="mt-3 text-center text-xs text-ink/50">
                  We respect your privacy. Unsubscribe anytime. Never sold, ever.
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Section>
  );
}

function Field({
  label,
  htmlFor,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-1.5 block text-sm font-semibold text-ink/70"
      >
        {label}
        {required && <span className="text-coral"> *</span>}
      </label>
      {children}
    </div>
  );
}
