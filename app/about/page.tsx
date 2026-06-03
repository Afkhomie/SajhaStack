"use client";

import { motion } from "framer-motion";
import { Code2, Users, BookOpen, Mountain, Github, Linkedin } from "lucide-react";
import { team, values } from "@/lib/constants";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Code2,
  Users,
  BookOpen,
  Mountain,
};

export default function AboutPage() {
  return (
    <div className="py-16 px-6 md:px-12 lg:px-20">
      <div className="max-w-5xl mx-auto">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl"
        >
          <h1 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl tracking-tight text-foreground">
            About SajhaStack
          </h1>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            We&apos;re a community of developers across Nepal united by a shared
            belief: that we grow faster together. Through events, open source,
            and knowledge sharing, we&apos;re building the future of Nepal&apos;s
            tech ecosystem.
          </p>
        </motion.div>

        {/* Story */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16"
        >
          <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl tracking-tight text-foreground">
            Our Story
          </h2>
          <div className="mt-4 text-muted-foreground leading-relaxed space-y-4 max-w-2xl">
            <p>
              SajhaStack started from a simple Instagram group chat — a handful
              of developers in Nepal who wanted a space to share ideas, ask
              questions, and collaborate. What began as casual conversations grew
              into something bigger.
            </p>
            <p>
              We organized our first meetup, then our first hackathon. Developers
              from Kathmandu, Pokhara, Biratnagar, and beyond showed up. The
              energy was undeniable. Nepal has incredible talent — it just needed
              a platform to come together.
            </p>
            <p>
              Today, SajhaStack is a growing community hosting regular events,
              mentoring newcomers, and pushing the boundaries of what Nepali
              developers can build. And we&apos;re just getting started.
            </p>
          </div>
        </motion.section>

        {/* Values */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-20"
        >
          <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl tracking-tight text-foreground">
            What We Stand For
          </h2>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((value, i) => {
              const Icon = iconMap[value.icon];
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="rounded-xl border border-border p-6"
                >
                  <div className="flex items-center gap-3 mb-3">
                    {Icon && (
                      <div className="flex items-center justify-center h-9 w-9 rounded-lg bg-primary/10">
                        <Icon className="h-4.5 w-4.5 text-primary" />
                      </div>
                    )}
                    <h3 className="font-semibold text-foreground">
                      {value.title}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* Team */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-20"
        >
          <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl tracking-tight text-foreground">
            The Team
          </h2>
          <p className="mt-2 text-muted-foreground">
            The people keeping the community running.
          </p>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="rounded-xl border border-border p-6 text-center"
              >
                <div className="mx-auto h-16 w-16 rounded-full bg-secondary flex items-center justify-center text-xl font-semibold text-muted-foreground">
                  {member.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <h3 className="mt-4 font-semibold text-sm text-foreground">
                  {member.name}
                </h3>
                <p className="text-xs text-muted-foreground">{member.role}</p>
                <div className="mt-3 flex items-center justify-center gap-2">
                  {member.github && (
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Github className="h-4 w-4" />
                    </a>
                  )}
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Linkedin className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}
