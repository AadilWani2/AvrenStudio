import type { MouseEvent, ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getLenis } from "../../lib/lenis/lenis";

type ScrollLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
};

function ScrollLink({
  href,
  children,
  className = "",
  onClick,
}: ScrollLinkProps) {
  const location = useLocation();
  const navigate = useNavigate();

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    if (!href.startsWith("#")) return;

    event.preventDefault();

    onClick?.();

    const scrollToTarget = () => {
      const target = document.querySelector(href);
      if (!target) return;

      const lenis = getLenis();
      if (lenis) {
        lenis.scrollTo(target as HTMLElement, { offset: 0, duration: 1.2 });
      } else {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    };

    // Already on homepage
    if (location.pathname === "/") {
      window.history.pushState({}, "", href);
      scrollToTarget();
      return;
    }

    // Coming from another route
    navigate(`/${href}`);
    setTimeout(scrollToTarget, 500);
  }

  return (
    <a
      href={href}
      onClick={handleClick}
      className={className}
    >
      {children}
    </a>
  );
}

export default ScrollLink;