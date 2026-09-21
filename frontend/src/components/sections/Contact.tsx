import { useState } from "react";
import { ArrowUpRight } from "../ui/Icons";

const rawApiUrl =
  (import.meta.env.VITE_API_URL as string | undefined) ||
  "http://localhost:5000/api";
const cleanBaseUrl = rawApiUrl.replace(/\/+$/, "");
const INQUIRIES_URL = cleanBaseUrl.endsWith("/api")
  ? `${cleanBaseUrl}/inquiries`
  : `${cleanBaseUrl}/api/inquiries`;

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

interface FormData {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  message: string;
}

interface FieldErrors {
  name?: string[];
  email?: string[];
  projectType?: string[];
  budget?: string[];
  message?: string[];
}

function validateForm(data: FormData): FieldErrors {
  const errors: FieldErrors = {};

  if (!data.name.trim()) {
    errors.name = ["Please enter your name."];
  } else if (data.name.trim().length > 100) {
    errors.name = ["Name must be under 100 characters."];
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email.trim()) {
    errors.email = ["Please enter your email address."];
  } else if (!emailRegex.test(data.email.trim())) {
    errors.email = ["Please enter a valid email address."];
  }

  if (!data.projectType) {
    errors.projectType = ["Please choose a project type."];
  }

  if (!data.budget) {
    errors.budget = ["Please select an estimated budget."];
  }

  if (!data.message.trim()) {
    errors.message = ["Please describe your project."];
  } else if (data.message.trim().length < 10) {
    errors.message = ["Please provide at least 10 characters."];
  }

  return errors;
}

