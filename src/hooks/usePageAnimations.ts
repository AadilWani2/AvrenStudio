import { useLayoutEffect } from "react";
import { gsap } from "../lib/gsap/gsap";

export function usePageAnimations() {
  useLayoutEffect(() => {
    const context = gsap.context(() => {
      /*
       * HERO INTRO
       */
      const intro = gsap.timeline({
        defaults: {
          ease: "power4.out",
        },
      });

      intro
        .from(".nav-content", {
          y: -20,
          opacity: 0,
          duration: 0.8,
        })
        .from(
          ".hero-eyebrow",
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
          },
          "-=0.35",
        )
        .from(
          ".hero-line",
          {
            yPercent: 100,
            opacity: 0,
            duration: 1.1,
            stagger: 0.12,
          },
          "-=0.35",
        )
        .from(
          ".hero-description",
          {
            y: 25,
            opacity: 0,
            duration: 0.8,
          },
          "-=0.5",
        )
        .from(
          ".hero-cta",
          {
            y: 20,
            opacity: 0,
            duration: 0.7,
          },
          "-=0.4",
        );

      /*
       * SECTION HEADINGS
       */
      gsap.utils.toArray<HTMLElement>(".section-heading").forEach((heading) => {
        gsap.from(heading, {
          y: 60,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: heading,
            start: "top 85%",
            once: true,
          },
        });
      });

      /*
       * PROCESS STEPS
       */
      gsap.utils.toArray<HTMLElement>(".process-step").forEach((step) => {
        gsap.from(step.querySelector(".process-number"), {
          x: -20,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: step,
            start: "top 85%",
            once: true,
          },
        });

        gsap.from(step.querySelector(".process-title"), {
          x: -35,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: step,
            start: "top 85%",
            once: true,
          },
        });

        gsap.from(step.querySelector(".process-description"), {
          y: 25,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: step,
            start: "top 85%",
            once: true,
          },
        });
      });

      gsap.utils.toArray<HTMLElement>(".principle-row").forEach((row) => {
        gsap.from(row, {
          y: 45,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: row,
            start: "top 85%",
            once: true,
          },
        });
      });
    });

    return () => context.revert();
  }, []);
}