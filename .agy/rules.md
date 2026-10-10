# Portfolio Project — AGY Rules

## Stack
- **Framework**: React 18 + Vite
- **Language**: TypeScript (strict mode). NO `.jsx` or `.js` source files.
- **Styling**: Tailwind CSS v3 only. No inline style objects unless for dynamic values (e.g., cursor position).
- **Animation**: Framer Motion for entrance/exit animations. CSS transitions for simple hover states.
- **Font**: Inter (body), Regal.otf via `font-fanc` class (display headings only).

## File & Folder Conventions
- All component files use **PascalCase**: `ExperienceCard.tsx`, not `expCard.tsx`.
- Each component lives in its own folder under `src/components/` or `src/sections/`:
  ```
  src/components/Navbar/
  ├── Navbar.tsx
  └── Navbar.types.ts   (if props are complex)
  ```
- Shared TypeScript types → `src/types/portfolio.types.ts`
- All static content (strings, arrays) → `src/data/portfolio.data.ts`. NEVER hardcode portfolio data inside components.
- Custom hooks → `src/hooks/`. Hook files are camelCase: `useMousePosition.ts`.
- Use the `@/` path alias for all imports (e.g., `import { experiences } from '@/data/portfolio.data'`).

## TypeScript Rules
- `"strict": true` in tsconfig — no exceptions.
- All component props must have an explicit named interface (e.g., `ExperienceCardProps`).
- No `any`. Use `unknown` and narrow, or define proper types.
- Prefer `type` for simple unions/primitives, `interface` for object shapes.
- SVG attributes must use React camelCase props: `strokeWidth`, `strokeLinecap`, `className`, etc.

## Component Rules
- Use `React.memo` for pure presentational components (sections, cards).
- Named exports for all components. Default exports only for page-level route components if needed.
- No logic inside JSX — extract to variables or helper functions above the return.
- `key` props must be stable and meaningful — never use array `index` as key when the list can change.

## Data Layer
- `src/data/portfolio.data.ts` is the **single source of truth** for all portfolio content.
- Structure:
  ```ts
  export const personalInfo: PersonalInfo = { ... }
  export const skills: SkillCategory[] = [ ... ]
  export const experiences: Experience[] = [ ... ]
  export const navLinks: NavLink[] = [ ... ]
  ```
- Update this file when CV data changes — sections automatically reflect the change.

## Design System
- **Color palette**: zinc scale only (`zinc-900` bg, `zinc-100` primary text, `zinc-400` secondary, `zinc-700` borders/cards).
- **Cursor**: Keep the `mix-blend-difference` white circle cursor from `App.tsx` — do not remove.
- **Menu**: The card-fan bottom menu with `MenuCard` images is a core identity element — preserve the animation logic.
- **Dark mode**: The site is dark-only. Do not add light mode.
- Skill display: pill/badge style with `bg-zinc-700 text-zinc-300 rounded-full px-3 py-1` — no bullet lists.
- Section transitions: use `framer-motion` `AnimatePresence` + `motion.div` with `opacity` and `y` variants.

## Dependency Rules
- Do NOT add `@material/web` (removed — unused and heavy).
- Do NOT add `sass` (removed — `style.sass` was empty).
- Do NOT add new UI libraries without explicit user approval. The stack is intentionally minimal.
- `three` / `@react-three/*` may be used for 3D effects but only if requested.
- `react-router-dom` is available but the current SPA uses state-based navigation — keep this unless a true routing refactor is requested.

## CV Data Reference (source of truth for all portfolio content)

### Personal
- Name: Navid Neisi
- Title: Frontend Engineer
- Location: Mashhad, Iran
- Email: neisinavid@gmail.com
- Phone: +98 901 123 0864
- Summary: ~5 years experience, specializes in React, TypeScript, Next.js, frontend architecture, component systems, state management.

### Skills
- Frontend: React, Next.js, TypeScript, JavaScript
- Styling & UI: Tailwind CSS, MUI, ShadCN, Elastic UI (EUI), Sass
- Tooling: Git, GitLab CI/CD, Webpack, Vite, ESLint, Prettier
- Other: React Query, Zod, React TanStack, RHF

### Experience (newest first)
1. **Hiro** — Front-end Team Lead (2026–Present)
2. **BIST** — Front-end Team Lead (2025–Present)
3. **Faraz Pajohan** — Front-end Developer (2023–Present)
4. **Hard Express** — R&D Front-end Developer (2021–2022)

### Education
- B.Sc. Computer Science, Islamic Azad University of Iran (2023–Present)

## What NOT to Do
- Do not reintroduce `.jsx` files.
- Do not use `any` type.
- Do not add `@material/web` imports.
- Do not hardcode strings (names, dates, descriptions) inside component files.
- Do not use inline `style={{}}` for static visual properties — use Tailwind classes.
- Do not use array index as React `key`.
- Do not add a light mode.
- Do not remove or alter the custom cursor, card-fan menu, or Regal.otf heading font.
