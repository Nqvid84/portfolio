import React, { memo } from "react";

const aboutComponent = () => {
  return (
    <div className="text-zinc-400 overflow-hidden w-full h-full flex flex-row justify-center items-center relative gap-8">
      <div className="w-full flex flex-col justify-center items-center gap-8">
        <div className="w-96 h-96 flex flex-col justify-center items-center rounded-full overflow-hidden border-white border-2 p-2">
          <img
            src="/news.jpg"
            alt=""
            className="w-full h-full saturate-0 rounded-full"
          />
        </div>
        <div className="flex flex-col justify-center items-center gap-4">
          <h2 className="uppercase font-fanc text-2xl text-zinc-300">
            Front-End Developer
          </h2>
          <h4 className="first-letter:uppercase  text-sm text-zinc-500 -mt-4">
            Computer Science Student | React & TypeScript Enthusiast
          </h4>
          <p className="w-[50%] text-justify text-pretty text-sm ">
            I'm{" "}
            <span className="text-zinc-100 font-bold">Navid</span>, a frontend developer with about 3 years in the field.
            <br /> I mostly build dashboards and admin interfaces—the kind of stuff that takes messy data and makes it make sense. I use React and TypeScript a lot, along with Tailwind for styling.
            <br /> I enjoy writing clean code and thinking about how to organize complex state without making a mess. Right Now I'm studying Computer Science at Azad University while freelancing and working on projects.
          </p>
        </div>
      </div>
    </div>
  );
};

export const About = memo(aboutComponent);
