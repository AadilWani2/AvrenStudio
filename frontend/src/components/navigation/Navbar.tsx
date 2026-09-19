import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Logo from "../ui/Logo";
import ScrollLink from "../ui/ScrollLink";

const navigation = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "About", href: "#about" },
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (!menuRef.current) return;

    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (menuOpen) {
      document.body.style.overflow = "hidden";

      gsap.to(menuRef.current, {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 0.8,
        ease: "power4.inOut",
      });

      const links = menuRef.current.querySelectorAll("nav a");

      if (links.length > 0) {
        gsap.fromTo(
          links,
          {
            y: 50,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.08,
            delay: 0.2,
            ease: "power3.out",
          },
        );
      }
    } else {
      document.body.style.overflow = "";

      gsap.to(menuRef.current, {
        clipPath: "inset(0% 0% 100% 0%)",
        duration: 0.7,
        ease: "power4.inOut",
      });
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <>
      <header className="fixed left-0 top-0 z-[100] w-full">
        <nav className="nav-content mx-auto flex max-w-[1400px] items-center justify-between border-b border-white/[0.06] bg-[#080808]/70 px-6 py-5 backdrop-blur-xl md:px-10">
          <Logo />

          {/* Desktop navigation */}
          <div className="hidden items-center gap-9 text-sm text-white/55 md:flex">
            {navigation.map((item) => (
              <ScrollLink
                key={item.label}
                href={item.href}
                onClick={closeMenu}
                className="group relative py-1 transition-colors duration-300 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#080808]"
              >
                {item.label}
                <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
              </ScrollLink>
            ))}
          </div>

          {/* Desktop CTA */}
          <ScrollLink
            href="#contact"
            onClick={closeMenu}
            className="hidden items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-[#080808] transition-all duration-300 hover:shadow-[0_0_30px_-5px_rgba(203,255,77,0.6)] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#080808] md:inline-flex"
          >
            Start a Project
          </ScrollLink>

          {/* Mobile menu button */}
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
            className="relative z-[110] flex h-11 w-11 items-center justify-center rounded-full border border-white/15 transition-colors duration-300 hover:border-accent/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#080808] md:hidden"
          >
            <span className="relative block h-4 w-5">
              <span
                className={`absolute left-0 top-1/2 h-px w-full bg-white transition-transform duration-300 ${
                  menuOpen ? "rotate-45" : "-translate-y-1"
                }`}
              />

              <span
                className={`absolute left-0 top-1/2 h-px w-full bg-white transition-transform duration-300 ${
                  menuOpen ? "-rotate-45" : "translate-y-1"
                }`}
              />
            </span>
          </button>
        </nav>
      </header>

      {/* Mobile menu */}
      <div
        id="mobile-navigation"
        ref={menuRef}
        className="fixed inset-0 z-[90] flex flex-col bg-[#080808] px-6 pb-8 pt-32 md:hidden"
        style={{
          clipPath: "inset(0% 0% 100% 0%)",
        }}
      >
        <div className="flex flex-1 flex-col justify-between">
          <nav className="flex flex-col">
            {navigation.map((item) => (
              <ScrollLink
                key={item.label}
                href={item.href}
                onClick={closeMenu}
                className="border-b border-white/10 py-5 text-5xl font-medium tracking-[-0.05em] text-white/80 transition-colors hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#080808]"
              >
                {item.label}
              </ScrollLink>
            ))}
          </nav>

          <div className="border-t border-white/10 pt-6">
            <ScrollLink
              href="#contact"
              onClick={closeMenu}
              className="flex items-center justify-between text-sm uppercase tracking-[0.18em] text-white/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#080808]"
            >
              Start a Project

              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-[#080808]">
                ↗
              </span>
            </ScrollLink>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between text-[10px] uppercase tracking-[0.25em] text-white/20">
          <span>AVRENSTUDIO</span>
          <span>Independent Digital Studio</span>
        </div>
      </div>
    </>
  );
}

export default Navbar;