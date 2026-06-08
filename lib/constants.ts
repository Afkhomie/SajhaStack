export const siteConfig = {
  name: "SajhaStack",
  description:
    "Nepal's developer community — connecting builders through hackathons, meetups, and open source.",
  tagline: "Where Nepal's Developers Connect, Build, and Grow",
  url: "https://sajhastack.com",
  socials: {
    instagram: "https://www.instagram.com/sajha_stack_",
    github: "https://github.com/sajhastack",
    linkedin: "https://www.linkedin.com/in/sajha-stack-541215401/",
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
  { label: "Members", value: "100+", icon: "Users" },
  { label: "Crazy Events", value: "Coming Soon", icon: "Sparkles" },
  { label: "Cities Going to Reach", value: "2–3", icon: "MapPin" },
  { label: "Projects Built", value: "10+", icon: "Rocket" },
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

// No events published yet — crazy ones dropping soon.
export const events: CommunityEvent[] = [];

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
    github: "https://github.com/Shadow-ops-alt",
    linkedin: "https://www.linkedin.com/in/aditya-bhujel-8755942b2/",
  },
  {
    name: "Ansh Bohara",
    role: "Frontend, Backend & Cybersecurity Lead",
    avatar: "/images/team/placeholder.svg",
    github: "https://github.com/GOJO-SENPA1",
    linkedin: "https://www.linkedin.com/in/ansh-bohara-47169a344",
  },
  {
    name: "Aayush Dev",
    role: "Cybersecurity Lead",
    avatar: "/images/team/placeholder.svg",
  },
  {
    name: "Aaditya Karna",
    role: "Marketing Lead",
    avatar: "/images/team/placeholder.svg",
  },
  {
    name: "Nischal Regmi",
    role: "Core Team",
    avatar: "/images/team/placeholder.svg",
  },
  {
    name: "Tejah Mehta",
    role: "Core Team",
    avatar: "/images/team/placeholder.svg",
  },
  {
    name: "Prashnna Luitel",
    role: "Core Team",
    avatar: "/images/team/placeholder.svg",
  },
];

export const values = [
  {
    title: "Open Source",
    description:
      "We believe in building in the open and contributing back to the ecosystem.",
    icon: "Code2",
  },
  {
    title: "Inclusivity",
    description:
      "Every developer in Nepal deserves a seat at the table, regardless of background.",
    icon: "Users",
  },
  {
    title: "Knowledge Sharing",
    description:
      "We grow together by teaching what we know and learning from each other.",
    icon: "BookOpen",
  },
  {
    title: "Nepal First",
    description:
      "Building technology solutions that address local challenges and opportunities.",
    icon: "Mountain",
  },
];
