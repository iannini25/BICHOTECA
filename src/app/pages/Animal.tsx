import { useParams, useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Volume2, Sparkles } from "lucide-react";
import { CircularButton } from "../components/Button";
import { AnimalIcon } from "../components/AnimalIcon";
import { biomes } from "../data";
import { useCallback, useEffect, useRef, useState } from "react";
import { playAnimalSound, unlockAudio } from "../utils/sounds";

export function AnimalView() {
  const { biomeId, animalId } = useParams();
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const stopTimer = useRef<number | null>(null);

  const biome = biomes.find((b) => b.id === biomeId);
  const animal = biome?.animals.find((a) => a.id === animalId);

  const playSound = useCallback(() => {
    if (!animal) return;
    unlockAudio();
    playAnimalSound(animal.id);
    setIsPlaying(true);
    if (stopTimer.current) window.clearTimeout(stopTimer.current);
    stopTimer.current = window.setTimeout(() => setIsPlaying(false), 2200);
  }, [animal]);

  // Auto-play once on mount (slight delay so the page-transition animation has settled)
  useEffect(() => {
    const id = window.setTimeout(playSound, 400);
    return () => {
      window.clearTimeout(id);
      if (stopTimer.current) window.clearTimeout(stopTimer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animalId]);

  if (!animal || !biome) return null;

  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="flex-1 flex flex-col p-6 overflow-hidden relative"
    >
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `linear-gradient(135deg, ${biome.color} 0%, #FFD54F 100%)`,
        }}
      />

      <Sparkles className="absolute top-32 left-10 text-white w-8 h-8 opacity-60 z-0 animate-pulse" />
      <Sparkles className="absolute top-40 right-12 text-white w-6 h-6 opacity-80 z-0 animate-pulse delay-75" />
      <Sparkles className="absolute bottom-48 left-16 text-white w-10 h-10 opacity-50 z-0 animate-pulse delay-150" />

      <header className="flex items-center py-4 z-10">
        <CircularButton
          onClick={() => navigate(-1)}
          className="w-14 h-14 shrink-0"
        >
          <ArrowLeft size={28} className="text-[#5D4037]" />
        </CircularButton>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center z-10 mt-8">
        <div className="relative mb-12 w-[200px] h-[200px] flex items-center justify-center">
          <AnimatePresence>
            {isPlaying && (
              <>
                <motion.div
                  initial={{ scale: 0.8, opacity: 0.8 }}
                  animate={{ scale: 2.5, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
                  className="absolute inset-0 border-4 border-white/50 rounded-full"
                />
                <motion.div
                  initial={{ scale: 0.8, opacity: 0.8 }}
                  animate={{ scale: 2.5, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
                  className="absolute inset-0 border-4 border-white/30 rounded-full"
                />
              </>
            )}
          </AnimatePresence>

          <motion.div
            animate={isPlaying ? { scale: [1, 1.1, 1], rotate: [0, -5, 5, 0] } : {}}
            transition={{ duration: 0.5, repeat: Infinity }}
            className="relative z-10 filter drop-shadow-[0_20px_20px_rgba(0,0,0,0.2)] flex items-center justify-center"
          >
            <AnimalIcon id={animal.id} emoji={animal.emoji} size={170} />
          </motion.div>
        </div>

        <h2 className="text-6xl font-bold text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] tracking-wide mb-2">
          {animal.name}
        </h2>

        <p className="text-white/90 text-xl font-medium mb-12 bg-black/10 px-6 py-2 rounded-full">
          Toque para ouvir de novo!
        </p>

        <CircularButton
          variant="yellow"
          onClick={playSound}
          className="w-[100px] h-[100px] mt-auto mb-8 shadow-[0_8px_16px_rgba(0,0,0,0.2)] hover:scale-105 active:scale-95"
        >
          <Volume2 size={48} className={isPlaying ? "animate-pulse text-[#4CAF50]" : "text-[#5D4037]"} />
        </CircularButton>
      </div>
    </motion.div>
  );
}
