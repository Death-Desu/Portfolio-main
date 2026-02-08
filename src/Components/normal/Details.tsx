import { motion } from 'framer-motion';

// Helper to get Simple Icons URL
const getIcon = (slug: string) => `https://cdn.simpleicons.org/${slug}/white`;

// Data for Skills
const frontend = [
  { name: "React", icon: getIcon("react") },
  { name: "TypeScript", icon: getIcon("typescript") },
  { name: "Tailwind", icon: getIcon("tailwindcss") },
  { name: "Framer", icon: getIcon("framer") },
  { name: "Next.js", icon: getIcon("nextdotjs") },
  { name: "Three.js", icon: getIcon("threedotjs") },
];

const backend = [
  { name: "Node.js", icon: getIcon("nodedotjs") },
  { name: "C++", icon: getIcon("cplusplus") },
  { name: "Python", icon: getIcon("python") },
  { name: "Go", icon: getIcon("go") },
  { name: "PostgreSQL", icon: getIcon("postgresql") },
  { name: "Redis", icon: getIcon("redis") },
];

const tools = [
  { name: "Docker", icon: getIcon("docker") },
  { name: "AWS", icon: getIcon("amazonwebservices") },
  { name: "Git", icon: getIcon("git") },
  { name: "Linux", icon: getIcon("linux") },
  { name: "K8s", icon: getIcon("kubernetes") },
];

// Reusable Orbit Node with Color Styling
const OrbitNode = ({ item, angle, radius, delay, color }: { item: any, angle: number, radius: number, delay: number, color: string }) => {
  const rad = (angle * Math.PI) / 180;
  const x = Math.cos(rad) * radius;
  const y = Math.sin(rad) * radius;

  // Map color names to specific Tailind/CSS values for shadows/borders
  const colorStyles: Record<string, string> = {
    violet: "border-violet-500/30 shadow-[0_0_15px_rgba(139,92,246,0.2)] hover:border-violet-400 hover:shadow-[0_0_30px_rgba(139,92,246,0.6)]",
    fuchsia: "border-fuchsia-500/30 shadow-[0_0_15px_rgba(232,121,249,0.2)] hover:border-fuchsia-400 hover:shadow-[0_0_30px_rgba(232,121,249,0.6)]",
    sky: "border-sky-500/30 shadow-[0_0_15px_rgba(14,165,233,0.2)] hover:border-sky-400 hover:shadow-[0_0_30px_rgba(14,165,233,0.6)]"
  };

  const badgeColors: Record<string, string> = {
    violet: "text-violet-200 bg-violet-900/40 border-violet-500/30",
    fuchsia: "text-fuchsia-200 bg-fuchsia-900/40 border-fuchsia-500/30",
    sky: "text-sky-200 bg-sky-900/40 border-sky-500/30"
  };

  return (
    <motion.div
      drag
      dragSnapToOrigin
      dragElastic={0.2}
      whileHover={{ scale: 1.2, zIndex: 50 }}
      whileTap={{ scale: 0.9 }}
      // START FROM CENTER (0,0) - The Sun
      initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
      // EXPLODE OUTWARDS to calculated position
      whileInView={{ x, y, opacity: 1, scale: 1 }}
      // Bouncy "explosion" spring transition
      transition={{
        delay,
        type: "spring",
        stiffness: 100,
        damping: 10,
        mass: 1
      }}
      className="absolute top-1/2 left-1/2 -ml-10 -mt-10 flex flex-col items-center justify-center cursor-grab active:cursor-grabbing group"
    >
      <div className={`w-20 h-20 bg-[#0a0a0a]/90 backdrop-blur-xl border rounded-full flex items-center justify-center transition-all duration-300 ${colorStyles[color] || colorStyles.violet}`}>
        <img src={item.icon} alt={item.name} className="w-10 h-10 opacity-80 group-hover:opacity-100 transition-opacity" />
      </div>
      <span className={`absolute -bottom-8 text-xs font-bold tracking-wider uppercase px-3 py-1 rounded-full whitespace-nowrap border backdrop-blur-md transition-colors ${badgeColors[color] || badgeColors.violet}`}>
        {item.name}
      </span>
    </motion.div>
  );
};

