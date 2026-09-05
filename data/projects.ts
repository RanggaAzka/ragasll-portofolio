// ─────────────────────────────────────────────────────────────
// PROJECTS — shown in the stacked Work Gallery on the homepage.
// Drop screenshots into /public/images/projects/ using the same
// file names to replace the generated placeholders.
// ─────────────────────────────────────────────────────────────

export type Project = {
  number: string;
  title: string;
  description: string;
  technology: string[];
  image: string;
  liveUrl?: string;
  githubUrl?: string;
};

export const projects: Project[] = [
  {
    number: "01",
    title: "Perfu.me",
    description: "Modern perfume website built with Laravel.",
    technology: ["Laravel", "MySQL", "Tailwind CSS"],
    image: "/images/projects/perfume.png",
    liveUrl: "#",
    githubUrl: "https://github.com/RanggaAzka/Perfume",
  },
  {
    number: "02",
    title: "Hotel",
    description: "Modern hotel management and booking website.",
    technology: ["PHP", "MySQL", "JavaScript"],
    image: "/images/projects/hotel.png",
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    number: "03",
    title: "Only Cars",
    description: "Modern car showroom website.",
    technology: ["React", "Next.js", "Tailwind CSS"],
    image: "/images/projects/only-cars.png",
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    number: "04",
    title: "Expro Travel",
    description: "Modern travel website for showcasing destinations and travel packages.",
    technology: ["Laravel", "MySQL"],
    image: "/images/projects/xpro-travel.png",
    liveUrl: "#",
    githubUrl: "#",
  },
];
