import SpaceParticles from "./SpaceParticles";

export default function GlobalBackground() {
    return (
        <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden min-h-screen bg-black">

            {/* 1. Deep Base Layer - Pure Darkness for Contrast */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-[#0a0a0a] to-black" />

            {/* 2. Abstract Fluid Mesh (Darker & Glowier) 
               - Reduced opacity to 'decrease exposure'
               - Blobs remain vibrant to 'glow' against the black
            */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-30">
                {/* Orb 1: Violet - Deep & Dark */}
                <div className="absolute top-[-10%] left-[-10%] w-[70vw] h-[70vw] bg-violet-900/30 rounded-full mix-blend-screen blur-[120px] animate-blob filter" />

                {/* Orb 2: Fuchsia - Subtle Glow */}
                <div className="absolute top-[20%] right-[-20%] w-[60vw] h-[60vw] bg-fuchsia-900/20 rounded-full mix-blend-screen blur-[120px] animate-blob animation-delay-2000 filter" style={{ animationDelay: '2s' }} />

                {/* Orb 3: Indigo - Deep Space */}
                <div className="absolute bottom-[-20%] left-[20%] w-[80vw] h-[80vw] bg-indigo-900/40 rounded-full mix-blend-screen blur-[120px] animate-blob animation-delay-4000 filter" style={{ animationDelay: '4s' }} />
            </div>

            {/* 3. Interactive Tech Particles (The Unique Interactive Element) */}
            <div className="absolute inset-0">
                <SpaceParticles />
            </div>

            {/* 4. Grid overlay */}
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.05]" />

            {/* 5. Film Grain */}
            <div className="absolute inset-0 opacity-[0.07] pointer-events-none mix-blend-overlay"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
            />

            {/* 6. Vignette for Focus & Depth */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_10%,rgba(0,0,0,0.6)_100%)] pointer-events-none" />
        </div>
    );
}
