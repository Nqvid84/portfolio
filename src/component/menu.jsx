import React, { memo } from "react";
import { MenuCard } from "./cardMenu";

const menuComponent = ({ links, open, onSelect, navLocation }) => {
  return (
    <div
      className={`w-full h-96 transition-all duration-500 ease-in-out z-50 ${
        open ? "bottom-[-5vw]" : "pointer-events-none bottom-[-25vw]"
      } p-4 text-white rounded-md flex flex-row justify-center -gap-4 items-center fixed `}
    >
        <div
          className={`w-full h-[100vh] fixed top-0 bg-zinc-950/75 z-0 transition-all ease-in-out duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
          />
      {links.map((link, index) => (
        <a
          onClick={() => onSelect(link.link)}
          href={link.link}
          className={` ${
            open ? "lg:-mx-10 -mx-16" : "-mx-32"
          } transition-all duration-300 ease-in-out hover:-translate-y-8 ${
            index + 1 === 1 || index + 1 === links.length ? "translate-y-4" : ""
          }${index === (links.length - 1) / 2 ? "-translate-y-2" : ""} ${navLocation === link.link && "-translate-y-8"}`}
          style={{
            rotate:
              index + 1 === 1 || index + 1 === links.length
                ? `${index < 2 ? "-4deg" : "4deg"}`
                : index !== (links.length - 1) / 2
                ? `${index < 2 ? "-2deg" : "2deg"}`
                : "",
          }}
        >
          <MenuCard title={link.title} img={link.img} />
        </a>
      ))}
    </div>
  );
};

export const Menu = memo(menuComponent);
