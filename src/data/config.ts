const config = {
  title: "Elly Carlos | Full-Stack Developer",
  description: {
    long: "Explore the portfolio of Elly, a full-stack developer and creative technologist specializing in interactive web experiences, and innovative projects. Discover my latest work. Let's build something amazing together!",
    short:
      "Discover the portfolio of Elly, a full-stack developer creating interactive web experiences and innovative projects.",
  },
  keywords: [
    "Elly",
    "portfolio",
    "full-stack developer",
    "creative technologist",
    "web development",
    "3D animations",
    "interactive websites",
    "NexusChat",
    "web design",
    "GSAP",
    "React",
    "Next.js",
    "Spline",
    "Framer Motion",
  ],
  author: "Elly Carlos",
  email: "ellycarlos97@gmail.com",
  site: "",

  get ogImg() {
    return this.site + "/assets/seo/og-image.png";
  },
  social: {
    twitter: "",
    linkedin: "",
    instagram: "",
    facebook: "",
    github: "",
  },
};
export { config };
