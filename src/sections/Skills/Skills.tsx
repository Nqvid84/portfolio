import { memo, useLayoutEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { skills } from "@/data/portfolio.data";

/* ─── Node positions (% of container width / height) ────────────────────────── */

const nodePositions: Record<string, { x: number; y: number }> = {
  // Frontend — top-left quadrant
  "React":           { x: 16, y: 20 },
  "Next.js":         { x: 8,  y: 35 },
  "TypeScript":      { x: 28, y: 11 },
  "JavaScript":      { x: 28, y: 30 },
  // Styling & UI — top-right quadrant
  "Tailwind CSS":    { x: 72, y: 12 },
  "MUI":             { x: 84, y: 25 },
  "ShadCN":          { x: 68, y: 28 },
  "Elastic UI":      { x: 87, y: 13 },
  "Sass":            { x: 78, y: 38 },
  // Tooling — bottom-left quadrant
  "Git":             { x: 10, y: 67 },
  "GitLab CI/CD":    { x: 22, y: 81 },
  "Webpack":         { x: 32, y: 70 },
  "Vite":            { x: 17, y: 89 },
  "ESLint":          { x: 33, y: 62 },
  "Prettier":        { x: 9,  y: 56 },
  // Other — bottom-right quadrant
  "React Query":     { x: 68, y: 68 },
  "Zod":             { x: 80, y: 76 },
  "TanStack":        { x: 73, y: 84 },
  "React Hook Form": { x: 86, y: 88 },
};

/* Tighter constellation for narrow viewports — desktop positions unchanged */
const mobileNodePositions: Record<string, { x: number; y: number }> = {
  "React":           { x: 18, y: 18 },
  "Next.js":         { x: 10, y: 32 },
  "TypeScript":      { x: 32, y: 12 },
  "JavaScript":      { x: 30, y: 28 },
  "Tailwind CSS":    { x: 68, y: 14 },
  "MUI":             { x: 82, y: 24 },
  "ShadCN":          { x: 66, y: 30 },
  "Elastic UI":      { x: 84, y: 14 },
  "Sass":            { x: 76, y: 38 },
  "Git":             { x: 12, y: 64 },
  "GitLab CI/CD":    { x: 24, y: 78 },
  "Webpack":         { x: 34, y: 68 },
  "Vite":            { x: 16, y: 88 },
  "ESLint":          { x: 36, y: 58 },
  "Prettier":        { x: 12, y: 52 },
  "React Query":     { x: 66, y: 66 },
  "Zod":             { x: 78, y: 74 },
  "TanStack":        { x: 70, y: 84 },
  "React Hook Form": { x: 84, y: 90 },
};

/* ─── Connection map: skill → related skills ────────────────────────────────── */

const connections: Record<string, string[]> = {
  "React":           ["Next.js", "TypeScript", "React Query", "React Hook Form"],
  "Next.js":         ["React", "TypeScript", "Tailwind CSS"],
  "TypeScript":      ["React", "Next.js", "Zod"],
  "JavaScript":      ["React", "TypeScript"],
  "Tailwind CSS":    ["ShadCN", "Next.js"],
  "MUI":             ["Elastic UI"],
  "ShadCN":          ["Tailwind CSS"],
  "Elastic UI":      ["MUI"],
  "Sass":            ["Tailwind CSS"],
  "Git":             ["GitLab CI/CD"],
  "GitLab CI/CD":    ["Git", "Vite", "Webpack"],
  "Webpack":         ["Vite", "GitLab CI/CD"],
  "Vite":            ["Webpack", "GitLab CI/CD"],
  "ESLint":          ["Prettier"],
  "Prettier":        ["ESLint"],
  "React Query":     ["React", "TanStack"],
  "Zod":             ["TypeScript", "React Hook Form"],
  "TanStack":        ["React Query"],
  "React Hook Form": ["React", "Zod"],
};

/* ─── Category labels — placed in the corridor between clusters & center ─────── */

const categoryLabels = [
  { id: "frontend", label: "Frontend",     x: 14, y: 44, mx: 18, my: 42 },
  { id: "styling",  label: "Styling & UI", x: 83, y: 44, mx: 80, my: 42 },
  { id: "tooling",  label: "Tooling",      x: 14, y: 56, mx: 18, my: 58 },
  { id: "other",    label: "Other",        x: 83, y: 56, mx: 80, my: 58 },
];

/* ─── Flat skill list (all categories merged) ───────────────────────────────── */

const allSkills = skills.flatMap(cat =>
  cat.skills.map(name => ({ name, categoryId: cat.id }))
);

const canHover = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(hover: hover) and (pointer: fine)").matches;

/* ─── Component ──────────────────────────────────────────────────────────────── */

const SkillsComponent = () => {
  const [activeSkill, setActiveSkill] = useState<string | null>(null);
  const [isCompact, setIsCompact] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const lineRefs = useRef<Record<string, SVGLineElement | null>>({});
  const activeCategoryId = activeSkill
    ? allSkills.find(({ name }) => name === activeSkill)?.categoryId
    : null;
  const positions = isCompact ? mobileNodePositions : nodePositions;
  const connected = useMemo(() => {
    if (!activeSkill) return [];

    const activeCategory = skills.find((category) =>
      category.skills.includes(activeSkill),
    );
    const categorySkills =
      activeCategory?.skills.filter((skill) => skill !== activeSkill) ?? [];

    return [...new Set([
      ...categorySkills,
      ...(connections[activeSkill] ?? []),
    ])];
  }, [activeSkill]);

  useLayoutEffect(() => {
    const media = window.matchMedia("(max-width: 1023px)");
    const sync = () => setIsCompact(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useLayoutEffect(() => {
    if (!activeSkill) return;

    let animationFrame = 0;

    const updateLines = () => {
      const container = containerRef.current;
      const source = nodeRefs.current[activeSkill];

      if (container && source) {
        const containerRect = container.getBoundingClientRect();
        const sourceRect = source.getBoundingClientRect();
        const x1 = sourceRect.left + sourceRect.width / 2 - containerRect.left;
        const y1 = sourceRect.top + sourceRect.height / 2 - containerRect.top;

        connected.forEach((target) => {
          const targetNode = nodeRefs.current[target];
          const line = lineRefs.current[target];
          if (!targetNode || !line) return;

          const targetRect = targetNode.getBoundingClientRect();
          line.setAttribute("x1", String(x1));
          line.setAttribute("y1", String(y1));
          line.setAttribute(
            "x2",
            String(targetRect.left + targetRect.width / 2 - containerRect.left),
          );
          line.setAttribute(
            "y2",
            String(targetRect.top + targetRect.height / 2 - containerRect.top),
          );
        });
      }

      animationFrame = requestAnimationFrame(updateLines);
    };

    updateLines();

    return () => cancelAnimationFrame(animationFrame);
  }, [activeSkill, connected]);

  return (
    <motion.div
      ref={containerRef}
      className="relative w-full h-full touch-manipulation"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      onClick={() => setActiveSkill(null)}
    >

      {/* ── SVG overlay: connection lines ───────────────────────────────────── */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden="true"
      >
        <AnimatePresence>
          {activeSkill &&
            connected.map((target, idx) => {
              const from = positions[activeSkill];
              const to   = positions[target];
              if (!from || !to) return null;
              return (
                <motion.line
                  ref={(element) => {
                    lineRefs.current[target] = element;
                  }}
                  key={`${activeSkill}→${target}`}
                  x1={0} y1={0}
                  x2={0} y2={0}
                  stroke="white"
                  strokeWidth="1"
                  strokeLinecap="round"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.45 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.28, delay: idx * 0.07, ease: "easeOut" }}
                />
              );
            })}
        </AnimatePresence>
      </svg>

      {/* ── Skill nodes ─────────────────────────────────────────────────────── */}
      {allSkills.map(({ name }, idx) => {
        const pos = positions[name];
        if (!pos) return null;

        const isActive    = activeSkill === name;
        const isConnected = connected.includes(name);
        const isFaded     = !!activeSkill && !isActive && !isConnected;

        /* Individual float rhythm — each node gets a unique speed & phase */
        const floatDuration = 2.8 + (idx * 0.31) % 1.8;
        const floatDelay    = (idx * 0.19) % 2.2;

        return (
          /* Framer Motion wrapper: entrance + opacity state */
          <motion.div
            key={name}
            className="absolute"
            style={{
              left:      `${pos.x}%`,
              top:       `${pos.y}%`,
              transform: "translate(-50%, -50%)",
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: isFaded ? 0.1 : 1,
              scale:   1,
            }}
            transition={{
              opacity: { duration: 0.22 },
              scale:   { duration: 0.45, delay: idx * 0.028, ease: [0.34, 1.56, 0.64, 1] },
            }}
          >
            {/* CSS float animation — separate from FM so it keeps looping uninterrupted */}
            <div
              role="button"
              tabIndex={0}
              aria-pressed={isActive}
              className="flex flex-col items-center gap-[3px] cursor-pointer py-1 px-1"
              style={{
                animation:      `nodeFloat ${floatDuration}s ease-in-out infinite`,
                animationDelay: `${floatDelay}s`,
              }}
              onMouseEnter={() => {
                if (canHover()) setActiveSkill(name);
              }}
              onMouseLeave={() => {
                if (canHover()) setActiveSkill(null);
              }}
              onClick={(event) => {
                event.stopPropagation();
                if (canHover()) return;
                setActiveSkill((prev) => (prev === name ? null : name));
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  event.stopPropagation();
                  setActiveSkill((prev) => (prev === name ? null : name));
                }
              }}
            >
              {/* Dot */}
              <motion.div
                ref={(element) => {
                  nodeRefs.current[name] = element;
                }}
                className="rounded-full bg-white flex-shrink-0"
                animate={{
                  width:     isActive ? "9px" : isConnected ? "6px" : "4px",
                  height:    isActive ? "9px" : isConnected ? "6px" : "4px",
                  boxShadow: isActive
                    ? "0 0 12px 5px rgba(255,255,255,0.5), 0 0 26px 10px rgba(255,255,255,0.12)"
                    : isConnected
                    ? "0 0 7px 3px rgba(255,255,255,0.3)"
                    : "none",
                }}
                transition={{ duration: 0.2 }}
              />
              {/* Label */}
              <motion.span
                className="text-[7px] sm:text-[8px] lg:text-[9px] tracking-wider whitespace-nowrap select-none leading-none"
                animate={{
                  color: isActive
                    ? "rgba(255,255,255,1)"
                    : isConnected
                    ? "rgba(255,255,255,0.78)"
                    : "rgba(113,113,122,0.85)", // zinc-500
                }}
                transition={{ duration: 0.2 }}
              >
                {name}
              </motion.span>
            </div>
          </motion.div>
        );
      })}

      {/* ── Category labels ──────────────────────────────────────────────────── */}
      {categoryLabels.map(({ id, label, x, y, mx, my }) => {
        const isActiveCategory = activeCategoryId === id;
        const labelX = isCompact ? mx : x;
        const labelY = isCompact ? my : y;

        return (
          <div
            key={id}
            className="absolute pointer-events-none select-none"
            style={{
              left:      `${labelX}%`,
              top:       `${labelY}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <motion.span
              className="text-[10px] sm:text-xs font-light"
              animate={{
                color: isActiveCategory
                  ? "rgba(255,255,255,1)"
                  : "rgb(63,63,70)",
                textShadow: isActiveCategory
                  ? "0 0 10px rgba(255,255,255,0.55)"
                  : "0 0 0 rgba(255,255,255,0)",
              }}
              transition={{ duration: 0.2 }}
            >
              {label}
            </motion.span>
          </div>
        );
      })}

      {/* ── Central "sun" — the constellation's gravitational anchor ─────────── */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-md pointer-events-none">
        <div className="hole hole-sm" />
      </div>

      {/* ── Hint ──────────────────────────────────────────────────────────────── */}
      <motion.p
        className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[7px] tracking-[0.3em] text-zinc-800 uppercase select-none pointer-events-none whitespace-nowrap"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1.2 }}
      >
        <span className="lg:hidden">tap to reveal connections</span>
        <span className="hidden lg:inline">hover to reveal connections</span>
      </motion.p>
    </motion.div>
  );
};

export const Skills = memo(SkillsComponent);
