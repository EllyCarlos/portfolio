"use client";
import { ChevronRight, Loader2 } from "lucide-react";
import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/ace-input";
import { Textarea } from "./ui/ace-textarea";
import { cn } from "@/lib/utils";
import { useToast } from "./ui/use-toast";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const FALLBACK_ERROR_MESSAGE = "Something went wrong. Please try again.";

const ContactForm = () => {
  const [fullName, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    let errorMessage = FALLBACK_ERROR_MESSAGE;

    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          email,
          message,
        }),
      });
      const data: unknown = await res.json();

      if (typeof data !== "object" || data === null) {
        throw new Error(FALLBACK_ERROR_MESSAGE);
      }

      if (!res.ok) {
        if (
          "error" in data &&
          typeof data.error === "string" &&
          data.error.trim()
        ) {
          errorMessage = data.error;
        }
        throw new Error(errorMessage);
      }

      if (!("success" in data) || data.success !== true) {
        throw new Error(FALLBACK_ERROR_MESSAGE);
      }

      toast({
        title: "Thank you!",
        description: "I'll get back to you as soon as possible.",
        variant: "default",
        className: cn("top-0 mx-auto flex fixed md:top-4 md:right-4"),
      });
      setLoading(false);
      setFullName("");
      setEmail("");
      setMessage("");
      const timer = setTimeout(() => {
        router.push("/");
        clearTimeout(timer);
      }, 1000);
    } catch {
      toast({
        title: "Error",
        description: errorMessage,
        className: cn(
          "top-0 w-full flex justify-center fixed md:max-w-7xl md:top-4 md:right-4"
        ),
        variant: "destructive",
      });
    }
    setLoading(false);
  };
  return (
    <form className="mt-6 w-full" onSubmit={handleSubmit}>
      <div className="grid gap-5 sm:grid-cols-2">
        <LabelInputContainer>
          <Label htmlFor="fullname">Full name</Label>
          <Input
            id="fullname"
            className="h-11 bg-background text-foreground"
            placeholder="Your name"
            type="text"
            required
            minLength={2}
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </LabelInputContainer>
        <LabelInputContainer>
          <Label htmlFor="email">Email address</Label>
          <Input
            id="email"
            className="h-11 bg-background text-foreground"
            placeholder="you@example.com"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </LabelInputContainer>
      </div>
      <div className="mt-5 grid w-full gap-2">
        <Label htmlFor="content">Your message</Label>
        <Textarea
          className="min-h-36 resize-y bg-background text-foreground"
          placeholder="Tell me about the role, project, or problem you're working on."
          id="content"
          required
          minLength={10}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <p className="text-sm leading-6 text-muted-foreground">
          Your details are only used to respond to your message.
        </p>
      </div>
      <Button
        disabled={loading}
        className="mt-6 min-h-11 w-full bg-brand font-semibold text-neutral-950 transition-colors duration-200 hover:bg-brand/90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
        type="submit"
      >
        {loading ? (
          <div className="flex items-center justify-center">
            <Loader2 aria-hidden="true" className="mr-2 h-4 w-4 animate-spin" />
            <span>Sending message</span>
          </div>
        ) : (
          <div className="flex items-center justify-center">
            Send message
            <ChevronRight aria-hidden="true" className="ml-2 h-4 w-4" />
          </div>
        )}
      </Button>
    </form>
  );
};

export default ContactForm;

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col gap-2", className)}>
      {children}
    </div>
  );
};
