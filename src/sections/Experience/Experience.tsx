import { memo } from "react";
import { motion } from "framer-motion";
import { ExperienceCard } from "@/components/ExperienceCard/ExperienceCard";
import { experiences } from "@/data/portfolio.data";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const ExperienceComponent = () => {
  return (
    <motion.div
      className="text-zinc-300 w-full h-full flex flex-col gap-4 items-start relative overflow-y-auto overflow-x-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h2
        className="text-xl font-semibold text-zinc-100 uppercase tracking-widest px-4 lg:px-8 pt-2"
        variants={itemVariants}
      >
        Experience
      </motion.h2>

      <div className="w-full flex flex-col gap-4 px-4 lg:px-8 pb-4">
        {experiences.map((experience) => (
          <motion.div key={experience.id} variants={itemVariants}>
            <ExperienceCard experience={experience} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export const Experience = memo(ExperienceComponent);
