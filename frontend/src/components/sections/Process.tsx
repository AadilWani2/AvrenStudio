const processSteps = [
  {
    number: "01",
    title: "Discover",
    description:
      "We start by understanding your business, goals, audience and the problem the product needs to solve.",
    color: "bg-accent",
  },
  {
    number: "02",
    title: "Design",
    description:
      "We turn the requirements into a clear interface, structure and user experience before development begins.",
    color: "bg-violet",
  },
  {
    number: "03",
    title: "Build",
    description:
      "The approved design becomes a real, responsive product using a modern and maintainable technology stack.",
    color: "bg-coral",
  },
  {
    number: "04",
    title: "Launch",
    description:
      "We prepare the application for production, handle deployment and make sure everything is ready to go live.",
    color: "bg-accent",
  },
];

function Process() {
  return (
    <section
      id="process"
      className="relative overflow-hidden bg-[#080808] px-6 py-32 text-white md:px-10 md:py-48"
    >
      <div
        aria-hidden="true"
        className="mesh-glow absolute right-[5%] top-[10%] h-[400px] w-[400px] bg-violet/10"
      />

      <div className="relative mx-auto max-w-[1400px]">
        {/* Header */}
        <div className="grid gap-10 md:grid-cols-[1fr_0.8fr]">
          <div>
            <p className="mb-6 flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-white/35">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              How We Work
            </p>

            <h2 className="max-w-4xl text-5xl font-medium leading-[0.9] tracking-[-0.055em] md:text-7xl lg:text-8xl">
              FROM IDEA
              <br />
              TO LAUNCH.
            </h2>
          </div>

          <div className="flex items-end">
            <p className="max-w-md text-base leading-relaxed text-white/50 md:text-lg">
              A straightforward process designed to keep projects
              focused, transparent and moving forward.
            </p>
          </div>
        </div>

        {/* Process */}
        <div className="mt-24 border-t border-white/10 md:mt-36">
          {processSteps.map((step) => (
            <article
              key={step.number}
              className="process-step group grid gap-6 border-b border-white/10 py-10 md:grid-cols-[100px_0.8fr_1fr] md:items-center md:py-14"
            >
              {/* Number */}
              <div>
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-full text-xs font-medium tracking-[0.1em] text-[#080808] ${step.color}`}
                >
                  {step.number}
                </span>
              </div>

              {/* Title */}
              <div>
                <h3 className="text-4xl font-medium tracking-[-0.045em] transition-transform duration-500 group-hover:translate-x-2 md:text-6xl">
                  {step.title}
                </h3>
              </div>

              {/* Description */}
              <div className="flex items-start justify-between gap-8">
                <p className="max-w-md text-sm leading-relaxed text-white/45 md:text-base">
                  {step.description}
                </p>

                <span className="hidden text-xl text-white/15 transition-colors duration-500 group-hover:text-accent md:block">
                  ↗
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-20 flex flex-col gap-5 md:mt-28 md:flex-row md:items-center md:justify-between">
          <p className="text-xs uppercase tracking-[0.25em] text-white/30">
            Clear process. No unnecessary complexity.
          </p>

          <a
            href="#contact"
            className="group flex w-fit items-center gap-4 text-sm uppercase tracking-[0.15em] text-white/80 transition-colors hover:text-accent"
          >
            Discuss your project

            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 transition-all duration-500 group-hover:rotate-45 group-hover:border-accent group-hover:bg-accent group-hover:text-black">
              ↗
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

export default Process;
