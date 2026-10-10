import { memo } from "react";
import { MenuCard } from "./MenuCard";
import type { NavLink } from "@/types/portfolio.types";

interface MenuProps {
  links: NavLink[];
  open: boolean;
  navLocation: string;
  onSelect: (href: string) => void;
}

const MenuComponent = ({ links, open, onSelect, navLocation }: MenuProps) => {
  return (
    <div
      className={`w-full h-96 transition-all duration-500 ease-in-out z-50 ${
        open ? "bottom-[-5vw]" : "pointer-events-none bottom-[-25vw]"
      } p-4 text-white rounded-md flex flex-row justify-center items-center fixed`}
    >
      {/* Backdrop */}
      <div
        className={`w-full h-[100vh] fixed top-0 bg-zinc-950/80 z-0 transition-all ease-in-out duration-300 backdrop-blur-sm ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Cards */}
      {links.map((link, index) => {
        const isFirst = index === 0;
        const isLast = index === links.length - 1;
        const isMiddle = index === (links.length - 1) / 2;
        const isActive = navLocation === link.href;

        const rotation =
          isFirst || isLast
            ? index < 2
              ? "-4deg"
              : "4deg"
            : !isMiddle
            ? index < 2
              ? "-2deg"
              : "2deg"
            : "";

        const translateY =
          isActive
            ? "-translate-y-8"
            : isFirst || isLast
            ? "translate-y-4"
            : isMiddle
            ? "-translate-y-2"
            : "";

        return (
          <a
            key={link.id}
            onClick={() => onSelect(link.href)}
            href={link.href}
            className={`${
              open ? "lg:-mx-10 -mx-16" : "-mx-32"
            } transition-all duration-300 ease-in-out hover:-translate-y-8 ${translateY} relative z-10`}
            style={{ rotate: rotation }}
          >
            <MenuCard
              title={link.title}
              img={link.img}
              isActive={isActive}
            />
          </a>
        );
      })}
    </div>
  );
};

export const Menu = memo(MenuComponent);
