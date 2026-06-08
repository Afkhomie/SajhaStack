"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Calendar,
  Code2,
  MessageCircle,
  Lightbulb,
  Trophy,
  ArrowRight,
  Instagram,
  X,
  PartyPopper,
} from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

const INSTAGRAM_URL = "https://www.instagram.com/sajha_stack_/";

const benefits = [
  {
    icon: Users,
    title: "Network with 500+ Devs",
    description:
      "Connect with developers across Nepal — juniors, seniors, and everyone in between.",
  },
  {
    icon: Calendar,
    title: "Exclusive Events",
    description:
      "Get early access to hackathons, meetups, and workshops before they fill up.",
  },
  {
    icon: Code2,
    title: "Open Source Projects",
    description:
      "Collaborate on meaningful projects that solve real problems for Nepal.",
  },
  {
    icon: MessageCircle,
    title: "Active Community Chat",
    description:
      "Ask questions, share resources, and get help from fellow developers anytime.",
  },
  {
    icon: Lightbulb,
    title: "Mentorship",
    description: "Learn from experienced engineers who've been where you are.",
  },
  {
    icon: Trophy,
    title: "Recognition",
    description:
      "Showcase your work, get feedback, and build your reputation in the community.",
  },
];

const inputClass =
  "peer w-full rounded-lg border border-border bg-background/70 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground transition-all duration-200 ease-[var(--ease-out-soft)] focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 hover:border-primary/40";