function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [slowNotice, setSlowNotice] = useState(false);
  const [serverError, setServerError] = useState("");
  const [emailWarning, setEmailWarning] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const warmedRef = useState<{ warmed: boolean }>({ warmed: false })[0];

  function warmServer() {
    if (warmedRef.warmed) return;
    warmedRef.warmed = true;
    const healthUrl = cleanBaseUrl.endsWith("/api")
      ? `${cleanBaseUrl}/health`
      : `${cleanBaseUrl}/api/health`;
    fetch(healthUrl, { mode: "cors" }).catch(() => {});
  }

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    projectType: "",
    budget: "",
    message: "",
  });

  function handleChange(
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setFieldErrors((previous) => ({
      ...previous,
      [name]: undefined,
    }));

    setServerError("");
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (isLoading) return;

    // Instant local client validation (0ms)
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setFieldErrors(validationErrors);
      setServerError("Please complete the required fields.");
      return;
    }

    setIsLoading(true);
    setSlowNotice(false);
    setServerError("");
    setFieldErrors({});

    // If cold start happens on server, notify user so they know it's connecting
    const noticeTimer = setTimeout(() => {
      setSlowNotice(true);
    }, 2500);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 45000);

    try {
      const response = await fetch(INQUIRIES_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        signal: controller.signal,
      });

      let data: any = {};
      try {
        data = await response.json();
      } catch {
        // Fallback if response is not JSON
      }

      if (!response.ok) {
        if (data.errors) {
          setFieldErrors(data.errors);
        }

        setServerError(
          data.message || "Please check your form and try again."
        );

        return;
      }

      setSubmitted(true);
      if (data.emailSent === false) {
        setEmailWarning(
          data.emailWarning ||
            "Inquiry was stored in MongoDB, but email dispatch failed on Render."
        );
      } else {
        setEmailWarning("");
      }
    } catch (error: any) {
      console.error("Inquiry submission failed:", error);

      if (error?.name === "AbortError") {
        setServerError(
          "Request timed out. The server took too long to respond. Please try again."
        );
      } else {
        setServerError(
          "Unable to connect to the server. Please try again in a moment."
        );
      }
    } finally {
      clearTimeout(noticeTimer);
      clearTimeout(timeoutId);
      setIsLoading(false);
      setSlowNotice(false);
    }
  }

  function handleNewInquiry() {
    setSubmitted(false);
    setServerError("");
    setEmailWarning("");
    setFieldErrors({});

    setFormData({
      name: "",
      email: "",
      projectType: "",
      budget: "",
      message: "",
    });
  }

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[#080808] px-5 py-20 text-white sm:px-6 sm:py-28 md:px-10 md:py-48"
    >
      <div
        aria-hidden="true"
        className="mesh-glow absolute left-[10%] top-[10%] h-[450px] w-[450px] bg-accent/10"
      />

      <div className="relative mx-auto max-w-[1400px]">
        {/* Heading */}
        <div className="section-heading grid gap-12 md:grid-cols-[1fr_0.8fr]">
          <div>
            <p className="mb-6 flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-white/35">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Start a Project
            </p>

            <h2 className="max-w-5xl text-5xl font-medium leading-[0.88] tracking-[-0.06em] md:text-7xl lg:text-8xl">
              HAVE AN IDEA?
              <br />
              <span className="text-gradient">LET&apos;S BUILD IT.</span>
            </h2>
          </div>

          <div className="flex items-end">
            <p className="max-w-md text-base leading-relaxed text-white/50 md:text-lg">
              Tell us a little about what you&apos;re building. We&apos;ll
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
                Your project details have been received and saved. We&apos;ll review
                your inquiry and get back to you soon.
              </p>

              {emailWarning && (
                <div className="mt-6 max-w-lg rounded-xl border border-amber-500/30 bg-amber-500/10 p-5 text-left text-xs">
                  <p className="font-semibold text-amber-300">⚠️ Admin Notification Status:</p>
                  <p className="mt-1 text-white/80 leading-relaxed">
                    The inquiry is saved in your MongoDB database, but email dispatch to Gmail failed because Render Free Tier blocks outbound SMTP port 465.
                  </p>
                  <p className="mt-2 text-white/60">
                    To receive inquiry emails in your inbox, add <code className="rounded bg-black/50 px-1.5 py-0.5 font-mono text-accent">RESEND_API_KEY</code> to your Render Web Service environment variables.
                  </p>
                </div>
              )}

              <button
                type="button"
                onClick={handleNewInquiry}
                className="mt-8 text-xs uppercase tracking-[0.2em] text-white/45 transition-colors hover:text-accent"
              >
                Send another inquiry
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              onFocusCapture={warmServer}
              onMouseEnter={warmServer}
              className="max-w-5xl"
            >
              {/* Server Error */}
              {serverError && (
                <div
                  role="alert"
                  className="mb-10 rounded-lg border border-red-400/20 bg-red-400/5 px-5 py-4 text-sm text-red-300"
                >
                  {serverError}
                </div>
              )}

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
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className={`w-full border-b bg-transparent px-0 py-4 text-lg text-white outline-none placeholder:text-white/20 transition-colors ${
                      fieldErrors.name
                        ? "border-red-400"
                        : "border-white/15 focus:border-accent"
                    }`}
                  />

                  {fieldErrors.name && (
                    <p className="mt-2 text-xs text-red-300">
                      {fieldErrors.name[0]}
                    </p>
                  )}
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
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className={`w-full border-b bg-transparent px-0 py-4 text-lg text-white outline-none placeholder:text-white/20 transition-colors ${
                      fieldErrors.email
                        ? "border-red-400"
                        : "border-white/15 focus:border-accent"
                    }`}
                  />

                  {fieldErrors.email && (
                    <p className="mt-2 text-xs text-red-300">
                      {fieldErrors.email[0]}
                    </p>
                  )}
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
                  value={formData.projectType}
                  onChange={handleChange}
                  className={`w-full appearance-none border-b bg-transparent px-0 py-4 text-lg text-white outline-none transition-colors ${
                    fieldErrors.projectType
                      ? "border-red-400"
                      : "border-white/15 focus:border-accent"
                  }`}
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

                {fieldErrors.projectType && (
                  <p className="mt-2 text-xs text-red-300">
                    {fieldErrors.projectType[0]}
                  </p>
                )}
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
                  value={formData.budget}
                  onChange={handleChange}
                  className={`w-full appearance-none border-b bg-transparent px-0 py-4 text-lg text-white outline-none transition-colors ${
                    fieldErrors.budget
                      ? "border-red-400"
                      : "border-white/15 focus:border-accent"
                  }`}
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

                {fieldErrors.budget && (
                  <p className="mt-2 text-xs text-red-300">
                    {fieldErrors.budget[0]}
                  </p>
                )}
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
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="What are you trying to build?"
                  className={`w-full resize-none border-b bg-transparent px-0 py-4 text-lg text-white outline-none placeholder:text-white/20 transition-colors ${
                    fieldErrors.message
                      ? "border-red-400"
                      : "border-white/15 focus:border-accent"
                  }`}
                />

                {fieldErrors.message && (
                  <p className="mt-2 text-xs text-red-300">
                    {fieldErrors.message[0]}
                  </p>
                )}
              </div>

              {/* Submit */}
              <div className="mt-12 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <p className="max-w-sm text-xs leading-relaxed text-white/30">
                  By submitting this form, you agree to be contacted
                  regarding your project inquiry.
                </p>

                <div className="flex flex-col items-start gap-3 md:items-end">
                  {slowNotice && (
                    <p className="animate-pulse text-xs text-accent">
                      Connecting to server, please hold on...
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="group flex w-fit items-center gap-5 rounded-full bg-accent px-7 py-4 text-sm font-medium uppercase tracking-[0.15em] text-[#080808] transition-all duration-500 hover:shadow-[0_0_40px_-5px_rgba(203,255,77,0.55)] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isLoading
                      ? slowNotice
                        ? "Connecting..."
                        : "Sending..."
                      : "Send Inquiry"}

                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#080808] text-accent transition-transform duration-500 group-hover:rotate-45">
                      {isLoading ? "…" : <ArrowUpRight size={15} />}
                    </span>
                  </button>
                </div>
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