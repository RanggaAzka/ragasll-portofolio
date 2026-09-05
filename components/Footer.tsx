import { site } from "@/data/site";
import { socials } from "@/data/socials";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t" style={{ borderColor: "var(--border)" }}>
      <div className="container-page flex flex-col gap-4 py-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs" style={{ color: "var(--muted)" }}>
          © {year} {site.name}. All rights reserved.
        </p>
        <div
          className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium uppercase tracking-wide sm:gap-x-6"
          style={{ color: "var(--muted)" }}
        >
          {socials.map((s) => (
            <a
              key={s.id}
              href={s.href}
              target={s.external ? "_blank" : undefined}
              rel={s.external ? "noreferrer" : undefined}
              data-cursor-hover
              className="link-underline"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
