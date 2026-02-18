
import React, { useEffect, useRef } from 'react';

interface InteractiveBackgroundProps {
  theme: 'light' | 'dark';
}

export const InteractiveBackground: React.FC<InteractiveBackgroundProps> = ({ theme }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let mouseX = -1000;
    let mouseY = -1000;
    let lastMouseX = -1000;
    let lastMouseY = -1000;
    let isMouseMoving = false;
    let idleTimer: any;

    const repulsionRadius = 180;
    const gravityForce = 0.05;
    const friction = 0.92;

    class Particle {
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      vx: number;
      vy: number;
      size: number;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.baseX = x;
        this.baseY = y;
        this.vx = 0;
        this.vy = 0;
        this.size = Math.random() * 1.5 + 0.8;
      }

      getColor() {
        if (theme === 'dark') {
          return '#FFD700'; // Oltin rang
        } else {
          return '#000000'; // To'liq qora rang
        }
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.getColor();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }

      update() {
        let dx = mouseX - this.x;
        let dy = mouseY - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (isMouseMoving) {
          if (distance < repulsionRadius) {
            const force = (repulsionRadius - distance) / repulsionRadius;
            const angle = Math.atan2(dy, dx);
            this.vx -= Math.cos(angle) * force * 1.5;
            this.vy -= Math.sin(angle) * force * 1.5;
          }
        } else {
          if (distance < repulsionRadius + 60) {
            const pullForce = (repulsionRadius + 60 - distance) * 0.001;
            const angle = Math.atan2(dy, dx);
            const noise = (Math.random() - 0.5) * 0.3;
            this.vx += (Math.cos(angle + noise) * pullForce) * gravityForce * 20;
            this.vy += (Math.sin(angle + noise) * pullForce) * gravityForce * 20;
          }
        }

        let homeDx = this.baseX - this.x;
        let homeDy = this.baseY - this.y;
        this.vx += homeDx * 0.005;
        this.vy += homeDy * 0.005;

        this.vx *= friction;
        this.vy *= friction;
        this.x += this.vx;
        this.y += this.vy;
      }
    }

    const init = () => {
      particles = [];
      const columns = Math.floor(canvas.width / 28);
      const rows = Math.floor(canvas.height / 28);
      
      for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * 28 + (Math.random() - 0.5) * 15;
          const y = j * 28 + (Math.random() - 0.5) * 15;
          particles.push(new Particle(x, y));
        }
      }
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (mouseX !== lastMouseX || mouseY !== lastMouseY) {
        isMouseMoving = true;
        clearTimeout(idleTimer);
        idleTimer = setTimeout(() => {
          isMouseMoving = false;
        }, 150);
      }
      lastMouseX = mouseX;
      lastMouseY = mouseY;
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    
    handleResize();
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      clearTimeout(idleTimer);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none transition-colors duration-500"
      style={{ zIndex: -1, background: theme === 'dark' ? '#000000' : '#ffffff' }}
    />
  );
};
