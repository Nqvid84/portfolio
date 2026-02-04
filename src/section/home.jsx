import React, { memo } from "react";

const homeComponent = ({ page }) => {
  return (
    <div
      className={` w-[90%] h-[90%] text-white bg-zinc-950 transition-all duration-300 ease-in-out mt-8 border-white border-2 rounded-lg flex flex-col justify-center p-4 items-center`}
    >
      {page}
    </div>
  );
};

export const Home = memo(homeComponent);
