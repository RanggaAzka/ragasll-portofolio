import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ExternalLink, FolderGit2 } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BackgroundLines } from "@/components/BackgroundLines";
import { projects } from "@/data/projects";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: `Work Archive — ${site.name}`,
  description: `A complete collection of projects and technical work by ${site.name}.`,
};

export default function WorkArchivePage() {
  return (
    <>
      <Navbar />
      <main className="relative min-h-screen pt-24 sm:pt-36">
        <BackgroundLines />
        <div className="container-page relative z-10 pb-20 sm:pb-28">
          <Link
            href="/#work"
            data-cursor-hover
            className="link-underline inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em]"
            style={{ color: "var(--muted)" }}
          >
            <ArrowLeft size={14} /> Back to home
          </Link>

          <p className="eyebrow mb-3 mt-8">Archive</p>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            All Projects
          </h1>
          <p
            className="mt-4 max-w-lg text-sm sm:text-base"
            style={{ color: "var(--muted)" }}
          >
            A complete collection of systems, digital projects, and technical
            work I&apos;ve built.
          </p>

          <div className="mt-10 sm:mt-14">
            {projects.map((project) => (
              <div
                key={project.number}
                className="group flex flex-col gap-4 border-t py-7 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:py-8"
                style={{ borderColor: "var(--border)" }}
              >
                <div className="flex min-w-0 items-start gap-4 sm:gap-6">
                  <span
                    className="font-feature-tabular pt-1 text-sm"
                    style={{ color: "var(--muted-soft)" }}
                  >
                    {project.number}
                  </span>
                  <div className="min-w-0">
                    <h2 className="text-lg font-bold sm:text-xl">
                      {project.title}
                    </h2>
                    <p
                      className="mt-1.5 max-w-xl text-sm"
                      style={{ color: "var(--muted)" }}
                    >
                      {project.description}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {project.technology.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border px-3 py-1 text-[10px] font-medium uppercase tracking-wide"
                          style={{ borderColor: "var(--border)", color: "var(--muted)" }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-4 pl-9 sm:pl-0">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`View ${project.title} source on GitHub`}
                      data-cursor-hover
                    >
                      <FolderGit2 size={18} strokeWidth={1.75} />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      data-cursor-hover
                      className="link-underline inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide"
                    >
                      Visit <ExternalLink size={13} />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
