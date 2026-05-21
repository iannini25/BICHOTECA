import { ComponentProps } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function Input({ className, ...props }: ComponentProps<"input">) {
  return (
    <input
      className={cn(
        "w-full h-[75px] rounded-[32px] bg-white border-2 border-transparent px-8",
        "font-fredoka text-xl text-[#5D4037] placeholder-[#A1887F]",
        "shadow-[0_4px_12px_rgba(0,0,0,0.08)]",
        "focus:outline-none focus:border-[#4CAF50] transition-colors",
        className
      )}
      {...props}
    />
  );
}
