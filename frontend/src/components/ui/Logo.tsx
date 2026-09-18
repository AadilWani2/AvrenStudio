import { Link } from "react-router-dom";

type LogoProps = {
  light?: boolean;
};

function Logo({ light = false }: LogoProps) {
  const textColor = light ? "text-[#080808]" : "text-white";

  return (
    <Link
      to="/"
      aria-label="AVRENSTUDIO home"
      className={`group inline-flex items-center gap-3 rounded-sm ${textColor} focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#080808]`}
    >
      <svg
        width="30"
        height="30"
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M6 24L15 6L24 24M9 18H21"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
      </svg>

      <span className="text-lg font-semibold tracking-[0.18em]">
        AVRENSTUDIO<span className="text-accent">.</span>
      </span>
    </Link>
  );
}

export default Logo;