export default function JoinPage() {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          github: data.get("github"),
          interest: data.get("interest"),
        }),
      });
      const json = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(json.error ?? "Something went wrong. Please try again.");
        return;
      }

      form.reset();
      setShowPopup(true);
    } catch {
      setError("Network error — please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative py-16 px-6 md:px-12 lg:px-20 overflow-hidden">
      {/* Ambient bloom behind everything */}
      <div className="glow-radial pointer-events-none absolute inset-0 -z-10" />

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="max-w-2xl"
        >
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/70 px-3 py-1 text-xs font-medium text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            It&apos;s free &amp; open
          </span>
          <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl md:text-5xl lg:text-6xl tracking-tight text-foreground">
            Join SajhaStack
          </h1>
          <p className="mt-4 text-lg text-foreground/80 font-medium leading-relaxed">
            Become part of Nepal&apos;s fastest-growing developer community.
            It&apos;s free, it&apos;s open, and it&apos;s waiting for you.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-[1fr_minmax(380px,440px)] gap-10 lg:gap-14 items-start">
          {/* LEFT — benefits */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {benefits.map((benefit, i) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06, ease: EASE }}
                whileHover={{ y: -4 }}
                className="group relative rounded-xl border border-border bg-background/60 p-5 transition-all duration-300 ease-[var(--ease-out-soft)] hover:border-primary/30 hover:shadow-[0_8px_30px_-12px_hsl(0_72%_51%/0.35)]"
              >
                <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary/10 mb-4 transition-all duration-300 group-hover:bg-primary group-hover:scale-110">
                  <benefit.icon className="h-5 w-5 text-primary transition-colors duration-300 group-hover:text-primary-foreground" />
                </div>
                <h3 className="font-bold text-foreground text-sm group-hover:text-primary transition-colors">
                  {benefit.title}
                </h3>
                <p className="mt-1.5 text-sm text-foreground/70 font-medium leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* RIGHT — sign up panel with gradient stroke + grid texture */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.55, delay: 0.15, ease: EASE }}
            className="lg:sticky lg:top-24"
          >
            <div className="stroke-glow group relative overflow-hidden rounded-2xl bg-background/80 backdrop-blur-sm shadow-[0_20px_60px_-25px_hsl(0_0%_0%/0.6)] transition-shadow duration-300 ease-[var(--ease-out-soft)] hover:shadow-[0_30px_70px_-20px_hsl(0_80%_63%/0.35)]">
              {/* textured backdrop */}
              <div className="bg-grid pointer-events-none absolute inset-0 opacity-[0.5] [mask-image:radial-gradient(ellipse_at_top,black,transparent_75%)]" />
              <div className="glow-radial pointer-events-none absolute inset-0" />

              <div className="relative p-7 md:p-8">
                <h2 className="font-[family-name:var(--font-display)] text-3xl tracking-tight text-foreground">
                  Sign Up
                </h2>
                <p className="mt-2 text-sm text-foreground/70 font-medium">
                  Fill in your details and we&apos;ll add you to the community.
                </p>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  {error && (
                    <div className="rounded-lg bg-red-500/10 border border-red-500/30 px-4 py-2.5 text-sm text-red-300">
                      {error}
                    </div>
                  )}

                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-semibold text-foreground mb-1.5"
                    >
                      Full Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      className={inputClass}
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-foreground mb-1.5"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className={inputClass}
                      placeholder="you@example.com"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="github"
                      className="block text-sm font-semibold text-foreground mb-1.5"
                    >
                      GitHub Username{" "}
                      <span className="text-muted-foreground font-normal">
                        (optional)
                      </span>
                    </label>
                    <input
                      id="github"
                      name="github"
                      type="text"
                      className={inputClass}
                      placeholder="yourusername"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="interest"
                      className="block text-sm font-semibold text-foreground mb-1.5"
                    >
                      What interests you?
                    </label>
                    <select
                      id="interest"
                      name="interest"
                      className={inputClass}
                    >
                      <option value="">Select an area</option>
                      <option value="web">Web Development</option>
                      <option value="mobile">Mobile Development</option>
                      <option value="ai">AI / Machine Learning</option>
                      <option value="devops">DevOps &amp; Cloud</option>
                      <option value="blockchain">Blockchain / Web3</option>
                      <option value="opensource">Open Source</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={submitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2, ease: EASE }}
                    className="group mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-300 hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/40 disabled:opacity-60 disabled:pointer-events-none"
                  >
                    {submitting ? "Joining..." : "Join the Community"}
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </motion.button>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Success popup → Instagram */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] flex items-center justify-center px-6 bg-background/70 backdrop-blur-md"
            onClick={() => setShowPopup(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Welcome to SajhaStack"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              transition={{ duration: 0.35, ease: EASE }}
              onClick={(e) => e.stopPropagation()}
              className="stroke-glow relative w-full max-w-sm overflow-hidden rounded-2xl bg-background/90 backdrop-blur-xl shadow-[0_30px_80px_-20px_hsl(0_80%_63%/0.35)]"
            >
              <div className="bg-grid pointer-events-none absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_at_top,black,transparent_75%)]" />
              <div className="glow-radial pointer-events-none absolute inset-0" />

              <button
                onClick={() => setShowPopup(false)}
                aria-label="Close"
                className="absolute right-3 top-3 z-10 rounded-full p-2 text-muted-foreground transition-all duration-200 hover:text-foreground hover:bg-secondary hover:rotate-90"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="relative flex flex-col items-center text-center p-8">
                <div className="flex items-center justify-center h-14 w-14 rounded-2xl bg-primary/10">
                  <PartyPopper className="h-7 w-7 text-primary" />
                </div>
                <h3 className="mt-5 font-[family-name:var(--font-display)] text-3xl tracking-tight text-foreground">
                  You&apos;re in!
                </h3>
                <p className="mt-2 text-sm text-foreground/70 font-medium">
                  Welcome to SajhaStack. Follow us on Instagram so you
                  don&apos;t miss event drops, announcements, and community
                  highlights.
                </p>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/ig mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-300 ease-[var(--ease-out-soft)] hover:bg-primary/90 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/40"
                >
                  <Instagram className="h-4 w-4 transition-transform duration-300 group-hover/ig:scale-110" />
                  Follow @sajha_stack_
                </a>
                <button
                  onClick={() => setShowPopup(false)}
                  className="mt-3 text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                  Maybe later
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
