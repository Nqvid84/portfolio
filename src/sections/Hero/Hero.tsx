import { memo } from "react";
import { motion } from "framer-motion";
import { personalInfo } from "@/data/portfolio.data";

const HeroComponent = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <motion.div
      className="text-zinc-400 w-full h-full flex flex-col lg:flex-row justify-center gap-8 items-center relative"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Text block */}
      <div className="h-full w-full lg:w-4/12 flex flex-col justify-center items-start gap-4 px-4 lg:px-0">
        <motion.h1
          className="uppercase text-6xl lg:text-9xl text-zinc-100 leading-none"
          variants={itemVariants}
        >
          {personalInfo.name}
        </motion.h1>

        <motion.h4
          className="text-sm text-zinc-400 -mt-2 tracking-widest uppercase"
          variants={itemVariants}
        >
          {personalInfo.title} · {personalInfo.yearsOfExperience}+ years
        </motion.h4>

        <motion.p
          className="w-full lg:w-[90%] text-justify text-pretty text-sm text-zinc-400 leading-relaxed"
          variants={itemVariants}
        >
          {personalInfo.summary}
        </motion.p>

        <motion.div className="flex flex-row gap-3 mt-2" variants={itemVariants}>
          <a
            href={`mailto:${personalInfo.email}`}
            className="text-xs text-zinc-300 border border-zinc-700 rounded-full px-4 py-2 hover:border-zinc-400 hover:text-white transition-all duration-300"
          >
            Get in touch
          </a>
          <a
            href="/portfolio/cv.pdf"
            target="_blank"
            rel="noreferrer"
            className="text-xs text-zinc-300 border border-zinc-700 rounded-full px-4 py-2 hover:border-zinc-400 hover:text-white transition-all duration-300"
          >
            Download CV
          </a>
        </motion.div>
      </div>

      {/* Image block */}
      <motion.div
        className="w-full flex-1 flex rounded-xl relative justify-center items-center h-full overflow-hidden"
        variants={itemVariants}
      >
        <img
          src="/portfolio/images/hero-mashhad.jpg"
          alt="Mashhad cityscape"
          className="w-full h-full object-center object-cover saturate-0 rounded-xl"
        />
        <span className="absolute text-white bottom-3 right-3 flex items-center gap-1 text-xs bg-zinc-950/60 backdrop-blur-sm px-2 py-1 rounded-full">
          <svg
            className="h-3 w-3"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          {personalInfo.location}
        </span>
      </motion.div>
    </motion.div>
  );
};

export const Hero = memo(HeroComponent);
