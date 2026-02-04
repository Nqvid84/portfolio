import React, { memo } from "react";

const ratioComponent = () => {
  return (
    <div className="text-zinc-400 w-full h-full flex flex-row justify-center gap-8 items-center relative">
      <div className="h-full w-3/12 flex flex-col justify-start items-start gap-4">
        <h1 className="uppercase text-9xl text-zinc-100">
          navid neisi
        </h1>
        <h4 className="first-letter:uppercase  text-sm text-zinc-200 -mt-4">
          20yo Front-end Developer | Computer Science Student
        </h4>
        <p className="w-[100%] text-justify text-pretty text-sm ">
          I'm a frontend developer building{" "}
          <span className="text-zinc-100 font-bold">dashboards and admin panels</span>
          —the kind of interfaces that make complex data actually usable.
          <br /> I work mostly with{" "}
          <span className="text-zinc-100 font-bold">React and TypeScript</span>
          , handle state management properly, and care about{" "}
          <span className="text-zinc-100 font-bold">clean, maintainable code</span>.
          <br /> Been doing this for about{" "}
          <span className="text-zinc-100 font-bold">4 years</span>.
          <br /> studying CS at Azad University.
        </p>
      </div>
      <div className="w-full flex-1 flex rounded-lg relative justify-center items-center h-full overflow-hidden">
        <img
          src="/homebg.jpg"
          alt="bridge"
          className="w-full h-full object-top object-cover saturate-0 rounded-lg"
        />
        <h3 className="absolute text-white bottom-2 right-2 flex items-center  gap-1">
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />  <circle cx="12" cy="10" r="3" />
          </svg>
          Iran, mashhad
        </h3>
      </div>
    </div>
  );
};

export const Ratio = memo(ratioComponent);
