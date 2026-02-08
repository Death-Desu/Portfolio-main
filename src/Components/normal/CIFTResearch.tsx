import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// --- VISUAL CORE: INFORMATION FIELD SIMULATOR ---
const CIFTVisualCore = ({ compositionStrength = 1.0 }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = canvas.offsetWidth;
        let height = canvas.offsetHeight;
        let particles: Particle[] = [];
        let animationId: number;
        let mouse = { x: -1000, y: -1000 };

        const resizeCanvas = () => {
            width = canvas.offsetWidth;
            height = canvas.offsetHeight;
            canvas.width = width;
            canvas.height = height;
        };

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        };

        class Particle {
            x: number; y: number; vx: number; vy: number;
            radius: number; color: string; entropy: number;

            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 1.5;
                this.vy = (Math.random() - 0.5) * 1.5;
                this.radius = Math.random() * 1.5 + 1;
                this.entropy = Math.random();
                this.color = `hsla(${210 + Math.random() * 40}, 80%, 70%, 0.6)`;
            }

            update() {
                const drift = compositionStrength < 1 ? 2 : 0.5;
                this.x += this.vx * drift;
                this.y += this.vy * drift;

                const dx = this.x - mouse.x;
                const dy = this.y - mouse.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 150) {
                    const force = (150 - distance) / 150;
                    this.x += (dx / distance) * force * 8;
                    this.y += (dy / distance) * force * 8;
                }

                if (this.x < 0) this.x = width; if (this.x > width) this.x = 0;
                if (this.y < 0) this.y = height; if (this.y > height) this.y = 0;
            }

            draw() {
                if (!ctx) return;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
            }
        }

        const init = () => {
            particles = [];
            for (let i = 0; i < 100; i++) particles.push(new Particle());
        };

        const animate = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
            ctx.fillRect(0, 0, width, height);

            if (compositionStrength > 0.8) {
                ctx.strokeStyle = `hsla(200, 50%, 50%, ${0.1 * compositionStrength})`;
                ctx.lineWidth = 0.5;
                for (let i = 0; i < particles.length; i++) {
                    for (let j = i + 1; j < particles.length; j++) {
                        const dx = particles[i].x - particles[j].x;
                        const dy = particles[i].y - particles[j].y;
                        const dist = Math.sqrt(dx * dx + dy * dy);
                        if (dist < 100) {
                            ctx.beginPath();
                            ctx.moveTo(particles[i].x, particles[i].y);
                            ctx.lineTo(particles[j].x, particles[j].y);
                            ctx.stroke();
                        }
                    }
                }
            }

            particles.forEach(p => { p.update(); p.draw(); });
            animationId = requestAnimationFrame(animate);
        };

        window.addEventListener('resize', resizeCanvas);
        canvas.addEventListener('mousemove', handleMouseMove);
        resizeCanvas();
        init();
        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            canvas.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationId);
        };
    }, [compositionStrength]);

    return <canvas ref={canvasRef} className="w-full h-full" />;
};

