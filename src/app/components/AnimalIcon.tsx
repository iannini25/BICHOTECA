import type { CSSProperties } from "react";

type AnimalIconProps = {
  id: string;
  emoji: string;
  size?: number;
  className?: string;
  style?: CSSProperties;
};

// Hand-drawn SVGs for animals whose emoji is missing/wrong on many systems.
// Add new entries to this map to override the emoji rendering.
const customDrawings: Record<string, (size: number) => JSX.Element> = {
  morsa: (size) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Morsa"
    >
      {/* Ice block */}
      <ellipse cx="100" cy="175" rx="80" ry="12" fill="#B3E5FC" opacity="0.6" />
      {/* Body */}
      <ellipse cx="100" cy="125" rx="65" ry="50" fill="#8D6E63" />
      <ellipse cx="100" cy="125" rx="55" ry="42" fill="#A1887F" />
      {/* Belly */}
      <ellipse cx="100" cy="140" rx="40" ry="28" fill="#D7CCC8" />
      {/* Flippers */}
      <ellipse cx="45" cy="150" rx="18" ry="10" fill="#6D4C41" transform="rotate(-20 45 150)" />
      <ellipse cx="155" cy="150" rx="18" ry="10" fill="#6D4C41" transform="rotate(20 155 150)" />
      {/* Head */}
      <ellipse cx="100" cy="80" rx="50" ry="42" fill="#8D6E63" />
      <ellipse cx="100" cy="82" rx="42" ry="36" fill="#A1887F" />
      {/* Cheeks (muzzle) */}
      <ellipse cx="82" cy="100" rx="18" ry="14" fill="#EFEBE9" />
      <ellipse cx="118" cy="100" rx="18" ry="14" fill="#EFEBE9" />
      {/* Whiskers dots */}
      <circle cx="78" cy="98" r="1.5" fill="#5D4037" />
      <circle cx="74" cy="103" r="1.5" fill="#5D4037" />
      <circle cx="80" cy="107" r="1.5" fill="#5D4037" />
      <circle cx="122" cy="98" r="1.5" fill="#5D4037" />
      <circle cx="126" cy="103" r="1.5" fill="#5D4037" />
      <circle cx="120" cy="107" r="1.5" fill="#5D4037" />
      {/* Nose */}
      <ellipse cx="100" cy="92" rx="8" ry="6" fill="#3E2723" />
      {/* Tusks */}
      <path d="M 92 110 Q 90 130 88 138 L 84 138 Q 86 125 88 110 Z" fill="#FFF8E1" stroke="#5D4037" strokeWidth="1" />
      <path d="M 108 110 Q 110 130 112 138 L 116 138 Q 114 125 112 110 Z" fill="#FFF8E1" stroke="#5D4037" strokeWidth="1" />
      {/* Eyes */}
      <circle cx="82" cy="72" r="6" fill="white" />
      <circle cx="118" cy="72" r="6" fill="white" />
      <circle cx="83" cy="73" r="3.5" fill="#3E2723" />
      <circle cx="119" cy="73" r="3.5" fill="#3E2723" />
      <circle cx="84" cy="71" r="1.2" fill="white" />
      <circle cx="120" cy="71" r="1.2" fill="white" />
      {/* Brows */}
      <path d="M 74 64 Q 82 60 90 64" stroke="#5D4037" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M 110 64 Q 118 60 126 64" stroke="#5D4037" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </svg>
  ),
  preguica: (size) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Preguiça"
    >
      {/* Tree branch */}
      <path d="M 0 60 Q 100 50 200 60 L 200 70 Q 100 60 0 70 Z" fill="#6D4C41" />
      <ellipse cx="40" cy="55" rx="6" ry="3" fill="#4CAF50" />
      <ellipse cx="160" cy="55" rx="6" ry="3" fill="#4CAF50" />
      {/* Arms hanging from branch */}
      <path d="M 60 65 Q 55 95 70 120" stroke="#A1887F" strokeWidth="14" strokeLinecap="round" fill="none" />
      <path d="M 140 65 Q 145 95 130 120" stroke="#A1887F" strokeWidth="14" strokeLinecap="round" fill="none" />
      {/* Claws on branch */}
      <path d="M 56 60 Q 52 55 50 60" stroke="#3E2723" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M 60 58 Q 60 52 58 56" stroke="#3E2723" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M 64 60 Q 66 54 68 58" stroke="#3E2723" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M 136 60 Q 134 54 132 58" stroke="#3E2723" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M 140 58 Q 140 52 142 56" stroke="#3E2723" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M 144 60 Q 148 55 150 60" stroke="#3E2723" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* Body */}
      <ellipse cx="100" cy="130" rx="32" ry="38" fill="#A1887F" />
      <ellipse cx="100" cy="135" rx="24" ry="30" fill="#D7CCC8" />
      {/* Head */}
      <circle cx="100" cy="95" r="32" fill="#A1887F" />
      <circle cx="100" cy="98" r="26" fill="#EFEBE9" />
      {/* Eye mask (signature sloth mask) */}
      <ellipse cx="86" cy="92" rx="11" ry="9" fill="#5D4037" transform="rotate(-15 86 92)" />
      <ellipse cx="114" cy="92" rx="11" ry="9" fill="#5D4037" transform="rotate(15 114 92)" />
      {/* Eyes */}
      <circle cx="86" cy="92" r="4" fill="white" />
      <circle cx="114" cy="92" r="4" fill="white" />
      <circle cx="87" cy="93" r="2.5" fill="#1A1A1A" />
      <circle cx="115" cy="93" r="2.5" fill="#1A1A1A" />
      <circle cx="88" cy="91" r="0.8" fill="white" />
      <circle cx="116" cy="91" r="0.8" fill="white" />
      {/* Nose */}
      <ellipse cx="100" cy="105" rx="4" ry="3" fill="#3E2723" />
      {/* Smile */}
      <path d="M 92 113 Q 100 119 108 113" stroke="#5D4037" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* Ear-like top fuzz */}
      <circle cx="78" cy="70" r="6" fill="#A1887F" />
      <circle cx="122" cy="70" r="6" fill="#A1887F" />
      {/* Zzz */}
      <text x="140" y="155" fontSize="18" fill="#5D4037" fontWeight="bold" fontFamily="sans-serif">z</text>
      <text x="150" y="145" fontSize="14" fill="#5D4037" fontWeight="bold" fontFamily="sans-serif">z</text>
    </svg>
  ),
  tucano: (size) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Tucano"
    >
      {/* Branch */}
      <path d="M 20 170 Q 100 180 180 170" stroke="#6D4C41" strokeWidth="8" fill="none" strokeLinecap="round" />
      {/* Body */}
      <ellipse cx="95" cy="115" rx="42" ry="50" fill="#1A1A1A" />
      {/* Chest */}
      <ellipse cx="85" cy="110" rx="22" ry="28" fill="#FFF59D" />
      {/* Wing */}
      <ellipse cx="110" cy="120" rx="18" ry="30" fill="#0D0D0D" transform="rotate(15 110 120)" />
      {/* Head */}
      <circle cx="90" cy="75" r="32" fill="#1A1A1A" />
      {/* Eye patch */}
      <circle cx="98" cy="70" r="10" fill="#81C784" />
      <circle cx="98" cy="70" r="5" fill="white" />
      <circle cx="99" cy="71" r="3" fill="#1A1A1A" />
      <circle cx="100" cy="69" r="1" fill="white" />
      {/* Giant colorful beak */}
      <path
        d="M 110 65 Q 175 55 178 85 Q 175 100 115 95 Z"
        fill="#FF8A65"
      />
      <path
        d="M 110 65 Q 175 55 178 85"
        stroke="#E64A19"
        strokeWidth="2"
        fill="none"
      />
      {/* Beak yellow stripe */}
      <path d="M 115 70 Q 160 64 175 78" stroke="#FFD54F" strokeWidth="6" fill="none" strokeLinecap="round" />
      {/* Beak tip black */}
      <path d="M 168 78 Q 178 82 175 92 Q 165 90 162 84 Z" fill="#1A1A1A" />
      {/* Feet */}
      <path d="M 80 165 L 75 178" stroke="#FF8A65" strokeWidth="4" strokeLinecap="round" />
      <path d="M 100 165 L 105 178" stroke="#FF8A65" strokeWidth="4" strokeLinecap="round" />
    </svg>
  ),
};

export function AnimalIcon({ id, emoji, size = 96, className = "", style }: AnimalIconProps) {
  const draw = customDrawings[id];
  if (draw) {
    return (
      <div className={className} style={style}>
        {draw(size)}
      </div>
    );
  }
  return (
    <span
      className={className}
      style={{ fontSize: size, lineHeight: 1, ...style }}
    >
      {emoji}
    </span>
  );
}
