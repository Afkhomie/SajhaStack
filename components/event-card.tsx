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
    upcoming: "bg-green-50 text-green-700 border-green-200",
    ongoing: "bg-amber-50 text-amber-700 border-amber-200",
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
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group rounded-xl border border-border bg-background p-6 hover:shadow-lg hover:border-primary/20 transition-all duration-300"
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {upcomingEvents.map((event, i) => (
            <EventCard key={event.id} event={event} index={i} />
          ))}
        </div>

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
