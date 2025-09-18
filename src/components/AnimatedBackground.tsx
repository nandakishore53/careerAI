"use client";
import { useEffect, useRef } from "react";

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // --- Particle setup ---
    const particles = Array.from({ length: 100 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 2 + 1,
      dx: (Math.random() - 0.5) * 0.2, // slow drift
      dy: (Math.random() - 0.5) * 0.2,
    }));

    // --- Wave setup (slow & subtle) ---
    const waves = [
      { amp: 40, len: 250, speed: 0.0003, color: "rgba(0,150,255,0.25)" },
      { amp: 60, len: 350, speed: 0.0002, color: "rgba(0,100,255,0.2)" },
      { amp: 30, len: 150, speed: 0.0004, color: "rgba(0,200,255,0.15)" },
    ];

    let t = 0;

    function draw() {
      ctx.clearRect(0, 0, width, height);

      // Black background
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, width, height);

      // Bokeh flickers
      for (let i = 0; i < 15; i++) {
        ctx.beginPath();
        ctx.arc(
          Math.random() * width,
          Math.random() * height,
          Math.random() * 100,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = "rgba(255,255,255,0.02)";
        ctx.fill();
      }

      // Waves
      waves.forEach((wave, i) => {
        ctx.beginPath();
        for (let x = 0; x <= width; x++) {
          const y =
            Math.sin((x / wave.len + t * wave.speed) * Math.PI * 2) *
              wave.amp +
            height / 2 +
            i * 40;
          ctx.lineTo(x, y);
        }
        ctx.strokeStyle = wave.color;
        ctx.lineWidth = 2;
        ctx.stroke();
      });

      // Particles
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0,180,255,0.6)";
        ctx.fill();

        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > width) p.dx *= -1;
        if (p.y < 0 || p.y > height) p.dy *= -1;
      });

      t += 0.2; // very slow
      requestAnimationFrame(draw);
    }
    draw();

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);

    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full -z-10"
    />
  );
}
