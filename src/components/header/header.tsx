"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import FunnyThemeToggle from "../theme/funny-theme-toggle";
import { Button } from "../ui/button";
import { config } from "@/data/config";
import { links } from "./config";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isActive, setIsActive] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileNavRef = useRef<HTMLElement>(null);
  const shouldRestoreFocusRef = useRef(false);
  const contactLink = links.find((link) => link.title === "Contact");
  const primaryLinks = links.filter((link) => link.title !== "Contact");

  useEffect(() => {
    if (!isActive) return;

    const previousOverflow = document.body.style.overflow;
    const nav = mobileNavRef.current;
    const menuButton = menuButtonRef.current;
    const focusableElements = nav?.querySelectorAll<HTMLElement>("a, button");
    const firstFocusable = focusableElements?.[0];
    const lastFocusable = focusableElements?.[focusableElements.length - 1];

    document.body.style.overflow = "hidden";
    firstFocusable?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        shouldRestoreFocusRef.current = true;
        setIsActive(false);
        return;
      }

      if (
        event.key !== "Tab" ||
        !firstFocusable ||
        !lastFocusable ||
        !menuButton
      ) {
        return;
      }

      if (event.shiftKey && document.activeElement === firstFocusable) {
        event.preventDefault();
        menuButton.focus();
      } else if (event.shiftKey && document.activeElement === menuButton) {
        event.preventDefault();
        lastFocusable.focus();
      } else if (!event.shiftKey && document.activeElement === lastFocusable) {
        event.preventDefault();
        menuButton.focus();
      } else if (!event.shiftKey && document.activeElement === menuButton) {
        event.preventDefault();
        firstFocusable.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      if (
        shouldRestoreFocusRef.current &&
        menuButtonRef.current?.offsetParent !== null
      ) {
        menuButtonRef.current?.focus();
      }
      shouldRestoreFocusRef.current = false;
    };
  }, [isActive]);

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 768px)");
    const closeOnDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) {
        shouldRestoreFocusRef.current = false;
        setIsActive(false);
      }
    };

    desktopQuery.addEventListener("change", closeOnDesktop);
    return () => desktopQuery.removeEventListener("change", closeOnDesktop);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b border-border/70",
        "bg-background/90 backdrop-blur-md"
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <Link
          href="/"
          className="rounded-sm font-display text-sm tracking-wide focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:text-base"
        >
          {config.author}
        </Link>

        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-1 md:flex"
        >
          {primaryLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors duration-200 hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {link.title}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <FunnyThemeToggle />
          {contactLink && (
            <Link
              href={contactLink.href}
              className="hidden h-9 items-center justify-center rounded-md bg-brand px-4 text-sm font-medium text-neutral-950 transition-colors duration-200 hover:bg-brand/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background md:inline-flex"
            >
              {contactLink.title}
            </Link>
          )}
          <Button
            ref={menuButtonRef}
            type="button"
            variant="ghost"
            size="icon"
            aria-expanded={isActive}
            aria-controls="mobile-navigation"
            aria-label={isActive ? "Close navigation" : "Open navigation"}
            onClick={() => {
              shouldRestoreFocusRef.current = isActive;
              setIsActive((open) => !open);
            }}
            className="md:hidden"
          >
            {isActive ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {isActive && (
          <motion.nav
            ref={mobileNavRef}
            id="mobile-navigation"
            aria-label="Mobile navigation"
            className="fixed inset-x-0 bottom-0 top-16 border-t border-border bg-background px-5 py-6 md:hidden"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <div className="mx-auto flex max-w-md flex-col gap-2">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => {
                    shouldRestoreFocusRef.current = false;
                    setIsActive(false);
                  }}
                  className={cn(
                    "rounded-lg border border-transparent px-4 py-3 text-lg font-medium",
                    "transition-colors duration-200 hover:border-border hover:bg-card",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                    link.title === "Contact" &&
                      "mt-2 border-brand/40 bg-brand text-neutral-950 hover:border-brand hover:bg-brand/90"
                  )}
                >
                  {link.title}
                </Link>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
