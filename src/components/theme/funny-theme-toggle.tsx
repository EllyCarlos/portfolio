"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function FunnyThemeToggle({
  className,
}: {
  className?: string;
}) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  const isDark = mounted ? resolvedTheme === "dark" : true;
  const nextTheme = isDark ? "light" : "dark";

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className={cn("relative", className)}
      onClick={() => setTheme(nextTheme)}
      aria-label={`Switch to ${nextTheme} theme`}
      disabled={!mounted}
    >
      {isDark ? (
        <Sun className="h-5 w-5" aria-hidden="true" />
      ) : (
        <Moon className="h-5 w-5" aria-hidden="true" />
      )}
    </Button>
  );
}
