import { useLayoutEffect } from "react";
import { gsap } from "../lib/gsap/gsap";

export function usePageAnimations() {
  useLayoutEffect(() => {
    const context = gsap.context(() => {
      /*
       * HERO INTRO
       */
      const heroEyebrow = document.querySelector(".hero-eyebrow");
      const heroLines = document.querySelectorAll(".hero-line");

      if (heroEyebrow && heroLines.length > 0) {
        const intro = gsap.timeline({
          defaults: {
            ease: "power4.out",
          },
        });

        const navContent = document.querySelector(".nav-content");
        if (navContent) {
          intro.from(navContent, {
            y: -20,
            opacity: 0,
            duration: 0.8,
          });
        }

        intro.from(
          heroEyebrow,
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
          },
          navContent ? "-=0.35" : "<",
        );

        intro.from(
          heroLines,
          {
            yPercent: 100,
            opacity: 0,
            duration: 1.1,
            stagger: 0.12,
          },
          "-=0.35",
        );

        const heroDescription = document.querySelector(".hero-description");
        if (heroDescription) {
          intro.from(
            heroDescription,
            {
              y: 25,
              opacity: 0,
              duration: 0.8,
            },
            "-=0.5",
          );
        }

        const heroCta = document.querySelector(".hero-cta");
        if (heroCta) {
          intro.from(
            heroCta,
            {
              y: 20,
              opacity: 0,
              duration: 0.7,
            },
            "-=0.4",
          );
        }
      }

      /*
       * SECTION HEADINGS
       */
      const headings = gsap.utils.toArray<HTMLElement>(".section-heading");
      headings.forEach((heading) => {
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
      const processSteps = gsap.utils.toArray<HTMLElement>(".process-step");
      processSteps.forEach((step) => {
        const numberEl = step.querySelector(".process-number");
        const titleEl = step.querySelector(".process-title");
        const descEl = step.querySelector(".process-description");

        if (numberEl) {
          gsap.from(numberEl, {
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
        }

        if (titleEl) {
          gsap.from(titleEl, {
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
        }

        if (descEl) {
          gsap.from(descEl, {
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
        }
      });

      /*
       * PRINCIPLES
       */
      const principleRows = gsap.utils.toArray<HTMLElement>(".principle-row");
      principleRows.forEach((row) => {
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