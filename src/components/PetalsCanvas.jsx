import React, { useEffect, useRef } from 'react';

/**
 * Romantic Falling Rose Petals & Dreamy Fairy Glow Canvas
 * Features authentic 3D tumbling rose petals, soft breeze oscillation,
 * and delicate glowing micro-particles for an enchanting, romantic atmosphere.
 */
export default function PetalsCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Number of romantic petals tuned for elegance without clutter
    const petalCount = Math.min(28, Math.max(16, Math.floor(window.innerWidth / 40)));
    const petals = [];

    // Romantic palette: soft velvety blush roses, coral pinks, warm champagne tips
    const petalPalettes = [
      { top: '#f47285', mid: '#fca5b5', base: '#ffe4ea' }, // Classic soft rose
      { top: '#e15b74', mid: '#f893a5', base: '#fedbe2' }, // Romantic deep rose
      { top: '#f89ca5', mid: '#ffd0d7', base: '#fff0f3' }, // Blush cherry blossom
      { top: '#e8a57e', mid: '#ffd6be', base: '#fff3ea' }, // Warm peach rose
      { top: '#d59b4f', mid: '#f5d49b', base: '#fff5df' }, // Golden rose accent
    ];

    for (let i = 0; i < petalCount; i++) {
      const palette = petalPalettes[Math.floor(Math.random() * petalPalettes.length)];
      const size = 6 + Math.random() * 8; // petal radius

      petals.push({
        x: Math.random() * width,
        y: Math.random() * height - height * 0.8,
        size,
        palette,
        speedY: 0.65 + Math.random() * 0.85, // gentle falling drift
        speedX: -0.2 + Math.random() * 0.4,
        swayAngle: Math.random() * Math.PI * 2,
        swaySpeed: 0.012 + Math.random() * 0.015,
        swayAmp: 0.9 + Math.random() * 1.4,
        flipAngle: Math.random() * Math.PI * 2,
        flipSpeed: 0.018 + Math.random() * 0.025, // 3D tumble flip speed
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.016,
        opacity: 0.45 + Math.random() * 0.35,
      });
    }

    // Rare floating fairy light / starlight specks
    const fairyDustCount = 14;
    const fairyDust = [];
    for (let i = 0; i < fairyDustCount; i++) {
      fairyDust.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: 1.2 + Math.random() * 2,
        speedY: -(0.2 + Math.random() * 0.3),
        speedX: (Math.random() - 0.5) * 0.2,
        phase: Math.random() * Math.PI * 2,
        phaseSpeed: 0.02 + Math.random() * 0.02,
        baseAlpha: 0.2 + Math.random() * 0.4,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Draw gentle fairy lights
      fairyDust.forEach((f) => {
        f.y += f.speedY;
        f.x += f.speedX;
        f.phase += f.phaseSpeed;

        if (f.y < -10) f.y = height + 10;
        if (f.x < -10) f.x = width + 10;
        if (f.x > width + 10) f.x = -10;

        const alpha = Math.max(0.1, f.baseAlpha + Math.sin(f.phase) * (f.baseAlpha * 0.6));
        const glow = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.radius * 2.5);
        glow.addColorStop(0, `rgba(255, 255, 255, ${alpha * 0.9})`);
        glow.addColorStop(0.5, `rgba(244, 184, 170, ${alpha * 0.6})`);
        glow.addColorStop(1, 'rgba(244, 184, 170, 0)');

        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.radius * 2.5, 0, Math.PI * 2);
        ctx.fill();
      });

      // 2. Draw 3D tumbling rose petals
      petals.forEach((p) => {
        p.swayAngle += p.swaySpeed;
        p.flipAngle += p.flipSpeed;
        p.rotation += p.rotationSpeed;

        p.y += p.speedY;
        p.x += p.speedX + Math.sin(p.swayAngle) * p.swayAmp;

        // Recycle petal when falling beyond bottom or sides
        if (p.y > height + 25) {
          p.y = -25;
          p.x = Math.random() * width;
        }
        if (p.x < -30) p.x = width + 30;
        if (p.x > width + 30) p.x = -30;

        const flipScale = Math.cos(p.flipAngle); // realistic 3D paper/petal tumble

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.scale(flipScale, 1);
        ctx.globalAlpha = p.opacity;

        // Shaded rose petal gradient
        const grad = ctx.createLinearGradient(0, -p.size, 0, p.size);
        grad.addColorStop(0, p.palette.top);
        grad.addColorStop(0.5, p.palette.mid);
        grad.addColorStop(1, p.palette.base);

        ctx.fillStyle = grad;

        // Natural curved rose petal contour
        ctx.beginPath();
        ctx.moveTo(0, -p.size * 1.35);
        ctx.bezierCurveTo(
          p.size * 0.95,
          -p.size * 0.65,
          p.size * 0.9,
          p.size * 0.6,
          0,
          p.size * 1.15
        );
        ctx.bezierCurveTo(
          -p.size * 0.9,
          p.size * 0.6,
          -p.size * 0.95,
          -p.size * 0.65,
          0,
          -p.size * 1.35
        );
        ctx.fill();

        // Delicate central petal vein highlight
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(0, -p.size * 0.9);
        ctx.quadraticCurveTo(p.size * 0.1, 0, 0, p.size * 0.85);
        ctx.stroke();

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10 w-full h-full"
      aria-hidden="true"
    />
  );
}
