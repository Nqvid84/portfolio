import { memo, useState } from "react";
import { motion } from "framer-motion";
import { personalInfo, education } from "@/data/portfolio.data";
import {
  AnimatedSphere,
  type FormIcon,
} from "@/components/AnimatedSphere/AnimatedSphere";

/* ─── Animation variants ────────────────────────────────────────────────────── */

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.09, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ─── Contact items ──────────────────────────────────────────────────────────*/

const contactItems: {
  label: string;
  value: string;
  href?: string;
  icon: FormIcon;
}[] = [
  {
    label: "Email",
    value: personalInfo.email,
    href: `mailto:${personalInfo.email}`,
    icon: "email",
  },
  {
    label: "Phone",
    value: personalInfo.phone,
    href: `tel:${personalInfo.phone}`,
    icon: "phone",
  },
  {
    label: "Location",
    value: personalInfo.location,
    icon: "location",
  },
];

/* ─── Component ──────────────────────────────────────────────────────────────*/

const ContactComponent = () => {
  const [formIcon, setFormIcon] = useState<FormIcon | null>(null);
  const [rippleToken, setRippleToken] = useState(0);

  const fireRipple = (href?: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setRippleToken((n) => n + 1);
    if (!href) return;
    window.setTimeout(() => {
      window.location.href = href;
    }, 650);
  };

  return (
    <motion.div
      className="relative w-full h-full overflow-hidden px-2 lg:px-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* ── Corner sphere — morphs into contact icons; slides in on hover ── */}
      <motion.div
        variants={itemVariants}
        className="pointer-events-none absolute -right-[18%] z-0 w-[min(92vw,34rem)] h-[min(92vw,34rem)] sm:w-[38rem] sm:h-[38rem] lg:-right-[18%] lg:w-[58rem] lg:h-[58rem] opacity-70"
        animate={{ x: formIcon ? "-12%" : "0%" }}
        transition={{ type: "spring", stiffness: 120, damping: 20, mass: 0.7 }}
        aria-hidden
      >
        <AnimatedSphere formIcon={formIcon} rippleToken={rippleToken} />
      </motion.div>

      {/* ── Contact info ───────────────────────────────────────────────────── */}
      <div className="relative z-10 flex h-full flex-col justify-center gap-7 w-full lg:w-2/5 lg:pr-10">
        <motion.div variants={itemVariants} className="flex flex-col gap-1">
          <span className="text-[9px] tracking-[0.35em] text-zinc-700 uppercase mb-1">
            Contact
          </span>
          <h2 className="font-fanc text-3xl lg:text-[2.4rem] text-zinc-100 leading-none">
            {personalInfo.name}
          </h2>
          <span className="text-zinc-600 text-xs tracking-widest mt-1">
            {personalInfo.title}
          </span>
        </motion.div>

        <motion.div variants={itemVariants} className="h-px w-full bg-zinc-800" />

        <div className="flex flex-col gap-5">
          {contactItems.map(({ label, value, href, icon }) => (
            <motion.div
              key={label}
              variants={itemVariants}
              className="flex flex-col gap-0.5"
              onMouseEnter={() => setFormIcon(icon)}
              onMouseLeave={() => setFormIcon(null)}
              onFocusCapture={() => setFormIcon(icon)}
              onBlurCapture={() => setFormIcon(null)}
            >
              <span className="text-[9px] tracking-[0.3em] text-zinc-700 uppercase">
                {label}
              </span>
              {href ? (
                <a
                  href={href}
                  className="text-zinc-400 text-xs hover:text-zinc-100 transition-colors duration-300"
                  onClick={fireRipple(href)}
                >
                  {value}
                </a>
              ) : (
                <button
                  type="button"
                  className="text-zinc-400 text-xs text-left hover:text-zinc-100 transition-colors duration-300"
                  onClick={fireRipple()}
                >
                  {value}
                </button>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div variants={itemVariants} className="h-px w-full bg-zinc-800" />

        <motion.div variants={itemVariants} className="flex flex-col gap-2">
          <span className="text-[9px] tracking-[0.3em] text-zinc-700 uppercase">
            Education
          </span>
          {education.map((edu) => (
            <div key={edu.id} className="flex flex-col gap-0.5 mt-1">
              <span className="text-zinc-300 text-xs">{edu.degree}</span>
              <span className="text-zinc-600 text-xs">{edu.institution}</span>
              <span className="text-zinc-700 text-xs">
                {edu.period[0]} — {edu.period[1]}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export const Contact = memo(ContactComponent);
