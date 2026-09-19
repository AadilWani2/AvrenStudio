const services = [
  {
    number: "01",
    title: "Web Design",
    description:
      "Clean, modern interfaces designed around your brand, audience and business goals.",
    tags: ["UI/UX", "Responsive Design", "Design Systems"],
    accent: "accent",
  },
  {
    number: "02",
    title: "Web Development",
    description:
      "Fast, responsive websites and web applications built with modern frontend and backend technologies.",
    tags: ["React", "Node.js", "APIs"],
    accent: "violet",
  },
  {
    number: "03",
    title: "Business Systems",
    description:
      "Custom internal tools and business software that turn repetitive workflows into organized digital systems.",
    tags: ["Dashboards", "Automation", "Database"],
    accent: "coral",
  },
  {
    number: "04",
    title: "Deployment & Support",
    description:
      "Production deployment, environment configuration and ongoing improvements after launch.",
    tags: ["Deployment", "Performance", "Maintenance"],
    accent: "accent",
  },
];

const accentClasses: Record<string, { text: string; bg: string; border: string }> = {
  accent: {
    text: "text-accent",
    bg: "bg-accent",
    border: "hover:border-accent/40",
  },
  violet: {
    text: "text-violet",
    bg: "bg-violet",
    border: "hover:border-violet/40",
  },
  coral: {
    text: "text-coral",
    bg: "bg-coral",
    border: "hover:border-coral/40",
  },
};

function Services() {
  return (
    <section
      id="services"
      className="bg-[#f3f3ef] px-6 py-32 text-[#080808] md:px-10 md:py-48"
    >
      <div className="mx-auto max-w-[1400px]">
        {/* Header */}
        <div className="section-heading grid gap-10 md:grid-cols-[1fr_0.8fr]">
          <div>
            <p className="mb-6 flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-black/40">
              <span className="h-1.5 w-1.5 rounded-full bg-violet" />
              What We Do
            </p>

            <h2 className="max-w-4xl text-5xl font-medium leading-[0.9] tracking-[-0.055em] md:text-7xl lg:text-8xl">
              DIGITAL
              <br />
              SOLUTIONS.
            </h2>
          </div>

          <div className="flex items-end">
            <p className="max-w-md text-base leading-relaxed text-black/55 md:text-lg">
              From the first idea to a production-ready product,
              AVRENSTUDIO combines design, development and technology to
              build useful digital experiences.
            </p>
          </div>
        </div>

        {/* Services grid */}
        <div className="mt-24 grid gap-5 md:mt-36 md:grid-cols-2">
          {services.map((service) => {
            const colors = accentClasses[service.accent];

            return (
              <article
                key={service.number}
                className={`card-glow group relative overflow-hidden rounded-2xl border border-black/10 bg-white p-8 md:p-10 ${colors.border}`}
              >
                <div className="flex items-start justify-between">
                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-full text-xs font-medium tracking-[0.1em] ${colors.bg} text-[#080808]`}
                  >
                    {service.number}
                  </span>

                  <span
                    className={`text-2xl ${colors.text} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
                  >
                    ↗
                  </span>
                </div>

                <h3 className="mt-10 text-3xl font-medium tracking-[-0.04em] transition-transform duration-500 group-hover:translate-x-1 md:text-4xl">
                  {service.title}
                </h3>

                <p className="mt-4 max-w-md text-sm leading-relaxed text-black/55 md:text-base">
                  {service.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-black/10 bg-black/[0.02] px-3 py-1.5 text-[10px] uppercase tracking-[0.12em] text-black/45"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>

        {/* Bottom statement */}
        <div className="mt-20 flex justify-between gap-8 md:mt-28">
          <span className="text-xs uppercase tracking-[0.25em] text-black/35">
            Design × Technology
          </span>

          <span className="max-w-xs text-right text-xs uppercase leading-relaxed tracking-[0.2em] text-black/35">
            Built around your
            <br />
            actual requirements.
          </span>
        </div>
      </div>
    </section>
  );
}

export default Services;
