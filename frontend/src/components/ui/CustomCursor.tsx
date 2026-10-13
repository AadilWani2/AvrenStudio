import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { getLenis } from "../../lib/lenis/lenis";

type CursorMode = "default" | "link" | "view" | "input" | "hidden";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  const [mode, setMode] = useState<CursorMode>("default");
  const [label, setLabel] = useState<string>("");
  const [isVisible, setIsVisible] = useState(false);
  const [isLight, setIsLight] = useState(false);
  const isTouchDevice = useRef(false);

  useEffect(() => {
    // Disable on touch devices or small screens with no hover capability
    if (
      typeof window === "undefined" ||
      window.matchMedia("(hover: none) and (pointer: coarse)").matches
    ) {
      isTouchDevice.current = true;
      return;
    }

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Use gsap.quickTo for top-tier 120fps performance with zero layout reflow
    const dotX = gsap.quickTo(dot, "x", { duration: 0.08, ease: "power2.out" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.08, ease: "power2.out" });

    const ringX = gsap.quickTo(ring, "x", { duration: 0.38, ease: "power3.out" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.38, ease: "power3.out" });

    // Initial positioning offscreen
    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, opacity: 0 });

    let hasEntered = false;
    const mousePos = { x: -100, y: -100 };

    const checkTarget = (target: HTMLElement) => {
      // Adaptive theme detection: check whether the target is in a light/white background
      const lightCarrier = target.closest<HTMLElement>(
        '[data-theme="light"], .theme-light, [class*="bg-[#f3f3ef]"], [class*="bg-[#f3f2ec]"], [class*="bg-paper"], .bg-white'
      );
      const darkCarrier = target.closest<HTMLElement>(
        '[data-theme="dark"], [class*="bg-[#080808]"], [class*="bg-[#0d0d0d]"], [class*="bg-[#111]"], .project-card, nav'
      );

      let currentIsLight = false;
      if (lightCarrier && darkCarrier) {
        // Closer carrier takes precedence
        currentIsLight = lightCarrier.contains(darkCarrier) ? false : true;
      } else if (lightCarrier) {
        currentIsLight = true;
      }

      setIsLight((prev) => (prev !== currentIsLight ? currentIsLight : prev));

      // Event delegation for context-aware cursor modes
      const cursorTarget = target.closest<HTMLElement>(
        "[data-cursor], a, button, input, textarea, select, .project-card, [role='button']"
      );

      if (!cursorTarget) {
        setMode("default");
        setLabel("");
        return;
      }

      const explicitCursor = cursorTarget.getAttribute("data-cursor");
      if (explicitCursor) {
        if (explicitCursor === "view") {
          setMode("view");
          setLabel(cursorTarget.getAttribute("data-cursor-label") || "VIEW");
        } else if (explicitCursor === "hidden") {
          setMode("hidden");
        } else {
          setMode("link");
          setLabel(explicitCursor);
        }
        return;
      }

      if (cursorTarget.classList.contains("project-card")) {
        setMode("view");
        setLabel("VIEW");
        return;
      }

      const tagName = cursorTarget.tagName.toLowerCase();
      if (tagName === "input" || tagName === "textarea" || tagName === "select") {
        setMode("input");
        setLabel("");
        return;
      }

      if (tagName === "a" || tagName === "button" || cursorTarget.getAttribute("role") === "button") {
        setMode("link");
        setLabel("");
        return;
      }

      setMode("default");
      setLabel("");
    };

    const updateTargetUnderPointer = () => {
      if (!hasEntered || isTouchDevice.current) return;
      if (mousePos.x < 0 || mousePos.y < 0) return;

      const element = document.elementFromPoint(mousePos.x, mousePos.y) as HTMLElement | null;
      if (element) {
        checkTarget(element);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isTouchDevice.current) return;

      mousePos.x = e.clientX;
      mousePos.y = e.clientY;

      if (!hasEntered) {
        hasEntered = true;
        setIsVisible(true);
        gsap.to([dot, ring], { opacity: 1, duration: 0.3, ease: "power2.out" });
      }

      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);

      const target = e.target as HTMLElement | null;
      if (target) {
        checkTarget(target);
      }
    };

    // Keep checking theme seamlessly while scrolling (e.g. from dark into white section)
    let isScrolling = false;
    let scrollStopTimer: number | undefined;

    const onScrollTick = () => {
      updateTargetUnderPointer();
    };

    const handleScroll = () => {
      updateTargetUnderPointer();
      if (!isScrolling) {
        isScrolling = true;
        gsap.ticker.add(onScrollTick);
      }
      if (scrollStopTimer !== undefined) {
        window.clearTimeout(scrollStopTimer);
      }
      scrollStopTimer = window.setTimeout(() => {
        isScrolling = false;
        gsap.ticker.remove(onScrollTick);
        updateTargetUnderPointer();
      }, 150);
    };

    // Subscribe to Lenis smooth scroll updates if available
    let cleanupLenis: (() => void) | undefined;
    const attachLenis = () => {
      const lenis = getLenis();
      if (lenis) {
        lenis.on("scroll", handleScroll);
        cleanupLenis = () => lenis.off("scroll", handleScroll);
      }
    };

    attachLenis();
    // In case Lenis initialized slightly after this effect
    const lenisPollTimer = window.setTimeout(attachLenis, 300);

    const handleMouseDown = () => {
      if (isTouchDevice.current) return;
      gsap.to(ring, {
        scale: 0.8,
        duration: 0.15,
        ease: "power2.out",
      });
      gsap.to(dot, {
        scale: 0.5,
        duration: 0.15,
        ease: "power2.out",
      });
    };

    const handleMouseUp = () => {
      if (isTouchDevice.current) return;
      gsap.to(ring, {
        scale: 1,
        duration: 0.25,
        ease: "back.out(2)",
      });
      gsap.to(dot, {
        scale: 1,
        duration: 0.2,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      hasEntered = false;
      setIsVisible(false);
      mousePos.x = -100;
      mousePos.y = -100;
      gsap.to([dot, ring], { opacity: 0, duration: 0.25, ease: "power2.out" });
    };

    const handleTouchStart = () => {
      isTouchDevice.current = true;
      setIsVisible(false);
      if (dot && ring) {
        dot.style.display = "none";
        ring.style.display = "none";
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("touchstart", handleTouchStart, { passive: true, once: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("touchstart", handleTouchStart);
      window.clearTimeout(lenisPollTimer);
      if (scrollStopTimer !== undefined) {
        window.clearTimeout(scrollStopTimer);
      }
      gsap.ticker.remove(onScrollTick);
      cleanupLenis?.();
    };
  }, []);

  // Animate ring and dot variations based on current mode and light/dark theme
  useEffect(() => {
    const ring = ringRef.current;
    const dot = dotRef.current;
    const labelEl = labelRef.current;
    if (!ring || !dot || !isVisible) return;

    if (mode === "view") {
      const bgColor = isLight ? "#080808" : "#cbff4d";
      const textColor = isLight ? "#ffffff" : "#080808";
      const shadowColor = isLight
        ? "0 0 35px 5px rgba(0, 0, 0, 0.35)"
        : "0 0 35px 5px rgba(203, 255, 77, 0.45)";

      gsap.to(ring, {
        width: 72,
        height: 72,
        backgroundColor: bgColor,
        borderColor: "transparent",
        boxShadow: shadowColor,
        duration: 0.35,
        ease: "power3.out",
      });
      gsap.to(dot, {
        opacity: 0,
        scale: 0,
        duration: 0.2,
      });
      if (labelEl) {
        labelEl.style.color = textColor;
        gsap.to(labelEl, {
          opacity: 1,
          scale: 1,
          duration: 0.25,
          delay: 0.05,
          ease: "back.out(1.5)",
        });
      }
      return;
    }

    if (mode === "hidden") {
      gsap.to([ring, dot], {
        opacity: 0,
        duration: 0.2,
      });
      return;
    }

    if (mode === "link") {
      if (isLight) {
        gsap.to(ring, {
          width: 50,
          height: 50,
          backgroundColor: "rgba(0, 0, 0, 0.1)",
          borderColor: "rgba(0, 0, 0, 0.8)",
          boxShadow: "0 0 25px rgba(0, 0, 0, 0.15)",
          duration: 0.3,
          ease: "power3.out",
        });
        gsap.to(dot, {
          opacity: 1,
          scale: 1.5,
          backgroundColor: "#080808",
          boxShadow: "0 0 8px rgba(0, 0, 0, 0.3)",
          duration: 0.25,
        });
      } else {
        gsap.to(ring, {
          width: 48,
          height: 48,
          backgroundColor: "rgba(203, 255, 77, 0.12)",
          borderColor: "rgba(203, 255, 77, 0.75)",
          boxShadow: "0 0 25px 2px rgba(203, 255, 77, 0.25)",
          duration: 0.3,
          ease: "power3.out",
        });
        gsap.to(dot, {
          opacity: 1,
          scale: 1.5,
          backgroundColor: "#cbff4d",
          boxShadow: "0 0 10px rgba(203, 255, 77, 0.8)",
          duration: 0.25,
        });
      }
      if (labelEl) {
        gsap.to(labelEl, { opacity: 0, scale: 0.5, duration: 0.15 });
      }
      return;
    }

    if (mode === "input") {
      if (isLight) {
        gsap.to(ring, {
          width: 24,
          height: 24,
          backgroundColor: "transparent",
          borderColor: "rgba(0, 0, 0, 0.4)",
          boxShadow: "none",
          duration: 0.25,
        });
        gsap.to(dot, {
          opacity: 0.8,
          scale: 0.6,
          backgroundColor: "#080808",
          boxShadow: "none",
          duration: 0.2,
        });
      } else {
        gsap.to(ring, {
          width: 24,
          height: 24,
          backgroundColor: "transparent",
          borderColor: "rgba(255, 255, 255, 0.4)",
          boxShadow: "none",
          duration: 0.25,
        });
        gsap.to(dot, {
          opacity: 0.8,
          scale: 0.6,
          backgroundColor: "#ffffff",
          boxShadow: "none",
          duration: 0.2,
        });
      }
      if (labelEl) {
        gsap.to(labelEl, { opacity: 0, scale: 0.5, duration: 0.15 });
      }
      return;
    }

    // Default mode
    if (isLight) {
      gsap.to(ring, {
        width: 36,
        height: 36,
        backgroundColor: "rgba(0, 0, 0, 0.04)",
        borderColor: "rgba(0, 0, 0, 0.35)",
        boxShadow: "0 0 15px rgba(0, 0, 0, 0.04)",
        duration: 0.35,
        ease: "power3.out",
      });
      gsap.to(dot, {
        opacity: 1,
        scale: 1,
        backgroundColor: "#080808",
        boxShadow: "0 0 8px rgba(0, 0, 0, 0.25)",
        duration: 0.25,
      });
    } else {
      gsap.to(ring, {
        width: 36,
        height: 36,
        backgroundColor: "rgba(203, 255, 77, 0.04)",
        borderColor: "rgba(203, 255, 77, 0.35)",
        boxShadow: "0 0 15px rgba(203, 255, 77, 0.08)",
        duration: 0.35,
        ease: "power3.out",
      });
      gsap.to(dot, {
        opacity: 1,
        scale: 1,
        backgroundColor: "#cbff4d",
        boxShadow: "0 0 10px rgba(203, 255, 77, 0.8)",
        duration: 0.25,
      });
    }
    if (labelEl) {
      gsap.to(labelEl, { opacity: 0, scale: 0.5, duration: 0.15 });
    }
  }, [mode, isVisible, isLight]);

  return (
    <>
      {/* Precision inner center dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden h-2 w-2 rounded-full md:block"
        style={{ transform: "translate3d(-50%, -50%, 0)" }}
      />

      {/* Fluid trailing ring with backdrop illumination */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9998] hidden h-9 w-9 items-center justify-center rounded-full border backdrop-blur-[0.5px] transition-colors md:flex"
        style={{ transform: "translate3d(-50%, -50%, 0)" }}
      >
        <span
          ref={labelRef}
          className="select-none text-[9px] font-bold tracking-[0.2em] opacity-0"
        >
          {label}
        </span>
      </div>
    </>
  );
}

export default CustomCursor;
