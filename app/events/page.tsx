"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles, CalendarClock } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function EventsPage() {
  return (
    <div className="relative py-16 px-6 md:px-12 lg:px-20 overflow-hidden">
      <div className="glow-radial pointer-events-none absolute inset-0 -z-10" />

      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <h1 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl tracking-tight text-foreground">
            Events
          </h1>
          <p className="mt-3 text-foreground/75 font-medium max-w-lg">
            Hackathons, meetups, and workshops — find your next opportunity to
            connect and build with the community.
          </p>
        </motion.div>

        {/* Coming soon block */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ y: -6 }}
          transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
          className="mt-12"
        >
          <div className="stroke-glow group relative overflow-hidden rounded-2xl bg-background/80 backdrop-blur-sm shadow-[0_20px_60px_-25px_hsl(0_0%_0%/0.6)] transition-shadow duration-300 ease-[var(--ease-out-soft)] hover:shadow-[0_30px_70px_-20px_hsl(0_80%_63%/0.35)]">
            {/* textured backdrop */}
            <div className="bg-grid pointer-events-none absolute inset-0 opacity-[0.5] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />
            <div className="glow-radial pointer-events-none absolute inset-0" />

            <div className="relative flex flex-col items-center text-center px-6 py-16 md:py-24">
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-4 py-1.5 text-xs font-semibold text-foreground/80">
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                Stay tuned
              </span>

              <div className="mt-8 flex items-center justify-center h-16 w-16 rounded-2xl bg-primary/10 transition-all duration-300 group-hover:bg-primary group-hover:scale-110 group-hover:rotate-6">
                <CalendarClock className="h-8 w-8 text-primary transition-colors duration-300 group-hover:text-primary-foreground" />
              </div>

              <h2 className="mt-8 font-[family-name:var(--font-display)] text-3xl md:text-5xl tracking-tight text-foreground max-w-2xl">
                Crazyy events are going to{" "}
                <em className="not-italic text-primary">drop soon</em>
              </h2>

              <p className="mt-4 text-foreground/70 font-medium max-w-md">
                Hackathons, meetups, workshops — we&apos;re cooking something
                big for Nepal&apos;s dev community. Join now so you don&apos;t
                miss the drop.
              </p>

              <Link
                href="/join"
                className="group/cta mt-10 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-300 ease-[var(--ease-out-soft)] hover:bg-primary/90 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/40"
              >
                <Sparkles className="h-4 w-4" />
                Get notified — Join the community
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/cta:translate-x-1" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
