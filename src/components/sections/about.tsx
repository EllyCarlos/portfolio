const supportingBlocks = [
  {
    title: "End-to-end product work",
    description:
      "I connect interface decisions with API design, business logic, persistence, and delivery so each layer supports the same product goal.",
  },
  {
    title: "Existing systems",
    description:
      "I use debugging, integration, refactoring, and incremental improvement to strengthen applications while preserving their intended behavior.",
  },
  {
    title: "Cross-platform",
    description:
      "I apply the same product and engineering thinking across web interfaces and React Native and Expo mobile applications.",
  },
];

const AboutSection = () => {
  return (
    <section id="about" className="relative z-10 scroll-mt-16">
      <div className="container grid gap-12 py-section lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-20">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand">
            About
          </p>
          <h2 className="mt-3 font-display text-4xl tracking-tight text-foreground sm:text-5xl">
            Engineering across the product
          </h2>
          <div className="mt-7 space-y-5 text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            <p>
              I&apos;m a full-stack software engineer working primarily with
              TypeScript and JavaScript across modern web, backend, and
              cross-platform application development.
            </p>
            <p>
              My work follows complete product flows—from React and Next.js
              interfaces through Node.js and NestJS services, REST APIs,
              real-time behavior, relational persistence, and React Native or
              Expo applications. I focus on maintainable architecture,
              reliable behavior, and clear user experiences across those
              boundaries.
            </p>
          </div>
        </div>

        <div className="grid gap-4">
          {supportingBlocks.map((block, index) => (
            <article
              key={block.title}
              className="grid gap-4 rounded-xl border border-border bg-card/80 p-5 sm:grid-cols-[auto_1fr] sm:p-6"
            >
              <span
                className="font-display text-sm text-brand"
                aria-hidden="true"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-base font-semibold text-foreground">
                  {block.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
                  {block.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
