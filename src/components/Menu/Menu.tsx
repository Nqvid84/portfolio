import { memo } from "react";
import { MenuCard } from "./MenuCard";
import type { NavLink } from "@/types/portfolio.types";

interface MenuProps {
  links: NavLink[];
  open: boolean;
  navLocation: string;
  onSelect: (href: string) => void;
  onClose: () => void;
}

const MenuComponent = ({
  links,
  open,
  onSelect,
  navLocation,
  onClose,
}: MenuProps) => {
  return (
    <div
      className={`w-full transition-all duration-500 ease-in-out z-50 p-4 text-white rounded-md flex flex-row flex-wrap lg:flex-nowrap justify-center items-center content-center gap-3 lg:gap-0 fixed left-0 right-0 h-auto max-h-[78vh] lg:h-96 lg:max-h-none ${
        open
          ? "bottom-6 lg:bottom-[-5vw]"
          : "pointer-events-none -bottom-[110%] lg:bottom-[-25vw]"
      }`}
    >
      {/* Backdrop */}
      <div
        role="presentation"
        onClick={onClose}
        className={`w-full h-[100dvh] fixed top-0 left-0 bg-zinc-950/80 z-0 transition-all ease-in-out duration-300 backdrop-blur-sm ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Cards — 2×2 on small screens, fan row from lg up */}
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

        const translateY = isActive
          ? "-translate-y-1 lg:-translate-y-8"
          : isFirst || isLast
          ? "lg:translate-y-4"
          : isMiddle
          ? "lg:-translate-y-2"
          : "";

        return (
          <a
            key={link.id}
            onClick={() => onSelect(link.href)}
            href={link.href}
            className={`${
              open ? "lg:-mx-10" : "lg:-mx-32"
            } w-[calc(50%-0.375rem)] max-w-[11rem] lg:w-auto lg:max-w-none transition-all duration-300 ease-in-out active:-translate-y-2 lg:hover:-translate-y-8 ${translateY} relative z-10`}
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
