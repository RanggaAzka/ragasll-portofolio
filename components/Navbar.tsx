"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { navLinks, site } from "@/data/site";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import { useActiveSection } from "@/lib/useActiveSection";
import { ThemeToggle } from "@/components/ThemeToggle";
import { MobileMenu } from "@/components/MobileMenu";
import { cn } from "@/lib/utils";

const NAV_OFFSET = -110;

export function Navbar() {
  const { scrollTo } = useSmoothScroll();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const activeId = useActiveSection(
    isHome ? navLinks.map((l) => l.href.replace("#", "")) : []
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // On the homepage, hash links are intercepted for offset-aware smooth
  // scrolling. On any other route (e.g. /work) they're left as plain
  // links to "/#section" so the browser navigates home first.
  const resolveHref = (href: string) => (isHome ? href : `/${href}`);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (!isHome) {
      setMenuOpen(false);
      return;
    }
    e.preventDefault();
    scrollTo(href, NAV_OFFSET);
    setMenuOpen(false);
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 flex justify-center px-4 pt-3 sm:px-5 sm:pt-5">
        <nav
          aria-label="Primary"
          className={cn(
            "flex w-full max-w-[1080px] items-center justify-between gap-1.5 rounded-full border py-1.5 pl-2 pr-2.5 backdrop-blur-xl transition-shadow duration-500 sm:pl-2.5 sm:pr-3",
            scrolled && "shadow-[0_10px_40px_-15px_rgba(0,0,0,0.35)]"
          )}
          style={{
            background: "color-mix(in srgb, var(--card) 78%, transparent)",
            borderColor: "var(--border)",
          }}
        >
          <a
            href={resolveHref("#top")}
            onClick={(e) => handleNavClick(e, "#top")}
            data-cursor-hover
            className="flex items-center gap-2 rounded-full py-1 pl-1.5 pr-3 sm:pr-4"
            aria-label={`${site.name} — back to top`}
          >
            <span
              className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-[13px] font-semibold italic"
              style={{ background: "var(--ink-bg)", color: "var(--ink-fg)" }}
            >
              {site.firstName[0]}
            </span>
            <span className="hidden text-[13px] font-semibold uppercase tracking-[0.14em] sm:inline">
              {site.firstName}
            </span>
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => {
              const isActive = activeId === link.href.replace("#", "");
              return (
                <li key={link.href}>
                  <a
                    href={resolveHref(link.href)}
                    onClick={(e) => handleNavClick(e, link.href)}
                    data-cursor-hover
                    data-active={isActive}
                    className="link-underline px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors"
                    style={{ color: isActive ? "var(--foreground)" : "var(--muted)" }}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <a
              href={resolveHref("#contact")}
              onClick={(e) => handleNavClick(e, "#contact")}
              data-cursor-hover
              className="btn-pill btn-pill-ink hidden sm:inline-flex"
            >
              Hire Me
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              data-cursor-hover
              aria-label="Open menu"
              aria-expanded={menuOpen}
              className="grid h-8 w-8 place-items-center rounded-full border lg:hidden"
              style={{ borderColor: "var(--border)" }}
            >
              <Menu size={17} strokeWidth={1.75} />
            </button>
          </div>
        </nav>
      </header>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        onNavigate={handleNavClick}
        resolveHref={resolveHref}
      />
    </>
  );
}
