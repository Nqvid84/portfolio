export type FormIcon = "email" | "phone" | "location";

export type IconPoint = { x: number; y: number };

/** Center + fit points into a consistent box so every icon shares the same visual weight. */
function normalizePoints(hits: IconPoint[], fit = 0.78): IconPoint[] {
  if (hits.length === 0) return hits;

  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;

  for (const p of hits) {
    minX = Math.min(minX, p.x);
    maxX = Math.max(maxX, p.x);
    minY = Math.min(minY, p.y);
    maxY = Math.max(maxY, p.y);
  }

  const cx = (minX + maxX) / 2;
  const cy = (minY + maxY) / 2;
  const w = Math.max(maxX - minX, 1e-6);
  const h = Math.max(maxY - minY, 1e-6);
  const scale = (2 * fit) / Math.max(w, h);

  return hits.map((p) => ({
    x: (p.x - cx) * scale,
    y: (p.y - cy) * scale,
  }));
}

/**
 * Spatially resample — keep top→bottom / left→right order so the silhouette
 * stays readable (angle-sorting was scrambling the shapes).
 */
function resample(hits: IconPoint[], count: number): IconPoint[] {
  const normalized = normalizePoints(hits);

  if (normalized.length === 0) {
    return Array.from({ length: count }, (_, i) => {
      const a = (i / count) * Math.PI * 2;
      return { x: Math.cos(a) * 0.35, y: Math.sin(a) * 0.35 };
    });
  }

  const sorted = [...normalized].sort((a, b) => a.y - b.y || a.x - b.x);

  const out: IconPoint[] = [];
  for (let i = 0; i < count; i++) {
    const t = (i / Math.max(count - 1, 1)) * (sorted.length - 1);
    const i0 = Math.floor(t);
    const i1 = Math.min(sorted.length - 1, i0 + 1);
    const f = t - i0;
    out.push({
      x: sorted[i0].x * (1 - f) + sorted[i1].x * f,
      y: sorted[i0].y * (1 - f) + sorted[i1].y * f,
    });
  }
  return out;
}

function sampleDrawn(
  draw: (ctx: CanvasRenderingContext2D, size: number) => void,
  count: number,
  size = 320,
): IconPoint[] {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return resample([], count);

  ctx.clearRect(0, 0, size, size);
  ctx.fillStyle = "#fff";
  ctx.strokeStyle = "#fff";
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  draw(ctx, size);

  const { data } = ctx.getImageData(0, 0, size, size);
  const hits: IconPoint[] = [];
  const step = 2;

  for (let y = 0; y < size; y += step) {
    for (let x = 0; x < size; x += step) {
      if (data[(y * size + x) * 4 + 3] > 100) {
        hits.push({
          x: (x / (size - 1)) * 2 - 1,
          y: (y / (size - 1)) * 2 - 1,
        });
      }
    }
  }

  return resample(hits, count);
}

function drawEmail(ctx: CanvasRenderingContext2D, size: number) {
  // Centered @ with balanced weight — stroke for a cleaner particle edge
  const fontSize = Math.floor(size * 0.58);
  ctx.font = `600 ${fontSize}px "Courier New", Courier, monospace`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.lineWidth = size * 0.018;
  ctx.strokeText("@", size * 0.5, size * 0.52);
  ctx.globalAlpha = 0.55;
  ctx.fillText("@", size * 0.5, size * 0.52);
  ctx.globalAlpha = 1;
}

function drawPhone(ctx: CanvasRenderingContext2D, size: number) {
  const s = size;
  /* Clean smartphone silhouette — rounded body, screen inset, speaker pill */
  const w = s * 0.38;
  const h = s * 0.68;
  const x = (s - w) / 2;
  const y = (s - h) / 2;
  const r = w * 0.18;

  // Body
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
  ctx.fill();

  // Screen cutout
  ctx.globalCompositeOperation = "destination-out";
  const inset = w * 0.12;
  const sx = x + inset;
  const sy = y + h * 0.14;
  const sw = w - inset * 2;
  const sh = h * 0.68;
  const sr = r * 0.55;
  ctx.beginPath();
  ctx.moveTo(sx + sr, sy);
  ctx.lineTo(sx + sw - sr, sy);
  ctx.quadraticCurveTo(sx + sw, sy, sx + sw, sy + sr);
  ctx.lineTo(sx + sw, sy + sh - sr);
  ctx.quadraticCurveTo(sx + sw, sy + sh, sx + sw - sr, sy + sh);
  ctx.lineTo(sx + sr, sy + sh);
  ctx.quadraticCurveTo(sx, sy + sh, sx, sy + sh - sr);
  ctx.lineTo(sx, sy + sr);
  ctx.quadraticCurveTo(sx, sy, sx + sr, sy);
  ctx.closePath();
  ctx.fill();
  ctx.globalCompositeOperation = "source-over";

  // Speaker pill
  ctx.beginPath();
  const pw = w * 0.28;
  const ph = h * 0.035;
  const px = s / 2 - pw / 2;
  const py = y + h * 0.07;
  ctx.moveTo(px + ph, py);
  ctx.lineTo(px + pw - ph, py);
  ctx.quadraticCurveTo(px + pw, py, px + pw, py + ph);
  ctx.lineTo(px + pw, py + ph);
  ctx.quadraticCurveTo(px + pw, py + ph * 2, px + pw - ph, py + ph * 2);
  ctx.lineTo(px + ph, py + ph * 2);
  ctx.quadraticCurveTo(px, py + ph * 2, px, py + ph);
  ctx.quadraticCurveTo(px, py, px + ph, py);
  ctx.closePath();
  ctx.fill();
}

function drawLocation(ctx: CanvasRenderingContext2D, size: number) {
  const s = size;
  const cx = s * 0.5;
  const cy = s * 0.38;
  const r = s * 0.2;

  ctx.lineWidth = s * 0.05;

  // Pin head
  ctx.beginPath();
  ctx.arc(cx, cy, r, Math.PI * 0.15, Math.PI - Math.PI * 0.15, true);
  // Tip
  ctx.lineTo(cx, s * 0.82);
  ctx.closePath();
  ctx.stroke();

  // Inner ring
  ctx.lineWidth = s * 0.04;
  ctx.beginPath();
  ctx.arc(cx, cy, r * 0.4, 0, Math.PI * 2);
  ctx.stroke();
}

const drawers: Record<FormIcon, (ctx: CanvasRenderingContext2D, size: number) => void> = {
  email: drawEmail,
  phone: drawPhone,
  location: drawLocation,
};

const cache = new Map<string, IconPoint[]>();

export function getIconPoints(icon: FormIcon, count: number): IconPoint[] {
  const key = `${icon}:${count}:v5`;
  const hit = cache.get(key);
  if (hit) return hit;
  const points = sampleDrawn(drawers[icon], count);
  cache.set(key, points);
  return points;
}
