import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";

export function Register() {
  const navigate = useNavigate();

  return (
    <motion.div 
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="flex-1 flex flex-col p-6 bg-[#FFF8E7] overflow-y-auto"
    >
      <div className="flex flex-col items-center pt-8 pb-4">
        <span className="text-[#A1887F] text-sm font-bold uppercase tracking-wider mb-2">Área dos Pais</span>
        <h1 className="text-4xl font-bold text-[#4CAF50] mb-2 text-center">Vamos começar!</h1>
      </div>

      <div className="mt-4 flex flex-col gap-4 flex-1">
        <Input placeholder="Seu nome (responsável)" />
        <Input placeholder="Nome da criança" />
        <Input placeholder="Idade da criança" type="number" />
        
        <div className="mt-8 flex flex-col items-center gap-6 pb-8">
          <Button onClick={() => navigate("/home")}>
            Criar conta
          </Button>
          
          <button 
            onClick={() => navigate(-1)}
            className="text-[#FF8A65] font-bold text-lg active:opacity-70 transition-opacity"
          >
            Já tenho conta
          </button>
        </div>
      </div>
      
      {/* Decorative family emoji */}
      <div className="absolute top-8 right-6 text-3xl opacity-20 pointer-events-none">
        👨‍👩‍👧‍👦
      </div>
    </motion.div>
  );
}
