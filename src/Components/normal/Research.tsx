import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowUpRight, ArrowRight, Atom, Brain, Cpu, Radio, Sparkles, FileText } from 'lucide-react';

// --- DATA: RESEARCH PROJECTS ---
const researchProjects = [
    {
        id: "cift",
        title: "Complex Information Field Theory",
        subtitle: "Unified Information Theology",
        category: "Physics",
        status: "Active",
        date: "2024 - Present",
        description: "A unified framework treating information as the fundamental substrate of reality. Proposing the 4.2-minute coherence constant and information solitons.",
        tags: ["Information Theory", "Quantum Mechanics", "Biophysics"],
        color: "blue",
        link: "/CIFT",
        featured: true,
        icon: Atom
    },
    {
        id: "aegis",
        title: "AEGIS Framework",
        subtitle: "Artificial General Intelligence System",
        category: "AI",
        status: "In Development",
        date: "2025 - Present",
        description: "Self-optimizing neural architecture focusing on recursive self-improvement and safety alignment in high-entropy environments.",
        tags: ["AGI", "Alignment", "Recursive Learning"],
        color: "emerald",
        link: "#",
        featured: false,
        icon: Brain
    },
    {
        id: "nebula",
        title: "Project NEBULA",
        subtitle: "Distributed Cloud Computing",
        category: "Systems",
        status: "Concept",
        date: "2025 (Q3)",
        description: "A decentralized, fog-computing protocol for ephemeral data storage using background radiation entropy as a seed.",
        tags: ["Cloud", "Cryptography", "Entropy"],
        color: "purple",
        link: "#",
        featured: false,
        icon: Cpu
    },
    {
        id: "chronos",
        title: "Chronos Interface",
        subtitle: "Temporal Data Mapping",
        category: "Physics",
        status: "Concept",
        date: "TBD",
        description: "Exploring non-linear time perception in human-computer interfaces. Mapping UI latency to cognitive processing speeds.",
        tags: ["HCI", "Temporal Mechanics", "UX"],
        color: "orange",
        link: "#",
        featured: false,
        icon: Radio
    }
];

const categories = ["All", "Physics", "AI", "Systems", "Other"];

// Color style mappings for Tailwind (must be complete class names for JIT)
const colorStyles = {
    blue: {
        bg: "from-blue-950/30 to-black",
        border: "border-blue-500/20 hover:border-blue-500/50",
        iconBg: "bg-blue-500/20 text-blue-400",
        categoryBg: "bg-blue-500/10 border-blue-500/20 text-blue-400",
        text: "text-blue-400",
        cardHover: "hover:border-blue-500/30"
    },
    emerald: {
        bg: "from-emerald-950/30 to-black",
        border: "border-emerald-500/20 hover:border-emerald-500/50",
        iconBg: "bg-emerald-500/10 text-emerald-400",
        categoryBg: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
        text: "text-emerald-400",
        cardHover: "hover:border-emerald-500/30"
    },
    purple: {
        bg: "from-purple-950/30 to-black",
        border: "border-purple-500/20 hover:border-purple-500/50",
        iconBg: "bg-purple-500/10 text-purple-400",
        categoryBg: "bg-purple-500/10 border-purple-500/20 text-purple-400",
        text: "text-purple-400",
        cardHover: "hover:border-purple-500/30"
    },
    orange: {
        bg: "from-orange-950/30 to-black",
        border: "border-orange-500/20 hover:border-orange-500/50",
        iconBg: "bg-orange-500/10 text-orange-400",
        categoryBg: "bg-orange-500/10 border-orange-500/20 text-orange-400",
        text: "text-orange-400",
        cardHover: "hover:border-orange-500/30"
    }
};

