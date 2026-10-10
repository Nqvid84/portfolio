import { memo } from "react";

interface MenuCardProps {
  title: string;
  img: string;
  isActive: boolean;
}

const MenuCardComponent = ({ title, img, isActive }: MenuCardProps) => {
  return (
    <div
      className={`w-full h-52 sm:h-60 lg:w-64 lg:h-96 p-3 lg:p-4 bg-zinc-950 border-2 text-white rounded-lg flex flex-col justify-start gap-3 lg:gap-4 items-center transition-all duration-300 ${
        isActive
          ? "border-white"
          : "border-zinc-700 active:border-zinc-400 lg:hover:border-zinc-400"
      }`}
    >
      <div className="w-full h-[55%] rounded-lg overflow-hidden">
        <img
          src={img}
          alt={title}
          className="w-full h-full object-cover rounded-lg transition-transform duration-500 active:scale-105 lg:hover:scale-105"
        />
      </div>
      <div className="h-px w-full bg-white/20" />
      <div className="text-left text-xs sm:text-sm w-full first-letter:uppercase tracking-wider">
        {title}
      </div>
    </div>
  );
};

export const MenuCard = memo(MenuCardComponent);
