// ─────────────────────────────────────────────────────────────
// CAPABILITIES — the "What I Can Do" section.
// ─────────────────────────────────────────────────────────────

export const technologies = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "PHP",
  "Laravel",
  "React",
  "Next.js",
  "Tailwind CSS",
  "MySQL",
  "Git",
  "GitHub",
] as const;

export type Capability = {
  number: string;
  title: string;
  tagline: string;
  icon: "code" | "layout" | "database" | "puzzle";
  description: string;
  tags: string[];
};

export const capabilities: Capability[] = [
  {
    number: "01",
    title: "Web Development",
    tagline: "Full-Stack Builds",
    icon: "code",
    description:
      "Building functional, reliable websites and web applications end to end — from database design to a polished, working interface.",
    tags: ["Laravel", "React", "Next.js", "PHP", "JavaScript"],
  },
  {
    number: "02",
    title: "UI / Digital Experience",
    tagline: "Interface & Interaction",
    icon: "layout",
    description:
      "Designing clean, usable interfaces and translating them into responsive, accessible front-end code that feels considered.",
    tags: ["Tailwind CSS", "Responsive Design", "Accessibility"],
  },
  {
    number: "03",
    title: "Database & System Development",
    tagline: "Data & Architecture",
    icon: "database",
    description:
      "Designing relational schemas and building the systems around them — from inventory tools to management platforms.",
    tags: ["MySQL", "System Design", "CRUD Systems"],
  },
  {
    number: "04",
    title: "Problem Solving",
    tagline: "Practical Solutions",
    icon: "puzzle",
    description:
      "Turning messy, real-world requirements into practical digital solutions, debugging systems, and iterating until things work.",
    tags: ["Debugging", "System Testing", "Analysis"],
  },
];
