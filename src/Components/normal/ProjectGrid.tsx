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
    }
  ];

  const CardOverlay = ({ icon, title }: { icon: any, title: string }) => (
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
                    <CardOverlay icon={exp.icon} title={exp.title} />
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
          <div className="flex items-center gap-4 mb-12 border-b border-white/5 pb-6">
            <Beaker className="text-violet-400" size={32} />
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white">Research & Publications</h2>
              <p className="text-violet-200/60 mt-1">Novel contributions to Artificial Intelligence.</p>
            </div>
          </div>

          <div className="space-y-24">
            {research.map((paper, i) => (
              <motion.div
                key={paper.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className={`flex flex-col ${i % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 items-center group`}
              >
                {/* Research Card */}
                <Link to={paper.link} className="w-full lg:w-1/2 aspect-video rounded-2xl overflow-hidden glass-panel p-2 hover:scale-[1.02] transition-transform duration-500 hover:shadow-[0_0_40px_-5px_rgba(124,58,237,0.3)] border border-white/10 hover:border-violet-500/50">
                  <div className={`w-full h-full rounded-xl relative overflow-hidden bg-gradient-to-br ${paper.color} opacity-90 group-hover:opacity-100 transition-opacity`}>
                    <CardOverlay icon={paper.icon} title={paper.title} />

                    {/* Research Badge Overlay */}
                    <div className="absolute top-4 left-4 bg-black/40 backdrop-blur text-white/90 px-3 py-1 rounded-full text-xs font-bold border border-white/20 flex items-center gap-2">
                      <Beaker size={12} /> RESEARCH
                    </div>
                  </div>
                </Link>

                {/* Content */}
                <div className="w-full lg:w-1/2 space-y-6">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-violet-400 font-mono text-xs tracking-widest uppercase">{paper.role}</span>
                    <div className="h-[1px] w-12 bg-violet-500/50" />
                  </div>

                  <h3 className="text-3xl font-bold text-white group-hover:text-violet-200 transition-colors">{paper.title}</h3>

                  <p className="text-gray-400 leading-relaxed text-lg">
                    {paper.desc}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {paper.tech.map(t => (
                      <span key={t} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-medium text-gray-300">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="pt-4">
                    <Link to={paper.link} className="text-white hover:text-violet-400 font-bold border-b border-white hover:border-violet-400 pb-1 transition-colors flex items-center gap-2 w-fit">
                      Read Publication <ArrowUpRight size={14} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
