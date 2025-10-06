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

    // Theme colors - Purple & Teal
    const colors = {
      purple: ['#6B2D73', '#9347a0', '#b376bf', '#d4aad9'],
      teal: ['#2D7363', '#5fa896'],
      accent: ['#7b3985', '#5c2663']
    };

    // Pixel Block class - 8-bit style
    class PixelBlock {
      x: number;
      y: number;
      targetX: number;
      targetY: number;
      size: number;
      color: string;
      alpha: number;
      speedX: number;
      speedY: number;
      rotation: number;
      rotationSpeed: number;
      pulsePhase: number;
      buildProgress: number;
      isBuilding: boolean;
      delay: number;

      constructor(x: number, y: number, targetX: number, targetY: number, size: number, delay: number = 0) {
        this.x = x;
        this.y = y;
        this.targetX = targetX;
        this.targetY = targetY;
        this.size = size;
        this.delay = delay;
        
        // Random color from theme
        const colorSet = Math.random() > 0.3 ? colors.purple : (Math.random() > 0.5 ? colors.teal : colors.accent);
        this.color = colorSet[Math.floor(Math.random() * colorSet.length)];
        
        this.alpha = 0;
        this.speedX = (targetX - x) * 0.015;
        this.speedY = (targetY - y) * 0.015;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.1;
        this.pulsePhase = Math.random() * Math.PI * 2;
        this.buildProgress = 0;
        this.isBuilding = false;
      }

      update(time: number) {
        // Delay before starting
        if (this.delay > 0) {
          this.delay -= 0.016;
          return;
        }

        // Move towards target
        const dx = this.targetX - this.x;
        const dy = this.targetY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > 1) {
          this.x += this.speedX;
          this.y += this.speedY;
          this.alpha = Math.min(this.alpha + 0.02, 0.8);
          this.rotation += this.rotationSpeed;
        } else {
          // Arrived at target - start building
          this.isBuilding = true;
          this.x = this.targetX;
          this.y = this.targetY;
          this.buildProgress = Math.min(this.buildProgress + 0.03, 1);
          this.alpha = 0.9;
          this.rotation = 0;
        }

        // Pulse effect
        this.pulsePhase += 0.05;
      }

      draw() {
        if (this.delay > 0 || this.alpha < 0.01) return;
        if (!ctx) return;

        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.translate(this.x + this.size / 2, this.y + this.size / 2);
        
        if (!this.isBuilding) {
          ctx.rotate(this.rotation);
        }

        // Draw pixel block with glow
        const pulse = Math.sin(this.pulsePhase) * 0.15 + 1;
        const currentSize = this.size * (this.isBuilding ? this.buildProgress : 1) * pulse;

        // Glow effect
        if (this.isBuilding) {
          ctx.shadowColor = this.color;
          ctx.shadowBlur = 15;
        }

        // Main block
        ctx.fillStyle = this.color;
        ctx.fillRect(-currentSize / 2, -currentSize / 2, currentSize, currentSize);

        // Inner highlight (8-bit style)
        ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.fillRect(-currentSize / 2, -currentSize / 2, currentSize * 0.3, currentSize * 0.3);

        // Border
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 1;
        ctx.strokeRect(-currentSize / 2, -currentSize / 2, currentSize, currentSize);

        ctx.restore();
      }
    }

    // Grid Pattern Generator
    class GridPattern {
      blocks: PixelBlock[];
      centerX: number;
      centerY: number;
      gridSize: number;
      blockSize: number;
      pattern: number[][];
      time: number;

      constructor(centerX: number, centerY: number) {
        this.blocks = [];
        this.centerX = centerX;
        this.centerY = centerY;
        this.gridSize = 8;
        this.blockSize = 20;
        this.time = 0;
        
        // Random pattern (8-bit logo inspired)
        this.pattern = this.generatePattern();
        this.createBlocks();
      }

      generatePattern(): number[][] {
        const patterns = [
          // Pattern 1: "E" shape
          [
            [1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0],
            [1, 1, 1, 1, 0],
            [1, 0, 0, 0, 0],
            [1, 1, 1, 1, 1]
          ],
          // Pattern 2: Plus shape
          [
            [0, 0, 1, 0, 0],
            [0, 0, 1, 0, 0],
            [1, 1, 1, 1, 1],
            [0, 0, 1, 0, 0],
            [0, 0, 1, 0, 0]
          ],
          // Pattern 3: Diamond
          [
            [0, 0, 1, 0, 0],
            [0, 1, 1, 1, 0],
            [1, 1, 1, 1, 1],
            [0, 1, 1, 1, 0],
            [0, 0, 1, 0, 0]
          ],
          // Pattern 4: Grid
          [
            [1, 0, 1, 0, 1],
            [0, 1, 0, 1, 0],
            [1, 0, 1, 0, 1],
            [0, 1, 0, 1, 0],
            [1, 0, 1, 0, 1]
          ]
        ];
        return patterns[Math.floor(Math.random() * patterns.length)];
      }

      createBlocks() {
        if (!canvas) return;
        
        this.blocks = [];
        const patternHeight = this.pattern.length;
        const patternWidth = this.pattern[0].length;
        
        let delayCounter = 0;
        
        for (let row = 0; row < patternHeight; row++) {
          for (let col = 0; col < patternWidth; col++) {
            if (this.pattern[row][col] === 1) {
              const targetX = this.centerX + (col - patternWidth / 2) * this.blockSize;
              const targetY = this.centerY + (row - patternHeight / 2) * this.blockSize;
              
              // Random start position (from edges)
              const side = Math.floor(Math.random() * 4);
              let startX, startY;
              
              switch(side) {
                case 0: // Top
                  startX = Math.random() * canvas.width;
                  startY = -50;
                  break;
                case 1: // Right
                  startX = canvas.width + 50;
                  startY = Math.random() * canvas.height;
                  break;
                case 2: // Bottom
                  startX = Math.random() * canvas.width;
                  startY = canvas.height + 50;
                  break;
                default: // Left
                  startX = -50;
                  startY = Math.random() * canvas.height;
              }
              
              const block = new PixelBlock(startX, startY, targetX, targetY, this.blockSize, delayCounter * 0.05);
              this.blocks.push(block);
              delayCounter++;
            }
          }
        }
      }

      update(time: number) {
        this.time = time;
        this.blocks.forEach(block => block.update(time));
      }

      draw() {
        this.blocks.forEach(block => block.draw());
      }

      isComplete(): boolean {
        return this.blocks.every(block => block.isBuilding && block.buildProgress >= 1);
      }
    }

    // Floating pixel debris
    class FloatingPixel {
      x: number = 0;
      y: number = 0;
      size: number = 1;
      color: string = "#ffffff";
      alpha: number = 1;
      speedY: number = 0;
      wobble: number = 0;
      wobbleSpeed: number = 0;

      constructor() {
        if (!canvas) return;
        
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + 20;
        this.size = Math.random() * 8 + 4;
        
        const allColors = [...colors.purple, ...colors.teal, ...colors.accent];
        this.color = allColors[Math.floor(Math.random() * allColors.length)];
        
        this.alpha = Math.random() * 0.3 + 0.2;
        this.speedY = -(Math.random() * 0.5 + 0.3);
        this.wobble = Math.random() * Math.PI * 2;
        this.wobbleSpeed = Math.random() * 0.02 + 0.01;
      }

      update() {
        if (!canvas) return;
        
        this.y += this.speedY;
        this.wobble += this.wobbleSpeed;
        this.x += Math.sin(this.wobble) * 0.5;

        if (this.y < -20) {
          this.y = canvas.height + 20;
          this.x = Math.random() * canvas.width;
        }
      }

      draw() {
        if (!ctx) return;
        
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size, this.size);
        ctx.restore();
      }
    }

    // Animation state
    let patterns: GridPattern[] = [];
    let floatingPixels: FloatingPixel[] = [];
    let time = 0;
    let nextPatternTime = 2;

    // Create floating background pixels
    for (let i = 0; i < 30; i++) {
      floatingPixels.push(new FloatingPixel());
    }

    // Create initial pattern
    const createNewPattern = () => {
      if (!canvas) return;
      
      const x = canvas.width / 2 + (Math.random() - 0.5) * 300;
      const y = canvas.height / 2 + (Math.random() - 0.5) * 200;
      patterns.push(new GridPattern(x, y));
    };

    createNewPattern();

    // Animation loop
    const animate = () => {
      if (!ctx) return;
      
      time += 0.016; // 60fps

      // Clear with fade effect
      ctx.fillStyle = 'rgba(15, 15, 27, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw floating pixels
      floatingPixels.forEach(pixel => {
        pixel.update();
        pixel.draw();
      });

      // Update and draw patterns
      patterns.forEach((pattern, index) => {
        pattern.update(time);
        pattern.draw();

        // Remove completed patterns after some time
        if (pattern.isComplete() && time > nextPatternTime + 3) {
          patterns.splice(index, 1);
        }
      });

      // Create new pattern
      if (time > nextPatternTime && patterns.length < 2) {
        createNewPattern();
        nextPatternTime = time + (Math.random() * 2 + 3);
      }

      // Add occasional new floating pixel
      if (Math.random() < 0.05 && floatingPixels.length < 40) {
        floatingPixels.push(new FloatingPixel());
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
