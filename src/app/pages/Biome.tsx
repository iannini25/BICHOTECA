import { useParams, useNavigate } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft, Volume2 } from "lucide-react";
import { CircularButton } from "../components/Button";
import { AnimalIcon } from "../components/AnimalIcon";
import { biomes } from "../data";
import { playAnimalSound, unlockAudio } from "../utils/sounds";
import { SceneryIcon } from "../components/SceneryIcon";

export function BiomeView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const biome = biomes.find((b) => b.id === id);

  if (!biome) return null;

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      className="flex-1 flex flex-col p-6 overflow-y-auto relative"
      style={{ backgroundColor: biome.color }}
    >
      <div className="absolute inset-0 pointer-events-none opacity-20 flex flex-wrap gap-8 p-8 justify-center content-start text-white">
        {Array.from({ length: 12 }).map((_, i) => (
          <SceneryIcon
            key={i}
            biomeId={biome.id}
            emoji={biome.sceneryEmoji}
            size={36}
          />
        ))}
      </div>

      <header className="flex items-center gap-4 py-4 z-10">
        <CircularButton
          onClick={() => navigate("/home")}
          className="w-14 h-14 shrink-0"
        >
          <ArrowLeft size={28} className="text-[#5D4037]" />
        </CircularButton>
        <h1 className="text-3xl font-bold text-white tracking-widest drop-shadow-md">
          {biome.name}
        </h1>
      </header>

      <div className="flex-1 flex items-center justify-center z-10 mt-4 pb-8">
        <div className="grid grid-cols-2 gap-5 w-full max-w-md">
          {biome.animals.map((animal) => (
            <motion.button
              key={animal.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(`/biome/${biome.id}/animal/${animal.id}`)}
              className="bg-white rounded-[24px] flex flex-col items-center justify-center p-4 aspect-[4/5] shadow-[0_8px_0_rgba(0,0,0,0.1)] active:translate-y-2 active:shadow-none transition-all relative"
            >
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  unlockAudio();
                  void playAnimalSound(animal.id);
                }}
                className="absolute top-3 right-3 text-[#A1887F] bg-gray-100 p-1.5 rounded-full active:bg-[#FFD54F] active:text-[#5D4037] transition-colors"
                aria-label={`Ouvir o som da ${animal.name}`}
              >
                <Volume2 size={18} />
              </button>

              <div className="flex-1 flex items-center justify-center">
                <AnimalIcon id={animal.id} emoji={animal.emoji} size={78} />
              </div>

              <span className="font-bold text-[#5D4037] text-xl mt-2 tracking-wide">
                {animal.name}
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
