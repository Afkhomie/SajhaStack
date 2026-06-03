"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { events, type EventCategory } from "@/lib/constants";
import { EventCard } from "@/components/event-card";
import { cn } from "@/lib/utils";

type Filter = "all" | EventCategory;

const filters: { label: string; value: Filter }[] = [
  { label: "All", value: "all" },
  { label: "Hackathons", value: "hackathon" },
  { label: "Meetups", value: "meetup" },
  { label: "Workshops", value: "workshop" },
];

export default function EventsPage() {
  const [activeFilter, setActiveFilter] = useState<Filter>("all");

  const filtered =
    activeFilter === "all"
      ? events
      : events.filter((e) => e.category === activeFilter);

  const upcoming = filtered.filter((e) => e.status !== "past");
  const past = filtered.filter((e) => e.status === "past");

  return (
    <div className="py-16 px-6 md:px-12 lg:px-20">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl tracking-tight text-foreground">
            Events
          </h1>
          <p className="mt-3 text-muted-foreground max-w-lg">
            Hackathons, meetups, and workshops — find your next opportunity to
            connect and build with the community.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mt-8 flex items-center gap-2 flex-wrap"
        >
          {filters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setActiveFilter(filter.value)}
              className={cn(
                "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                activeFilter === filter.value
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              )}
            >
              {filter.label}
            </button>
          ))}
        </motion.div>

        {upcoming.length > 0 && (
          <div className="mt-10">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
              Upcoming
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcoming.map((event, i) => (
                <EventCard key={event.id} event={event} index={i} />
              ))}
            </div>
          </div>
        )}

        {past.length > 0 && (
          <div className="mt-16">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
              Past Events
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {past.map((event, i) => (
                <EventCard key={event.id} event={event} index={i} />
              ))}
            </div>
          </div>
        )}

        {filtered.length === 0 && (
          <div className="mt-16 text-center py-12">
            <p className="text-muted-foreground">
              No events found for this category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