export default function Research() {
    const navigate = useNavigate();
    const [filter, setFilter] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredProjects = researchProjects.filter(project => {
        const matchesCategory = filter === "All" || project.category === filter;
        const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="bg-[#020202] text-slate-100 font-sans min-h-screen overflow-y-scroll custom-scrollbar selection:bg-blue-500/30 pb-32">

            {/* HERO SECTION */}
            <section className="relative pt-32 pb-20 px-6 md:px-12 lg:px-24 border-b border-white/5 bg-[radial-gradient(circle_at_50%_-20%,#1e293b,transparent_70%)]">
                <div className="max-w-7xl mx-auto">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                        <div className="flex items-center gap-2 mb-6 text-blue-500">
                            <Sparkles className="w-4 h-4" />
                            <span className="font-mono text-xs uppercase tracking-[0.3em]">R&D Division</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-light tracking-tight text-white mb-6">
                            Research <span className="text-slate-500">&</span> Exploration
                        </h1>
                        <p className="max-w-2xl text-lg text-slate-400 font-light leading-relaxed">
                            A curated archive of theoretical frameworks, experimental systems, and ongoing investigations into the nature of intelligence and reality.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* CONTROL BAR */}
            <div className="sticky top-0 z-40 bg-[#020202]/80 backdrop-blur-xl border-b border-white/5 px-6 md:px-12 lg:px-24 py-4">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
                    {/* Categories */}
                    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 md:pb-0">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all border ${filter === cat
                                    ? 'bg-white text-black border-white'
                                    : 'bg-white/5 text-slate-400 border-white/5 hover:bg-white/10 hover:border-white/20'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Search */}
                    <div className="relative w-full md:w-64 group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-blue-500 transition-colors" />
                        <input
                            type="text"
                            placeholder="Search archives..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-slate-200 outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all font-mono placeholder:text-slate-600"
                        />
                    </div>
                </div>
            </div>

            {/* PROJECTS GRID */}
            <div className="px-6 md:px-12 lg:px-24 py-16 max-w-7xl mx-auto min-h-[50vh]">
                <AnimatePresence mode="popLayout">
                    {filter === "All" && searchQuery === "" ? (
                        /* FEATURED LAYOUT (ONLY SHOWS ON DEFAULT VIEW) */
                        <div className="space-y-16">
                            {/* Featured Section */}
                            <div className="space-y-8">
                                <h3 className="text-white/50 text-xs font-mono uppercase tracking-widest pl-1 border-l-2 border-blue-500">Featured Research</h3>
                                {researchProjects.filter(p => p.featured).map(project => {
                                    const styles = colorStyles[project.color as keyof typeof colorStyles];
                                    return (
                                        <motion.div
                                            layout
                                            key={project.id}
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            onClick={() => project.link !== "#" && navigate(project.link)}
                                            className={`group relative grid md:grid-cols-2 gap-8 p-8 md:p-12 rounded-xl bg-gradient-to-br ${styles.bg} border ${styles.border} transition-all duration-500 cursor-pointer overflow-hidden`}
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />

                                            <div className="relative z-10 flex flex-col justify-center">
                                                <div className="flex items-center gap-3 mb-6">
                                                    <div className={`p-3 rounded-lg ${styles.iconBg}`}>
                                                        <project.icon className="w-6 h-6" />
                                                    </div>
                                                    <div className={`text-xs font-mono uppercase tracking-wider px-3 py-1 rounded-full ${styles.categoryBg} border`}>
                                                        {project.category}
                                                    </div>
                                                </div>
                                                <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">{project.title}</h2>
                                                <p className="text-xl text-slate-500 font-light mb-6">{project.subtitle}</p>
                                                <p className="text-slate-400 leading-relaxed mb-8">{project.description}</p>
                                                <div className="flex flex-wrap gap-2">
                                                    {project.tags.map(tag => (
                                                        <span key={tag} className="text-[10px] text-slate-500 px-2 py-1 bg-white/5 rounded border border-white/5">#{tag}</span>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="relative z-10 hidden md:flex items-center justify-center bg-black/40 rounded-lg border border-white/5 p-8 group-hover:bg-white/[0.02] transition-colors">
                                                <div className="text-center">
                                                    <div className="text-6xl mb-4 opacity-50 grayscale group-hover:grayscale-0 transition-all duration-500">🧬</div>
                                                    <p className="text-xs text-slate-500 font-mono uppercase tracking-widest">Interactive Simulation Available</p>
                                                    <div className="mt-8 flex justify-center">
                                                        <div className="flex items-center gap-2 text-white border-b border-white/30 pb-0.5 group-hover:border-white transition-all">
                                                            <span className="text-sm font-bold uppercase tracking-wider">Launch Monograph</span>
                                                            <ArrowUpRight className="w-4 h-4" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>

                            {/* Secondary Grid */}
                            <div className="space-y-8">
                                <h3 className="text-white/50 text-xs font-mono uppercase tracking-widest pl-1 border-l-2 border-slate-700">Recent Explorations</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {researchProjects.filter(p => !p.featured).map(project => {
                                        const styles = colorStyles[project.color as keyof typeof colorStyles];
                                        return (
                                            <motion.div
                                                layout
                                                key={project.id}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className={`group p-6 rounded-lg bg-zinc-900/20 border border-white/5 hover:bg-zinc-900/40 ${styles.cardHover} transition-all duration-300 cursor-pointer`}
                                                onClick={() => project.link !== "#" && navigate(project.link)}
                                            >
                                                <div className="flex justify-between items-start mb-4">
                                                    <div className={`p-2 rounded ${styles.iconBg}`}>
                                                        <project.icon className="w-5 h-5" />
                                                    </div>
                                                    <span className="text-[10px] text-slate-500 font-mono border border-white/10 px-2 py-0.5 rounded uppercase">{project.status}</span>
                                                </div>
                                                <h3 className="text-lg font-bold text-white mb-1 group-hover:text-slate-200">{project.title}</h3>
                                                <p className="text-xs text-slate-500 mb-4">{project.subtitle}</p>
                                                <p className="text-sm text-slate-400 line-clamp-3 mb-6">{project.description}</p>
                                                <div className="flex items-center justify-between mt-auto">
                                                    <span className={`text-[10px] font-mono ${styles.text}`}>{project.date}</span>
                                                    <ArrowUpRight className="w-4 h-4 text-slate-600 group-hover:text-white transition-colors" />
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    ) : (
                        /* FILTERED GRID LAYOUT */
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredProjects.map(project => {
                                const styles = colorStyles[project.color as keyof typeof colorStyles];
                                return (
                                    <motion.div
                                        layout
                                        key={project.id}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.3 }}
                                        className={`group p-6 rounded-lg bg-zinc-900/20 border border-white/5 hover:bg-zinc-900/40 ${styles.cardHover} transition-all duration-300 cursor-pointer`}
                                        onClick={() => project.link !== "#" && navigate(project.link)}
                                    >
                                        <div className="flex justify-between items-start mb-4">
                                            <div className={`p-2 rounded ${styles.iconBg}`}>
                                                <project.icon className="w-5 h-5" />
                                            </div>
                                            <span className="text-[10px] text-slate-500 font-mono border border-white/10 px-2 py-0.5 rounded uppercase">{project.status}</span>
                                        </div>
                                        <h3 className="text-lg font-bold text-white mb-1 group-hover:text-slate-200">{project.title}</h3>
                                        <p className="text-xs text-slate-500 mb-4">{project.subtitle}</p>
                                        <p className="text-sm text-slate-400 line-clamp-3 mb-6">{project.description}</p>
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {project.tags.slice(0, 2).map(tag => (
                                                <span key={tag} className="text-[10px] text-slate-600 px-1.5 py-0.5 bg-black rounded">#{tag}</span>
                                            ))}
                                        </div>
                                        <div className="flex items-center justify-between border-t border-white/5 pt-4">
                                            <span className={`text-[10px] font-mono ${styles.text}`}>{project.date}</span>
                                            <ArrowUpRight className="w-4 h-4 text-slate-600 group-hover:text-white transition-colors" />
                                        </div>
                                    </motion.div>
                                );
                            })}
                            {filteredProjects.length === 0 && (
                                <div className="col-span-full py-20 text-center">
                                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 mb-4">
                                        <Search className="w-6 h-6 text-slate-600" />
                                    </div>
                                    <h3 className="text-white font-light text-xl mb-2">No matches found</h3>
                                    <p className="text-slate-500 text-sm">Try adjusting your category filter or search query.</p>
                                </div>
                            )}
                        </div>
                    )}
                </AnimatePresence>
            </div>

            {/* PUBLICATIONS SECTION (COMPACT) */}
            <div className="px-6 md:px-12 lg:px-24 py-8 max-w-7xl mx-auto border-t border-white/5">
                <div className="flex flex-col md:flex-row justify-between items-end mb-8">
                    <div>
                        <span className="text-blue-500 font-mono tracking-[0.2em] text-[10px] uppercase mb-2 block">Knowledge Base</span>
                        <h2 className="text-2xl font-light text-white">Latest Publications</h2>
                    </div>
                    <button className="text-xs text-slate-400 hover:text-white transition-colors mt-4 md:mt-0 flex items-center gap-2">
                        View All Archives <ArrowRight className="w-3 h-3" />
                    </button>
                </div>

                <div className="grid gap-4">
                    <div className="group flex flex-col md:flex-row md:items-center gap-4 p-4 rounded bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors">
                        <div className="flex items-center gap-3 md:w-1/3">
                            <FileText className="w-5 h-5 text-slate-500" />
                            <div>
                                <h4 className="text-sm font-bold text-slate-200 group-hover:text-white transition-colors">Entropy Dynamics in Closed Systems</h4>
                                <p className="text-[10px] text-slate-500 uppercase">Preprint • 2025</p>
                            </div>
                        </div>
                        <p className="text-xs text-slate-400 md:w-1/2 line-clamp-1">Exploring the theoretical limits of information loss in black hole evaporation scenarios.</p>
                        <div className="md:ml-auto flex gap-3 text-xs">
                            <span className="text-blue-400 cursor-pointer hover:underline">PDF</span>
                            <span className="text-slate-500 cursor-pointer hover:underline">Cite</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
