import React, { memo } from "react";

const cardComponent = ({ title, img }) => {
  return (
    <div className="w-64 h-96 p-4 bg-zinc-950 border-2 border-white text-white rounded-lg flex flex-col justify-start gap-4 items-center">
      <div className="w-full h-[50%] rounded-lg">
        <img
          src={img}
          alt={title}
          className="w-full h-full object-cover brightness-150 rounded-lg"
        />
      </div>
      <div className="h-1 w-full border-white/25 border-b-[1px]" />
      <div className="text-left text-sm w-full first-letter:uppercase">
        {title}
      </div>
    </div>
  );
};

export const MenuCard = memo(cardComponent);
