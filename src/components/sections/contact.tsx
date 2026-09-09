import { Github, Linkedin, Mail } from "lucide-react";

import ContactForm from "../ContactForm";
import { config } from "@/data/config";

const contactLinks = [
  {
    label: "Email",
    detail: config.email,
    href: `mailto:${config.email}`,
    icon: Mail,
    external: false,
  },
  {
    label: "GitHub",
    detail: "View code and repositories",
    href: config.social.github,
    icon: Github,
    external: true,
  },
  {
    label: "LinkedIn",
    detail: "View professional profile",
    href: config.social.linkedin,
    icon: Linkedin,
    external: true,
  },
];

const ContactSection = () => {
  return (
    <section id="contact" className="relative z-10 scroll-mt-16">
      <div className="container grid gap-12 py-section lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-20">
        <div className="max-w-xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand">
            Contact
          </p>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Let&apos;s build something useful
          </h2>
          <p className="mt-5 text-base leading-7 text-muted-foreground sm:text-lg">
            If you&apos;re hiring for a software engineering role, building a
            product, or want to discuss technical work, send me a message.
          </p>

          <address className="mt-8 grid gap-3 not-italic">
            {contactLinks.map(
              ({ label, detail, href, icon: Icon, external }) => (
                <a
                  key={label}
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  className="group flex min-h-11 items-center gap-4 rounded-lg border border-border bg-card/70 px-4 py-3 transition-colors duration-200 hover:border-brand/60 hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <Icon
                    aria-hidden="true"
                    className="h-5 w-5 shrink-0 text-brand"
                  />
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold text-foreground">
                      {label}
                    </span>
                    <span className="block truncate text-sm text-muted-foreground group-hover:text-foreground">
                      {detail}
                    </span>
                  </span>
                </a>
              )
            )}
          </address>
        </div>

        <div className="rounded-2xl border border-border bg-card/80 p-5 shadow-sm backdrop-blur-sm sm:p-7 lg:p-8">
          <h3 className="font-display text-2xl font-semibold tracking-tight text-card-foreground">
            Send a message
          </h3>
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
