import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function TheTrigger() {
  const navigate = useNavigate();
  const location = useLocation();
  const isStore = location.pathname === '/store';

  const toggleMode = () => {
    if (isStore) {
      navigate('/');
    } else {
      navigate('/store');
    }
  };

  return (
    <button
      onClick={toggleMode}
      className="fixed bottom-8 right-8 z-50 group cursor-pointer"
    >
      <div className={`
        relative flex items-center justify-center w-16 h-16 rounded-full shadow-xl transition-all duration-500
        bg-white hover:bg-gray-200 text-black border border-white/20 backdrop-blur-sm
      `}>
        {/* Icon Swap Logic */}
        <motion.div
          key={isStore ? 'store' : 'home'}
          initial={{ scale: 0.5, opacity: 0, rotate: -45 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          {isStore ? (
            <ArrowLeft className="w-6 h-6" />
          ) : (
            <ShoppingBag className="w-6 h-6" />
          )}
        </motion.div>

        {/* Tooltip hint */}
        <span className="absolute -top-10 right-0 bg-black/80 backdrop-blur-md border border-white/20 text-white text-xs px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          {!isStore ? 'Open Store' : 'Return to Home'}
        </span>
      </div>
    </button>
  );
}
