"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/lib/constants";

const fadeUp = (delay: number = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] as const },
});

export function Hero() {
  return (
    <section className="relative h-[calc(100vh-73px)] flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260319_015952_e1deeb12-8fb7-4071-a42a-60779fc64ab6.mp4"
            type="video/mp4"
          />
        </video>
        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <motion.div
          {...fadeUp(0)}
          className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/80 backdrop-blur-sm px-4 py-1.5 text-sm text-muted-foreground mb-6"
        >
          Nepal&apos;s growing dev community
        </motion.div>

        <motion.h1
          {...fadeUp(0.1)}
          className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl md:text-6xl lg:text-[5rem] leading-[0.95] tracking-tight text-foreground max-w-3xl"
        >
          Where Nepal&apos;s Developers{" "}
          <em className="font-[family-name:var(--font-display)] not-italic text-primary">
            Connect
          </em>
          , Build, and Grow
        </motion.h1>

        <motion.p
          {...fadeUp(0.2)}
          className="mt-5 text-base md:text-lg text-muted-foreground max-w-[600px] leading-relaxed"
        >
          {siteConfig.description}
        </motion.p>

        <motion.div
          {...fadeUp(0.3)}
          className="mt-8 flex flex-col sm:flex-row items-center gap-3"
        >
          <Link
            href="/join"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Join the Community
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/events"
            className="inline-flex items-center justify-center rounded-full border border-border bg-background/80 backdrop-blur-sm px-7 py-3 text-sm font-medium text-foreground hover:bg-secondary transition-colors"
          >
            View Events
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
