"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function JoinCTA() {
  return (
    <section className="py-20 px-6 md:px-12 lg:px-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto rounded-2xl bg-gradient-to-r from-primary to-primary/80 p-10 md:p-16 text-center"
      >
        <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl text-primary-foreground tracking-tight">
          Ready to join Nepal&apos;s dev community?
        </h2>
        <p className="mt-4 text-primary-foreground/80 max-w-md mx-auto">
          Whether you&apos;re a beginner or a senior engineer, there&apos;s a
          place for you at SajhaStack.
        </p>
        <Link
          href="/join"
          className="inline-flex items-center gap-2 mt-8 rounded-full bg-background px-7 py-3 text-sm font-medium text-foreground hover:bg-background/90 transition-colors"
        >
          Get Involved
          <ArrowRight className="h-4 w-4" />
        </Link>
      </motion.div>
    </section>
  );
}
