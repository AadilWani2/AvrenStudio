import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

type CursorMode = "default" | "link" | "view" | "input" | "hidden";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  const [mode, setMode] = useState<CursorMode>("default");
  const [label, setLabel] = useState<string>("");
  const [isVisible, setIsVisible] = useState(false);
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

    const handleMouseMove = (e: MouseEvent) => {
      if (isTouchDevice.current) return;

      if (!hasEntered) {
        hasEntered = true;
        setIsVisible(true);
        gsap.to([dot, ring], { opacity: 1, duration: 0.3, ease: "power2.out" });
      }

      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);

      // Event delegation for context-aware cursor modes
      const target = e.target as HTMLElement | null;
      if (!target) return;

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
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("touchstart", handleTouchStart, { passive: true, once: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("touchstart", handleTouchStart);
    };
  }, []);

  // Animate ring and dot variations based on current mode
  useEffect(() => {
    const ring = ringRef.current;
    const dot = dotRef.current;
    const labelEl = labelRef.current;
    if (!ring || !dot || !isVisible) return;

    switch (mode) {
      case "view":
        gsap.to(ring, {
          width: 72,
          height: 72,
          backgroundColor: "#cbff4d",
          borderColor: "transparent",
          boxShadow: "0 0 35px 5px rgba(203, 255, 77, 0.45)",
          duration: 0.35,
          ease: "power3.out",
        });
        gsap.to(dot, {
          opacity: 0,
          scale: 0,
          duration: 0.2,
        });
        if (labelEl) {
          gsap.to(labelEl, {
            opacity: 1,
            scale: 1,
            duration: 0.25,
            delay: 0.05,
            ease: "back.out(1.5)",
          });
        }
        break;

      case "link":
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
          duration: 0.25,
        });
        if (labelEl) {
          gsap.to(labelEl, { opacity: 0, scale: 0.5, duration: 0.15 });
        }
        break;

      case "input":
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
          duration: 0.2,
        });
        if (labelEl) {
          gsap.to(labelEl, { opacity: 0, scale: 0.5, duration: 0.15 });
        }
        break;

      case "hidden":
        gsap.to([ring, dot], {
          opacity: 0,
          duration: 0.2,
        });
        break;

      case "default":
      default:
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
          duration: 0.25,
        });
        if (labelEl) {
          gsap.to(labelEl, { opacity: 0, scale: 0.5, duration: 0.15 });
        }
        break;
    }
  }, [mode, isVisible]);

  return (
    <>
      {/* Precision inner center dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden h-2 w-2 rounded-full bg-accent shadow-[0_0_10px_rgba(203,255,77,0.8)] md:block"
        style={{ transform: "translate3d(-50%, -50%, 0)" }}
      />

      {/* Fluid trailing ring with backdrop illumination */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9998] hidden h-9 w-9 items-center justify-center rounded-full border border-accent/40 bg-accent/[0.04] backdrop-blur-[0.5px] transition-colors md:flex"
        style={{ transform: "translate3d(-50%, -50%, 0)" }}
      >
        <span
          ref={labelRef}
          className="select-none text-[9px] font-bold tracking-[0.2em] text-[#080808] opacity-0"
        >
          {label}
        </span>
      </div>
    </>
  );
}

export default CustomCursor;
