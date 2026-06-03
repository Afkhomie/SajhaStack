export const siteConfig = {
  name: "SajhaStack",
  description:
    "Nepal's developer community — connecting builders through hackathons, meetups, and open source.",
  tagline: "Where Nepal's Developers Connect, Build, and Grow",
  url: "https://sajhastack.com",
  socials: {
    instagram: "https://instagram.com/sajhastack",
    github: "https://github.com/sajhastack",
    linkedin: "https://linkedin.com/company/sajhastack",
    discord: "#",
  },
};

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Events" },
  { href: "/about", label: "About" },
  { href: "/join", label: "Join" },
];

export const stats = [
  { label: "Members", value: "500+" },
  { label: "Events Hosted", value: "25+" },
  { label: "Cities Reached", value: "12" },
  { label: "Projects Built", value: "40+" },
];

export type EventStatus = "upcoming" | "ongoing" | "past";
export type EventCategory = "hackathon" | "meetup" | "workshop";

export interface CommunityEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  status: EventStatus;
  category: EventCategory;
}

export const events: CommunityEvent[] = [
  {
    id: "1",
    title: "SajhaHack 2026",
    description:
      "48-hour hackathon bringing together 200+ developers to build solutions for Nepal's challenges.",
    date: "2026-07-15",
    location: "Kathmandu, Nepal",
    status: "upcoming",
    category: "hackathon",
  },
  {
    id: "2",
    title: "DevMeet Pokhara",
    description:
      "Monthly developer meetup featuring talks on web3, AI, and open source contributions.",
    date: "2026-06-20",
    location: "Pokhara, Nepal",
    status: "upcoming",
    category: "meetup",
  },
  {
    id: "3",
    title: "React Nepal Workshop",
    description:
      "Hands-on workshop covering React Server Components, Next.js App Router, and modern patterns.",
    date: "2026-06-10",
    location: "Lalitpur, Nepal",
    status: "upcoming",
    category: "workshop",
  },
  {
    id: "4",
    title: "Open Source Saturday",
    description:
      "Collaborative coding session where we contribute to open source projects together.",
    date: "2026-05-25",
    location: "Kathmandu, Nepal",
    status: "past",
    category: "meetup",
  },
  {
    id: "5",
    title: "SajhaHack 2025",
    description:
      "Our inaugural hackathon — 120 developers, 30 teams, 48 hours of building.",
    date: "2025-12-10",
    location: "Kathmandu, Nepal",
    status: "past",
    category: "hackathon",
  },
  {
    id: "6",
    title: "TypeScript Deep Dive",
    description:
      "Advanced TypeScript patterns for production applications — generics, inference, and type-level programming.",
    date: "2025-11-15",
    location: "Online",
    status: "past",
    category: "workshop",
  },
];

export interface TeamMember {
  name: string;
  role: string;
  avatar: string;
  github?: string;
  linkedin?: string;
}

export const team: TeamMember[] = [
  {
    name: "Aditya Bhujel",
    role: "Frontend Lead",
    avatar: "/images/team/placeholder.svg",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
  },
  {
    name: "Sajha Dev",
    role: "Community Manager",
    avatar: "/images/team/placeholder.svg",
    github: "https://github.com",
  },
  {
    name: "Priya Sharma",
    role: "Backend Engineer",
    avatar: "/images/team/placeholder.svg",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
  },
  {
    name: "Rajan KC",
    role: "DevOps & Cloud",
    avatar: "/images/team/placeholder.svg",
    github: "https://github.com",
  },
];

export const values = [
  {
    title: "Open Source",
    description: "We believe in building in the open and contributing back to the ecosystem.",
    icon: "Code2",
  },
  {
    title: "Inclusivity",
    description: "Every developer in Nepal deserves a seat at the table, regardless of background.",
    icon: "Users",
  },
  {
    title: "Knowledge Sharing",
    description: "We grow together by teaching what we know and learning from each other.",
    icon: "BookOpen",
  },
  {
    title: "Nepal First",
    description: "Building technology solutions that address local challenges and opportunities.",
    icon: "Mountain",
  },
];
