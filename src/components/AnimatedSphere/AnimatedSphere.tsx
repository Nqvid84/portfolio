import { memo, useEffect, useRef } from "react";
import {
  getIconPoints,
  type FormIcon,
  type IconPoint,
} from "./iconShapes";

type AnimatedSphereProps = {
  /** Morph sphere glyphs into this contact icon while set */
  formIcon?: FormIcon | null;
  /** Increment to fire a ripple (any new number triggers) */
  rippleToken?: number;
};

const RIPPLE_MS = 1400;
const PHI_STEP = 0.15;
const THETA_STEP = 0.15;
/* No solid block █ — keeps the field looking like fine ASCII, not a pixel stamp */
const CHARS = "·░▒▓▀▄▌▐│─┤├┴┬╭╮╰╯";

type SphereSeed = {
  phi: number;
  theta: number;
  /** Stable index for icon target mapping */
  index: number;
};

function buildSeeds(): SphereSeed[] {
  const seeds: SphereSeed[] = [];
  let index = 0;
  for (let phi = 0; phi < Math.PI * 2; phi += PHI_STEP) {
    for (let theta = 0; theta < Math.PI; theta += THETA_STEP) {
      seeds.push({ phi, theta, index: index++ });
    }
  }
  return seeds;
}

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/**
 * Canvas ASCII sphere — morphs into contact icons on hover.
 */
const AnimatedSphereComponent = ({
  formIcon = null,
  rippleToken = 0,
}: AnimatedSphereProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);
  const formIconRef = useRef<FormIcon | null>(formIcon);
  const rippleAtRef = useRef<number | null>(null);
  const lastRippleToken = useRef(rippleToken);

  useEffect(() => {
    formIconRef.current = formIcon;
  }, [formIcon]);

  useEffect(() => {
    if (rippleToken === lastRippleToken.current) return;
    lastRippleToken.current = rippleToken;
    if (rippleToken > 0) {
      rippleAtRef.current = performance.now();
    }
  }, [rippleToken]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const seeds = buildSeeds();
    const count = seeds.length;

    // Prebuild icon clouds once (same particle count as sphere)
    const icons: Record<FormIcon, IconPoint[]> = {
      email: getIconPoints("email", count),
      phone: getIconPoints("phone", count),
      location: getIconPoints("location", count),
    };

    // Match icon's spatial order (top→bottom, left→right) for cleaner morphs
    const order = seeds
      .map((s, i) => {
        const x = Math.sin(s.theta) * Math.cos(s.phi);
        const y = Math.cos(s.theta);
        return { i, x, y };
      })
      .sort((a, b) => a.y - b.y || a.x - b.x)
      .map((o) => o.i);

    let time = 0;
    let morph = 0;
    let width = 0;
    let height = 0;
    let activeIcon: FormIcon | null = null;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    const rippleBoost = (
      px: number,
      py: number,
      centerX: number,
      centerY: number,
      radius: number,
      now: number,
    ) => {
      const started = rippleAtRef.current;
      if (started === null) return 0;

      const elapsed = now - started;
      if (elapsed > RIPPLE_MS) {
        rippleAtRef.current = null;
        return 0;
      }

      const life = 1 - elapsed / RIPPLE_MS;
      const dist = Math.hypot(px - centerX, py - centerY) / Math.max(radius, 1);
      const waveR = (elapsed / RIPPLE_MS) * 1.35;
      const ring = Math.exp(-Math.pow((dist - waveR) / 0.14, 2));
      const flash = Math.max(0, 1 - elapsed / 280) * 0.9;
      return ring * 1.85 * life + flash * life;
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;
      const radius = Math.min(width, height) * 0.525;
      /* Slightly smaller than the sphere so icons sit cleanly in the middle */
      const iconScale = radius * 0.7;
      const now = performance.now();
      const reduced = prefersReduced.matches;

      const targetIcon = formIconRef.current;
      if (targetIcon) activeIcon = targetIcon;

      const targetMorph = targetIcon ? 1 : 0;
      const morphSpeed = reduced ? 1 : 0.07;
      morph += (targetMorph - morph) * morphSpeed;
      if (Math.abs(morph - targetMorph) < 0.001) morph = targetMorph;

      const m = easeInOutCubic(Math.min(1, Math.max(0, morph)));
      const iconPts = activeIcon ? icons[activeIcon] : null;

      ctx.font = "12px monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      type Pt = { x: number; y: number; z: number; char: string };
      const points: Pt[] = [];

      for (let k = 0; k < order.length; k++) {
        const seed = seeds[order[k]];
        const { phi, theta } = seed;

        // Sphere position (rotating)
        const x = Math.sin(theta) * Math.cos(phi + time * 0.5);
        const y = Math.sin(theta) * Math.sin(phi + time * 0.5);
        const z = Math.cos(theta);

        const rotY = time * 0.3;
        const newX = x * Math.cos(rotY) - z * Math.sin(rotY);
        const newZ = x * Math.sin(rotY) + z * Math.cos(rotY);

        const rotX = time * 0.2;
        const newY = y * Math.cos(rotX) - newZ * Math.sin(rotX);
        const finalZ = y * Math.sin(rotX) + newZ * Math.cos(rotX);

        const sx = centerX + newX * radius;
        const sy = centerY + newY * radius;

        // Icon target for this ordered particle
        const ip = iconPts?.[k] ?? { x: 0, y: 0 };
        const ix = centerX + ip.x * iconScale;
        const iy = centerY + ip.y * iconScale;

        const px = sx * (1 - m) + ix * m;
        const py = sy * (1 - m) + iy * m;
        // Flatten depth as we become a 2D icon
        const pz = finalZ * (1 - m) + 0.35 * m;

        const depth = (pz + 1) / 2;
        const charIndex = Math.floor(depth * (CHARS.length - 1));
        const char = CHARS[charIndex];

        points.push({ x: px, y: py, z: pz, char });
      }

      points.sort((a, b) => a.z - b.z);

      for (const point of points) {
        const base = 0.18 + (point.z + 1) * 0.42;
        const formBoost = m * 0.22;
        const ripple = reduced
          ? 0
          : rippleBoost(point.x, point.y, centerX, centerY, radius, now);
        const alpha = Math.min(1, base + formBoost + ripple);

        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.fillText(point.char, point.x, point.y);
      }

      // Slow spin while morphing; freeze almost fully at icon
      if (!reduced) {
        time += 0.01 * (1 - m * 0.92);
      }

      frameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="block w-full h-full"
      aria-hidden="true"
    />
  );
};

export const AnimatedSphere = memo(AnimatedSphereComponent);
export type { FormIcon };
