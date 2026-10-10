import type {
  Education,
  Experience,
  NavLink,
  PersonalInfo,
  SkillCategory,
} from "@/types/portfolio.types";

// ─── Personal ────────────────────────────────────────────────────────────────

export const personalInfo: PersonalInfo = {
  name: "Navid Neisi",
  title: "Frontend Engineer",
  location: "Mashhad, Iran",
  email: "neisinavid@gmail.com",
  phone: "+98 901 123 0864",
  yearsOfExperience: 5,
  summary:
    "Front-end developer with near 5 years of experience building web applications using React, TypeScript, and Next.js. Experienced in frontend architecture, reusable component systems, state management, and performance optimization. Comfortable working across the full development lifecycle — from designing application foundations and development workflows to implementing user interfaces and collaborating with product, design, and backend teams.",
};

// ─── Skills ──────────────────────────────────────────────────────────────────

export const skills: SkillCategory[] = [
  {
    id: "frontend",
    label: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "JavaScript"],
  },
  {
    id: "styling",
    label: "Styling & UI",
    skills: ["Tailwind CSS", "MUI", "ShadCN", "Elastic UI", "Sass"],
  },
  {
    id: "tooling",
    label: "Tooling",
    skills: ["Git", "GitLab CI/CD", "Webpack", "Vite", "ESLint", "Prettier"],
  },
  {
    id: "other",
    label: "Other",
    skills: ["React Query", "Zod", "TanStack", "React Hook Form"],
  },
];

// ─── Experience ──────────────────────────────────────────────────────────────

export const experiences: Experience[] = [
  {
    id: "hiro",
    company: "Hiro",
    role: "Front-end Team Lead",
    period: ["2026", "Present"],
    skills: ["React", "TypeScript", "React Query", "Zod", "GitLab CI/CD"],
    bullets: [
      "Designed and implemented the frontend foundation shared across company projects, including application structure, API integration patterns, form handling, validation, and development conventions.",
      "Built an internal library for generating administrative interfaces using React, TypeScript, React Query, and Zod.",
      "Developed reusable component packages, custom hooks, and typed utilities used across multiple projects.",
      "Implemented CI/CD pipelines and structured PR review processes using GitLab Duo.",
    ],
  },
  {
    id: "bist",
    company: "BIST",
    role: "Front-end Team Lead",
    period: ["2025", "Present"],
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "React Query",
      "Tailwind CSS",
      "ShadCN",
      "Zod",
      "Zustand",
    ],
    bullets: [
      "Led front-end development for multiple web applications, with a focus on payment systems and real-time data accuracy using React, Next.js, TypeScript, and React Query.",
      "Designed and implemented a scalable base admin panel with reusable components, layouts, and modules using Tailwind CSS, ShadCN, Zod, and Zustand.",
      "Architected client-driven e-commerce platforms with a clean, extensible API configuration layer, maintainable, and performant user interfaces.",
      "Modernized legacy applications by migrating from mixed Next.js + Vue stacks to a unified, modern React + TypeScript architecture, improving readability and performance.",
      "Implemented Dockerization and CI/CD pipelines providing reliable deployments through containerized images.",
      "Mentored an intern and junior front-end developers, handled task distribution, code reviews, and technical guidance.",
    ],
  },
  {
    id: "faraz-pajohan",
    company: "Faraz Pajohan",
    role: "Front-end Developer",
    period: ["2023", "2026"],
    skills: ["React", "Next.js", "Tailwind CSS", "MUI", "Elastic UI", "ShadCN", "Kibana"],
    bullets: [
      "Developed web applications, monitoring platforms, and analytical interfaces using React, Next.js, Tailwind, MUI, Elastic UI, and ShadCN.",
      "Participated in migrating legacy Vue applications to React and TypeScript.",
      "Built reusable UI components and shared frontend patterns used across multiple projects.",
      "Integrated Kibana, ElasticSearch, and Power BI data sources into operational dashboards and reporting tools.",
      "Contributed to Kibana plugin development and customization.",
    ],
  },
  {
    id: "hard-express",
    company: "Hard Express",
    role: "R&D Front-end Developer",
    period: ["2021", "2022"],
    skills: ["React", "TypeScript", "Tailwind CSS"],
    bullets: [
      "Developed user interfaces using React, TypeScript, and Tailwind CSS.",
      "Contributed to migrating projects toward TypeScript and stronger type-safe development practices.",
      "Worked on performance optimization, accessibility, and SEO improvements — achieved 98 Lighthouse score.",
      "Collaborated with designers to implement responsive interfaces from design specifications.",
    ],
  },
];

// ─── Education ───────────────────────────────────────────────────────────────

export const education: Education[] = [
  {
    id: "bsc-cs",
    degree: "B.Sc. Computer Science",
    institution: "Islamic Azad University of Iran",
    period: ["2023", "Present"],
  },
];

// ─── Navigation ──────────────────────────────────────────────────────────────

export const navLinks: NavLink[] = [
  {
    id: "home",
    title: "Home",
    href: "#home",
    img: "/portfolio/images/nav-home.webp",
  },
  {
    id: "skills",
    title: "Skills",
    href: "#skills",
    img: "/portfolio/images/nav-skills.webp",
  },
  {
    id: "experience",
    title: "Experience",
    href: "#experience",
    img: "/portfolio/images/nav-experience.webp",
  },
  {
    id: "contact",
    title: "Contact",
    href: "#contact",
    img: "/portfolio/images/nav-contact.webp",
  },
];
