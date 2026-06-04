"use client";

import { motion } from "framer-motion";
import { Users, Sparkles, MapPin, Rocket } from "lucide-react";
import { stats } from "@/lib/constants";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Users,
  Sparkles,
  MapPin,
  Rocket,
};

export function StatsStrip() {
  return (
    <section className="py-16 px-6 md:px-12 lg:px-20 border-b border-border">
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, i) => {
          const Icon = iconMap[stat.icon];
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4 }}
              className="group rounded-xl border border-border bg-background/60 backdrop-blur-md p-6 text-center transition-all duration-300 ease-[var(--ease-out-soft)] hover:border-primary/30 hover:shadow-[0_8px_30px_-12px_hsl(0_80%_63%/0.4)]"
            >
              {Icon && (
                <div className="mx-auto flex items-center justify-center h-10 w-10 rounded-lg bg-primary/10 mb-4 transition-all duration-300 group-hover:bg-primary group-hover:scale-110">
                  <Icon className="h-5 w-5 text-primary transition-colors duration-300 group-hover:text-primary-foreground" />
                </div>
              )}
              <div className="text-2xl md:text-3xl font-semibold text-foreground transition-colors group-hover:text-primary">
                {stat.value}
              </div>
              <div className="mt-1 text-sm text-foreground/70 font-medium">
                {stat.label}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
