import { Link } from "react-router-dom";
import { projects } from "../../data/projects";
import { ArrowRight, ArrowUpRight } from "../ui/Icons";

const dotColors = ["bg-accent", "bg-violet", "bg-coral"];

function SelectedWork() {
  return (
    <section
      id="work"
      className="relative bg-[#080808] px-5 py-20 text-white sm:px-6 sm:py-28 md:px-10 md:py-40"
    >
      <div className="mx-auto max-w-[1400px]">
        {/* Header */}
        <div className="section-heading mb-12 grid gap-6 sm:mb-16 sm:gap-8 md:mb-24 md:grid-cols-[1fr_0.8fr]">
          <div>
            <p className="mb-4 flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-white/40 sm:mb-5">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Selected Work
            </p>

            <h2 className="max-w-4xl text-4xl font-medium leading-[0.92] tracking-[-0.05em] sm:text-5xl md:text-7xl">
              BUILT WITH
              <br />
              PURPOSE.
            </h2>
          </div>

          <div className="flex items-end">
            <p className="max-w-md text-sm leading-relaxed text-white/50 md:text-base">
              A selection of digital products and experiences
              designed and engineered independently.
            </p>
          </div>
        </div>

        {/* Projects */}
        <div className="space-y-12 sm:space-y-16 md:space-y-24">
          {projects.map((project, index) => {
            const dot = dotColors[index % dotColors.length];

            return (
              <article key={project.id} className="project-card group">
                {/* Project Meta */}
                <div className="mb-4 flex items-center justify-between sm:mb-6">
                  <span className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-white/30">
                    <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
                    {project.number} / 03
                  </span>

                  <span className="text-xs uppercase tracking-[0.2em] text-white/30">
                    {project.category}
                  </span>
                </div>

                {/* Visual */}
                <div className="mx-auto w-full max-w-[1180px]">
                  <div className="card-glow relative overflow-hidden rounded-xl border border-white/10 bg-[#111] shadow-2xl">
                    {/* Browser chrome */}
                    <div className="flex items-center gap-2 border-b border-white/10 bg-[#0d0d0d] px-3.5 py-2.5 sm:px-4 sm:py-3">
                      <span className="h-2.5 w-2.5 rounded-full bg-coral/70" />
                      <span className="h-2.5 w-2.5 rounded-full bg-accent/70" />
                      <span className="h-2.5 w-2.5 rounded-full bg-violet/70" />
                    </div>

                    <div className="relative aspect-[16/10] overflow-hidden sm:aspect-[16/9] md:aspect-[16/8]">
                      {project.image ? (
                        <img
                          src={project.image}
                          alt={`${project.title} preview`}
                          loading={index === 0 ? "eager" : "lazy"}
                          className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                        />
                      ) : (
                        <>
                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(203,255,77,0.08),transparent_35%)]" />

                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="px-6 text-center">
                              <span className="block text-[clamp(3rem,8vw,9rem)] font-medium leading-none tracking-[-0.07em] text-white/[0.08]">
                                {project.title}
                              </span>

                              <span className="mt-4 block text-xs uppercase tracking-[0.3em] text-white/20">
                                {project.type}
                              </span>
                            </div>
                          </div>
                        </>
                      )}

                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-accent opacity-0 transition-opacity duration-700 group-hover:opacity-[0.04]" />
                    </div>
                  </div>
                </div>

                {/* Project Information */}
                <div className="mt-6 grid gap-6 sm:mt-8 sm:gap-8 md:mt-10 md:grid-cols-[0.9fr_1fr_auto] md:items-start">
                  {/* Title */}
                  <div>
                    <h3 className="text-2xl font-medium tracking-[-0.045em] sm:text-3xl md:text-5xl">
                      {project.title}
                    </h3>

                    <p className="mt-2 text-xs uppercase tracking-[0.2em] text-white/35 sm:mt-3">
                      {project.type}
                    </p>
                  </div>

                  {/* Description */}
                  <div>
                    <p className="max-w-lg text-sm leading-relaxed text-white/50 md:text-base">
                      {project.description}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2 sm:mt-5">
                      {project.technologies.map((technology) => (
                        <span
                          key={technology}
                          className="rounded-full border border-white/10 px-3 py-1.5 text-[10px] uppercase tracking-[0.12em] text-white/40"
                        >
                          {technology}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action */}
                  <div className="flex justify-start md:justify-end">
                    {project.id === "gclims" ? (
                      <div className="flex flex-col items-start gap-3 sm:gap-4 md:items-end">
                        <div className="flex items-center gap-2.5 text-xs uppercase tracking-[0.15em] text-white/35">
                          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                          Private System
                        </div>

                        <Link
                          to={`/work/${project.id}`}
                          className="group/link inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-white/60 transition-colors hover:text-accent"
                        >
                          <span>View Case Study</span>
                          <ArrowRight
                            size={13}
                            className="transition-transform duration-300 group-hover/link:translate-x-1"
                          />
                        </Link>
                      </div>
                    ) : (
                      <Link
                        to={`/work/${project.id}`}
                        className="group/button flex items-center gap-3.5 text-xs uppercase tracking-[0.15em] text-white/80 transition-colors hover:text-white"
                      >
                        <span>View Case Study</span>

                        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 transition-all duration-500 group-hover/button:rotate-45 group-hover/button:border-accent group-hover/button:bg-accent group-hover/button:text-black sm:h-10 sm:w-10">
                          <ArrowUpRight size={14} />
                        </span>
                      </Link>
                    )}
                  </div>
                </div>

                {/* Divider */}
                {index !== projects.length - 1 && (
                  <div className="mt-12 h-px bg-white/10 sm:mt-16 md:mt-24" />
                )}
              </article>
            );
          })}
        </div>

        {/* Closing note */}
        <div className="mt-16 flex justify-end sm:mt-20 md:mt-32">
          <p className="max-w-sm text-right text-xs uppercase leading-relaxed tracking-[0.2em] text-white/25">
            Independent work.
            <br />
            Real products.
            <br />
            More in progress.
          </p>
        </div>
      </div>
    </section>
  );
}

export default SelectedWork;
