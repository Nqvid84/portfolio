import { memo } from "react";
import type { NavLink } from "@/types/portfolio.types";

interface NavbarProps {
  links: NavLink[];
  open: boolean;
  location: string;
  onNavClick: (href: string) => void;
  onMenuClick: () => void;
}

const NavbarComponent = ({
  onNavClick,
  onMenuClick,
  links,
  open,
  location,
}: NavbarProps) => {
  return (
    <header className="w-full text-sm h-12 top-0 fixed px-5 sm:px-8 lg:px-24 py-2 z-20">
      <nav className="uppercase w-full h-full flex flex-row justify-between gap-8 items-center text-white">
        {/* Desktop nav links */}
        <div className="w-full h-full lg:flex flex-row justify-start gap-10 items-center text-white hidden">
          {links.map((link) => (
            <a
              key={link.id}
              onClick={() => onNavClick(link.href)}
              href={link.href}
              className="flex flex-row justify-center items-center gap-2 group cursor-pointer"
            >
              <div
                className={`${
                  link.href === location
                    ? "h-5 w-5 -ml-5 mix-blend-difference"
                    : "group-hover:h-5 h-0 group-hover:w-5 w-0 group-hover:-mr-5 mix-blend-difference"
                } bg-white rounded-full transition-all duration-300 ease-in-out`}
              />
              <span>{link.title}</span>
            </a>
          ))}
        </div>

        {/* Menu toggle */}
        <button
          type="button"
          onClick={onMenuClick}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="flex flex-row justify-center items-center gap-2 group cursor-pointer ml-auto bg-transparent border-0 p-1 -mr-1"
        >
          <div className="group-active:h-11 group-active:w-11 group-active:-mr-11 lg:group-hover:h-11 h-0 lg:group-hover:w-11 lg:group-hover:-mr-11 mix-blend-difference w-0 bg-white rounded-full transition-all duration-300 ease-in-out" />
          <svg
            className="h-7 w-7 text-white"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="1"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" />
            <line x1="4" y1="6" x2="20" y2={open ? "18" : "6"} />
            <line
              x1={open ? "10" : "4"}
              y1="12"
              x2={open ? "10" : "20"}
              y2="12"
            />
            <line x1="4" y1="18" x2="20" y2={!open ? "18" : "6"} />
          </svg>
        </button>
      </nav>
    </header>
  );
};

export const Navbar = memo(NavbarComponent);
