import { useEffect, useRef } from 'react';

export default function SpaceParticles() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;

        // Arrays for different layers
        let stars: Star[] = [];
        let galaxyClouds: GalaxyCloud[] = [];
        let blackHole: BlackHole;

        let animationFrameId: number;

        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            initSpace();
        };

        class BlackHole {
            x: number;
            y: number;
            radius: number;
            diskRadius: number;
            opacity: number;

            constructor() {
                this.x = width * 0.8;
                this.y = height * 0.25;
                this.radius = 3;
                this.diskRadius = 15;
                this.opacity = 0.5;
            }

            update() {
                this.x -= 0.01;
                if (this.x < -100) {
                    this.x = width + 100;
                    this.y = Math.random() * height * 0.5;
                }
            }

            draw() {
                if (!ctx) return;
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.scale(1, 0.3);

                const diskGradient = ctx.createRadialGradient(0, 0, this.radius, 0, 0, this.diskRadius);
                diskGradient.addColorStop(0, `rgba(100, 80, 200, 0)`);
                diskGradient.addColorStop(0.5, `rgba(120, 100, 255, ${0.1 * this.opacity})`);
                diskGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

                ctx.beginPath();
                ctx.arc(0, 0, this.diskRadius, 0, Math.PI * 2);
                ctx.fillStyle = diskGradient;
                ctx.fill();
                ctx.restore();

                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(0, 0, 0, ${this.opacity})`;
                ctx.fill();

                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius + 1, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(150, 150, 200, ${0.1 * this.opacity})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
            }
        }

        class GalaxyCloud {
            x: number;
            y: number;
            radius: number;
            color: string;
            speed: number;

            constructor() {
                this.x = Math.random() * width;
                // Focus clouds in the middle band like the reference image
                // Spread more horizontally
                this.y = (height * 0.3) + (Math.random() * height * 0.4);
                this.radius = Math.random() * 200 + 100;
                this.speed = 0.02 + Math.random() * 0.03;

                // Colors from the reference: Deep Purple, Blue, Pink (Subtle)
                const colors = [
                    'rgba(88, 28, 135, 0.10)',  // Deep Purple
                    'rgba(59, 130, 246, 0.08)', // Blue
                    'rgba(76, 29, 149, 0.10)',  // Violet
                    'rgba(236, 72, 153, 0.08)', // Pink-500
                    'rgba(244, 114, 182, 0.06)', // Pink-400
                    'rgba(219, 39, 119, 0.08)', // Pink-600
                ];
                this.color = colors[Math.floor(Math.random() * colors.length)];
            }

            update() {
                this.x -= this.speed;
                if (this.x < -this.radius) {
                    this.x = width + this.radius;
                    this.y = (height * 0.3) + (Math.random() * height * 0.4);
                }
            }

            draw() {
                if (!ctx) return;
                // Soft gradient cloud
                const g = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
                g.addColorStop(0, this.color);
                g.addColorStop(1, 'rgba(0,0,0,0)');

                ctx.fillStyle = g;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        class Star {
            x: number;
            y: number;
            size: number;
            speed: number;
            brightness: number;
            color: string;

            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                const depth = Math.random();

                // Stars are smaller generally to mimic the dense field
                this.size = Math.random() < 0.9 ? Math.random() * 1 : Math.random() * 1.5;
                this.speed = 0.05 + (depth * 0.1);
                this.brightness = Math.random() * 0.7 + 0.3;

                // Slight tinting
                if (Math.random() > 0.8) {
                    this.color = '#c7d2fe'; // Blue-ish
                } else if (Math.random() > 0.9) {
                    this.color = '#e9d5ff'; // Purple-ish
                } else {
                    this.color = '#ffffff';
                }
            }

            update() {
                this.x -= this.speed;
                if (this.x < 0) {
                    this.x = width;
                    this.y = Math.random() * height;
                }
            }

            draw() {
                if (!ctx) return;
                ctx.fillStyle = this.color;
                ctx.globalAlpha = this.brightness;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
                ctx.globalAlpha = 1.0;
            }
        }

        const initSpace = () => {
            stars = [];
            galaxyClouds = [];

            // High density for that "Milky Way" look
            const starCount = Math.floor((width * height) / 600);
            for (let i = 0; i < starCount; i++) {
                stars.push(new Star());
            }

            // Add clouds
            for (let i = 0; i < 20; i++) {
                galaxyClouds.push(new GalaxyCloud());
            }

            blackHole = new BlackHole();
        };

        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            // 1. Draw Galaxy Clouds (Background)
            galaxyClouds.forEach(cloud => {
                cloud.update();
                cloud.draw();
            });

            // 2. Draw Stars
            stars.forEach(star => {
                star.update();
                star.draw();
            });

            // 3. Draw Black Hole
            if (blackHole) {
                blackHole.update();
                blackHole.draw();
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        window.addEventListener('resize', resize);
        resize();
        animate();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none"
            style={{ zIndex: 0 }}
        />
    );
}
