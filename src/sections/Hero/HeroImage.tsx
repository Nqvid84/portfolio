import { memo, useEffect, useRef, type PointerEvent, type ReactNode } from "react";

type Ripple = {
  x: number;
  y: number;
  born: number;
};

const LINGER_MS = 1000;
const SPAWN_MS = 28;
const MAX_RIPPLES = 64;

type HeroImageProps = {
  src: string;
  alt: string;
  children?: ReactNode;
};

const HeroImageComponent = ({ src, alt, children }: HeroImageProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const colorRef = useRef<HTMLImageElement>(null);
  const ripplesRef = useRef<Ripple[]>([]);
  const rafRef = useRef(0);
  const lastSpawnRef = useRef(0);
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotionRef.current = media.matches;

    const onChange = () => {
      reducedMotionRef.current = media.matches;
      if (media.matches) {
        ripplesRef.current = [];
        const el = colorRef.current;
        if (el) {
          el.style.maskImage = "linear-gradient(transparent, transparent)";
          el.style.webkitMaskImage = "linear-gradient(transparent, transparent)";
        }
      }
    };

    media.addEventListener("change", onChange);
    return () => {
      media.removeEventListener("change", onChange);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const paint = () => {
    const now = performance.now();
    ripplesRef.current = ripplesRef.current.filter((r) => now - r.born < LINGER_MS);

    const masks = ripplesRef.current.map((r) => {
      const t = (now - r.born) / LINGER_MS;
      const radius = 124 + t * 170;
      const opacity = Math.pow(1 - t, 1.75);
      return `radial-gradient(circle ${radius}px at ${r.x}px ${r.y}px, rgba(0,0,0,${opacity}) 0%, rgba(0,0,0,${opacity * 0.5}) 32%, transparent 70%)`;
    });

    const el = colorRef.current;
    if (el) {
      const value = masks.length
        ? masks.join(",")
        : "linear-gradient(transparent, transparent)";
      el.style.maskImage = value;
      el.style.webkitMaskImage = value;
    }

    if (ripplesRef.current.length > 0) {
      rafRef.current = requestAnimationFrame(paint);
    } else {
      rafRef.current = 0;
    }
  };

  const ensurePaint = () => {
    if (!rafRef.current) {
      rafRef.current = requestAnimationFrame(paint);
    }
  };

  const spawnRipple = (clientX: number, clientY: number) => {
    if (reducedMotionRef.current) return;

    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const now = performance.now();
    if (now - lastSpawnRef.current < SPAWN_MS) return;
    lastSpawnRef.current = now;

    ripplesRef.current.push({
      x: clientX - rect.left,
      y: clientY - rect.top,
      born: now,
    });

    if (ripplesRef.current.length > MAX_RIPPLES) {
      ripplesRef.current.splice(0, ripplesRef.current.length - MAX_RIPPLES);
    }

    ensurePaint();
  };

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    spawnRipple(e.clientX, e.clientY);
  };

  return (
    <div
      ref={containerRef}
      className="w-full h-full rounded-xl relative overflow-hidden"
      onPointerMove={onPointerMove}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-center object-cover saturate-0 rounded-xl select-none pointer-events-none"
        draggable={false}
      />
      <img
        ref={colorRef}
        src={src}
        alt=""
        aria-hidden
        className="absolute inset-0 w-full h-full object-center object-cover rounded-xl select-none pointer-events-none"
        style={{
          maskImage: "linear-gradient(transparent, transparent)",
          WebkitMaskImage: "linear-gradient(transparent, transparent)",
        }}
        draggable={false}
      />
      {children}
    </div>
  );
};

export const HeroImage = memo(HeroImageComponent);
