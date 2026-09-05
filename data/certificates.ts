// ─────────────────────────────────────────────────────────────
// CERTIFICATES
// Example content — swap in your real certificates, dates, and
// certificate links. Images live at /public/images/cert-*.jpg
// ─────────────────────────────────────────────────────────────

export type Certificate = {
  title: string;
  subtitle: string;
  organization: string;
  date: string;
  description: string;
  images: [string, string];
  certificateHref?: string;
  placeholder?: boolean;
};

export const certificates: Certificate[] = [
   {
    title: "XPro Travel",
    subtitle: "Travel booking and tourism management website",
    organization: "PT Kreasi Media",
    date: "Des, 2024",
    description:
      "Developed a travel website focused on presenting travel destinations, tour information, and an accessible booking experience with a responsive web interface.",
    images: ["/images/sertifikat/xprotravel.jpg", "/images/sertifikat/nilaixpro.jpg"],
    certificateHref: "#",
    placeholder: true,
  },

  {
    title: "Sistem Pendataan",
    subtitle: "Web-based data management system",
    organization: "PT Qelopak",
    date: "Des, 2025",
    description:
      "Built a web-based data management system with structured data processing, CRUD functionality, database integration, and a responsive interface for efficient information management.",
    images: ["/images/sertifikat/sistempendataan.jpg", "/images/sertifikat/nilaipendataan.jpg"],
    certificateHref: "#",
    placeholder: true,
  },

  {
    title: "Voting System",
    subtitle: "Web-based digital voting application",
    organization: "PT Ginvo Studio",
    date: "June, 2025",
    description:
      "Developed a digital voting system that manages voting data and user interactions while providing a simple, structured, and responsive interface.",
    images: ["/images/sertifikat/Votingsistem.jpg", "/images/sertifikat/nilaivoting.jpg"],
    certificateHref: "#",
    placeholder: true,
  },

  {
    title: "POS & Laundry Management",
    subtitle: "Full-stack point of sales and laundry management application",
    organization: "PT WAN Teknologi Internasional",
    date: "June, 2026",
    description:
      "Completed a competency project by developing a full-stack POS and laundry management application covering database implementation, backend and RESTful API development, frontend web development, mobile application development, and system testing with UI/UX evaluation.",
    images: ["/images/sertifikat/laundry.png", "/images/sertifikat/nilailaund.png"],
    certificateHref: "#",
    placeholder: true,
  },
];
