// ─────────────────────────────────────────────────────────────
// SOCIAL / CONTACT LINKS — replace the placeholder values below
// with your real handles. Nothing else needs to change.
// ─────────────────────────────────────────────────────────────

export type SocialLink = {
  id: string;
  label: string;
  value: string;
  href: string;
  external: boolean;
};

export const socials: SocialLink[] = [
  {
    id: "email",
    label: "Email",
    value: "ranggaazka.work@gmail.com",
    href: "mailto:ranggaazka.work@gmail.com",
    external: false,
  },
  {
    id: "github",
    label: "GitHub",
    value: "github.com/RanggaAzka",
    href: "https://github.com/RanggaAzka",
    external: true,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    value: "linkedin.com/in/rangga-azka-718083323", // TODO: replace with your LinkedIn
    href: "https://linkedin.com/in/rangga-azka-718083323",
    external: true,
  },
  {
    id: "instagram",
    label: "Instagram",
    value: "instagram.com/ragasll",
    href: "https://instagram.com/ragasll",
    external: true,
  },
  {
    id: "tiktok",
    label: "TikTok",
    value: "tiktok.com/@ragasll",
    href: "https://tiktok.com/@ragasll",
    external: true,
  },
];
