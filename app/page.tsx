import { Hero } from "@/components/hero";
import { StatsStrip } from "@/components/stats-strip";
import { FeaturedEvents } from "@/components/event-card";
import { AboutSnippet } from "@/components/about-snippet";
import { JoinCTA } from "@/components/join-cta";

export default function Home() {
  return (
    <>
      <Hero />
      <StatsStrip />
      <FeaturedEvents />
      <AboutSnippet />
      <JoinCTA />
    </>
  );
}
