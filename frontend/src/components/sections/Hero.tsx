import { ArrowUpRight } from "../ui/Icons";

function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden px-6 md:px-10">
      {/* Background grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Gradient atmosphere */}
      <div
        aria-hidden="true"
        className="mesh-glow animate-drift right-[-10%] top-[-10%] h-[550px] w-[550px] bg-accent/20"
      />
      <div
        aria-hidden="true"
        className="mesh-glow animate-drift-slow bottom-[-15%] left-[-10%] h-[500px] w-[500px] bg-violet/25"
      />

      {/* Decorative circle */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-15%] top-[15%] h-[500px] w-[500px] rounded-full border border-white/[0.08] md:h-[700px] md:w-[700px]"
      />

      {/* Main content */}
      <div className="relative mx-auto w-full max-w-[1400px] pt-24">
        <div className="hero-eyebrow mb-8 flex items-center gap-3 overflow-hidden">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent shadow-[0_0_12px_2px_rgba(203,255,77,0.6)]" />
          <span className="block text-xs font-medium uppercase tracking-[0.3em] text-white/45">
            Independent Digital Studio
          </span>
        </div>

        <div className="overflow-hidden">
          <h1 className="text-[clamp(3.5rem,9vw,9rem)] font-medium leading-[0.85] tracking-[-0.065em]">
            <span className="hero-line block">WE BUILD</span>

            <span className="hero-line text-gradient block">
              DIGITAL
            </span>

            <span className="hero-line block">EXPERIENCES.</span>
          </h1>
        </div>

        <div className="mt-12 flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div className="hero-description max-w-md">
            <p className="text-base leading-relaxed text-white/55 md:text-lg">
              Websites, web applications and digital products designed
              and engineered for modern businesses.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {["React", "Node.js", "Design Systems"].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[10px] uppercase tracking-[0.12em] text-white/40"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <a
            href="#contact"
            className="hero-cta group flex w-fit items-center gap-4 rounded-full bg-accent px-7 py-4 text-sm font-medium uppercase tracking-[0.15em] text-[#080808] transition-all duration-500 hover:shadow-[0_0_40px_-5px_rgba(203,255,77,0.55)] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#080808]"
          >
            <span>Start a Project</span>

            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#080808] text-accent transition-transform duration-500 group-hover:rotate-45">
              <ArrowUpRight size={15} />
            </span>
          </a>
        </div>
      </div>

      {/* Bottom project indicator */}
      <div className="pointer-events-none absolute bottom-8 left-6 md:left-10">
        <span className="text-[10px] uppercase tracking-[0.25em] text-white/25">
          N / 01
        </span>
      </div>

      {/* Scroll indicator */}
      <div className="pointer-events-none absolute bottom-7 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3">
        <span className="text-[10px] uppercase tracking-[0.28em] text-white/35">
          Scroll to explore
        </span>

        <span className="relative h-8 w-px overflow-hidden bg-white/10">
          <span className="absolute left-0 top-0 h-1/2 w-full animate-pulse bg-accent" />
        </span>
      </div>
    </section>
  );
}

export default Hero;
