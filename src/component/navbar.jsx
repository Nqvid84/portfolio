import React, { memo } from "react";

const navbarComponent = ({
  onNavClick,
  onMenuClick,
  links,
  open,
  location,
}) => {
  return (
    <header className="w-full text-sm h-12 top-0 fixed px-24 py-2 z-20">
      <nav className="uppercase w-full h-full flex flex-row justify-between gap-40 items-center text-white ">
        <div className="w-full h-full lg:flex flex-row justify-start gap-40 items-center text-white hidden">
          {links.map((link) => (
            <a
              onClick={() => onNavClick(link.link)}
              href={link.link}
              className="flex flex-row justify-center items-center gap-2 group "
            >
              <div
                className={`${
                  link.link === location
                    ? "h-5 w-5 -ml-5 mix-blend-difference"
                    : "group-hover:h-5 h-0 group-hover:w-5 w-0 group-hover:-mr-5 mix-blend-difference"
                } bg-white rounded-full transition-all duration-300 ease-in-out`}
              />
              <h1>{link.title}</h1>
            </a>
          ))}
        </div>
        <span
          onClick={onMenuClick}
          className="flex flex-row justify-center items-center gap-2 group cursor-pointer"
        >
          <div className="group-hover:h-11 h-0 group-hover:w-11 group-hover:-mr-11 mix-blend-difference w-0 bg-white rounded-full transition-all duration-300 ease-in-out" />
          <svg
            class="h-7 w-7 text-white"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke-width="1"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
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
        </span>
      </nav>
    </header>
  );
};

export const Navbar = memo(navbarComponent);
