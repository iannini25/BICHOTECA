import { useEffect } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Sparkles, Leaf } from "lucide-react";

export function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login");
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex-1 flex flex-col items-center justify-center p-6 relative bg-[#FFF8E7]"
    >
      {/* Decorations */}
      <Leaf className="absolute top-12 left-8 text-[#4CAF50] w-8 h-8 opacity-50 rotate-[-45deg]" />
      <Sparkles className="absolute top-16 right-10 text-[#FFD54F] w-6 h-6 opacity-80" />
      <Sparkles className="absolute bottom-20 left-12 text-[#FFD54F] w-8 h-8 opacity-80" />
      <Leaf className="absolute bottom-16 right-8 text-[#4CAF50] w-10 h-10 opacity-50 rotate-[45deg]" />

      <motion.div 
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", bounce: 0.5 }}
        className="flex items-center gap-2 mb-4"
      >
        <span className="text-6xl">🦁</span>
        <h1 className="text-5xl font-bold text-[#4CAF50] tracking-tight">Bichoteca</h1>
      </motion.div>
      
      <p className="text-[#5D4037] text-lg font-medium text-center">
        Os sons da natureza<br/>ao seu alcance
      </p>
    </motion.div>
  );
}
