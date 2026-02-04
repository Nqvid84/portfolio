import React, { memo } from "react";

const skillCategories = {
  'Frontend': ['React', 'Next.js', 'React Native', 'Vue.js', 'Three.js'],
  'Languages': ['JavaScript', 'TypeScript', 'Laravel'],
  'Styling': ['Tailwind', 'Sass', 'MUI'],
  'State & Data': ['Redux', 'Zustand', 'TanStack Query'],
  'Tools': ['Git', 'UI/UX Design', 'Dashboard Development']
}

const skillsComponent = () => {
  return (
    <div className='text-zinc-300 w-full h-full flex flex-col justify-between items-center relative gap-8'>
      {/* Top Skills Section */}
      <div className="w-full flex flex-col justify-start items-start gap-4 px-8">
        {['Frontend', 'Languages', 'Styling'].map((category) => (
          <div key={category} className="w-full flex flex-col justify-start items-start gap-2">
            <h4 className="text-sm text-zinc-200 uppercase tracking-wider">{category}</h4>
            <div className="grid grid-cols-4 gap-3">
              {skillCategories[category].map((skill) => (
                <div key={skill} className="flex flex-row justify-start items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-zinc-300 rounded-full" />{skill}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Hole Design in Center */}
      <div className="blur-md">
        <div className="hole"></div>
      </div>

      {/* Bottom Skills Section */}
      <div className="w-full flex flex-col justify-start items-start gap-4 px-8">
        {['State & Data', 'Tools'].map((category) => (
          <div key={category} className="w-full flex flex-col justify-start items-start gap-2">
            <h4 className="text-sm text-zinc-200 uppercase tracking-wider">{category}</h4>
            <div className="grid grid-cols-4 gap-3">
              {skillCategories[category].map((skill) => (
                <div key={skill} className="flex flex-row justify-start items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-zinc-300 rounded-full" />{skill}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const Skills = memo(skillsComponent);
