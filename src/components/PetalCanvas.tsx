import React, { useEffect, useRef } from 'react';

interface Petal {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rot: number;
  vRot: number;
  alpha: number;
  hue: number; // 0 = pink petal, 1 = gold spirit spark
}

interface BurstParticle {
  active: boolean;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
}

export interface CanvasJuiceHandle {
  triggerBurst: (xRatio?: number, yRatio?: number, color?: string, heavy?: boolean) => void;
}

interface PetalCanvasProps {
  juiceRef?: React.MutableRefObject<CanvasJuiceHandle | null>;
  paused?: boolean;
}

const PETAL_COUNT = 38;
const BURST_POOL_SIZE = 64;

export const PetalCanvas: React.FC<PetalCanvasProps> = ({ juiceRef, paused = false }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pausedRef = useRef<boolean>(paused);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = 800);
    let height = (canvas.height = 450);

    // Pre-allocate ambient petals & spirit sparks (Zero-GC pool)
    const petals: Petal[] = Array.from({ length: PETAL_COUNT }, (_, idx) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: -18 - Math.random() * 28,
      vy: 20 + Math.random() * 34,
      size: 4 + Math.random() * 6,
      rot: Math.random() * Math.PI * 2,
      vRot: (Math.random() - 0.5) * 1.8,
      alpha: 0.35 + Math.random() * 0.45,
      hue: idx % 4 === 0 ? 1 : 0,
    }));

    // Pre-allocate burst ring buffer (Zero-GC pool)
    const burstPool: BurstParticle[] = Array.from({ length: BURST_POOL_SIZE }, () => ({
      active: false,
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      life: 0,
      maxLife: 1,
      size: 4,
      color: '#ffd97d',
    }));
    let burstCursor = 0;
    let hitstopTimer = 0;
    let flashAlpha = 0;

    if (juiceRef) {
      juiceRef.current = {
        triggerBurst: (xRatio = 0.5, yRatio = 0.5, color = '#ffd97d', heavy = false) => {
          const cx = width * xRatio;
          const cy = height * yRatio;
          const count = heavy ? 24 : 10;
          if (heavy) {
            hitstopTimer = 0.05; // 50ms sim hitstop on heavy impacts
            flashAlpha = 0.28;
          }
          for (let i = 0; i < count; i++) {
            const p = burstPool[burstCursor];
            burstCursor = (burstCursor + 1) % BURST_POOL_SIZE;
            const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.4;
            const speed = (heavy ? 140 : 75) + Math.random() * 140;
            p.active = true;
            p.x = cx;
            p.y = cy;
            p.vx = Math.cos(angle) * speed;
            p.vy = Math.sin(angle) * speed;
            p.maxLife = 0.45 + Math.random() * 0.35;
            p.life = p.maxLife;
            p.size = (heavy ? 4.5 : 3) + Math.random() * 3.5;
            p.color = color;
          }
        },
      };
    }

    let rafId = 0;
    let timerId = 0;
    let lastTime = performance.now();

    const tick = (now: number) => {
      const rawDt = (now - lastTime) / 1000;
      lastTime = now;
      // Clamp frame delta time per guidelines
      const dt = Math.min(rawDt, 0.05);

      if (!pausedRef.current) {
        ctx.clearRect(0, 0, width, height);

        if (flashAlpha > 0) {
          ctx.fillStyle = `rgba(255, 238, 195, ${flashAlpha.toFixed(3)})`;
          ctx.fillRect(0, 0, width, height);
          flashAlpha = Math.max(0, flashAlpha - dt * 2.2);
        }

        const simDt = hitstopTimer > 0 ? 0 : dt;
        if (hitstopTimer > 0) {
          hitstopTimer = Math.max(0, hitstopTimer - dt);
        }

        // Update & draw petals
        for (let i = 0; i < PETAL_COUNT; i++) {
          const p = petals[i];
          p.x += p.vx * simDt;
          p.y += p.vy * simDt;
          p.rot += p.vRot * simDt;

          if (p.y > height + 16) {
            p.y = -12;
            p.x = Math.random() * width;
          }
          if (p.x < -16) {
            p.x = width + 12;
            p.y = Math.random() * height;
          }

          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rot);
          ctx.globalAlpha = p.alpha;

          if (p.hue === 1) {
            ctx.fillStyle = '#ffe599';
            ctx.beginPath();
            ctx.arc(0, 0, p.size * 0.42, 0, Math.PI * 2);
            ctx.fill();
          } else {
            ctx.fillStyle = '#ffb7d5';
            ctx.beginPath();
            ctx.ellipse(0, 0, p.size, p.size * 0.56, 0, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.restore();
        }

        // Update & draw burst pool
        for (let i = 0; i < BURST_POOL_SIZE; i++) {
          const b = burstPool[i];
          if (!b.active) continue;
          b.life -= dt;
          if (b.life <= 0) {
            b.active = false;
            continue;
          }
          b.x += b.vx * dt;
          b.y += b.vy * dt;
          b.vy += 120 * dt;
          const ratio = Math.max(0, b.life / b.maxLife);
          ctx.save();
          ctx.globalAlpha = ratio;
          ctx.fillStyle = b.color;
          ctx.beginPath();
          ctx.arc(b.x, b.y, b.size * ratio, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

      timerId = window.setTimeout(() => {
        rafId = requestAnimationFrame(tick);
      }, 33);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      window.clearTimeout(timerId);
      cancelAnimationFrame(rafId);
    };
  }, [juiceRef]);

  return (
    <canvas
      ref={canvasRef}
      data-testid="petal-canvas"
      className="pointer-events-none absolute inset-0 z-10 h-full w-full"
    />
  );
};
