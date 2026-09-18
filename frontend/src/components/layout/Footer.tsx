import Logo from "../ui/Logo";
import ScrollLink from "../ui/ScrollLink";

const footerLinks = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#080808] px-6 pb-8 pt-20 text-white md:px-10 md:pt-28">
      <div
        aria-hidden="true"
        className="mesh-glow absolute bottom-[-20%] right-[10%] h-[350px] w-[350px] bg-violet/10"
      />

      <div className="relative mx-auto max-w-[1400px]">
        {/* Top */}
        <div className="grid gap-16 md:grid-cols-[1fr_auto]">
          <div>
            <Logo />

            <p className="mt-8 max-w-sm text-sm leading-relaxed text-white/40">
              An independent digital studio building websites,
              web applications and custom digital systems.
            </p>
          </div>

          {/* Navigation */}
          <nav className="grid grid-cols-2 gap-x-16 gap-y-5 sm:grid-cols-3 md:flex md:gap-10">
            {footerLinks.map((link) => (
              <ScrollLink
                key={link.label}
                href={link.href}
                className="rounded-sm text-xs uppercase tracking-[0.18em] text-white/40 transition-colors duration-300 hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#080808]"
              >
                {link.label}
              </ScrollLink>
            ))}
          </nav>
        </div>

        {/* Big wordmark */}
        <div className="mt-24 overflow-hidden border-t border-white/10 pt-8 md:mt-36">
          <p className="select-none text-[clamp(4rem,15vw,14rem)] font-medium leading-[0.75] tracking-[-0.08em] text-white/[0.055]">
            AVRENSTUDIO
          </p>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col gap-5 border-t border-white/10 pt-6 text-[10px] uppercase tracking-[0.2em] text-white/25 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} AVRENSTUDIO. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Independent Digital Studio
            </span>

            <span>India</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
