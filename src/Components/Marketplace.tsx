import { motion } from 'framer-motion';
import Ballpit from './Ballpit';
import { Download, Search, Play } from 'lucide-react';

export default function Marketplace() {
  const games = [
    {
      id: "GAME_01",
      name: "Cipher Breaker",
      category: "Puzzle",
      desc: "Crack the AI codes in this cyberpunk puzzle game.",
      specs: ["WebGL", "React"]
    },
    {
      id: "GAME_02",
      name: "Void Drifter",
      category: "Racing",
      desc: "High-speed physics racer through generated void tunnels.",
      specs: ["Unreal 5", "C++"]
    },
    {
      id: "GAME_03",
      name: "Neon Tactics",
      category: "Strategy",
      desc: "Turn-based tactical combat in a neon city.",
      specs: ["Unity", "C#"]
    },
    {
      id: "GAME_04",
      name: "Thermal Ops",
      category: "Shooter",
      desc: "Stealth shooter using thermal vision mechanics.",
      specs: ["UE5", "Blueprints"]
    },
    {
      id: "GAME_05",
      name: "Shard Hunter",
      category: "RPG",
      desc: "Explore the database shards to find the lost keys.",
      specs: ["Godot", "GDScript"]
    },
    {
      id: "GAME_06",
      name: "Flux Racer",
      category: "Arcade",
      desc: "Retro wave endless runner with synthwave beats.",
      specs: ["Three.js", "JS"]
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-96 relative overflow-hidden font-sans">

      {/* 3D BACKGROUND (Ballpit) */}
      <div className="fixed inset-0 z-0 opacity-100 pointer-events-auto">
        {/* Subtle Gradient to match main theme */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-black z-[-1]" />

        <Ballpit
          count={35}
          gravity={0.05}
          friction={0.995}
          wallBounce={0.95}
          followCursor={true}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 pointer-events-none">

        {/* STORE HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 border-b border-white/10 pb-6 pointer-events-auto bg-white/[0.02] backdrop-blur-xl p-6 rounded-2xl border border-white/10 shadow-2xl">
          <div className="space-y-4 w-full md:w-auto">
            <div>
              <h1 className="text-4xl font-black italic tracking-tighter text-white mb-1 uppercase">Game<span className="text-violet-400">Store</span></h1>
              <p className="text-sm text-gray-400">Curated indie projects & prototypes</p>
            </div>

            {/* Search Bar */}
            <div className="relative w-full md:w-80 group">
              <Search className="absolute left-3 top-2.5 text-gray-500 w-4 h-4 group-focus-within:text-violet-400 transition-colors" />
              <input
                type="text"
                placeholder="Search games..."
                className="w-full bg-black/50 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-violet-500/50 transition-all placeholder:text-gray-600"
              />
            </div>
          </div>

          <div className="flex gap-2 mt-4 md:mt-0">
            {['All', 'Action', 'RPG', 'Sim'].map(tag => (
              <button key={tag} className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-bold hover:bg-violet-500/20 hover:border-violet-500/50 hover:text-violet-200 transition-all">
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* GAMES GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pointer-events-auto">
          {games.map((game, i) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -8 }}
              className="bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:border-violet-500/50 hover:shadow-[0_0_30px_-10px_rgba(139,92,246,0.3)] transition-all group cursor-pointer flex flex-col shadow-lg"
            >
              {/* Game/Product Image */}
              <div className="h-40 bg-gradient-to-br from-gray-900 to-black relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://placehold.co/400x250/0f172a/ffffff/png?text=GAME+ART')] bg-cover bg-center opacity-60 group-hover:scale-110 transition-transform duration-700" />

                {/* Floating Price Tag */}
                <div className="absolute top-3 right-3 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest backdrop-blur-md">
                  Free To Play
                </div>

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-90" />
              </div>

              {/* Content */}
              <div className="p-5 flex-1 flex flex-col">
                <div className="mb-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] text-violet-400 font-bold uppercase tracking-wider">{game.category}</span>
                    <div className="flex gap-1">
                      {game.specs.map(t => (
                        <span key={t} className="w-1.5 h-1.5 rounded-full bg-gray-600" title={t} />
                      ))}
                    </div>
                  </div>
                  <h3 className="text-xl font-black text-white leading-tight uppercase italic group-hover:text-violet-200 transition-colors">{game.name}</h3>
                </div>

                <p className="text-xs text-gray-400 leading-relaxed mb-6 line-clamp-2">
                  {game.desc}
                </p>

                <div className="mt-auto flex gap-2">
                  <button className="flex-1 bg-white text-black py-2 rounded-lg font-bold text-xs hover:bg-violet-400 hover:text-white transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-violet-500/25">
                    <Play size={12} fill="currentColor" /> PLAY NOW
                  </button>
                  <button className="px-3 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 hover:text-violet-400 transition-colors">
                    <Download size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-32 flex flex-col items-center justify-center gap-4 pointer-events-none opacity-50">
          <div className="w-px h-12 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-gray-500">Physics Playground Below</p>
        </div>

      </div>
    </div>
  );
}
