import type { MouseEvent, ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";

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

    // Already on homepage
    if (location.pathname === "/") {
      window.history.pushState({}, "", href);

      const target = document.querySelector(href);

      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }

      return;
    }

    // Coming from another route
    navigate(`/${href}`);

    setTimeout(() => {
      const target = document.querySelector(href);

      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 500);
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