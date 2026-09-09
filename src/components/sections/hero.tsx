"use client";

import { config } from "@/data/config";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { SiGithub, SiLinkedin } from "react-icons/si";

const HeroSection = () => {
  const shouldReduceMotion = useReducedMotion();
  const initial = shouldReduceMotion ? false : { opacity: 0, y: 16 };

  return (
    <section id="hero" className="relative isolate overflow-hidden pt-16">
      <div className="container grid items-center gap-14 py-16 sm:py-20 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-16 lg:py-28 xl:py-32">
        <motion.div
          className="relative z-10 max-w-2xl"
          initial={initial}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.35 }}
        >
          <p className="mb-6 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            <span className="h-px w-8 bg-brand" aria-hidden="true" />
            <span className="font-display text-foreground">{config.author}</span>
          </p>

          <h1 className="max-w-3xl text-[clamp(2.75rem,7vw,4.5rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-foreground">
            Full-Stack
            <span className="block text-muted-foreground">
              Software Engineer
            </span>
          </h1>

          <p className="mt-7 max-w-xl text-lg leading-8 text-muted-foreground sm:text-xl sm:leading-9">
            I build modern web products, backend APIs, and real-time
            applications with TypeScript, React, Next.js, Node.js, and NestJS.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <Link
              href="/#projects"
              className={cn(
                "inline-flex min-h-11 items-center justify-center rounded-md bg-brand px-5 py-2.5",
                "text-sm font-semibold text-neutral-950 transition-colors duration-200 hover:bg-brand/90",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              )}
            >
              View selected work
            </Link>
            <Link
              href="/#contact"
              className={cn(
                "inline-flex min-h-11 items-center justify-center rounded-md border border-border bg-background/70 px-5 py-2.5",
                "text-sm font-semibold text-foreground transition-colors duration-200 hover:bg-accent",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              )}
            >
              Contact me
            </Link>
            <div className="flex items-center gap-2 sm:ml-1">
              <Link
                href={config.social.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View Elly Carlos on GitHub"
                className={cn(
                  "inline-flex h-11 w-11 items-center justify-center rounded-md border border-border bg-background/70",
                  "text-muted-foreground transition-colors duration-200 hover:bg-accent hover:text-foreground",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                )}
              >
                <SiGithub className="h-5 w-5" aria-hidden="true" />
              </Link>
              <Link
                href={config.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View Elly Carlos on LinkedIn"
                className={cn(
                  "inline-flex h-11 w-11 items-center justify-center rounded-md border border-border bg-background/70",
                  "text-muted-foreground transition-colors duration-200 hover:bg-accent hover:text-foreground",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                )}
              >
                <SiLinkedin className="h-5 w-5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </motion.div>

        <div className="hidden min-w-0 lg:block" aria-hidden="true" />
      </div>
    </section>
  );
};

export default HeroSection;
