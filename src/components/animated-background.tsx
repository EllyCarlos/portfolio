"use client";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { Application, SPEObject, SplineEvent } from "@splinetool/runtime";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "framer-motion";
const Spline = React.lazy(() => import("@splinetool/react-spline"));
import { Skill, SkillNames, SKILLS } from "@/data/constants";
import { sleep } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useTheme } from "next-themes";

gsap.registerPlugin(ScrollTrigger);

const STATES = {
  hero: {
    desktop: {
      scale: { x: 0.25, y: 0.25, z: 0.25 },
      position: { x: 400, y: -200, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
    },
    mobile: {
      scale: { x: 0.15, y: 0.15, z: 0.15 },
      position: { x: 0, y: -200, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
    },
  },
  about: {
    desktop: {
      scale: { x: 0.4, y: 0.4, z: 0.4 },
      position: { x: 0, y: -40, z: 0 },
      rotation: {
        x: 0,
        y: Math.PI / 12,
        z: 0,
      },
    },
    mobile: {
      scale: { x: 0.2, y: 0.2, z: 0.2 },
      position: { x: 0, y: -40, z: 0 },
      rotation: {
        x: 0,
        y: Math.PI / 6,
        z: 0,
      },
    },
  },
  skills: {
    desktop: {
      scale: { x: 0.4, y: 0.4, z: 0.4 },
      position: { x: 0, y: -40, z: 0 },
      rotation: {
        x: 0,
        y: Math.PI / 12,
        z: 0,
      },
    },
    mobile: {
      scale: { x: 0.2, y: 0.2, z: 0.2 },
      position: { x: 0, y: -40, z: 0 },
      rotation: {
        x: 0,
        y: Math.PI / 6,
        z: 0,
      },
    },
  },
  projects: {
    desktop: {
      scale: { x: 0.3, y: 0.3, z: 0.3 },
      position: { x: 0, y: -40, z: 0 },
      rotation: {
        x: Math.PI,
        y: Math.PI / 3,
        z: Math.PI,
      },
    },
    mobile: {
      scale: { x: 0.18, y: 0.18, z: 0.18 },
      position: { x: 0, y: 150, z: 0 },
      rotation: {
        x: Math.PI,
        y: Math.PI / 3,
        z: Math.PI,
      },
    },
  },
  contact: {
    desktop: {
      scale: { x: 0.3, y: 0.3, z: 0.3 },
      position: { x: 500, y: -250, z: 0 },
      rotation: {
        x: 0,
        y: 0,
        z: 0,
      },
    },
    mobile: {
      scale: { x: 0.18, y: 0.18, z: 0.18 },
      position: { x: 0, y: 150, z: 0 },
      rotation: {
        x: Math.PI,
        y: Math.PI / 3,
        z: Math.PI,
      },
    },
  },
};

type Section = "hero" | "about" | "skills" | "projects" | "contact";

type ControlledAnimation = {
  start: () => void;
  stop: (animate?: boolean) => void;
  dispose?: () => void;
};

const AnimatedBackground = () => {
  const { theme } = useTheme();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const prefersReducedMotion = useReducedMotion();
  const splineContainer = useRef<HTMLDivElement>(null);
  const [splineApp, setSplineApp] = useState<Application>();

  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [activeSection, setActiveSection] = useState<Section>("hero");
  const bongoAnimation = useRef<ControlledAnimation>();
  const keycapAnimations = useRef<ControlledAnimation>();
  const revealTweens = useRef<gsap.core.Tween[]>([]);

  const keyboardStates = (section: Section) => {
    return STATES[section][isMobile ? "mobile" : "desktop"];
  };

  const handleMouseHover = (e: SplineEvent) => {
    if (!splineApp) return;

    if (e.target.name === "body" || e.target.name === "platform") {
      setSelectedSkill(null);
      if (splineApp.getVariable("heading") && splineApp.getVariable("desc")) {
        splineApp.setVariable("heading", "");
        splineApp.setVariable("desc", "");
      }
    } else {
      const skill = SKILLS[e.target.name as SkillNames];
      if (!skill) return;
      setSelectedSkill((currentSkill) =>
        currentSkill?.name === skill.name ? currentSkill : skill
      );
    }
  };

  // handle keyboard press interaction
  useEffect(() => {
    if (!selectedSkill || !splineApp) return;
    splineApp.setVariable("heading", selectedSkill.label);
    splineApp.setVariable("desc", selectedSkill.shortDescription);
  }, [selectedSkill]);

  // handle keyboard heading and desc visibility
  useEffect(() => {
    if (!splineApp) return;
    const textDesktopDark = splineApp.findObjectByName("text-desktop-dark");
    const textDesktopLight = splineApp.findObjectByName("text-desktop");
    const textMobileDark = splineApp.findObjectByName("text-mobile-dark");
    const textMobileLight = splineApp.findObjectByName("text-mobile");
    if (
      !textDesktopDark ||
      !textDesktopLight ||
      !textMobileDark ||
      !textMobileLight
    )
      return;
    if (activeSection !== "skills") {
      textDesktopDark.visible = false;
      textDesktopLight.visible = false;
      textMobileDark.visible = false;
      textMobileLight.visible = false;
      return;
    }
    if (theme === "dark" && !isMobile) {
      textDesktopDark.visible = false;
      textDesktopLight.visible = true;
      textMobileDark.visible = false;
      textMobileLight.visible = false;
    } else if (theme === "dark" && isMobile) {
      textDesktopDark.visible = false;
      textDesktopLight.visible = false;
      textMobileDark.visible = false;
      textMobileLight.visible = true;
    } else if (theme === "light" && !isMobile) {
      textDesktopDark.visible = true;
      textDesktopLight.visible = false;
      textMobileDark.visible = false;
      textMobileLight.visible = false;
    } else {
      textDesktopDark.visible = false;
      textDesktopLight.visible = false;
      textMobileDark.visible = true;
      textMobileLight.visible = false;
    }
  }, [theme, splineApp, isMobile, activeSection]);

  // initialize gsap animations
  useEffect(() => {
    if (!splineApp) return;

    const cleanupSplineInteractions = handleSplineInteractions();
    const cleanupGsapAnimations = handleGsapAnimations();
    const bongo = getBongoAnimation();
    const keycaps = getKeycapsAnimation();

    bongoAnimation.current = bongo;
    keycapAnimations.current = keycaps;

    return () => {
      cleanupSplineInteractions();
      cleanupGsapAnimations();
      bongo.stop();
      keycaps.dispose?.();
      bongoAnimation.current = undefined;
      keycapAnimations.current = undefined;
    };
  }, [splineApp, isMobile]);

  useEffect(() => {
    let rotateKeyboard: gsap.core.Tween;
    let teardownKeyboard: gsap.core.Tween;
    let cancelled = false;

    (async () => {
      if (!splineApp) return;
      const kbd: SPEObject | undefined = splineApp.findObjectByName("keyboard");
      if (!kbd) return;

      if (prefersReducedMotion) {
        bongoAnimation.current?.stop(false);
        keycapAnimations.current?.stop(false);
        return;
      }

      rotateKeyboard = gsap.to(kbd.rotation, {
        y: Math.PI * 2 + kbd.rotation.y,
        duration: 10,
        repeat: -1,
        yoyo: true,
        yoyoEase: true,
        ease: "back.inOut",
        delay: 2.5,
      });
      teardownKeyboard = gsap.fromTo(
        kbd.rotation,
        {
          y: 0,
          // x: -Math.PI,
          x: -Math.PI,
          z: 0,
        },
        {
          y: -Math.PI / 2,
          duration: 5,
          repeat: -1,
          yoyo: true,
          yoyoEase: true,
          // ease: "none",
          delay: 2.5,
          immediateRender: false,
          paused: true,
        }
      );
      if (activeSection === "hero") {
        rotateKeyboard.restart();
        teardownKeyboard.pause();
      } else if (activeSection === "contact") {
        rotateKeyboard.pause();
      } else {
        rotateKeyboard.pause();
        teardownKeyboard.pause();
      }
      if (activeSection === "skills") {
      } else {
        splineApp.setVariable("heading", "");
        splineApp.setVariable("desc", "");
      }
      if (activeSection === "projects") {
        await sleep(300);
        if (cancelled) return;
        bongoAnimation.current?.start();
      } else {
        await sleep(200);
        if (cancelled) return;
        bongoAnimation.current?.stop();
      }
      if (activeSection === "contact") {
        await sleep(600);
        if (cancelled) return;
        teardownKeyboard.restart();
        keycapAnimations.current?.start();
      } else {
        await sleep(600);
        if (cancelled) return;
        teardownKeyboard.pause();
        keycapAnimations.current?.stop();
      }
    })();
    return () => {
      cancelled = true;
      if (rotateKeyboard) rotateKeyboard.kill();
      if (teardownKeyboard) teardownKeyboard.kill();
    };
  }, [activeSection, splineApp, prefersReducedMotion]);

  const keyboardRevealed = useRef(false);

  //reveal keycaps
  useEffect(() => {
    let cancelled = false;

    if (!splineApp || keyboardRevealed.current) return;
    revealKeyCaps(() => cancelled);

    return () => {
      cancelled = true;
      revealTweens.current.forEach((tween) => tween.kill());
      revealTweens.current = [];
    };
  }, [splineApp, prefersReducedMotion]);

  const revealKeyCaps = async (isCancelled: () => boolean) => {
    if (!splineApp) return;
    const kbd = splineApp.findObjectByName("keyboard");
    if (!kbd) return;

    const allObjects = splineApp.getAllObjects();
    const keycaps = allObjects.filter((obj) => obj.name === "keycap");
    const mobileKeyCaps = allObjects.filter(
      (obj) => obj.name === "keycap-mobile"
    );
    const desktopKeyCaps = allObjects.filter(
      (obj) => obj.name === "keycap-desktop"
    );

    if (prefersReducedMotion) {
      kbd.visible = true;
      gsap.set(kbd.scale, keyboardStates(activeSection).scale);
      keycaps.forEach((keycap) => {
        keycap.visible = true;
      });
      mobileKeyCaps.forEach((keycap) => {
        keycap.visible = isMobile;
      });
      desktopKeyCaps.forEach((keycap) => {
        keycap.visible = !isMobile;
      });
      keyboardRevealed.current = true;
      return;
    }

    kbd.visible = false;
    await sleep(400);
    if (isCancelled()) return;
    kbd.visible = true;
    revealTweens.current.push(
      gsap.fromTo(
        kbd.scale,
        { x: 0.01, y: 0.01, z: 0.01 },
        {
          x: keyboardStates(activeSection).scale.x,
          y: keyboardStates(activeSection).scale.y,
          z: keyboardStates(activeSection).scale.z,
          duration: 1.5,
          ease: "elastic.out(1, 0.6)",
        }
      )
    );

    await sleep(900);
    if (isCancelled()) return;
    if (isMobile) {
      mobileKeyCaps.forEach((keycap) => {
        keycap.visible = true;
      });
    } else {
      desktopKeyCaps.forEach(async (keycap, idx) => {
        await sleep(idx * 70);
        if (isCancelled()) return;
        keycap.visible = true;
      });
    }
    keycaps.forEach(async (keycap, idx) => {
      keycap.visible = false;
      await sleep(idx * 70);
      if (isCancelled()) return;
      keycap.visible = true;
      revealTweens.current.push(
        gsap.fromTo(
          keycap.position,
          { y: 200 },
          { y: 50, duration: 0.5, delay: 0.1, ease: "bounce.out" }
        )
      );
    });
    keyboardRevealed.current = true;
  };
  const handleSplineInteractions = () => {
    if (!splineApp) return () => {};

    const handleKeyUp = () => {
      if (!splineApp) return;
      splineApp.setVariable("heading", "");
      splineApp.setVariable("desc", "");
    };
    const handleKeyDown = (e: SplineEvent) => {
      if (!splineApp) return;
      const skill = SKILLS[e.target.name as SkillNames];
      if (!skill) return;
      setSelectedSkill(skill);
      splineApp.setVariable("heading", skill.label);
      splineApp.setVariable("desc", skill.shortDescription);
    };

    splineApp.addEventListener("keyUp", handleKeyUp);
    splineApp.addEventListener("keyDown", handleKeyDown);
    splineApp.addEventListener("mouseHover", handleMouseHover);

    return () => {
      splineApp.removeEventListener("keyUp", handleKeyUp);
      splineApp.removeEventListener("keyDown", handleKeyDown);
      splineApp.removeEventListener("mouseHover", handleMouseHover);
    };
  };
  const handleGsapAnimations = () => {
    if (!splineApp) return () => {};
    const kbd: SPEObject | undefined = splineApp.findObjectByName("keyboard");
    if (!kbd || !splineContainer.current) return () => {};
    const timelines: gsap.core.Timeline[] = [];

    gsap.set(kbd.scale, {
      ...keyboardStates("hero").scale,
    });
    gsap.set(kbd.position, {
      ...keyboardStates("hero").position,
    });
    timelines.push(gsap.timeline({
      scrollTrigger: {
        trigger: "#skills",
        start: "top 50%",
        end: "bottom bottom",
        scrub: true,
        // markers: true,
        onEnter: () => {
          setActiveSection("skills");
          gsap.to(kbd.scale, {
            ...keyboardStates("skills").scale,
            duration: 1,
          });
          gsap.to(kbd.position, {
            ...keyboardStates("skills").position,
            duration: 1,
          });
          gsap.to(kbd.rotation, {
            ...keyboardStates("skills").rotation,
            duration: 1,
          });
        },
        onLeaveBack: () => {
          setActiveSection("projects");
          gsap.to(kbd.scale, {
            ...keyboardStates("projects").scale,
            duration: 1,
          });
          gsap.to(kbd.position, {
            ...keyboardStates("projects").position,
            duration: 1,
          });
          gsap.to(kbd.rotation, {
            ...keyboardStates("projects").rotation,
            duration: 1,
          });
          // gsap.to(kbd.rotation, { x: 0, duration: 1 });
        },
      },
    }));
    timelines.push(gsap.timeline({
      scrollTrigger: {
        trigger: "#projects",
        start: "top 70%",
        end: "bottom bottom",
        scrub: true,
        // markers: true,
        onEnter: () => {
          setActiveSection("projects");
          gsap.to(kbd.scale, {
            ...keyboardStates("projects").scale,
            duration: 1,
          });
          gsap.to(kbd.position, {
            ...keyboardStates("projects").position,
            duration: 1,
          });
          gsap.to(kbd.rotation, {
            ...keyboardStates("projects").rotation,
            duration: 1,
          });
        },
        onLeaveBack: () => {
          setActiveSection("hero");
          gsap.to(kbd.scale, {
            ...keyboardStates("hero").scale,
            duration: 1,
          });
          gsap.to(kbd.position, {
            ...keyboardStates("hero").position,
            duration: 1,
          });
          gsap.to(kbd.rotation, {
            ...keyboardStates("hero").rotation,
            duration: 1,
          });
          // gsap.to(kbd.rotation, { x: 0, duration: 1 });
        },
      },
    }));
    timelines.push(gsap.timeline({
      scrollTrigger: {
        trigger: "#about",
        start: "top 40%",
        end: "bottom bottom",
        scrub: true,
        // markers: true,
        onEnter: () => {
          setActiveSection("about");
          gsap.to(kbd.scale, {
            ...keyboardStates("about").scale,
            duration: 1,
          });
          gsap.to(kbd.position, {
            ...keyboardStates("about").position,
            duration: 1,
          });
          gsap.to(kbd.rotation, {
            ...keyboardStates("about").rotation,
            duration: 1,
          });
        },
        onLeaveBack: () => {
          setActiveSection("skills");
          gsap.to(kbd.scale, {
            ...keyboardStates("skills").scale,
            duration: 1,
          });
          gsap.to(kbd.position, {
            ...keyboardStates("skills").position,
            duration: 1,
          });
          gsap.to(kbd.rotation, {
            ...keyboardStates("skills").rotation,
            duration: 1,
          });
          // gsap.to(kbd.rotation, { x: 0, duration: 1 });
        },
      },
    }));
    timelines.push(gsap.timeline({
      scrollTrigger: {
        trigger: "#contact",
        start: "top 30%",
        end: "bottom bottom",
        scrub: true,
        // markers: true,
        onEnter: () => {
          setActiveSection("contact");
          gsap.to(kbd.scale, {
            ...keyboardStates("contact").scale,
            duration: 1,
          });
          gsap.to(kbd.position, {
            ...keyboardStates("contact").position,
            duration: 1,
          });
          gsap.to(kbd.rotation, {
            ...keyboardStates("contact").rotation,
            duration: 1,
          });
        },
        onLeaveBack: () => {
          setActiveSection("about");
          gsap.to(kbd.scale, {
            ...keyboardStates("about").scale,
            duration: 1,
          });
          gsap.to(kbd.position, {
            ...keyboardStates("about").position,
            duration: 1,
          });
          gsap.to(kbd.rotation, {
            ...keyboardStates("about").rotation,
            duration: 1,
          });
          // gsap.to(kbd.rotation, { x: 0, duration: 1 });
        },
      },
    }));

    return () => {
      timelines.forEach((timeline) => {
        timeline.scrollTrigger?.kill();
        timeline.kill();
      });
    };
  };
  const getBongoAnimation = () => {
    const framesParent = splineApp?.findObjectByName("bongo-cat");
    const frame1 = splineApp?.findObjectByName("frame-1");
    const frame2 = splineApp?.findObjectByName("frame-2");
    if (!frame1 || !frame2 || !framesParent)
      return { start: () => {}, stop: () => {} };

    let interval: ReturnType<typeof setInterval> | undefined;
    const start = () => {
      if (interval) clearInterval(interval);
      let i = 0;
      framesParent.visible = true;
      interval = setInterval(() => {
        if (i % 2) {
          frame1.visible = false;
          frame2.visible = true;
        } else {
          frame1.visible = true;
          frame2.visible = false;
        }
        i++;
      }, 100);
    };
    const stop = () => {
      if (interval) clearInterval(interval);
      interval = undefined;
      framesParent.visible = false;
      frame1.visible = false;
      frame2.visible = false;
    };
    return { start, stop };
  };
  const getKeycapsAnimation = () => {
    if (!splineApp) return { start: () => {}, stop: () => {} };

    let tweens: gsap.core.Tween[] = [];
    let cleanupTimeout: ReturnType<typeof setTimeout> | undefined;

    const start = () => {
      removePrevTweens();
      Object.values(SKILLS)
        .sort(() => Math.random() - 0.5)
        .forEach((skill, idx) => {
          const keycap = splineApp.findObjectByName(skill.name);
          if (!keycap) return;
          const t = gsap.to(keycap?.position, {
            y: Math.random() * 200 + 200,
            duration: Math.random() * 2 + 2,
            delay: idx * 0.6,
            repeat: -1,
            yoyo: true,
            yoyoEase: "none",
            ease: "elastic.out(1,0.3)",
          });
          tweens.push(t);
        });
    };
    const stop = (animate = true) => {
      removePrevTweens();
      Object.values(SKILLS).forEach((skill) => {
        const keycap = splineApp.findObjectByName(skill.name);
        if (!keycap) return;
        if (!animate) {
          gsap.set(keycap.position, { y: 0 });
          return;
        }
        const t = gsap.to(keycap?.position, {
          y: 0,
          duration: 4,
          repeat: 1,
          ease: "elastic.out(1,0.8)",
        });
        tweens.push(t);
      });
      if (animate) cleanupTimeout = setTimeout(removePrevTweens, 1000);
    };
    const removePrevTweens = () => {
      if (cleanupTimeout) clearTimeout(cleanupTimeout);
      cleanupTimeout = undefined;
      tweens.forEach((t) => t.kill());
      tweens = [];
    };
    return { start, stop, dispose: removePrevTweens };
  };
  return (
    <Suspense fallback={null}>
      <Spline
        ref={splineContainer}
        onLoad={(app: Application) => setSplineApp(app)}
        scene="/assets/skills-keyboard.spline"
      />
    </Suspense>
  );
};

export default AnimatedBackground;
