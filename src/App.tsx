import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Global UI Elements
import TheTrigger from './Components/TheTrigger';
import GlobalBackground from './Components/GlobalBackground';

// Normal Mode (Professional UX)
import Hero from './Components/normal/Hero';
import ProjectGrid from './Components/normal/ProjectGrid';
import Details from './Components/normal/Details';
import Contact from './Components/normal/Contact';
import CIFTResearch from './Components/normal/CIFTResearch';

// Store Mode
import Marketplace from './Components/Marketplace';

/**
 * Portfolio v1.0
 * Identity: Krish Patel
 */
function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen relative overflow-x-hidden selection:bg-blue-500 selection:text-white bg-[#050505] text-white transition-colors duration-700">

      {/* CORE CONTENT LAYER */}
      <main className="relative z-10">
        <GlobalBackground />

        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={
              <>
                <Hero />
                <ProjectGrid />
                <Details />
                <Contact />
              </>
            } />
            <Route path="/store" element={<Marketplace />} />
            <Route path="/CIFT" element={<CIFTResearch />} />
          </Routes>
        </AnimatePresence>
      </main>

      {/* GLOBAL NAVIGATION */}
      <TheTrigger />

    </div>
  );
}

export default App; 