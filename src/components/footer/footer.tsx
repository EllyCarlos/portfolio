import Link from "next/link";

import { footer } from "./config";
import { config } from "@/data/config";

const socialLinks = [
  { title: "GitHub", href: config.social.github },
  { title: "LinkedIn", href: config.social.linkedin },
];

const footerLinkClasses =
  "inline-flex min-h-11 items-center text-sm text-muted-foreground underline-offset-4 transition-colors duration-200 hover:text-foreground hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-border bg-background">
      <div className="container grid gap-6 py-8 md:grid-cols-[1fr_auto] md:items-center lg:grid-cols-[1fr_auto_auto] lg:gap-10">
        <div>
          <p className="text-sm text-foreground">
            © {year} {config.author}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Full-Stack Software Engineer
          </p>
        </div>

        <nav aria-label="Footer navigation">
          <ul className="flex flex-wrap gap-x-5">
            {footer.map(({ title, href }) => (
              <li key={title}>
                <Link className={footerLinkClasses} href={href}>
                  {title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Social links" className="md:col-span-2 lg:col-span-1">
          <ul className="flex flex-wrap gap-x-5">
            {socialLinks.map(({ title, href }) => (
              <li key={title}>
                <a
                  className={footerLinkClasses}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
