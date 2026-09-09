import AceTernityLogo from "@/components/logos/aceternity";
import SlideShow from "@/components/slide-show";
import { buttonVariants } from "@/components/ui/button";
import { TypographyH3, TypographyP } from "@/components/ui/typography";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";
import { RiNextjsFill, RiNodejsFill, RiReactjsFill } from "react-icons/ri";
import {
  SiExpress,
  SiFirebase,
  SiJavascript,
  SiMongodb,
  SiPostgresql,
  SiPrisma,
  SiReactquery,
  SiShadcnui,
  SiSocketdotio,
  SiTailwindcss,
  SiThreedotjs,
  SiTypescript,
  SiVuedotjs,
} from "react-icons/si";
import { TbBrandFramerMotion } from "react-icons/tb";

const BASE_PATH = "/assets/projects-screenshots";

const ProjectsLinks = ({ live, repo }: { live?: string; repo?: string }) => {
  if (!live && !repo) return null;

  return (
    <div className="flex flex-col md:flex-row items-center justify-start gap-3 my-3 mb-8">
      {live && (
        <Link
          className={buttonVariants({
            variant: "default",
            size: "sm",
            className: "font-mono gap-2",
          })}
          rel="noopener noreferrer"
          target="_blank"
          href={live}
        >
          Visit Website
          <ArrowUpRight className="w-5 h-5" />
        </Link>
      )}
      {repo && (
        <Link
          className={buttonVariants({
            variant: "default",
            size: "sm",
            className: "font-mono gap-2",
          })}
          rel="noopener noreferrer"
          target="_blank"
          href={repo}
        >
          GitHub
          <ArrowUpRight className="w-5 h-5" />
        </Link>
      )}
    </div>
  );
};

export type Skill = {
  title: string;
  bg: string;
  fg: string;
  icon: ReactNode;
};

const PROJECT_SKILLS = {
  next: {
    title: "Next.js",
    bg: "black",
    fg: "white",
    icon: <RiNextjsFill />,
  },
  node: {
    title: "Node.js",
    bg: "black",
    fg: "white",
    icon: <RiNodejsFill />,
  },
  prisma: {
    title: "Prisma",
    bg: "black",
    fg: "white",
    icon: <SiPrisma />,
  },
  postgres: {
    title: "PostgreSQL",
    bg: "black",
    fg: "white",
    icon: <SiPostgresql />,
  },
  mongo: {
    title: "MongoDB",
    bg: "black",
    fg: "white",
    icon: <SiMongodb />,
  },
  express: {
    title: "Express",
    bg: "black",
    fg: "white",
    icon: <SiExpress />,
  },
  reactQuery: {
    title: "React Query",
    bg: "black",
    fg: "white",
    icon: <SiReactquery />,
  },
  shadcn: {
    title: "shadcn/ui",
    bg: "black",
    fg: "white",
    icon: <SiShadcnui />,
  },
  aceternity: {
    title: "Aceternity UI",
    bg: "black",
    fg: "white",
    icon: <AceTernityLogo />,
  },
  tailwind: {
    title: "Tailwind CSS",
    bg: "black",
    fg: "white",
    icon: <SiTailwindcss />,
  },
  firebase: {
    title: "Firebase",
    bg: "black",
    fg: "white",
    icon: <SiFirebase />,
  },
  socketio: {
    title: "Socket.IO",
    bg: "black",
    fg: "white",
    icon: <SiSocketdotio />,
  },
  js: {
    title: "JavaScript",
    bg: "black",
    fg: "white",
    icon: <SiJavascript />,
  },
  ts: {
    title: "TypeScript",
    bg: "black",
    fg: "white",
    icon: <SiTypescript />,
  },
  vue: {
    title: "Vue.js",
    bg: "black",
    fg: "white",
    icon: <SiVuedotjs />,
  },
  react: {
    title: "React",
    bg: "black",
    fg: "white",
    icon: <RiReactjsFill />,
  },
  spline: {
    title: "Spline",
    bg: "black",
    fg: "white",
    icon: <SiThreedotjs />,
  },
  framerMotion: {
    title: "Framer Motion",
    bg: "black",
    fg: "white",
    icon: <TbBrandFramerMotion />,
  },
};

export type Project = {
  id: string;
  category: string;
  title: string;
  src: string;
  summary: string;
  screenshots: string[];
  skills: { frontend: Skill[]; backend: Skill[] };
  content: ReactNode;
  github?: string;
  live?: string;
};

