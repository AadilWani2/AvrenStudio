import { useState } from "react";

const projectTypes = [
  "Website",
  "Web Application",
  "Business System",
  "E-commerce",
  "Other",
];

const budgets = [
  "Under ₹25,000",
  "₹25,000 – ₹50,000",
  "₹50,000 – ₹1,00,000",
  "₹1,00,000+",
  "Not sure yet",
];

function Contact() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSubmitted(true);
  }

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[#080808] px-6 py-32 text-white md:px-10 md:py-48"
    >
      <div
        aria-hidden="true"
        className="mesh-glow absolute left-[10%] top-[10%] h-[450px] w-[450px] bg-accent/10"
      />

      <div className="relative mx-auto max-w-[1400px]">
        {/* Heading */}
        <div className="grid gap-12 md:grid-cols-[1fr_0.8fr]">
          <div>
            <p className="mb-6 flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-white/35">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Start a Project
            </p>

            <h2 className="max-w-5xl text-5xl font-medium leading-[0.88] tracking-[-0.06em] md:text-7xl lg:text-8xl">
              HAVE AN IDEA?
              <br />
              <span className="text-gradient">LET'S BUILD IT.</span>
            </h2>
          </div>

          <div className="flex items-end">
            <p className="max-w-md text-base leading-relaxed text-white/50 md:text-lg">
              Tell us a little about what you're building. We'll
              review the details and get back to you.
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="mt-24 rounded-2xl border border-white/10 bg-white/[0.02] p-8 md:mt-36 md:p-16">
          {submitted ? (
            <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
              <span className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-accent">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                Message Received
              </span>

              <h3 className="mt-6 text-4xl font-medium tracking-[-0.04em] md:text-6xl">
                THANK YOU.
              </h3>

              <p className="mt-5 max-w-md text-sm leading-relaxed text-white/45">
                Your project details have been recorded. We'll get
                back to you soon.
              </p>

              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-8 text-xs uppercase tracking-[0.2em] text-white/45 transition-colors hover:text-accent"
              >
                Send another inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-5xl">
              {/* Name + Email */}
              <div className="grid gap-10 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-4 block text-xs uppercase tracking-[0.2em] text-white/35"
                  >
                    Your Name
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="John Doe"
                    className="w-full border-b border-white/15 bg-transparent px-0 py-4 text-lg text-white outline-none placeholder:text-white/20 transition-colors focus:border-accent"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-4 block text-xs uppercase tracking-[0.2em] text-white/35"
                  >
                    Email
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="john@example.com"
                    className="w-full border-b border-white/15 bg-transparent px-0 py-4 text-lg text-white outline-none placeholder:text-white/20 transition-colors focus:border-accent"
                  />
                </div>
              </div>

              {/* Project type */}
              <div className="mt-14">
                <label
                  htmlFor="projectType"
                  className="mb-4 block text-xs uppercase tracking-[0.2em] text-white/35"
                >
                  What are you building?
                </label>

                <select
                  id="projectType"
                  name="projectType"
                  required
                  defaultValue=""
                  className="w-full appearance-none border-b border-white/15 bg-transparent px-0 py-4 text-lg text-white outline-none transition-colors focus:border-accent"
                >
                  <option value="" disabled className="bg-[#080808]">
                    Select project type
                  </option>

                  {projectTypes.map((type) => (
                    <option
                      key={type}
                      value={type}
                      className="bg-[#080808]"
                    >
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Budget */}
              <div className="mt-14">
                <label
                  htmlFor="budget"
                  className="mb-4 block text-xs uppercase tracking-[0.2em] text-white/35"
                >
                  Estimated Budget
                </label>

                <select
                  id="budget"
                  name="budget"
                  required
                  defaultValue=""
                  className="w-full appearance-none border-b border-white/15 bg-transparent px-0 py-4 text-lg text-white outline-none transition-colors focus:border-accent"
                >
                  <option value="" disabled className="bg-[#080808]">
                    Select budget range
                  </option>

                  {budgets.map((budget) => (
                    <option
                      key={budget}
                      value={budget}
                      className="bg-[#080808]"
                    >
                      {budget}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div className="mt-14">
                <label
                  htmlFor="message"
                  className="mb-4 block text-xs uppercase tracking-[0.2em] text-white/35"
                >
                  Tell us about the project
                </label>

                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="What are you trying to build?"
                  className="w-full resize-none border-b border-white/15 bg-transparent px-0 py-4 text-lg text-white outline-none placeholder:text-white/20 transition-colors focus:border-accent"
                />
              </div>

              {/* Submit */}
              <div className="mt-12 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <p className="max-w-sm text-xs leading-relaxed text-white/30">
                  By submitting this form, you agree to be contacted
                  regarding your project inquiry.
                </p>

                <button
                  type="submit"
                  className="group flex w-fit items-center gap-5 rounded-full bg-accent px-7 py-4 text-sm font-medium uppercase tracking-[0.15em] text-[#080808] transition-all duration-500 hover:shadow-[0_0_40px_-5px_rgba(203,255,77,0.55)]"
                >
                  Send Inquiry

                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#080808] text-accent transition-transform duration-500 group-hover:rotate-45">
                    ↗
                  </span>
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Direct contact */}
        <div className="mt-24 border-t border-white/10 pt-10 md:mt-36 md:flex md:items-center md:justify-between">
          <p className="text-xs uppercase tracking-[0.25em] text-white/30">
            Prefer email?
          </p>

          <a
            href="mailto:hello@avrenstudio.dev"
            className="mt-4 block text-xl text-white/70 transition-colors hover:text-accent md:mt-0 md:text-2xl"
          >
            hello@avrenstudio.dev
          </a>
        </div>
      </div>
    </section>
  );
}

export default Contact;