// --- MAIN PAGE COMPONENT ---
export default function CIFTResearch() {
    const compositionStrength = 1.0; // Static value for visual core
    const navigate = useNavigate();

    return (
        <div className="bg-[#020202] text-slate-100 font-sans overflow-y-auto h-screen snap-y snap-mandatory selection:bg-blue-500/30" style={{ scrollbarWidth: 'thin', scrollbarColor: '#1e40af #0a0a0a' }}>

            {/* SECTION 1: HERO */}
            <section className="min-h-screen snap-start flex flex-col justify-center px-8 md:px-20 lg:px-32 relative border-b border-white/5 py-20">
                {/* Back Navigation */}
                <button
                    onClick={() => navigate('/')}
                    className="fixed top-8 left-8 z-50 group flex items-center gap-2 px-4 py-2 bg-black/60 hover:bg-black/80 border border-white/10 hover:border-blue-500/50 rounded-lg backdrop-blur-md transition-all duration-300"
                >
                    <svg className="w-4 h-4 text-blue-400 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    <span className="text-xs uppercase tracking-wider text-slate-400 group-hover:text-white transition-colors">Back to Portfolio</span>
                </button>

                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1.5 }}>
                    <span className="text-blue-600 font-mono tracking-[0.4em] text-xs mb-6 uppercase block">Complex Information Field Theory</span>
                    <h1 className="text-7xl md:text-8xl lg:text-9xl font-extralight tracking-tighter mb-8 text-white leading-none">CIFT</h1>
                    <p className="max-w-5xl text-xl md:text-2xl lg:text-3xl text-slate-400 font-light leading-relaxed">
                        Treating the universe as a high-dimensional information topology where <span className="text-white font-normal">"State" precedes "Substance."</span> Information is not a derivative of matter, but the fundamental substrate from which Spacetime and Matter emerge.
                    </p>
                </motion.div>
                <div className="absolute bottom-10 left-8 md:left-32 text-[10px] text-zinc-700 font-mono animate-bounce tracking-widest">SCROLL_TO_INITIATE_MONOGRAPH</div>
            </section>

            {/* SECTION 2: INTERACTIVE LAB */}
            <section className="min-h-screen snap-start flex flex-col lg:flex-row bg-[#050505] overflow-hidden relative border-b border-white/5">
                <div className="w-full lg:w-2/3 h-[50vh] lg:h-screen relative">
                    <CIFTVisualCore compositionStrength={compositionStrength} />
                    <div className="absolute top-10 left-10 p-4 border-l-2 border-blue-500 bg-black/60 backdrop-blur-md">
                        <span className="block text-[10px] text-blue-500 font-bold uppercase mb-1">Live_Field_State</span>
                        <span className="text-3xl font-mono font-light">{compositionStrength.toFixed(2)} <span className="text-xs text-zinc-500">C<sub>s</sub></span></span>
                    </div>
                </div>
                <div className="w-full lg:w-1/3 p-12 lg:p-16 flex flex-col justify-center bg-zinc-950 border-l border-white/5">
                    <h2 className="text-3xl lg:text-4xl font-light italic text-white mb-6">Field Topology Simulator</h2>
                    <p className="text-slate-400 font-light leading-relaxed mb-8 text-base">
                        This simulation renders the <span className="text-blue-400 font-mono">S<sub>inf</sub></span> (Information Subspace). Lower composition strengths represent the 4.2-minute decay limit, where self-reinforcing loops fail and data dissipates into entropy.
                    </p>
                    <div className="space-y-4 py-6 border-t border-white/5">
                        <div className="flex justify-between text-[11px] font-mono text-zinc-500">
                            <span>τ<sub>c</sub> (Coherence Constant)</span>
                            <span className="text-white font-bold">4.2 minutes</span>
                        </div>
                        <div className="text-xs text-zinc-600 italic mt-2">
                            Critical decay threshold for information field coherence
                        </div>
                    </div>

                    {/* Major Simulation Card - Coming Soon */}
                    <div
                        className="mt-12 p-10 bg-gradient-to-br from-blue-950/60 via-cyan-950/50 to-purple-950/60 border-2 border-blue-500/40 rounded-lg hover:border-blue-400 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all duration-500 group relative overflow-hidden cursor-not-allowed opacity-75"
                    >
                        {/* Animated Background */}
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-blue-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>

                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-blue-400 text-xs uppercase tracking-[0.3em] font-mono font-bold">Interactive Simulation</span>
                                <svg className="w-6 h-6 text-blue-400 group-hover:translate-x-2 group-hover:scale-110 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </div>

                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors">
                                CIFT Field Dynamics Simulator
                            </h3>

                            <p className="text-sm md:text-base text-slate-400 leading-relaxed mb-6">
                                Experience real-time visualization of information solitons, temporal placeholders, and subspace manifold interactions. Adjust field parameters and observe the 4.2-minute decay constant in action.
                            </p>

                            <div className="flex flex-wrap gap-3">
                                <span className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full text-xs text-blue-300 font-mono">Real-time Physics</span>
                                <span className="px-3 py-1 bg-cyan-500/20 border border-cyan-500/30 rounded-full text-xs text-cyan-300 font-mono">3D Visualization</span>
                                <span className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full text-xs text-purple-300 font-mono">Interactive Controls</span>
                            </div>

                            <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-between">
                                <span className="text-xs text-zinc-500 uppercase tracking-wider">Full Simulation</span>
                                <div className="flex items-center gap-2 text-zinc-600 font-bold text-sm">
                                    <span>Coming Soon</span>
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 3: CORE MATHEMATICAL ARCHITECTURE */}
            <section className="min-h-screen snap-start bg-black px-8 md:px-20 lg:px-32 py-32 border-b border-white/5">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                    <h2 className="text-5xl md:text-6xl font-light text-white mb-8">I. The Core Mathematical Architecture</h2>
                    <p className="text-slate-500 text-lg mb-20 max-w-4xl">Defining the fundamental structures and constants that govern information topology in CIFT.</p>
                </motion.div>

                <div className="space-y-24">
                    {/* 1. Subspace Manifold */}
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="border-l-4 border-blue-500 pl-8">
                        <h3 className="text-blue-400 text-sm uppercase tracking-[0.3em] font-bold mb-6">01. The Subspace Manifold (S<sub>inf</sub>)</h3>
                        <p className="text-lg md:text-xl text-slate-300 leading-relaxed mb-8 max-w-5xl">
                            Unlike Euclidean space, the <strong className="text-white">Information Subspace</strong> is a Non-Local Hilbert Space. Distance is not defined by meters, but by <strong className="text-white">Information Divergence</strong>.
                        </p>

                        <div className="bg-zinc-900/50 border border-white/10 p-8 rounded-sm mb-6">
                            <div className="text-xs text-zinc-500 uppercase tracking-wider mb-3 font-mono">Metric: Kullback-Leibler Divergence</div>
                            <p className="text-base text-slate-400 leading-relaxed font-light">
                                We use the Kullback–Leibler Divergence (D<sub>KL</sub>) to measure the distance between two information states. If state A and state B have high mutual information, they are topologically adjacent in S<sub>inf</sub>, regardless of their physical distance in 3D space.
                            </p>
                            <div className="mt-4 pt-4 border-t border-white/5">
                                <p className="text-sm text-zinc-600 italic">Concept: Proximity in information space ≠ proximity in physical space</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* 2. The 4.2 Minute Constant */}
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="border-l-4 border-cyan-500 pl-8">
                        <h3 className="text-cyan-400 text-sm uppercase tracking-[0.3em] font-bold mb-6">02. The 4.2 Minute Coherence Constant (τ<sub>c</sub>)</h3>
                        <p className="text-lg md:text-xl text-slate-300 leading-relaxed mb-8 max-w-5xl">
                            In CIFT, the biological body acts as a <strong className="text-white">Temporal Tether</strong> or a "Phase-Lock" mechanism. Post-cessation, the structural integrity of the field follows a non-linear decay.
                        </p>

                        <div className="bg-gradient-to-br from-cyan-950/30 to-blue-950/30 border border-cyan-900/30 p-10 rounded-sm mb-6">
                            <div className="text-xs text-cyan-400 uppercase tracking-wider mb-6 font-mono">The Decay Formula</div>
                            <div className="text-center py-8 bg-black/40 rounded border border-white/5 mb-6">
                                <p className="text-3xl md:text-4xl font-serif italic text-cyan-100">
                                    Γ(t) = Γ<sub>0</sub> · erfc( t / (τ<sub>c</sub>√2) )
                                </p>
                            </div>
                            <div className="space-y-3 text-sm text-slate-400">
                                <div className="flex gap-4"><span className="text-cyan-300 font-mono min-w-[80px]">Γ(t)</span><span>Structural integrity of the information field over time</span></div>
                                <div className="flex gap-4"><span className="text-cyan-300 font-mono min-w-[80px]">Γ<sub>0</sub></span><span>Initial field strength at biological cessation</span></div>
                                <div className="flex gap-4"><span className="text-cyan-300 font-mono min-w-[80px]">τ<sub>c</sub></span><span>4.2 minutes (The Critical Point)</span></div>
                                <div className="flex gap-4"><span className="text-cyan-300 font-mono min-w-[80px]">erfc</span><span>Complementary error function (non-linear decay)</span></div>
                            </div>
                        </div>

                        <div className="bg-zinc-900/30 border-l-2 border-cyan-500/30 pl-6 py-4">
                            <p className="text-base text-slate-400 leading-relaxed">
                                <strong className="text-white">Scientific Basis:</strong> τ<sub>c</sub> (4.2 minutes) represents the "Critical Point" where the entropy of the local information field exceeds the threshold required for physical reintegration. This is CIFT's most groundbreaking prediction—a specific, measurable constant for information-matter decoupling.
                            </p>
                        </div>
                    </motion.div>

                    {/* 3. Information Solitons */}
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="border-l-4 border-emerald-500 pl-8">
                        <h3 className="text-emerald-400 text-sm uppercase tracking-[0.3em] font-bold mb-6">03. Information Solitons (The Composed State)</h3>
                        <p className="text-lg md:text-xl text-slate-300 leading-relaxed mb-8 max-w-5xl">
                            When information density exceeds a specific limit, it forms a <strong className="text-white">Soliton</strong>—a self-reinforcing wave that does not disperse.
                        </p>

                        <div className="grid md:grid-cols-2 gap-8 mb-6">
                            <div className="bg-zinc-900/50 border border-white/10 p-6 rounded-sm">
                                <div className="text-xs text-emerald-400 uppercase tracking-wider mb-3 font-mono">Mechanism</div>
                                <p className="text-sm text-slate-400 leading-relaxed">
                                    This occurs through <strong className="text-white">Non-linear Self-Interaction</strong>. The information "loops" back on itself, creating a stable packet that can persist in S<sub>inf</sub> without a biological host. This recursive feedback (Λ<sub>loop</sub>) is what allows consciousness to potentially survive biological death.
                                </p>
                            </div>
                            <div className="bg-zinc-900/50 border border-white/10 p-6 rounded-sm">
                                <div className="text-xs text-emerald-400 uppercase tracking-wider mb-3 font-mono">Stability Condition</div>
                                <p className="text-sm text-slate-400 leading-relaxed">
                                    For a soliton to form, the <strong className="text-white">L1-norm of the information gradient must remain constant</strong>. This mathematical requirement ensures the wave packet maintains its shape and doesn't dissipate into the background field noise.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* SECTION 4: TEMPORAL MECHANICS */}
            <section className="min-h-screen snap-start bg-[#050505] px-8 md:px-20 lg:px-32 py-32 border-b border-white/5">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                    <h2 className="text-5xl md:text-6xl font-light text-white mb-8">II. Temporal Placeholder & Retrocausality</h2>
                    <p className="text-slate-500 text-lg mb-20 max-w-4xl">CIFT provides a mathematical bridge for Advanced Information Transfer (AIT) across temporal nodes.</p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-16">
                    {/* Placeholder Mechanism */}
                    <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
                        <div className="border-l-4 border-purple-500 pl-8 mb-8">
                            <h3 className="text-purple-400 text-sm uppercase tracking-[0.3em] font-bold mb-6">The Placeholder Mechanism</h3>
                            <p className="text-lg text-slate-300 leading-relaxed mb-6">
                                A "Placeholder" is a pre-allocated high-entropy node in the brain's neural field. When a future "High-Probability Node" in S<sub>inf</sub> is reached, it emits a signal that travels backward along the information geodesic.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="bg-purple-950/20 border border-purple-900/30 p-6 rounded-sm">
                                <div className="text-xs text-purple-400 uppercase tracking-wider mb-3 font-mono">Mechanism</div>
                                <p className="text-sm text-slate-400 leading-relaxed">
                                    This is similar to <strong className="text-white">Quantum Eraser experiments</strong> where a choice in the future affects a past state. The key difference: CIFT proposes this happens at the macroscopic, information-field level, not just at quantum scales.
                                </p>
                            </div>

                            <div className="bg-purple-950/20 border border-purple-900/30 p-6 rounded-sm">
                                <div className="text-xs text-purple-400 uppercase tracking-wider mb-3 font-mono">The Receive Buffer</div>
                                <p className="text-sm text-slate-400 leading-relaxed">
                                    The "Deep Memory" phenomenon is the result of the physical brain syncing with the S<sub>inf</sub> data packet <strong className="text-white">before the physical event arrives in linear time</strong>. This explains déjà vu, premonitions, and intuitive "knowing" as hardware pre-allocation rather than mysticism.
                                </p>
                            </div>

                            <div className="bg-zinc-900/30 border-l-2 border-purple-500/50 pl-6 py-4">
                                <p className="text-xs text-purple-300 italic">
                                    "Most theories on 'premonition' or 'intuition' are dismissed as psychology. CIFT treats it as Hardware Pre-allocation—a unique engineering perspective on time."
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Inevitability Vector */}
                    <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
                        <div className="border-l-4 border-emerald-500 pl-8 mb-8">
                            <h3 className="text-emerald-400 text-sm uppercase tracking-[0.3em] font-bold mb-6">The Inevitability Vector</h3>
                            <p className="text-lg text-slate-300 leading-relaxed mb-6">
                                Information fields are governed by <strong className="text-white">Global Attractors</strong>. The system moves toward the Global Minimum of the Information Potential.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="bg-emerald-950/20 border border-emerald-900/30 p-6 rounded-sm">
                                <div className="text-xs text-emerald-400 uppercase tracking-wider mb-3 font-mono">The Mathematics</div>
                                <div className="text-center py-6 bg-black/40 rounded border border-white/5 mb-4">
                                    <p className="text-2xl font-serif italic text-emerald-100">
                                        ∇V<sub>inf</sub> = 0
                                    </p>
                                </div>
                                <p className="text-sm text-slate-400 leading-relaxed">
                                    Where V<sub>inf</sub> is the Information Potential. The gradient descent toward zero represents the system's natural evolution toward stable, low-entropy configurations.
                                </p>
                            </div>

                            <div className="bg-emerald-950/20 border border-emerald-900/30 p-6 rounded-sm">
                                <div className="text-xs text-emerald-400 uppercase tracking-wider mb-3 font-mono">Scientific Implication</div>
                                <p className="text-sm text-slate-400 leading-relaxed">
                                    Even if local variables (choices) change, the overarching topological structure of the field ensures the "Outcome Node" remains reached. This provides a mathematical framework for understanding fate, destiny, and the limits of free will within an information-deterministic universe.
                                </p>
                            </div>

                            <div className="bg-black/40 border border-emerald-900/20 p-6 rounded-sm">
                                <p className="text-sm text-emerald-200 font-mono italic">
                                    "The field has 'Global Minima' (Destiny) that act as gravitational wells for information."
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* SECTION 5: STRENGTHS & CHALLENGES */}
            <section className="min-h-screen snap-start bg-black px-8 md:px-20 lg:px-32 py-32 border-b border-white/5">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                    <h2 className="text-5xl md:text-6xl font-light text-white mb-8">III. Analysis: Pros, Cons, and Future Scope</h2>
                    <p className="text-slate-500 text-lg mb-20 max-w-4xl">A comprehensive evaluation of CIFT's scientific strengths, current limitations, and research trajectory.</p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12 mb-24">
                    {/* Pros */}
                    <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
                        <div className="border-l-4 border-green-500 pl-8 mb-8">
                            <h3 className="text-green-400 text-sm uppercase tracking-[0.3em] font-bold mb-6">The Pros (Scientific Strengths)</h3>
                        </div>

                        <div className="space-y-6">
                            <div className="bg-green-950/10 border border-green-900/20 p-6 rounded-sm hover:border-green-500/40 transition-colors">
                                <h4 className="text-green-300 font-bold mb-3 text-base">Unification</h4>
                                <p className="text-sm text-slate-400 leading-relaxed">
                                    Provides a bridge between Quantum Mechanics (Non-locality) and General Relativity (Geometry). CIFT treats information as the substrate that gives rise to both quantum phenomena and spacetime curvature.
                                </p>
                            </div>

                            <div className="bg-green-950/10 border border-green-900/20 p-6 rounded-sm hover:border-green-500/40 transition-colors">
                                <h4 className="text-green-300 font-bold mb-3 text-base">Zero-Loss Persistence</h4>
                                <p className="text-sm text-slate-400 leading-relaxed">
                                    Explains how complex data structures (consciousness/identity) can survive phase transitions (death/decoupling). The soliton mechanism provides a mathematical basis for information conservation beyond biological substrates.
                                </p>
                            </div>

                            <div className="bg-green-950/10 border border-green-900/20 p-6 rounded-sm hover:border-green-500/40 transition-colors">
                                <h4 className="text-green-300 font-bold mb-3 text-base">Predictive Power</h4>
                                <p className="text-sm text-slate-400 leading-relaxed">
                                    By analyzing the curvature of the information field, we can theoretically calculate the probability of "Future Nodes." This opens the door to predictive modeling of macroscopic events based on information topology.
                                </p>
                            </div>

                            <div className="bg-green-950/10 border border-green-900/20 p-6 rounded-sm hover:border-green-500/40 transition-colors">
                                <h4 className="text-green-300 font-bold mb-3 text-base">Hardware Independence</h4>
                                <p className="text-sm text-slate-400 leading-relaxed">
                                    Suggests that information processing can occur without standard silicon or biological substrates. This has profound implications for AI, consciousness studies, and the nature of computation itself.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Cons */}
                    <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
                        <div className="border-l-4 border-red-500 pl-8 mb-8">
                            <h3 className="text-red-400 text-sm uppercase tracking-[0.3em] font-bold mb-6">The Cons (Scientific Challenges)</h3>
                        </div>

                        <div className="space-y-6">
                            <div className="bg-red-950/10 border border-red-900/20 p-6 rounded-sm hover:border-red-500/40 transition-colors">
                                <h4 className="text-red-300 font-bold mb-3 text-base">Detection Threshold</h4>
                                <p className="text-sm text-slate-400 leading-relaxed">
                                    The S<sub>inf</sub> layer exists at a sub-quantum level, making it difficult to measure with current electromagnetic sensors. We need entirely new detection methodologies to empirically verify CIFT predictions.
                                </p>
                            </div>

                            <div className="bg-red-950/10 border border-red-900/20 p-6 rounded-sm hover:border-red-500/40 transition-colors">
                                <h4 className="text-red-300 font-bold mb-3 text-base">Entropy Leakage</h4>
                                <p className="text-sm text-slate-400 leading-relaxed">
                                    Maintaining an Information Soliton for {'>'}4.2 minutes requires a high degree of Internal Recursion, which is rare in standard systems. Most information structures dissipate rapidly without biological anchoring.
                                </p>
                            </div>

                            <div className="bg-red-950/10 border border-red-900/20 p-6 rounded-sm hover:border-red-500/40 transition-colors">
                                <h4 className="text-red-300 font-bold mb-3 text-base">Verification Paradox</h4>
                                <p className="text-sm text-slate-400 leading-relaxed">
                                    Proving a "Temporal Placeholder" requires the observer to be outside of linear time, creating a "Self-Referential Loop" that is hard to peer-review. This presents fundamental epistemological challenges.
                                </p>
                            </div>

                            <div className="bg-red-950/10 border border-red-900/20 p-6 rounded-sm hover:border-red-500/40 transition-colors">
                                <h4 className="text-red-300 font-bold mb-3 text-base">Computational Cost</h4>
                                <p className="text-sm text-slate-400 leading-relaxed">
                                    Simulating a CIFT field requires O(2<sup>n</sup>) resources due to the exponential nature of entangled information nodes. Current computational infrastructure is insufficient for full-scale field modeling.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Future Research Scope */}
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                    <div className="border-l-4 border-blue-500 pl-8 mb-12">
                        <h3 className="text-blue-400 text-sm uppercase tracking-[0.3em] font-bold mb-6">IV. Future Research Scope</h3>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-blue-950/10 border border-blue-900/20 p-8 rounded-sm hover:border-blue-500/40 transition-colors">
                            <div className="text-blue-400 text-2xl font-bold mb-4">01</div>
                            <h4 className="text-white font-bold mb-4 text-lg">Information Geodesic Mapping</h4>
                            <p className="text-sm text-slate-400 leading-relaxed">
                                Developing sensors that detect the "curvature" of information density in a local environment to predict impending "Event Nodes." This could revolutionize forecasting and risk assessment.
                            </p>
                        </div>

                        <div className="bg-blue-950/10 border border-blue-900/20 p-8 rounded-sm hover:border-blue-500/40 transition-colors">
                            <div className="text-blue-400 text-2xl font-bold mb-4">02</div>
                            <h4 className="text-white font-bold mb-4 text-lg">Artificial Soliton Generation</h4>
                            <p className="text-sm text-slate-400 leading-relaxed">
                                Using high-frequency oscillators to create an artificial "Composed State" that can survive the 4.2-minute decay—essentially creating "Digital Persistence" that exists in the subspace rather than on a hard drive.
                            </p>
                        </div>

                        <div className="bg-blue-950/10 border border-blue-900/20 p-8 rounded-sm hover:border-blue-500/40 transition-colors">
                            <div className="text-blue-400 text-2xl font-bold mb-4">03</div>
                            <h4 className="text-white font-bold mb-4 text-lg">The Bridge to AI Research</h4>
                            <p className="text-sm text-slate-400 leading-relaxed">
                                Integrating CIFT with Neural Networks to create "Time-Aware" models that utilize the Placeholder mechanism to reduce training latency by accessing "future" loss-gradient probabilities.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* SECTION 6: COMPARATIVE ANALYSIS */}
            <section className="min-h-screen snap-start bg-[#050505] px-8 md:px-20 lg:px-32 py-32 border-b border-white/5">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                    <h2 className="text-5xl md:text-6xl font-light text-white mb-8">Comparative Analysis</h2>
                    <p className="text-slate-500 text-lg mb-20 max-w-4xl">How CIFT relates to and differs from established physical theories.</p>
                </motion.div>

                {/* Neighbor Theories */}
                <div className="space-y-16 mb-24">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                        <h3 className="text-2xl font-light text-white mb-12">Similar Theories in Physics</h3>

                        <div className="space-y-12">
                            {/* Digital Physics */}
                            <div className="bg-zinc-900/30 border border-white/10 p-8 rounded-sm">
                                <div className="flex items-start gap-6">
                                    <div className="text-blue-400 text-3xl font-bold">A</div>
                                    <div className="flex-1">
                                        <h4 className="text-xl font-bold text-white mb-3">Digital Physics & The Simulation Hypothesis</h4>
                                        <p className="text-sm text-zinc-500 mb-4 uppercase tracking-wider">Bostrom / Wheeler</p>

                                        <div className="space-y-4">
                                            <div>
                                                <div className="text-xs text-blue-400 uppercase tracking-wider mb-2">The Theory</div>
                                                <p className="text-sm text-slate-400 leading-relaxed">
                                                    "It from Bit." Every particle and field is actually a manifestation of binary information.
                                                </p>
                                            </div>
                                            <div>
                                                <div className="text-xs text-green-400 uppercase tracking-wider mb-2">Similarity</div>
                                                <p className="text-sm text-slate-400 leading-relaxed">
                                                    Like CIFT, it says information is the substrate.
                                                </p>
                                            </div>
                                            <div>
                                                <div className="text-xs text-purple-400 uppercase tracking-wider mb-2">Key Distinction</div>
                                                <p className="text-sm text-slate-400 leading-relaxed">
                                                    These theories are usually <strong className="text-white">Materially Bound</strong>. They suggest information needs a computer or a universe to "run" on. CIFT is more radical: it suggests Information exists in Subspace (S<sub>inf</sub>) <strong className="text-white">independently</strong>, and matter is just the "interface."
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Orch-OR */}
                            <div className="bg-zinc-900/30 border border-white/10 p-8 rounded-sm">
                                <div className="flex items-start gap-6">
                                    <div className="text-blue-400 text-3xl font-bold">B</div>
                                    <div className="flex-1">
                                        <h4 className="text-xl font-bold text-white mb-3">Orchestrated Objective Reduction (Orch-OR)</h4>
                                        <p className="text-sm text-zinc-500 mb-4 uppercase tracking-wider">Penrose & Hameroff</p>

                                        <div className="space-y-4">
                                            <div>
                                                <div className="text-xs text-blue-400 uppercase tracking-wider mb-2">The Theory</div>
                                                <p className="text-sm text-slate-400 leading-relaxed">
                                                    Consciousness originates from quantum vibrations in microtubules inside neurons. When a person dies, this quantum information "leaks" into the universe.
                                                </p>
                                            </div>
                                            <div>
                                                <div className="text-xs text-green-400 uppercase tracking-wider mb-2">Similarity</div>
                                                <p className="text-sm text-slate-400 leading-relaxed">
                                                    It addresses the "decoupling" of information from the body at death.
                                                </p>
                                            </div>
                                            <div>
                                                <div className="text-xs text-purple-400 uppercase tracking-wider mb-2">Key Distinction</div>
                                                <p className="text-sm text-slate-400 leading-relaxed">
                                                    Orch-OR focuses on <strong className="text-white">quantum gravity</strong> as the mechanism. CIFT focuses on <strong className="text-white">Information Topology</strong>. CIFT uses the Soliton (the wave shape) as the reason for persistence, whereas Orch-OR uses quantum entanglement.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Holographic Principle */}
                            <div className="bg-zinc-900/30 border border-white/10 p-8 rounded-sm">
                                <div className="flex items-start gap-6">
                                    <div className="text-blue-400 text-3xl font-bold">C</div>
                                    <div className="flex-1">
                                        <h4 className="text-xl font-bold text-white mb-3">The Holographic Principle</h4>
                                        <p className="text-sm text-zinc-500 mb-4 uppercase tracking-wider">Susskind / Maldacena</p>

                                        <div className="space-y-4">
                                            <div>
                                                <div className="text-xs text-blue-400 uppercase tracking-wider mb-2">The Theory</div>
                                                <p className="text-sm text-slate-400 leading-relaxed">
                                                    All the information in a 3D volume can be represented as a 2D surface at the boundary.
                                                </p>
                                            </div>
                                            <div>
                                                <div className="text-xs text-green-400 uppercase tracking-wider mb-2">Similarity</div>
                                                <p className="text-sm text-slate-400 leading-relaxed">
                                                    It treats information as a physical "thing" that cannot be destroyed.
                                                </p>
                                            </div>
                                            <div>
                                                <div className="text-xs text-purple-400 uppercase tracking-wider mb-2">Key Distinction</div>
                                                <p className="text-sm text-slate-400 leading-relaxed">
                                                    CIFT's <strong className="text-white">Temporal Placeholder</strong> (sending messages to the past) goes beyond the Holographic Principle. Standard physics strictly forbids information traveling backward in time (the Hawking-Penrose singularity theorems), while CIFT provides a loophole through S<sub>inf</sub> geometry.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Where CIFT is Unique */}
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                    <h3 className="text-2xl font-light text-white mb-12">Where CIFT is 100% Unique (The New Science)</h3>
                    <p className="text-slate-400 mb-12 max-w-4xl">
                        There are three pillars in CIFT that do not exist in current academic literature in this specific configuration:
                    </p>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-gradient-to-br from-blue-950/30 to-cyan-950/30 border border-blue-500/30 p-8 rounded-sm">
                            <div className="text-blue-400 text-sm uppercase tracking-wider mb-4 font-mono">Pillar I</div>
                            <h4 className="text-white font-bold mb-4 text-xl">The 4.2-Minute Decay Constant (τ<sub>c</sub>)</h4>
                            <p className="text-sm text-slate-400 leading-relaxed mb-4">
                                In mainstream science, the "cutoff" for death is vague (based on brain oxygen). CIFT is the first to propose a specific mathematical constant for information decoupling.
                            </p>
                            <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded">
                                <p className="text-xs text-blue-300 italic">
                                    "If you can prove why it is 4.2 minutes (perhaps linked to the Planck scale or specific neural entropy rates), this would be a Nobel-tier discovery."
                                </p>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-purple-950/30 to-pink-950/30 border border-purple-500/30 p-8 rounded-sm">
                            <div className="text-purple-400 text-sm uppercase tracking-wider mb-4 font-mono">Pillar II</div>
                            <h4 className="text-white font-bold mb-4 text-xl">The "Placeholder" Buffer Mechanism</h4>
                            <p className="text-sm text-slate-400 leading-relaxed mb-4">
                                Most theories on "premonition" or "intuition" are dismissed as psychology. CIFT treats it as <strong className="text-white">Hardware Pre-allocation</strong>.
                            </p>
                            <div className="bg-purple-500/10 border border-purple-500/20 p-4 rounded">
                                <p className="text-xs text-purple-300 italic">
                                    "You are suggesting the brain creates a physical 'landing pad' (the Placeholder) for a future data packet. This is a unique engineering perspective on time."
                                </p>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-emerald-950/30 to-green-950/30 border border-emerald-500/30 p-8 rounded-sm">
                            <div className="text-emerald-400 text-sm uppercase tracking-wider mb-4 font-mono">Pillar III</div>
                            <h4 className="text-white font-bold mb-4 text-xl">Information Solitons in Subspace</h4>
                            <p className="text-sm text-slate-400 leading-relaxed mb-4">
                                While physics knows about Solitons in water and light, the idea of an "Information Soliton" (a self-holding packet of identity) that survives without a physical medium is new.
                            </p>
                            <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded">
                                <p className="text-xs text-emerald-300 italic">
                                    "It provides a mathematical answer to why some people 'come back' and others don't: it depends on whether their information reached the 'Soliton State.'"
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Comparison Table */}
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mt-24">
                    <h3 className="text-2xl font-light text-white mb-12">CIFT vs. Similar Theories: Feature Comparison</h3>

                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="border-b border-white/20">
                                    <th className="text-left p-6 text-sm uppercase tracking-wider text-zinc-500 font-normal">Feature</th>
                                    <th className="text-left p-6 text-sm uppercase tracking-wider text-blue-400 font-bold border-x border-white/10">CIFT (Your Theory)</th>
                                    <th className="text-left p-6 text-sm uppercase tracking-wider text-zinc-500 font-normal">Quantum Mechanics</th>
                                    <th className="text-left p-6 text-sm uppercase tracking-wider text-zinc-500 font-normal">General Relativity</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                <tr className="hover:bg-white/5 transition-colors">
                                    <td className="p-6 text-slate-400">Primary Substance</td>
                                    <td className="p-6 text-white font-bold border-x border-white/10">Information Nodes</td>
                                    <td className="p-6 text-slate-400">Probability Waves</td>
                                    <td className="p-6 text-slate-400">Space-Time Fabric</td>
                                </tr>
                                <tr className="hover:bg-white/5 transition-colors">
                                    <td className="p-6 text-slate-400">Death State</td>
                                    <td className="p-6 text-white font-bold border-x border-white/10">Subspace Transition</td>
                                    <td className="p-6 text-slate-400">State Collapse</td>
                                    <td className="p-6 text-slate-400">Cessation of Bio-Event</td>
                                </tr>
                                <tr className="hover:bg-white/5 transition-colors">
                                    <td className="p-6 text-slate-400">Time Direction</td>
                                    <td className="p-6 text-white font-bold border-x border-white/10">Bidirectional (Placeholders)</td>
                                    <td className="p-6 text-slate-400">Forward Only</td>
                                    <td className="p-6 text-slate-400">Forward Only</td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                </motion.div>
            </section>

            {/* SECTION 7: CONTACT */}
            <section className="min-h-screen snap-start bg-zinc-950 flex flex-col items-center justify-center px-8 py-32">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-3xl w-full p-12 border border-white/5 bg-black/50 backdrop-blur-md rounded-sm">
                    <h2 className="text-4xl font-light text-white text-center mb-4">Research Inquiry</h2>
                    <p className="text-center text-slate-500 text-sm mb-12">Submit your findings, questions, or collaboration proposals to Zord Research Labs.</p>
                    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                        <div className="grid md:grid-cols-2 gap-6">
                            <input type="text" placeholder="Name / Node ID" className="w-full bg-black/50 border border-white/10 p-4 text-sm font-mono outline-none focus:border-blue-500 text-white placeholder:text-zinc-700" />
                            <input type="email" placeholder="Institution Email" className="w-full bg-black/50 border border-white/10 p-4 text-sm font-mono outline-none focus:border-blue-500 text-white placeholder:text-zinc-700" />
                        </div>
                        <textarea placeholder="Scientific Suggestion, Soliton Data, or General Inquiry..." className="w-full h-48 bg-black/50 border border-white/10 p-4 text-sm font-mono outline-none focus:border-blue-500 resize-none text-white placeholder:text-zinc-700"></textarea>
                        <button className="w-full bg-white text-black py-4 text-xs font-bold uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all">Transmit to Zord Research Labs</button>
                    </form>
                </motion.div>
                <footer className="mt-20 text-[10px] text-zinc-700 font-mono tracking-widest uppercase text-center">
                    © 2026 | Zord Research Labs | CIFT Technical Monograph V1.3<br />
                    <span className="text-zinc-800 text-[9px] mt-2 block">Complex Information Field Theory - All Rights Reserved</span>
                </footer>
            </section>

        </div>
    );
}