const projects: Project[] = [
  {
    id: "NexusChat",
    category: "Real-Time Messaging",
    title: "NexusChat",
    src: "/assets/projects-screenshots/nexuschat/1.png",
    summary:
      "A full-stack, real-time messaging application supporting private and group conversations, media sharing, voice notes, calls, polls, and push notifications.",
    screenshots: ["1.png"],
    live: "https://nexuswebapp.vercel.app",
    github: "https://github.com/EllyCarlos/NexusChat",
    skills: {
      frontend: [
        PROJECT_SKILLS.ts,
        PROJECT_SKILLS.next,
        PROJECT_SKILLS.tailwind,
        PROJECT_SKILLS.framerMotion,
        PROJECT_SKILLS.firebase,
      ],
      backend: [
        PROJECT_SKILLS.node,
        PROJECT_SKILLS.express,
        PROJECT_SKILLS.socketio,
        PROJECT_SKILLS.postgres,
        PROJECT_SKILLS.prisma,
      ],
    },
    get content() {
      return (
        <div>
          <TypographyP className="font-mono ">
            NexusChat is a full-stack, real-time messaging application supporting
            private and group conversations, media sharing, voice notes, calls,
            polls, and push notifications. It combines a Next.js and TypeScript
            frontend with a Node.js, Express, and Socket.IO backend backed by
            PostgreSQL and Prisma, with authentication, account recovery, and
            authorization controls.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />
          <SlideShow images={[`${BASE_PATH}/nexuschat/1.png`]} />
        </div>
      );
    },
  },
  {
    id: "MERN Shop",
    category: "E-Commerce",
    title: "MERN Shop",
    src: "/assets/projects-screenshots/mernshop/1.png",
    summary:
      "A full-stack e-commerce application with customer shopping flows and an administration interface.",
    screenshots: ["1.png"],
    skills: {
      frontend: [
        PROJECT_SKILLS.react,
        PROJECT_SKILLS.reactQuery,
        PROJECT_SKILLS.js,
      ],
      backend: [
        PROJECT_SKILLS.node,
        PROJECT_SKILLS.express,
        PROJECT_SKILLS.mongo,
        PROJECT_SKILLS.socketio,
      ],
    },
    live: "https://ecommerce-using-mern-nu.vercel.app/",
    github: "https://github.com/EllyCarlos/Ecommerce_using_MERN-",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono ">
            A full-stack e-commerce application built with MongoDB, Express,
            React, and Node.js. It includes customer shopping flows and an
            administration interface, with Redux Toolkit managing client state
            and Material UI providing the responsive interface.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />
        </div>
      );
    },
  },
  {
    id: "Todo List",
    category: "Tool",
    title: "Todo List",
    src: "/assets/projects-screenshots/todolist/1.png",
    summary:
      "A focused task-management application for creating, organizing, and completing everyday tasks.",
    screenshots: ["1.png"],
    live: "https://elly-to-do-list.netlify.app/",
    skills: {
      frontend: [PROJECT_SKILLS.js, PROJECT_SKILLS.vue],
      backend: [],
    },
    get content() {
      return (
        <div>
          <TypographyP className="font-mono ">
            A focused task-management application built with Vue.js and
            JavaScript for creating, organizing, and completing everyday tasks.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />
        </div>
      );
    },
  },
  {
    id: "Weather App",
    category: "Weather",
    title: "Weather App",
    src: "/assets/projects-screenshots/WeatherApp/1.png",
    summary:
      "An interactive application for checking current weather conditions in a clear, responsive interface.",
    screenshots: ["1.png"],
    live: "https://weathervanillajsapp.netlify.app/",
    skills: {
      frontend: [PROJECT_SKILLS.js],
      backend: [],
    },
    get content() {
      return (
        <div>
          <TypographyP className="font-mono ">
            An interactive Vanilla JavaScript application for checking current
            weather conditions. It fetches weather data and presents it in a
            clear, responsive interface.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />
          <SlideShow images={[`${BASE_PATH}/WeatherApp/1.png`]} />
        </div>
      );
    },
  },
  {
    id: "portfolio",
    category: "Portfolio",
    title: "My Portfolio",
    src: "/assets/projects-screenshots/portfolio/landing.png",
    summary:
      "A personal portfolio combining full-stack project work with an interactive, space-themed interface.",
    screenshots: ["landing.png", "skills.png", "navbar.png"],
    skills: {
      frontend: [
        PROJECT_SKILLS.ts,
        PROJECT_SKILLS.next,
        PROJECT_SKILLS.shadcn,
        PROJECT_SKILLS.aceternity,
        PROJECT_SKILLS.framerMotion,
        PROJECT_SKILLS.tailwind,
        PROJECT_SKILLS.spline,
      ],
      backend: [],
    },
    get content() {
      return (
        <div>
          <TypographyP className="font-mono ">
            A personal portfolio combining full-stack project work with an
            interactive, space-themed interface.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />
          <TypographyH3 className="my-4 mt-8">
            Interactive 3D Skills
          </TypographyH3>
          <p className="font-mono mb-2">
            The interactive 3D keyboard is rendered directly in the browser.
            Each key reveals information about a technology in the skills
            section.
          </p>
          <SlideShow
            images={[
              `${BASE_PATH}/portfolio/landing.png`,
              `${BASE_PATH}/portfolio/skills.png`,
            ]}
          />
          <TypographyH3 className="my-4">Space Theme</TypographyH3>
          <p className="font-mono mb-2">
            A dark, space-inspired background and subtle particles give the site
            its visual identity.
          </p>
          <SlideShow images={[`${BASE_PATH}/portfolio/navbar.png`]} />
        </div>
      );
    },
  },
];

export default projects;
