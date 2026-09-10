import projects, { Project } from "@/data/projects";
import { cn } from "@/lib/utils";
import { ArrowUpRight, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const secondaryProjectIds = ["portfolio", "Todo List", "Weather App"];

const getTechnologyNames = (project: Project) =>
  Array.from(
    new Set(
      [...project.skills.frontend, ...project.skills.backend].map(
        (skill) => skill.title
      )
    )
  );

const getProjectImageAlt = (project: Project) => {
  if (project.id === "NexusChat") {
    return "NexusChat login screen with Google and email authentication options";
  }

  return `${project.title} ${project.category.toLowerCase()} application interface`;
};

const ProjectActions = ({ project }: { project: Project }) => {
  if (!project.live && !project.github) return null;

  return (
    <div className="flex flex-wrap gap-3">
      {project.live && (
        <Link
          href={project.live}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-brand px-4 py-2.5",
            "text-sm font-semibold text-neutral-950 transition-colors duration-200 hover:bg-brand/90",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          )}
        >
          Live Project
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      )}
      {project.github && (
        <Link
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-border bg-background/70 px-4 py-2.5",
            "text-sm font-semibold text-foreground transition-colors duration-200 hover:bg-accent",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          )}
        >
          <Github className="h-4 w-4" aria-hidden="true" />
          GitHub
        </Link>
      )}
    </div>
  );
};

const TechnologyList = ({
  technologies,
  label,
}: {
  technologies: string[];
  label: string;
}) => (
  <div>
    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
      {label}
    </p>
    <ul className="flex flex-wrap gap-2">
      {technologies.map((technology) => (
        <li
          key={technology}
          className="rounded-full border border-border bg-muted/60 px-3 py-1.5 text-xs font-medium text-muted-foreground"
        >
          {technology}
        </li>
      ))}
    </ul>
  </div>
);

const FeaturedProject = ({ project }: { project: Project }) => (
  <article className="grid min-w-0 overflow-hidden rounded-2xl border border-border bg-card/95 shadow-xl shadow-black/5 dark:shadow-black/20 lg:grid-cols-[1.15fr_0.85fr]">
    <div className="flex min-w-0 items-center bg-black p-2 sm:p-3 lg:p-4">
      <Image
        src={project.src}
        alt={getProjectImageAlt(project)}
        width={1275}
        height={635}
        sizes="(min-width: 1024px) 58vw, 100vw"
        className="h-auto w-full rounded-lg border border-white/10"
      />
    </div>

    <div className="flex min-w-0 flex-col justify-center p-6 sm:p-8 lg:p-10">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
        Featured project · {project.category}
      </p>
      <h3 className="mt-4 font-display text-3xl tracking-tight text-foreground sm:text-4xl">
        {project.title}
      </h3>
      <p className="mt-5 text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
        {project.summary}
      </p>

      <div className="mt-7 space-y-5">
        <TechnologyList
          label="Frontend"
          technologies={project.skills.frontend.map((skill) => skill.title)}
        />
        <TechnologyList
          label="Backend"
          technologies={project.skills.backend.map((skill) => skill.title)}
        />
      </div>

      <div className="mt-8">
        <ProjectActions project={project} />
      </div>
    </div>
  </article>
);

const ProjectCard = ({ project }: { project: Project }) => (
  <article className="flex min-w-0 flex-col overflow-hidden rounded-xl border border-border bg-card/90">
    <div className="overflow-hidden border-b border-border bg-black">
      <Image
        src={project.src}
        alt={getProjectImageAlt(project)}
        width={900}
        height={600}
        sizes="(min-width: 1280px) 30vw, (min-width: 768px) 50vw, 100vw"
        className="aspect-[16/9] h-auto w-full object-cover object-top"
      />
    </div>

    <div className="flex flex-1 flex-col p-5 sm:p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
        {project.category}
      </p>
      <h3 className="mt-3 font-display text-xl text-foreground sm:text-2xl">
        {project.title}
      </h3>
      <p className="mt-4 flex-1 text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
        {project.summary}
      </p>

      <div className="mt-6">
        <TechnologyList
          label="Built with"
          technologies={getTechnologyNames(project)}
        />
      </div>

      <div className="mt-7">
        <ProjectActions project={project} />
      </div>
    </div>
  </article>
);

const ProjectsSection = () => {
  const featuredProject = projects.find((project) => project.id === "NexusChat");
  const secondaryProjects = secondaryProjectIds.flatMap((id) => {
    const project = projects.find((item) => item.id === id);
    return project ? [project] : [];
  });

  return (
    <section id="projects" className="relative z-10">
      <div className="container py-section">
        <div className="mb-10 max-w-2xl sm:mb-14">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand">
            Portfolio
          </p>
          <h2 className="mt-3 font-display text-4xl tracking-tight text-foreground sm:text-5xl">
            Selected Work
          </h2>
          <p className="mt-5 text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            A focused selection of web products built across interfaces, APIs,
            databases, and real-time systems.
          </p>
        </div>

        {featuredProject && <FeaturedProject project={featuredProject} />}

        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {secondaryProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
