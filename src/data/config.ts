const config = {
  title: "Elly Carlos | Full-Stack Software Engineer",
  description: {
    long: "Portfolio of Elly Carlos, a full-stack software engineer building modern web applications, real-time products, and backend APIs with TypeScript, React, Next.js, and Node.js.",
    short:
      "Full-stack software engineer building modern web applications and backend APIs with TypeScript, React, Next.js, and Node.js.",
  },
  keywords: [
    "Elly Carlos",
    "portfolio",
    "full-stack software engineer",
    "TypeScript",
    "JavaScript",
    "web development",
    "React",
    "Next.js",
    "Node.js",
    "NestJS",
    "PostgreSQL",
    "REST APIs",
    "real-time applications",
    "NexusChat",
  ],
  author: "Elly Carlos",
  email: "ellycarlos97@gmail.com",
  site: "https://ellycarlos.vercel.app",

  get ogImg() {
    return this.site + "/assets/seo/og-image.png";
  },
  social: {
    twitter: "https://x.com/elly_carlos254",
    linkedin: "https://www.linkedin.com/in/elly-carlos",
    instagram: "https://www.instagram.com/elly_carlos",
    facebook: "",
    github: "https://github.com/EllyCarlos",
  },
};
export { config };
