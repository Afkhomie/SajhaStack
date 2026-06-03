"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function AboutSnippet() {
  return (
    <section className="py-20 px-6 md:px-12 lg:px-20 bg-secondary/30">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl tracking-tight text-foreground">
            A Community Built on{" "}
            <em className="font-[family-name:var(--font-display)] not-italic text-primary">
              Sajha
            </em>
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            &ldquo;Sajha&rdquo; means shared, collective, communal. We believe
            the best way to grow as developers is together — sharing knowledge,
            building in the open, and lifting each other up. From Kathmandu to
            Pokhara, from students to senior engineers, SajhaStack is home for
            every dev in Nepal.
          </p>
          <Link
            href="/about"
            className="inline-flex items-center mt-6 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            Learn more about us &rarr;
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative aspect-[4/3] rounded-2xl bg-gradient-to-br from-primary/5 via-background to-secondary border border-border overflow-hidden flex items-center justify-center"
        >
          <div className="text-center p-8">
            <div className="text-6xl text-primary/20 font-[family-name:var(--font-display)]">
              &#10022;
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Community photo coming soon
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
