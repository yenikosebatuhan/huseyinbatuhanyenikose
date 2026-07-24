import { ProjectItem, domainGradient } from "@/data/projects";

interface ProjectCoverProps {
  project: ProjectItem;
  className?: string;
}

/**
 * A generated cover: brand-gradient panel with a subtle grid, the project
 * monogram, and its primary domain. No external images — crisp at any size.
 */
export function ProjectCover({ project, className = "" }: ProjectCoverProps) {
  const gradient = domainGradient[project.domains[0]];
  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br ${gradient} ${className}`}
    >
      {/* grid texture */}
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.35) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.35) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />
      {/* glow */}
      <div className="absolute -right-8 -top-10 h-32 w-32 rounded-full bg-white/25 blur-2xl" />
      <div className="absolute inset-0 flex items-center justify-between px-6">
        <span className="mono text-5xl font-bold tracking-tight text-white drop-shadow-sm">
          {project.monogram}
        </span>
        <span className="mono text-[11px] uppercase tracking-widest text-white/80">
          {project.period}
        </span>
      </div>
    </div>
  );
}
