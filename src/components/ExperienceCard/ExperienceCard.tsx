import { memo } from "react";
import type { Experience } from "@/types/portfolio.types";

interface ExperienceCardProps {
  experience: Experience;
}

const ExperienceCardComponent = ({ experience }: ExperienceCardProps) => {
  const { company, role, period, bullets, skills } = experience;

  return (
    <div className="w-full flex flex-col border border-zinc-700 active:border-zinc-500 lg:hover:border-zinc-500 rounded-xl p-4 sm:p-6 gap-4 sm:gap-6 transition-colors duration-300 bg-zinc-950/40">
      {/* Header row */}
      <div className="w-full flex flex-row flex-wrap justify-between items-start gap-2">
        <div className="flex flex-col gap-1 min-w-0">
          <h3 className="text-base sm:text-lg font-semibold text-zinc-100 tracking-wide">
            {company}
          </h3>
          <p className="text-sm text-zinc-400">{role}</p>
        </div>
        <span className="flex flex-row items-center gap-2 text-xs sm:text-sm text-zinc-500 whitespace-nowrap">
          {period[0]}
          <span className="w-6 border-b border-zinc-600" />
          {period[1]}
        </span>
      </div>

      {/* Left accent bar + bullets */}
      <ul className="border-l-2 border-zinc-700 pl-4 flex flex-col gap-2">
        {bullets.map((bullet) => (
          <li key={bullet.slice(0, 40)} className="text-sm text-zinc-400 leading-relaxed">
            {bullet}
          </li>
        ))}
      </ul>

      {/* Skills */}
      <div className="flex flex-row flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className="text-xs bg-zinc-800 text-zinc-300 rounded-full px-3 py-1 border border-zinc-700"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};

export const ExperienceCard = memo(ExperienceCardComponent);
