"use client";

import { motion } from "framer-motion";
import {
  Users,
  Calendar,
  Code2,
  MessageCircle,
  Lightbulb,
  Trophy,
} from "lucide-react";

const benefits = [
  {
    icon: Users,
    title: "Network with 500+ Devs",
    description: "Connect with developers across Nepal — juniors, seniors, and everyone in between.",
  },
  {
    icon: Calendar,
    title: "Exclusive Events",
    description: "Get early access to hackathons, meetups, and workshops before they fill up.",
  },
  {
    icon: Code2,
    title: "Open Source Projects",
    description: "Collaborate on meaningful projects that solve real problems for Nepal.",
  },
  {
    icon: MessageCircle,
    title: "Active Community Chat",
    description: "Ask questions, share resources, and get help from fellow developers anytime.",
  },
  {
    icon: Lightbulb,
    title: "Mentorship",
    description: "Learn from experienced engineers who've been where you are.",
  },
  {
    icon: Trophy,
    title: "Recognition",
    description: "Showcase your work, get feedback, and build your reputation in the community.",
  },
];

export default function JoinPage() {
  return (
    <div className="py-16 px-6 md:px-12 lg:px-20">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl"
        >
          <h1 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl tracking-tight text-foreground">
            Join SajhaStack
          </h1>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            Become part of Nepal&apos;s fastest-growing developer community.
            It&apos;s free, it&apos;s open, and it&apos;s waiting for you.
          </p>
        </motion.div>

        {/* Benefits */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, i) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="rounded-xl border border-border p-6"
            >
              <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary/10 mb-4">
                <benefit.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground text-sm">
                {benefit.title}
              </h3>
              <p className="mt-1.5 text-sm text-muted-foreground">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Join Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16 max-w-md"
        >
          <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl tracking-tight text-foreground">
            Sign Up
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Fill in your details and we&apos;ll add you to the community.
          </p>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="mt-6 space-y-4"
          >
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-foreground mb-1.5"
              >
                Full Name
              </label>
              <input
                id="name"
                type="text"
                required
                className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-primary transition-colors"
                placeholder="Your name"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-foreground mb-1.5"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-primary transition-colors"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="github"
                className="block text-sm font-medium text-foreground mb-1.5"
              >
                GitHub Username{" "}
                <span className="text-muted-foreground font-normal">
                  (optional)
                </span>
              </label>
              <input
                id="github"
                type="text"
                className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-primary transition-colors"
                placeholder="yourusername"
              />
            </div>

            <div>
              <label
                htmlFor="interest"
                className="block text-sm font-medium text-foreground mb-1.5"
              >
                What interests you?
              </label>
              <select
                id="interest"
                className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-primary transition-colors"
              >
                <option value="">Select an area</option>
                <option value="web">Web Development</option>
                <option value="mobile">Mobile Development</option>
                <option value="ai">AI / Machine Learning</option>
                <option value="devops">DevOps & Cloud</option>
                <option value="blockchain">Blockchain / Web3</option>
                <option value="opensource">Open Source</option>
                <option value="other">Other</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors mt-2"
            >
              Join the Community
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
