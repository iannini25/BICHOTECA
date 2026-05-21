import { motion } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ComponentProps } from "react";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type MotionButtonProps = ComponentProps<typeof motion.button>;

interface ButtonProps extends MotionButtonProps {
  variant?: "primary" | "secondary" | "accent";
}

export function Button({ variant = "primary", className, children, ...props }: ButtonProps) {
  const baseClasses = "relative min-h-[75px] rounded-[32px] font-fredoka font-bold text-2xl w-full flex items-center justify-center transition-all";
  
  const variants = {
    primary: "bg-[#4CAF50] text-white shadow-[0_8px_0_#388E3C] hover:bg-[#45a049] active:shadow-[0_0px_0_#388E3C] active:translate-y-[8px]",
    secondary: "bg-[#FFD54F] text-[#5D4037] shadow-[0_8px_0_#FBC02D] hover:bg-[#ffcd38] active:shadow-[0_0px_0_#FBC02D] active:translate-y-[8px]",
    accent: "bg-[#FF8A65] text-white shadow-[0_8px_0_#E64A19] hover:bg-[#ff7a50] active:shadow-[0_0px_0_#E64A19] active:translate-y-[8px]",
  };

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      className={cn(baseClasses, variants[variant], className)}
      {...props}
    >
      {children}
    </motion.button>
  );
}

interface CircularButtonProps extends MotionButtonProps {
  variant?: "white" | "yellow";
}

export function CircularButton({ 
  className, 
  children,
  variant = "white",
  ...props 
}: CircularButtonProps) {
  const baseClasses = "rounded-full flex items-center justify-center transition-all shadow-[0_4px_12px_rgba(0,0,0,0.08)] cursor-pointer";
  const variants = {
    white: "bg-white text-[#5D4037] active:bg-gray-100",
    yellow: "bg-[#FFD54F] text-[#5D4037] active:bg-[#ffcd38]",
  };
  
  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      className={cn(baseClasses, variants[variant], className)}
      {...props}
    >
      {children}
    </motion.button>
  );
}
