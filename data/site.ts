// ─────────────────────────────────────────────────────────────
// SITE CONFIG — edit everything about "who you are" here.
// Nothing in /components should need to change when you edit this.
// ─────────────────────────────────────────────────────────────

export const site = {
  name: "Ragasll",
  firstName: "Ragasll",
  lastName: "Azka",
  initials: "RA",
  role: "Web Developer",
  location: "Bogor, Indonesia",
  tagline: "Problem Solver. Digital Generalist.",
  // Short bio used in the About section.
  bio:
    "I'm Rangga Azka, a web developer from Bogor, Indonesia. I enjoy turning ideas and real-world problems into practical digital solutions through modern web applications, databases, and software systems.",
  // Marquee word(s) used for the giant outline hero typography.
  heroMarquee: "RANGGA AZKA",
  availableForWork: true,
  // Put the file at /public/Rangga-Azka-Resume.pdf to make this link resolve.
  resumeHref: "/Rangga-Azka-Resume.pdf",
  // Put your photo at /public/images/profile.jpg — a placeholder renders until then.
  profileImage: "/images/profile.jpg",
} as const;

export const stats = [
  { label: "Projects", value: "20+" },
  { label: "Certificates", value: "9+" },
  { label: "Years Learning", value: "3+" },
] as const;

export const currentlyList = [
  {
    title: "Building",
    detail: "Web & digital projects",
  },
  {
    title: "Exploring",
    detail: "Modern frontend systems",
  },
  {
    title: "Learning",
    detail: "Full-stack development",
  },
] as const;

export const traits = [
  "Problem Solver",
  "Creative",
  "Organized",
  "Continuous Learner",
] as const;

export const navLinks = [
  { label: "Work", href: "#work" },
  { label: "What I Can Do", href: "#capabilities" },
  { label: "About", href: "#about" },
  { label: "Milestones", href: "#milestones" },
  { label: "Certificates", href: "#certificates" },
] as const;
