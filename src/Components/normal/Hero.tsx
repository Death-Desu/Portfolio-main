import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Download } from 'lucide-react';
import { CometCard } from '../ui/comet-card';


export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center relative px-6 md:px-20 overflow-hidden pt-20">

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-12 items-start relative z-10">

        {/* LEFT COLUMN: Identity (Image + Name + Role) */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center lg:items-start space-y-8 sticky top-24"
        >
          {/* Image Card - Comet Card Implementation */}
          <CometCard className="w-[280px] h-[280px] md:w-[350px] md:h-[350px]">
            <div className="relative w-full h-full p-0">
              <div className="w-full h-full rounded-2xl overflow-hidden relative shadow-2xl border border-white/10 group bg-slate-950">
                <div className="absolute inset-0 bg-violet-500/10 mix-blend-overlay group-hover:opacity-0 transition-opacity duration-500 z-20" />
                <img
                  src="/your-photo.jpg"
                  alt="Krish Patel"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 hover:scale-110 relative z-10"
                  onError={(e) => { e.currentTarget.src = "https://placehold.co/600x600/1a1a1a/ffffff?text=Krish" }}
                />
              </div>
            </div>
          </CometCard>

          {/* Identity Text */}
          <div className="text-center lg:text-left space-y-2 relative z-10">
            <h1 className="text-5xl font-bold tracking-tight text-white mb-2 drop-shadow-lg">
              Krish Patel
            </h1>
            <p className="text-xl text-gray-300 font-medium tracking-wide drop-shadow-md">
              Computer Science Student
            </p>
            <div className="h-1 w-20 bg-violet-500 rounded-full mt-4 mx-auto lg:mx-0 shadow-[0_0_10px_rgba(139,92,246,0.6)]" />
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-6 text-gray-400">
            <a href="#" className="hover:text-white hover:scale-110 transition-all"><Github size={28} /></a>
            <a href="#" className="hover:text-violet-400 hover:scale-110 transition-all"><Linkedin size={28} /></a>
            <a href="mailto:yourname@email.com" className="hover:text-white hover:scale-110 transition-all"><Mail size={28} /></a>
          </div>
        </motion.div>


        {/* RIGHT COLUMN: About Me Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-10 lg:pl-10 lg:border-l lg:border-white/5"
        >
          {/* Biography */}
          <div className="space-y-6 text-lg text-gray-300 leading-relaxed font-light">
            <p>
              <span className="text-white font-semibold text-2xl block mb-4">Architecting Logic.</span>
              I am a Computer Science student driven by the pursuit of precision. My work sits at the intersection of scalable systems engineering and interactive media, where code is not just a tool but a medium for logical art. I don't simply write software; I build digital environments that are robust, efficient, and meticulously crafted.
            </p>
            <p>
              From architecting backend recruitment platforms to engineering high-performance simulations in C++, I obsess over the details that define reliability. The challenge of optimizing a database query or shaving milliseconds off a render cycle is what fuels my passion. I believe that true elegance in engineering is found in simplicity and speed.
            </p>
            <p>
              When I'm not optimizing algorithms, I'm exploring the boundaries of AI or designing immersive experiences. I believe in software that is as beautiful as it is functional—cold logic wrapped in a human experience. I am constantly learning, constantly evolving, and ready to tackle the next complex problem.
            </p>
          </div>

          {/* Call to Action */}
          <div className="flex flex-wrap gap-4 pt-4">
            <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-4 bg-white text-slate-900 font-bold rounded-xl hover:bg-violet-50 transition-all shadow-[0_0_20px_-5px_rgba(255,255,255,0.5)] flex items-center gap-2">
              <Mail size={18} /> Contact Me
            </button>
            {/* Mode Switcher */}
            <div className="flex gap-4">
              <button className="px-6 py-2 rounded-full bg-violet-600 text-white text-sm font-bold hover:bg-violet-500 hover:scale-105 transition-all shadow-[0_0_20px_rgba(124,58,237,0.4)] flex items-center gap-2">
                <Download size={16} /> DOWNLOAD CV
              </button>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