export default function Details() {
  return (
    <section className="py-32 px-6 md:px-20 relative z-10 overflow-hidden min-h-[100vh]">
      <div className="max-w-7xl mx-auto flex flex-col items-center relative">

        {/* Section Header */}
        <div className="text-center z-20 mb-52 pointer-events-none">
          <h2 className="text-4xl font-bold text-white tracking-tight">Technical Solar System</h2>
          <p className="text-violet-200/60 mt-2 text-lg ">Interactive. Scalable. Gravitational.</p>
        </div>

        {/* Solar System Container (Lifted Up Significantly) */}
        <div className="relative w-[800px] h-[800px] flex items-center justify-center mt-[-200px] scale-75 md:scale-100 origin-center ">

          {/* ORBITAL RINGS */}
          <div className="absolute inset-0 rounded-full border border-white/5 opacity-30" />
          <div className="absolute top-[12.5%] left-[12.5%] w-[75%] h-[75%] rounded-full border border-white/5 opacity-20" />

          {/* THE SUN */}
          <div className="absolute z-10 w-48 h-48 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-full blur-[60px] opacity-40 animate-pulse" />
          <div className="absolute z-10 w-40 h-40 bg-[#050505] border-4 border-white/10 rounded-full flex items-center justify-center shadow-[0_0_80px_rgba(124,58,237,0.4)]">
            <div className="text-center transform scale-110">
              <p className="text-sm text-violet-400 font-mono tracking-[0.3em] mb-2 font-bold">CORE</p>
              <span className="text-4xl font-black text-white italic tracking-tighter">TECH</span>
            </div>
          </div>


          {/* --- TIERED PYRAMID LAYOUT (INCREASED OUTER RADIUS) --- */}

          {/* CENTER ANGLES: Frontend=210°, Backend=330°, Tools=90° */}

          {/* FRONTEND SECTION (Center: 210°) - VIOLET */}
          {/* Layer 1 (Outer - 320px): Max spread */}
          <OrbitNode item={frontend[0]} angle={170} radius={320} delay={0} color="violet" />
          <OrbitNode item={frontend[1]} angle={195} radius={320} delay={0.1} color="violet" />
          <OrbitNode item={frontend[2]} angle={225} radius={320} delay={0.2} color="violet" />
          <OrbitNode item={frontend[3]} angle={250} radius={320} delay={0.3} color="violet" />
          {/* Layer 2 (Inner - 190px): Max spread */}
          <OrbitNode item={frontend[4]} angle={190} radius={190} delay={0.4} color="violet" />
          <OrbitNode item={frontend[5]} angle={230} radius={190} delay={0.5} color="violet" />


          {/* BACKEND SECTION (Center: 330°) - FUCHSIA */}
          {/* Layer 1 (Outer - 320px): Max spread */}
          <OrbitNode item={backend[0]} angle={290} radius={320} delay={0.1} color="fuchsia" />
          <OrbitNode item={backend[1]} angle={315} radius={320} delay={0.2} color="fuchsia" />
          <OrbitNode item={backend[2]} angle={345} radius={320} delay={0.3} color="fuchsia" />
          <OrbitNode item={backend[3]} angle={10} radius={320} delay={0.4} color="fuchsia" />
          {/* Layer 2 (Inner - 190px): Max spread */}
          <OrbitNode item={backend[4]} angle={310} radius={190} delay={0.5} color="fuchsia" />
          <OrbitNode item={backend[5]} angle={350} radius={190} delay={0.6} color="fuchsia" />


          {/* TOOLS SECTION (Center: 90°) - SKY/BLUE */}
          {/* Layer 1 (Outer - 360px): Max spread */}
          <OrbitNode item={tools[0]} angle={50} radius={360} delay={0.2} color="sky" />
          <OrbitNode item={tools[1]} angle={90} radius={360} delay={0.3} color="sky" />
          <OrbitNode item={tools[2]} angle={130} radius={360} delay={0.4} color="sky" />
          {/* Layer 2 (Inner - 200px): Max spread */}
          <OrbitNode item={tools[3]} angle={65} radius={200} delay={0.5} color="sky" />
          <OrbitNode item={tools[4]} angle={115} radius={200} delay={0.6} color="sky" />


          {/* SECTION LABELS */}
          <div className="absolute top-[10%] left-[-5%] text-right hidden md:block opacity-80">
            <h3 className="text-4xl font-black text-violet-400 mb-1">Frontend</h3>
            <p className="text-gray-400 text-sm uppercase tracking-widest font-bold">Interface</p>
          </div>

          <div className="absolute top-[10%] right-[-5%] text-left hidden md:block opacity-80">
            <h3 className="text-4xl font-black text-fuchsia-400 mb-1">Backend</h3>
            <p className="text-gray-400 text-sm uppercase tracking-widest font-bold">Systems</p>
          </div>

          <div className="absolute bottom-[-15%] left-1/2 -translate-x-1/2 text-center text-white hidden md:block opacity-80">
            <h3 className="text-4xl font-black text-sky-400 mb-1">Tools</h3>
            <p className="text-gray-400 text-sm uppercase tracking-widest font-bold">Infrastructure</p>
          </div>
        </div>
      </div>

    </section >
  );
}
