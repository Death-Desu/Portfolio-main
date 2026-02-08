import { useEffect, useRef } from 'react';

export default function TechParticles() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouse = useRef({ x: 0, y: 0 });
    const isMouseActive = useRef(false);

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

        // Colors fitting the Violet/Fuchsia theme
        const colors = [
            'rgba(167, 139, 250, ', // Violet-400
            'rgba(232, 121, 249, ', // Fuchsia-400
            'rgba(129, 140, 248, ', // Indigo-400
            'rgba(255, 255, 255, '  // White
        ];

        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width * pixelRatio;
            canvas.height = height * pixelRatio;
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            ctx.scale(pixelRatio, pixelRatio);
            initParticles();
        };

        class Particle {
            x: number;
            y: number;
            vx: number;
            vy: number;
            size: number;
            baseColor: string;
            alpha: number;
            targetAlpha: number;

            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.2; // Slow float
                this.vy = (Math.random() - 0.5) * 0.2;
                this.size = Math.random() * 2 + 0.5;
                this.baseColor = colors[Math.floor(Math.random() * colors.length)];
                this.alpha = Math.random() * 0.5 + 0.1;
                this.targetAlpha = this.alpha;
            }

            update() {
                // Base movement
                this.x += this.vx;
                this.y += this.vy;

                // Wall wrap
                if (this.x < 0) this.x = width;
                if (this.x > width) this.x = 0;
                if (this.y < 0) this.y = height;
                if (this.y > height) this.y = 0;

                // Mouse Interaction
                if (isMouseActive.current) {
                    const dx = mouse.current.x - this.x;
                    const dy = mouse.current.y - this.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    const maxDist = 200;

                    if (dist < maxDist) {
                        const force = (maxDist - dist) / maxDist;

                        // Push away
                        const angle = Math.atan2(dy, dx);
                        const pushX = Math.cos(angle) * force * 2;
                        const pushY = Math.sin(angle) * force * 2;

                        this.x -= pushX;
                        this.y -= pushY;

                        // Create connections (optional visual flair)
                        // If very close, increase alpha/size temporarily
                        this.alpha = Math.min(1, this.targetAlpha + force);
                    } else {
                        // Return to normal
                        this.alpha += (this.targetAlpha - this.alpha) * 0.05;
                    }
                }
            }

            draw() {
                if (!ctx) return;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.baseColor + this.alpha + ')';
                ctx.fill();
            }
        }

        const initParticles = () => {
            particles = [];
            const count = Math.min(Math.floor(width * 0.15), 300); // Density control
            for (let i = 0; i < count; i++) {
                particles.push(new Particle());
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            // Draw connections between close particles (The "Network" effect)
            // Optimization: Only check neighbors (simple grid or N^2 for low count)
            // With ~150 particles, N^2 is fine.
            ctx.lineWidth = 0.5;

            for (let i = 0; i < particles.length; i++) {
                const p1 = particles[i];
                p1.update();
                p1.draw();

                // Draw lines to nearby particles
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 100) {
                        const opacity = (100 - dist) / 100 * 0.2; // Low opacity lines
                        ctx.strokeStyle = `rgba(167, 139, 250, ${opacity})`;
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        window.addEventListener('resize', resize);

        const handleMouseMove = (e: MouseEvent) => {
            // Adjust for sticky/fixed positioning if needed, but for full screen fixed it's simpler
            mouse.current.x = e.clientX;
            mouse.current.y = e.clientY;
            isMouseActive.current = true;
        };

        const handleMouseLeave = () => {
            isMouseActive.current = false;
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);

        resize();
        animate();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none mix-blend-screen"
            style={{ zIndex: 1 }} // Internal Z-index relative to container
        />
    );
}
