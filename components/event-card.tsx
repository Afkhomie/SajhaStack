"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";
import Link from "next/link";
import { events } from "@/lib/constants";

export function EventCard({
  event,
  index,
}: {
  event: (typeof events)[0];
  index: number;
}) {
  const statusColors = {
    upcoming: "bg-green-500/10 text-green-400 border-green-500/20",
    ongoing: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    past: "bg-muted text-muted-foreground border-border",
  };

  const categoryLabels = {
    hackathon: "Hackathon",
    meetup: "Meetup",
    workshop: "Workshop",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.35,
        delay: Math.min(index, 3) * 0.04,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -4 }}
      className="group rounded-xl border border-border bg-background p-6 transition-all duration-300 ease-[var(--ease-out-soft)] hover:shadow-[0_10px_30px_-12px_hsl(0_72%_51%/0.3)] hover:border-primary/30"
    >
      <div className="flex items-center gap-2 mb-3">
        <span
          className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${statusColors[event.status]}`}
        >
          {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
        </span>
        <span className="text-xs text-muted-foreground">
          {categoryLabels[event.category]}
        </span>
      </div>

      <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
        {event.title}
      </h3>

      <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
        {event.description}
      </p>

      <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <Calendar className="h-3.5 w-3.5" />
          {new Date(event.date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </span>
        <span className="flex items-center gap-1">
          <MapPin className="h-3.5 w-3.5" />
          {event.location}
        </span>
      </div>
    </motion.div>
  );
}

export function FeaturedEvents() {
  const upcomingEvents = events
    .filter((e) => e.status === "upcoming")
    .slice(0, 3);

  return (
    <section className="py-20 px-6 md:px-12 lg:px-20">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl tracking-tight text-foreground">
            Upcoming Events
          </h2>
          <p className="mt-3 text-muted-foreground">
            Join us at our next gathering — hackathons, meetups, and workshops.
          </p>
        </motion.div>

        {upcomingEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {upcomingEvents.map((event, i) => (
              <EventCard key={event.id} event={event} index={i} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="group rounded-2xl border border-border bg-background/60 backdrop-blur-md px-6 py-12 text-center transition-all duration-300 ease-[var(--ease-out-soft)] hover:border-primary/30 hover:shadow-[0_8px_30px_-12px_hsl(0_80%_63%/0.4)]"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-4 py-1.5 text-xs font-semibold text-foreground/80">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              Stay tuned
            </span>
            <h3 className="mt-5 font-[family-name:var(--font-display)] text-2xl md:text-3xl tracking-tight text-foreground">
              Crazyy events are going to{" "}
              <em className="not-italic text-primary">drop soon</em>
            </h3>
            <p className="mt-3 text-sm text-foreground/70 font-medium max-w-md mx-auto">
              We&apos;re cooking something big — hackathons, meetups, and
              workshops for Nepal&apos;s dev community.
            </p>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 text-center"
        >
          <Link
            href="/events"
            className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            View all events &rarr;
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
