import { motion } from 'framer-motion';

export default function Research() {
    return (
        <div className="bg-[#020202] text-slate-100 font-sans overflow-y-scroll snap-y snap-mandatory scroll-smooth custom-scrollbar selection:bg-blue-500/30">

            {/* HERO SECTION */}
            <section className="min-h-screen snap-start flex flex-col justify-center px-8 md:px-20 lg:px-32 relative border-b border-white/5 py-20">
                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1.5 }}>
                    <span className="text-blue-600 font-mono tracking-[0.4em] text-xs mb-6 uppercase block">Academic Portfolio</span>
                    <h1 className="text-7xl md:text-8xl lg:text-9xl font-extralight tracking-tighter mb-8 text-white leading-none">Research & Publications</h1>
                    <p className="max-w-5xl text-xl md:text-2xl lg:text-3xl text-slate-400 font-light leading-relaxed">
                        Exploring the frontiers of theoretical physics, information science, and computational intelligence through <span className="text-white font-normal">rigorous mathematical frameworks</span> and empirical validation.
                    </p>
                </motion.div>
                <div className="absolute bottom-10 left-8 md:left-32 text-[10px] text-zinc-700 font-mono animate-bounce tracking-widest">SCROLL_TO_EXPLORE_RESEARCH</div>
            </section>

            {/* RESEARCH SHOWCASE */}
            <section className="min-h-screen snap-start bg-gradient-to-b from-[#050505] to-black px-8 md:px-20 lg:px-32 py-32 border-b border-white/5">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mb-20">
                    <span className="text-blue-500 font-mono tracking-[0.3em] text-xs mb-6 uppercase block">Research Portfolio</span>
                    <h2 className="text-5xl md:text-6xl font-light text-white mb-6">Active Research Projects</h2>
                    <p className="text-slate-500 text-lg max-w-4xl">
                        Interdisciplinary research spanning theoretical physics, artificial intelligence, and consciousness studies.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Research Card 1: CIFT */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="group relative bg-gradient-to-br from-blue-950/40 via-cyan-950/30 to-blue-950/40 border border-blue-500/20 rounded-lg p-8 hover:border-blue-400/60 hover:shadow-[0_0_40px_rgba(59,130,246,0.2)] transition-all duration-500 overflow-hidden cursor-pointer"
                    >
                        {/* Animated gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>

                        <div className="relative z-10">
                            <div className="flex items-start justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-blue-500/20 border border-blue-500/40 rounded-lg flex items-center justify-center">
                                        <span className="text-blue-400 font-bold text-xl">01</span>
                                    </div>
                                    <div>
                                        <span className="text-blue-400 text-xs uppercase tracking-wider font-mono block">Active Research</span>
                                        <span className="text-zinc-600 text-[10px]">2024 - Present</span>
                                    </div>
                                </div>
                                <div className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full text-[10px] text-blue-300 font-mono">
                                    Primary Focus
                                </div>
                            </div>

                            <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors">
                                Complex Information Field Theory (CIFT)
                            </h3>

                            <p className="text-sm text-slate-400 leading-relaxed mb-6">
                                A unified framework treating information as the fundamental substrate of reality. Proposes the 4.2-minute coherence constant, temporal placeholders, and information solitons as mechanisms for consciousness persistence.
                            </p>

                            <div className="flex flex-wrap gap-2 mb-6">
                                <span className="px-2 py-1 bg-blue-500/10 border border-blue-500/20 rounded text-[10px] text-blue-400">Information Theory</span>
                                <span className="px-2 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded text-[10px] text-cyan-400">Quantum Mechanics</span>
                                <span className="px-2 py-1 bg-purple-500/10 border border-purple-500/20 rounded text-[10px] text-purple-400">Consciousness Studies</span>
                            </div>

                            <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                                <span className="text-xs text-zinc-600 uppercase tracking-wider">View Full Monograph</span>
                                <button className="text-blue-400 hover:text-blue-300 transition-colors">
                                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </motion.div>

                    {/* Research Card 2: AEGIS (Placeholder) */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="group relative bg-gradient-to-br from-emerald-950/40 via-green-950/30 to-emerald-950/40 border border-emerald-500/20 rounded-lg p-8 hover:border-emerald-400/60 hover:shadow-[0_0_40px_rgba(16,185,129,0.2)] transition-all duration-500 overflow-hidden cursor-pointer"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>

                        <div className="relative z-10">
                            <div className="flex items-start justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-emerald-500/20 border border-emerald-500/40 rounded-lg flex items-center justify-center">
                                        <span className="text-emerald-400 font-bold text-xl">02</span>
                                    </div>
                                    <div>
                                        <span className="text-emerald-400 text-xs uppercase tracking-wider font-mono block">In Development</span>
                                        <span className="text-zinc-600 text-[10px]">2025 - Present</span>
                                    </div>
                                </div>
                                <div className="px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-[10px] text-emerald-300 font-mono">
                                    AI Research
                                </div>
                            </div>

                            <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-emerald-300 transition-colors">
                                AEGIS Framework
                            </h3>

                            <p className="text-sm text-slate-400 leading-relaxed mb-6">
                                [Details to be added] Advanced research framework exploring novel approaches to artificial intelligence and computational systems.
                            </p>

                            <div className="flex flex-wrap gap-2 mb-6">
                                <span className="px-2 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded text-[10px] text-emerald-400">Placeholder Tag 1</span>
                                <span className="px-2 py-1 bg-green-500/10 border border-green-500/20 rounded text-[10px] text-green-400">Placeholder Tag 2</span>
                            </div>

                            <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                                <span className="text-xs text-zinc-600 uppercase tracking-wider">Coming Soon</span>
                                <button className="text-emerald-400 hover:text-emerald-300 transition-colors">
                                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </motion.div>

                    {/* Research Card 3: Placeholder */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="group relative bg-gradient-to-br from-purple-950/40 via-pink-950/30 to-purple-950/40 border border-purple-500/20 rounded-lg p-8 hover:border-purple-400/60 hover:shadow-[0_0_40px_rgba(168,85,247,0.2)] transition-all duration-500 overflow-hidden cursor-pointer"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>

                        <div className="relative z-10">
                            <div className="flex items-start justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-purple-500/20 border border-purple-500/40 rounded-lg flex items-center justify-center">
                                        <span className="text-purple-400 font-bold text-xl">03</span>
                                    </div>
                                    <div>
                                        <span className="text-purple-400 text-xs uppercase tracking-wider font-mono block">Research Area</span>
                                        <span className="text-zinc-600 text-[10px]">TBD</span>
                                    </div>
                                </div>
                                <div className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full text-[10px] text-purple-300 font-mono">
                                    Category
                                </div>
                            </div>

                            <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors">
                                Research Project 3
                            </h3>

                            <p className="text-sm text-slate-400 leading-relaxed mb-6">
                                [Details to be added] Exploring advanced theoretical concepts and their practical applications.
                            </p>

                            <div className="flex flex-wrap gap-2 mb-6">
                                <span className="px-2 py-1 bg-purple-500/10 border border-purple-500/20 rounded text-[10px] text-purple-400">Tag 1</span>
                                <span className="px-2 py-1 bg-pink-500/10 border border-pink-500/20 rounded text-[10px] text-pink-400">Tag 2</span>
                            </div>

                            <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                                <span className="text-xs text-zinc-600 uppercase tracking-wider">Details Coming Soon</span>
                                <button className="text-purple-400 hover:text-purple-300 transition-colors">
                                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </motion.div>

                    {/* Research Card 4: Placeholder */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="group relative bg-gradient-to-br from-orange-950/40 via-amber-950/30 to-orange-950/40 border border-orange-500/20 rounded-lg p-8 hover:border-orange-400/60 hover:shadow-[0_0_40px_rgba(249,115,22,0.2)] transition-all duration-500 overflow-hidden cursor-pointer"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-500/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>

                        <div className="relative z-10">
                            <div className="flex items-start justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-orange-500/20 border border-orange-500/40 rounded-lg flex items-center justify-center">
                                        <span className="text-orange-400 font-bold text-xl">04</span>
                                    </div>
                                    <div>
                                        <span className="text-orange-400 text-xs uppercase tracking-wider font-mono block">Research Area</span>
                                        <span className="text-zinc-600 text-[10px]">TBD</span>
                                    </div>
                                </div>
                                <div className="px-3 py-1 bg-orange-500/20 border border-orange-500/30 rounded-full text-[10px] text-orange-300 font-mono">
                                    Category
                                </div>
                            </div>

                            <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-orange-300 transition-colors">
                                Research Project 4
                            </h3>

                            <p className="text-sm text-slate-400 leading-relaxed mb-6">
                                [Details to be added] Investigating cutting-edge methodologies and theoretical frameworks.
                            </p>

                            <div className="flex flex-wrap gap-2 mb-6">
                                <span className="px-2 py-1 bg-orange-500/10 border border-orange-500/20 rounded text-[10px] text-orange-400">Tag 1</span>
                                <span className="px-2 py-1 bg-amber-500/10 border border-amber-500/20 rounded text-[10px] text-amber-400">Tag 2</span>
                            </div>

                            <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                                <span className="text-xs text-zinc-600 uppercase tracking-wider">Details Coming Soon</span>
                                <button className="text-orange-400 hover:text-orange-300 transition-colors">
                                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* PUBLICATIONS SECTION */}
            <section className="min-h-screen snap-start bg-black px-8 md:px-20 lg:px-32 py-32 border-b border-white/5">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mb-20">
                    <span className="text-cyan-500 font-mono tracking-[0.3em] text-xs mb-6 uppercase block">Academic Output</span>
                    <h2 className="text-5xl md:text-6xl font-light text-white mb-6">Publications & Papers</h2>
                    <p className="text-slate-500 text-lg max-w-4xl">
                        Peer-reviewed publications, preprints, and technical reports.
                    </p>
                </motion.div>

                <div className="space-y-6 max-w-5xl">
                    {/* Publication 1 - Placeholder */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="group border-l-4 border-cyan-500/30 hover:border-cyan-500 pl-8 py-6 bg-zinc-950/30 hover:bg-zinc-950/50 transition-all"
                    >
                        <div className="flex items-start justify-between mb-3">
                            <span className="text-cyan-400 text-xs uppercase tracking-wider font-mono">Preprint • 2025</span>
                            <span className="px-3 py-1 bg-cyan-500/20 border border-cyan-500/30 rounded-full text-[10px] text-cyan-300">arXiv</span>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                            [Publication Title - To Be Added]
                        </h3>
                        <p className="text-sm text-slate-400 mb-4">
                            Authors: [Your Name], et al.
                        </p>
                        <p className="text-sm text-slate-500 leading-relaxed mb-4">
                            [Abstract or description to be added]
                        </p>
                        <div className="flex gap-4 text-xs">
                            <a href="#" className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1">
                                <span>Read Paper</span>
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </a>
                            <a href="#" className="text-slate-500 hover:text-slate-400">PDF</a>
                            <a href="#" className="text-slate-500 hover:text-slate-400">BibTeX</a>
                        </div>
                    </motion.div>

                    {/* Add more publication entries as needed */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="border-l-4 border-zinc-700 pl-8 py-6 bg-zinc-950/20"
                    >
                        <p className="text-slate-600 italic">More publications coming soon...</p>
                    </motion.div>
                </div>
            </section>

            {/* CONTACT SECTION */}
            <section className="min-h-screen snap-start bg-zinc-950 flex flex-col items-center justify-center px-8 py-32">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-3xl w-full p-12 border border-white/5 bg-black/50 backdrop-blur-md rounded-sm">
                    <h2 className="text-4xl font-light text-white text-center mb-4">Research Collaboration</h2>
                    <p className="text-center text-slate-500 text-sm mb-12">Interested in collaboration or have questions about my research? Get in touch.</p>
                    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                        <div className="grid md:grid-cols-2 gap-6">
                            <input type="text" placeholder="Name" className="w-full bg-black/50 border border-white/10 p-4 text-sm font-mono outline-none focus:border-blue-500 text-white placeholder:text-zinc-700" />
                            <input type="email" placeholder="Email" className="w-full bg-black/50 border border-white/10 p-4 text-sm font-mono outline-none focus:border-blue-500 text-white placeholder:text-zinc-700" />
                        </div>
                        <textarea placeholder="Message" className="w-full h-48 bg-black/50 border border-white/10 p-4 text-sm font-mono outline-none focus:border-blue-500 resize-none text-white placeholder:text-zinc-700"></textarea>
                        <button className="w-full bg-white text-black py-4 text-xs font-bold uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all">Send Message</button>
                    </form>
                </motion.div>
                <footer className="mt-20 text-[10px] text-zinc-700 font-mono tracking-widest uppercase text-center">
                    © 2026 | Research Portfolio<br />
                    <span className="text-zinc-800 text-[9px] mt-2 block">All Rights Reserved</span>
                </footer>
            </section>

        </div>
    );
}
