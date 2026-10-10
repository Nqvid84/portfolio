// ─── Personal ────────────────────────────────────────────────────────────────

export interface PersonalInfo {
  name: string;
  title: string;
  location: string;
  email: string;
  phone: string;
  summary: string;
  yearsOfExperience: number;
}

// ─── Skills ──────────────────────────────────────────────────────────────────

export interface SkillCategory {
  id: string;
  label: string;
  skills: string[];
}

// ─── Experience ──────────────────────────────────────────────────────────────

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: [string, string];
  bullets: string[];
  skills: string[];
}

// ─── Education ───────────────────────────────────────────────────────────────

export interface Education {
  id: string;
  degree: string;
  institution: string;
  period: [string, string];
}

// ─── Navigation ──────────────────────────────────────────────────────────────

export interface NavLink {
  id: string;
  title: string;
  href: string;
  img: string;
}
