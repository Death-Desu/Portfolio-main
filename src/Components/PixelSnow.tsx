import { useEffect, useRef } from 'react';

export default function PixelSnow() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;
        let particles: Particle[] = [];
        let animationFrameId: number;

        const pixelRatio = window.devicePixelRatio || 1;

        // Resize
        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width * pixelRatio;
            canvas.height = height * pixelRatio;
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            ctx.scale(pixelRatio, pixelRatio);
        };

        window.addEventListener('resize', resize);
        resize();

        // Snowflake Logic
        class Particle {
            x: number;
            y: number;
            size: number;
            speedY: number;
            speedX: number;
            rotation: number;
            rotationSpeed: number;
            depth: number;

            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.depth = Math.random(); // 0 (far) to 1 (near)

                // Size varies based on depth: Far (2px) -> Near (15px)
                // User wants "see them sometimes closely", so we allow big ones.
                // We bias towards smaller, but allow some big ones.
                const isClose = Math.random() < 0.05; // 5% chance of being very close
                this.depth = isClose ? 0.8 + Math.random() * 0.2 : Math.random() * 0.5;

                this.size = 2 + (this.depth * 15);
                this.speedY = 0.5 + (this.depth * 1.5); // Near moves faster
                this.speedX = (Math.random() - 0.5) * 0.5;
                this.rotation = Math.random() * Math.PI * 2;
                this.rotationSpeed = (Math.random() - 0.5) * 0.02;
            }

            update() {
                this.y += this.speedY;
                this.x += this.speedX + Math.sin(this.y * 0.01) * 0.2; // Wobbly fall
                this.rotation += this.rotationSpeed;

                // Reset
                if (this.y > height + this.size) {
                    this.y = -this.size;
                    this.x = Math.random() * width;
                }
                if (this.x > width + this.size) this.x = -this.size;
                if (this.x < -this.size) this.x = width + this.size;
            }

            draw() {
                if (!ctx) return;

                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate(this.rotation);

                ctx.strokeStyle = `rgba(255, 255, 255, ${0.4 + (this.depth * 0.6)})`; // Near = brighter
                ctx.lineWidth = 1 + (this.depth * 0.5); // Thicker if near
                ctx.lineCap = 'round';

                // Draw Snowflake (6 branches)
                const radius = this.size;
                ctx.beginPath();
                for (let i = 0; i < 6; i++) {
                    ctx.moveTo(0, 0);
                    const angle = (i * 60 * Math.PI) / 180;
                    const endX = Math.cos(angle) * radius;
                    const endY = Math.sin(angle) * radius;
                    ctx.lineTo(endX, endY);

                    // Branch details (only for larger flakes to save performance/detail)
                    if (this.size > 5) {
                        const subLen = radius * 0.4;
                        const subX = Math.cos(angle) * (radius * 0.6);
                        const subY = Math.sin(angle) * (radius * 0.6);

                        // V shape on branch
                        const angleOffset = 45 * Math.PI / 180;
                        ctx.moveTo(subX, subY);
                        ctx.lineTo(subX + Math.cos(angle + angleOffset) * subLen, subY + Math.sin(angle + angleOffset) * subLen);

                        ctx.moveTo(subX, subY);
                        ctx.lineTo(subX + Math.cos(angle - angleOffset) * subLen, subY + Math.sin(angle - angleOffset) * subLen);
                    }
                }
                ctx.stroke();

                ctx.restore();
            }
        }

        // Init Particles
        // Fewer particles if drawing complex shapes
        const particleCount = Math.floor(width * 0.05);
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        // Loop
        const render = () => {
            ctx.clearRect(0, 0, width, height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-50 pointer-events-none mix-blend-screen"
        />
    );
}
