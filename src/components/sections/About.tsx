const principles = [
  {
    number: "01",
    title: "Clarity",
    description:
      "Good digital products should be easy to understand, navigate and use.",
    color: "bg-accent",
  },
  {
    number: "02",
    title: "Craft",
    description:
      "Design and engineering details matter, from the smallest interaction to the overall architecture.",
    color: "bg-violet",
  },
  {
    number: "03",
    title: "Purpose",
    description:
      "Technology should solve a real problem rather than exist simply because it is new.",
    color: "bg-coral",
  },
];

function About() {
  return (
    <section
      id="about"
      className="bg-[#f3f3ef] px-6 py-32 text-[#080808] md:px-10 md:py-48"
    >
      <div className="mx-auto max-w-[1400px]">
        {/* Header */}
        <div className="grid gap-10 md:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-black/40">
              <span className="h-1.5 w-1.5 rounded-full bg-coral" />
              About AVRENSTUDIO
            </p>
          </div>

          <div>
            <h2 className="max-w-5xl text-4xl font-medium leading-[0.95] tracking-[-0.045em] md:text-6xl lg:text-7xl">
              WE BUILD DIGITAL
              <br />
              PRODUCTS WITH
              <br />
              <span className="text-gradient">PURPOSE.</span>
            </h2>
          </div>
        </div>

        {/* Main statement */}
        <div className="mt-24 grid gap-16 border-t border-black/15 pt-16 md:mt-36 md:grid-cols-[0.7fr_1.3fr] md:pt-20">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-black/35">
              Independent Digital Studio
            </span>
          </div>

          <div>
            <p className="max-w-4xl text-2xl font-medium leading-tight tracking-[-0.025em] md:text-4xl">
              AVRENSTUDIO is an independent digital studio focused on
              creating thoughtful websites, web applications and
              custom digital systems for modern businesses.
            </p>

            <p className="mt-8 max-w-2xl text-base leading-relaxed text-black/55 md:text-lg">
              We combine design and engineering to turn ideas and
              business requirements into functional digital products.
              Every project starts with understanding the problem
              before deciding what technology belongs behind it.
            </p>
          </div>
        </div>

        {/* Principles */}
        <div className="mt-24 md:mt-36">
          <div className="grid gap-5 md:grid-cols-3">
            {principles.map((principle) => (
              <article
                key={principle.number}
                className="card-glow rounded-2xl border border-black/10 bg-white p-8 md:p-10"
              >
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-full text-xs font-medium tracking-[0.1em] text-[#080808] ${principle.color}`}
                >
                  {principle.number}
                </span>

                <h3 className="mt-8 text-3xl font-medium tracking-[-0.04em]">
                  {principle.title}
                </h3>

                <p className="mt-4 max-w-sm text-sm leading-relaxed text-black/50">
                  {principle.description}
                </p>
              </article>
            ))}
          </div>
        </div>

        {/* Closing statement */}
        <div className="mt-24 md:mt-36">
          <div className="flex flex-col gap-8 border-t border-black/15 pt-10 md:flex-row md:items-end md:justify-between">
            <p className="text-xs uppercase tracking-[0.25em] text-black/35">
              Design × Engineering
            </p>

            <p className="max-w-xl text-right text-2xl font-medium leading-tight tracking-[-0.03em] md:text-4xl">
              Small studio.
              <br />
              Serious about the work.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
