import { motion } from 'framer-motion';

export default function TechStack() {
  const skills = [
    "C++", "UNREAL ENGINE 5", "PYTORCH", "RUST", "NEXT.JS", "TYPESCRIPT", 
    "ADVERSARIAL AI", "THREE.JS", "WEBGL", "SYSTEM ARCHITECTURE", "KRISH PATEL"
  ];

  return (
    <section className="py-20 border-b border-gray-200 overflow-hidden bg-black text-white">
      <div className="flex whitespace-nowrap">
        {/* Infinite Loop 1 */}
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className="flex gap-16 items-center"
        >
          {skills.map((skill, i) => (
            <span key={i} className="text-6xl md:text-8xl font-black tracking-tighter opacity-50 hover:opacity-100 transition-opacity cursor-crosshair">
              {skill}
            </span>
          ))}
        </motion.div>
        
        {/* Infinite Loop 2 (Duplicate for seamlessness) */}
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className="flex gap-16 items-center pl-16"
        >
          {skills.map((skill, i) => (
            <span key={`dup-${i}`} className="text-6xl md:text-8xl font-black tracking-tighter opacity-50 hover:opacity-100 transition-opacity cursor-crosshair">
              {skill}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}