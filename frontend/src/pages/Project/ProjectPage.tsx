import { Link, useParams } from "react-router-dom";
import { projects } from "../../data/projects";
import { projectDetails } from "../../data/projectDetails";
import Navbar from "../../components/navigation/Navbar";
import Footer from "../../components/layout/Footer";
import ProjectGallery from "../../components/sections/ProjectGallery";
import { ArrowLeft, ArrowUpRight } from "../../components/ui/Icons";

function ProjectPage() {
  const { projectId } = useParams();

  const project = projects.find((item) => item.id === projectId);
  const details = projectId ? projectDetails[projectId] : undefined;

  if (!project || !details) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#080808] px-6 text-white">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-white/30">
            Project Not Found
          </p>

          <h1 className="mt-5 text-4xl font-medium tracking-[-0.04em]">
            This project doesn't exist.
          </h1>

          <Link
            to="/"
            className="group mt-8 inline-flex items-center gap-2 text-sm uppercase tracking-[0.15em] text-white/50 transition-colors hover:text-white"
          >
            <ArrowLeft size={14} className="transition-transform duration-300 group-hover:-translate-x-1" />
            <span>Back Home</span>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#080808] text-white">
      <Navbar />

      {/* Header */}
      <section className="px-6 pb-24 pt-32 md:px-10 md:pb-36 md:pt-40">
        <div className="mx-auto max-w-[1400px]">
          <Link
            to="/"
            className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/30 transition-colors hover:text-white"
          >
            <ArrowLeft size={13} className="transition-transform duration-300 group-hover:-translate-x-1" />
            <span>Back to Work</span>
          </Link>

          <div className="mt-20 grid gap-10 md:grid-cols-[1fr_0.7fr] md:items-end">
            <div>
              <p className="mb-6 text-xs uppercase tracking-[0.3em] text-white/30">
                {project.number} / {project.category}
              </p>

              <h1 className="text-[clamp(4rem,10vw,9rem)] font-medium leading-[0.82] tracking-[-0.065em]">
                {project.title}
              </h1>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-white/30">
                {project.type}
              </p>

              {project.isPrivate && (
                <p className="mt-3 text-sm text-white/50">
                  Private system — access restricted to authorized users.
                </p>
              )}
            </div>
          </div>

          {/* Project visual */}
          <div className="mt-20 md:mt-28">
            <ProjectGallery
              images={details.images}
              projectTitle={project.title}
            />
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="bg-[#f3f3ef] px-6 py-24 text-[#080808] md:px-10 md:py-36">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-12 md:grid-cols-[0.7fr_1.3fr]">
            <p className="text-xs uppercase tracking-[0.3em] text-black/35">
              Overview
            </p>

            <p className="max-w-4xl text-3xl font-medium leading-tight tracking-[-0.03em] md:text-5xl">
              {details.overview}
            </p>
          </div>
        </div>
      </section>

      {/* Challenge / Solution */}
      <section className="bg-[#080808] px-6 py-24 md:px-10 md:py-36">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-16 md:grid-cols-2">
            <div>
              <p className="mb-6 text-xs uppercase tracking-[0.3em] text-white/30">
                The Challenge
              </p>

              <p className="max-w-xl text-xl leading-relaxed text-white/55 md:text-2xl">
                {details.challenge}
              </p>
            </div>

            <div>
              <p className="mb-6 text-xs uppercase tracking-[0.3em] text-white/30">
                The Solution
              </p>

              <p className="max-w-xl text-xl leading-relaxed text-white/55 md:text-2xl">
                {details.solution}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-[#f3f3ef] px-6 py-24 text-[#080808] md:px-10 md:py-36">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-14">
            <p className="text-xs uppercase tracking-[0.3em] text-black/35">
              Key Features
            </p>
          </div>

          <div className="border-t border-black/15">
            {details.features.map((feature, index) => (
              <div
                key={feature}
                className="grid grid-cols-[70px_1fr] border-b border-black/15 py-7 md:grid-cols-[100px_1fr]"
              >
                <span className="text-sm text-black/30">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="text-2xl font-medium tracking-[-0.03em] md:text-4xl">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom */}
      <section className="bg-[#080808] px-6 py-24 md:px-10 md:py-36">
        <div className="mx-auto max-w-[1400px] text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-white/30">
            More Work
          </p>

          <h2 className="mt-6 text-5xl font-medium tracking-[-0.05em] md:text-7xl">
            KEEP EXPLORING.
          </h2>

          <Link
            to="/"
            className="group mt-10 inline-flex items-center gap-3 rounded-full bg-accent px-6 py-3 text-sm font-medium uppercase tracking-[0.15em] text-[#080808] transition-all duration-300 hover:shadow-[0_0_40px_-5px_rgba(203,255,77,0.55)]"
          >
            <span>View All Work</span>
            <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default ProjectPage;