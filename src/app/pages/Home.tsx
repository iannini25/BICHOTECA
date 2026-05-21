import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Settings } from "lucide-react";
import { biomes } from "../data";
import { SceneryIcon } from "../components/SceneryIcon";

export function Home() {
  const navigate = useNavigate();

  return (
    <motion.div 
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 1.1, opacity: 0 }}
      className="flex-1 flex flex-col p-6 bg-[#FFF8E7] overflow-y-auto"
    >
      <header className="flex justify-between items-center py-2 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-2xl shadow-sm border-2 border-[#FFD54F]">
            👦
          </div>
          <span className="text-2xl font-bold text-[#5D4037]">Oi, Leo!</span>
        </div>
        <button 
          onClick={() => navigate("/login")}
          className="w-10 h-10 flex items-center justify-center text-[#A1887F] active:opacity-70"
        >
          <Settings size={24} />
        </button>
      </header>

      <h1 className="text-[32px] font-bold text-[#5D4037] text-center mb-8 leading-tight">
        Pra onde vamos hoje?
      </h1>

      <div className="grid grid-cols-2 gap-4 pb-8">
        {biomes.map((biome) => (
          <motion.button
            key={biome.id}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(`/biome/${biome.id}`)}
            className="rounded-[24px] flex flex-col items-center justify-end p-4 h-[180px] shadow-[0_4px_12px_rgba(0,0,0,0.08)] relative overflow-hidden group"
            style={{ backgroundColor: biome.color }}
          >
            {/* Background Scenery Element */}
            <div className="absolute top-4 right-4 opacity-40 text-white">
              <SceneryIcon
                biomeId={biome.id}
                emoji={biome.sceneryEmoji}
                size={48}
              />
            </div>
            
            <div className="flex-1 flex items-center justify-center w-full z-10">
              <span className="text-6xl group-hover:scale-110 transition-transform">{biome.emoji}</span>
            </div>
            
            <div className="w-full bg-white/20 backdrop-blur-sm rounded-[16px] py-2 mt-2 z-10">
              <span className="text-white font-bold text-lg tracking-wide">{biome.name}</span>
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
