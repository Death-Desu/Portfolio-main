import { motion } from 'framer-motion';
import { ArrowUpRight, Beaker, Code, Cpu, Shield, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ProjectGrid() {
  const projects = [
    {
      id: "01",
      title: "Google Tech Sprint",
      role: "SDE Intern",
      tech: ["Node.js", "React", "MongoDB"],
      desc: "Architected a scalable recruitment platform. Led the backend API development using Express.js ensuring secure JWT authentication and optimized MongoDB aggregations.",
      link: "/project/google-tech-sprint",
      color: "from-blue-600 to-cyan-500",
      icon: <Code size={48} className="text-white/80" />
    },
    {
      id: "02",
      title: "Smart India Hackathon",
      role: "Core Developer",
      tech: ["C++", "Unreal Engine"],
      desc: "National Finalist. Engineered high-performance C++ simulations capable of handling massive entity concurrency with memory-safe object-oriented design patterns.",
      link: "/project/hackathon",
      color: "from-orange-600 to-red-500",
      icon: <Cpu size={48} className="text-white/80" />
    }
  ];

  const research = [
    {
      id: "R_01",
      title: "Adversarial AI Defense",
      role: "Research Lead",
      tech: ["Python", "PyTorch", "RL"],
      desc: "Conducted research on stress-testing LSTM-based intrusion detection systems using multi-stage reinforcement learning agents to identify critical vulnerabilities.",
      link: "/project/adversarial-ai",
      color: "from-emerald-600 to-green-500",
      icon: <Shield size={48} className="text-white/80" />
    },
    {
      id: "R_02",
      title: "CIFT Architecture",
      role: "Primary Author",
      tech: ["Transformers", "Computer Vision", "Python"],
      desc: "Contextual Inference Fusion Transformer. A novel multi-modal architecture designed to enhance real-time decision making in autonomous systems through sensor fusion.",
      link: "/CIFT",
      color: "from-violet-600 to-purple-500",
      icon: <Zap size={48} className="text-white/80" />
    },
    {
      id: "R_03",
      title: "AEGIS Framework",
      role: "Core Researcher",
      tech: ["AGI", "Alignment", "Recursive Learning"],
      desc: "Self-optimizing neural architecture focusing on recursive self-improvement and safety alignment in high-entropy environments.",
      link: "#",
      color: "from-cyan-600 to-blue-500",
      icon: <Cpu size={48} className="text-white/80" />
    },
    {
      id: "R_04",
      title: "Project NEBULA",
      role: "Systems Architect",
      tech: ["Cloud", "Cryptography", "Entropy"],
      desc: "A decentralized, fog-computing protocol for ephemeral data storage using background radiation entropy as a seed.",
      link: "#",
      color: "from-indigo-600 to-purple-500",
      icon: <Beaker size={48} className="text-white/80" />
    }
  ];

  const CardOverlay = ({ icon }: { icon: any }) => (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/10 group-hover:bg-black/40 transition-all duration-500">
      <motion.div
        initial={{ scale: 0.8, opacity: 0.8 }}
        whileHover={{ scale: 1.1, opacity: 1 }}
        className="mb-4 transform transition-transform duration-500"
      >
        {icon}
      </motion.div>
      <span className="text-white font-bold text-lg opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
        View Project
      </span>
    </div>
  );

  return (
    <section id="work" className="py-32 px-6 md:px-20 relative z-10 text-white">
      <div className="max-w-7xl mx-auto space-y-32">

        {/* --- ENGINEERING PROJECTS --- */}
        <div>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-white/5 pb-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">Engineering Projects</h2>
              <p className="text-gray-400 max-w-lg">
                Scalable systems and high-performance applications.
              </p>
            </div>
          </div>

          <div className="space-y-24">
            {projects.map((exp, i) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className={`flex flex-col ${i % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 items-center group`}
              >
                {/* Project Card */}
                <Link to={exp.link} className="w-full lg:w-1/2 aspect-video rounded-2xl overflow-hidden glass-panel p-2 hover:scale-[1.02] transition-transform duration-500 hover:shadow-[0_0_40px_-5px_rgba(255,255,255,0.1)] border border-white/10 relative">
                  <div className={`w-full h-full rounded-xl relative overflow-hidden bg-gradient-to-br ${exp.color} opacity-90 group-hover:opacity-100 transition-opacity`}>
                    <CardOverlay icon={exp.icon} />
                  </div>
                </Link>

                {/* Content */}
                <div className="w-full lg:w-1/2 space-y-6">
                  <h3 className="text-3xl font-bold text-white group-hover:text-blue-200 transition-colors">{exp.title}</h3>
                  <p className="text-gray-400 leading-relaxed text-lg">{exp.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {exp.tech.map(t => (
                      <span key={t} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-medium text-gray-300">{t}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>


        {/* --- RESEARCH SECTION --- */}
        <div>
          <div className="flex items-center justify-between mb-12 border-b border-white/5 pb-6">
            <div className="flex items-center gap-4">
              <Beaker className="text-violet-400" size={32} />
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white">Research & Publications</h2>
                <p className="text-violet-200/60 mt-1">Novel contributions to Artificial Intelligence.</p>
              </div>
            </div>
            <Link to="/research" className="hidden md:flex items-center gap-2 text-violet-400 hover:text-violet-300 text-sm font-mono transition-colors">
              View All <ArrowUpRight size={16} />
            </Link>
          </div>

          {/* Compact Grid Layout */}
          <div className="grid md:grid-cols-2 gap-6">
            {research.map((paper) => (
              <motion.div
                key={paper.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="group"
              >
                <Link
                  to={paper.link}
                  className="block h-full"
                >
                  <div className="h-full glass-panel p-6 rounded-xl border border-white/10 hover:border-violet-500/50 transition-all duration-300 hover:shadow-[0_0_30px_-5px_rgba(124,58,237,0.3)] space-y-4">
                    {/* Header with Icon */}
                    <div className="flex items-start justify-between">
                      <div className={`w-14 h-14 rounded-lg bg-gradient-to-br ${paper.color} p-3 flex items-center justify-center opacity-90 group-hover:opacity-100 transition-opacity`}>
                        {paper.icon}
                      </div>
                      <div className="flex items-center gap-2 bg-black/40 backdrop-blur text-white/90 px-2 py-1 rounded-full text-[10px] font-bold border border-white/20">
                        <Beaker size={10} /> RESEARCH
                      </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-3">
                      <div>
                        <span className="text-violet-400 font-mono text-[10px] tracking-widest uppercase block mb-1">{paper.role}</span>
                        <h3 className="text-xl font-bold text-white group-hover:text-violet-200 transition-colors line-clamp-1">{paper.title}</h3>
                      </div>

                      <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                        {paper.desc}
                      </p>

                      {/* Tech Tags */}
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {paper.tech.slice(0, 3).map(t => (
                          <span key={t} className="px-2 py-0.5 bg-white/5 border border-white/10 rounded text-[10px] font-medium text-gray-400">
                            {t}
                          </span>
                        ))}
                        {paper.tech.length > 3 && (
                          <span className="px-2 py-0.5 text-[10px] text-gray-500">+{paper.tech.length - 3}</span>
                        )}
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                      <span className="text-violet-400/70 text-xs font-mono">Read More</span>
                      <ArrowUpRight size={16} className="text-violet-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Mobile "View All" Link */}
          <div className="md:hidden mt-8 text-center">
            <Link to="/research" className="inline-flex items-center gap-2 text-violet-400 hover:text-violet-300 text-sm font-mono transition-colors border-b border-violet-400/30 hover:border-violet-300 pb-1">
              View All Research <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
