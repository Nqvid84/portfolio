# Interactive Design Ideas — Skills & Contact Pages

> Context: dark zinc palette · custom cursor (mix-blend-difference) · Framer Motion · the existing `.hole` animation · ASCII art · font-fanc (Regal serif) · tight viewport container (`90% × 90vh`).

---

## Skills Page

### Idea 1 — Magnetic Skill Orbits
Each skill tag floats as a node around a central point — the existing **hole** visual stays as the gravitational core. On hover, a tag snaps toward the cursor with a magnetic spring (`useSpring` from Framer Motion). Tags drift slowly in lazy ellipses by default using a CSS `@keyframes` path animation offset per tag. The category label fades in as a legend only when its group is hovered.

**Vibe:** alive, physics-y, architectural.

---

### Idea 2 — Terminal Typewriter Grid *(closest to current layout)*
Keep the flat list structure, but on section enter each skill name types itself out character by character with a blinking caret `|`. Category headers slide in with a left-border accent that draws itself via a `scaleY` animation. On hover, a skill flips to reveal a tiny "used at" badge (company name, e.g. `Hiro`, `BIST`) on its back face using CSS `rotateY`. Feels like a live terminal readout.

**Vibe:** dev-coded, precise, slightly retro.

---

### Idea 3 — Frosted Glass Chip Cloud with Mouse Parallax
Skills render as frosted-glass chips (`backdrop-blur`, subtle border, white/5 bg). The chips are arranged in a loose, intentional scatter (absolute positioned, predefined coordinates) — *not* random. The entire cloud layer shifts subtly with `useMousePosition` (already wired) creating a 3-D parallax depth illusion. The hole sits behind on a deeper `z-index` layer and moves at half the parallax speed. On hover, a chip brightens and emits a soft white glow.

**Vibe:** elegant, spatial, premium UI feel.

---

### Idea 4 — Skill Bar Reveal with Noise Texture *(most opinionated)*
Each skill has a horizontal fill bar that animates from 0 → proficiency on enter, but the bar fill isn't a percentage number — it's rendered as a grainy noise gradient (`SVG feTurbulence` filter) that churns slowly, suggesting depth rather than a rating. Categories are collapsible accordion sections. A dim grid of dots in the background shifts with mouse movement (subtle).

**Vibe:** analogue, editorial, design-forward.

---

### Idea 5 — Constellation Network
Skill nodes are dots positioned in a predefined cluster per category. When you hover a node, fine lines (`<svg>`) animate out connecting it to related skills (e.g. React → TypeScript → Zod). The lines pulse gently. Clicking a node zooms a tooltip with the skill name and logos. The hole stays at the center as the "sun" of the constellation.

**Vibe:** data-viz meets portfolio, memorable for engineers hiring engineers.

---

## Contact Page

### Idea 1 — Glitch Reveal on Hover
Contact values (email, phone) are hidden behind a `*` mask by default. Hovering the row triggers a character-shuffle glitch animation (rapidly cycling random ASCII symbols before settling on the real value). Copy-to-clipboard on click with a `✓ Copied` micro-toast. The ASCII art on the right reacts — rings ripple outward from center on each glitch event.

**Vibe:** hacker aesthetic, interaction rewards curiosity.

---

### Idea 2 — Interactive ASCII Art Cursor Warp *(extends existing ASCII art)*
The concentric-rectangle ASCII art on the right becomes mouse-interactive. Using `useMousePosition`, each ring row shifts horizontally by a tiny amount inverse to cursor distance from center, creating a **3-D barrel/fish-eye distortion** illusion in pure text characters. The scanline sweep reacts to mouse Y: moves faster when cursor is near, slower when far. The `◎` symbol pulses more intensely when hovered.

**Vibe:** shows off engineering creativity with zero extra dependencies.

---

### Idea 3 — Split-plane Slide Reveal
The contact panel slides in two halves — left info panel slides from the left, right ASCII art slides from the right — meeting at a glowing seam in the center that fades away. Social/contact links have an underline that draws itself via `scaleX` on hover, and each row has a subtle `translateX` nudge when hovered, as if sliding into a slot. The divider lines grow from 0 width to full on enter.

**Vibe:** cinematic, clean, intentional motion hierarchy.

---

### Idea 4 — Orbital Social Links *(replaces or augments ASCII art)*
The ASCII art area is replaced (or overlaid on mobile) by a set of social/contact links orbiting a central glyph — the `◎` from the ASCII art, but now standalone and large. Each link (Email, LinkedIn, GitHub, Phone) orbits as a labeled node on elliptical paths at different speeds. Hovering freezes the orbit and magnifies that node. On click, the node "launches" — flies toward the cursor with a trailing motion-blur before triggering the href.

**Vibe:** dramatic, kinetic, impossible to forget.

---

### Idea 5 — Form as a One-line CTA *(replaces passive info display)*
Instead of listing contact info statically, there's a minimal single-input bar styled like a terminal prompt: `> send a message_`. Typing reveals a real-time character count, and on submit it sends to a serverless function (Formspree or similar). The ASCII art reacts on successful send — the concentric rings expand outward and fade, then redraw. A "or reach me directly →" link below shows email with the glitch reveal (Idea 1).

**Vibe:** functional + artistic, turns the contact page into a *conversation*.

---

## Cross-page Micro-interactions (applies to both)

| Interaction | Implementation hint |
|---|---|
| **Cursor magnet** on interactive elements | `useSpring` attracting the custom cursor ring on hover |
| **Sound on interaction** (optional / toggleable) | Web Audio API, short 2-4 kHz click tone, respect `prefers-reduced-motion` |
| **Page transition** with shared element | The white `border-2` container edge morphs / glows between sections |
| **Selection highlight** keeps brand palette | `::selection { background: rgba(255,255,255,0.12) }` |
| **Focus ring** for accessibility | Custom white outline at 2px offset matching cursor style |

---

## Recommended Priority (1 week timeline)

Given the deadline, here's a suggested pick-and-implement order:

1. **Skills → Idea 2 (Terminal Typewriter)** — lowest implementation risk, highest payoff relative to current design, no layout restructure needed.
2. **Contact → Idea 2 (ASCII Cursor Warp)** — zero extra deps, reuses existing art, visually spectacular.
3. **Contact → Idea 1 (Glitch Reveal)** — can be layered on top of Idea 2, adds interactivity to static data.
4. **Skills → Idea 3 (Mouse Parallax Chips)** — upgrade if time permits, `useMousePosition` hook is already in place.
