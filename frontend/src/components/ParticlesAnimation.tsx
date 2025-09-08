'use client';

import { useEffect, useRef } from 'react';

const ParticlesAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle class
    class Particle {
      x: number;
      y: number;
      targetX: number;
      targetY: number;
      text: string;
      size: number;
      speedX: number;
      speedY: number;
      life: number;
      decay: number;
      color: string;

      constructor(x: number, y: number, targetX: number, targetY: number, text: string) {
        this.x = x;
        this.y = y;
        this.targetX = targetX;
        this.targetY = targetY;
        this.text = text;
        this.size = Math.random() * 3 + 1;
        this.speedX = (targetX - x) * 0.02;
        this.speedY = (targetY - y) * 0.02;
        this.life = 1;
        this.decay = Math.random() * 0.02 + 0.005;
        this.color = `hsl(${200 + Math.random() * 60}, 70%, ${60 + Math.random() * 40}%)`;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life -= this.decay;

        // Add some randomness
        this.speedX += (Math.random() - 0.5) * 0.5;
        this.speedY += (Math.random() - 0.5) * 0.5;

        // Damping
        this.speedX *= 0.99;
        this.speedY *= 0.99;
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.life;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    // Text formation class
    class TextFormation {
      text: string;
      x: number;
      y: number;
      fontSize: number;
      particles: Particle[];
      formationComplete: boolean;

      constructor(text: string, x: number, y: number, fontSize: number = 60) {
        this.text = text;
        this.x = x;
        this.y = y;
        this.fontSize = fontSize;
        this.particles = [];
        this.formationComplete = false;
        this.createParticles();
      }

      createParticles() {
        ctx.font = `${this.fontSize}px Arial`;
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        const textWidth = ctx.measureText(this.text).width;
        const textHeight = this.fontSize;

        // Create particles for text formation
        for (let i = 0; i < 100; i++) {
          const x = Math.random() * canvas.width;
          const y = Math.random() * canvas.height;

          // Calculate target position within text bounds
          const targetX = this.x - textWidth / 2 + Math.random() * textWidth;
          const targetY = this.y - textHeight / 2 + Math.random() * textHeight;

          this.particles.push(new Particle(x, y, targetX, targetY, this.text));
        }
      }

      update() {
        this.particles.forEach((particle, index) => {
          particle.update();

          // Remove dead particles
          if (particle.life <= 0) {
            this.particles.splice(index, 1);
          }
        });

        // Check if formation is complete
        if (this.particles.length === 0 && !this.formationComplete) {
          this.formationComplete = true;
        }
      }

      draw() {
        this.particles.forEach(particle => particle.draw());
      }
    }

    // Animation state
    let formations: TextFormation[] = [];
    let currentFormationIndex = 0;
    const texts = ['Build', 'Bitwreckers', 'Innovate'];
    let time = 0;

    // Create initial formation
    const createNewFormation = () => {
      const text = texts[currentFormationIndex];
      const formation = new TextFormation(
        text,
        canvas.width / 2,
        canvas.height / 2 - 100
      );
      formations.push(formation);
      currentFormationIndex = (currentFormationIndex + 1) % texts.length;
    };

    // Initial formation
    createNewFormation();

    // Animation loop
    const animate = () => {
      time += 0.016; // 60fps

      // Clear canvas with fade effect
      ctx.fillStyle = 'rgba(30, 58, 138, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw formations
      formations.forEach((formation, index) => {
        formation.update();
        formation.draw();

        // Remove completed formations after some time
        if (formation.formationComplete && time > 3) {
          formations.splice(index, 1);
        }
      });

      // Create new formation every 4 seconds
      if (time > 4) {
        createNewFormation();
        time = 0;
      }

      // Add floating particles
      if (Math.random() < 0.1) {
        const x = Math.random() * canvas.width;
        const y = canvas.height + 10;
        const targetX = Math.random() * canvas.width;
        const targetY = -10;

        const particle = new Particle(x, y, targetX, targetY, '');
        formations[0]?.particles.push(particle);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ background: 'transparent' }}
    />
  );
};

export default ParticlesAnimation;
