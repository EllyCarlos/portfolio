const capabilityGroups = [
  {
    title: "Product interfaces",
    description:
      "Responsive product interfaces, operational workflows, and cross-platform experiences built for clarity and maintainability.",
    technologies: [
      "TypeScript",
      "React",
      "Next.js",
      "Tailwind CSS",
      "React Native",
      "Expo",
    ],
  },
  {
    title: "Backend & APIs",
    description:
      "Backend APIs, business logic, authentication flows, and real-time services that support complete products.",
    technologies: [
      "Node.js",
      "NestJS",
      "Express",
      "REST APIs",
      "Socket.IO",
    ],
  },
  {
    title: "Data & persistence",
    description:
      "Relational and document data models designed around dependable application persistence.",
    technologies: [
      "PostgreSQL",
      "Prisma",
      "MySQL",
      "MariaDB",
      "MongoDB",
    ],
  },
  {
    title: "Delivery & infrastructure",
    description:
      "Version control, containers, deployment, and cloud workflows that carry applications into production.",
    technologies: ["Docker", "Git / GitHub", "Vercel", "AWS", "Linux"],
  },
];

const SkillsSection = () => {
  return (
    <section
      id="skills"
      className="pointer-events-none relative z-10 lg:min-h-[110svh]"
    >
      <div className="container grid items-center gap-14 py-section lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-16">
        <div className="pointer-events-auto max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand">
            Engineering capabilities
          </p>
          <h2 className="mt-3 font-display text-4xl tracking-tight text-foreground sm:text-5xl">
            How I build
          </h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            I work across product interfaces, backend services, data,
            cross-platform mobile experiences, and delivery workflows.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {capabilityGroups.map((group) => (
              <article
                key={group.title}
                className="rounded-xl border border-border bg-card/80 p-5"
              >
                <h3 className="text-base font-semibold text-foreground">
                  {group.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {group.description}
                </p>
                <p className="mt-4 text-sm font-medium leading-6 text-foreground">
                  {group.technologies.join(" · ")}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-6 border-l-2 border-brand pl-4">
            <p className="text-sm font-semibold text-foreground">
              Interactive tech stack
            </p>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              Press or hover over a key to explore individual technologies.
            </p>
          </div>
        </div>

        <div className="hidden min-w-0 lg:block" aria-hidden="true" />
      </div>
    </section>
  );
};

export default SkillsSection;
