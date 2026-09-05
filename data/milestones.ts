// ─────────────────────────────────────────────────────────────
// MILESTONES
// Dates are placeholder — update with your actual timeline.
// ─────────────────────────────────────────────────────────────

export type Milestone = {
  title: string;
  description: string;
  date: string;
  icon: "rocket" | "folder" | "layers" | "users";
  href?: string;
  placeholder?: boolean;
};

export const milestones: Milestone[] = [
  {
    title: "Started Web Development",
    description:
      "Started learning web development at school, focusing on HTML, CSS, JavaScript, and basic programming.",
    date: "2024",
    icon: "rocket",
  },
  {
    title: "First Web Projects",
    description:
      "Started building web projects and applying programming fundamentals through school assignments.",
    date: "2024",
    icon: "folder",
  },
  {
    title: "Laravel & Full-Stack Development",
    description:
      "Expanded my skills into Laravel, PHP, MySQL, APIs, and full-stack web development.",
    date: "2025",
    icon: "layers",
  },
  {
    title: "Team Project Experience",
    description:
      "Collaborated with a team to design, develop, and improve web applications through real project experience.",
    date: "2025",
    icon: "users",
  },
];
