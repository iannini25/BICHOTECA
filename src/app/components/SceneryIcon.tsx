import type { CSSProperties } from "react";

type SceneryIconProps = {
  biomeId: string;
  emoji: string;
  size?: number;
  className?: string;
  style?: CSSProperties;
};

// Custom SVG decorations used when an emoji would render inconsistently
// (e.g. the snowflake on certain Windows builds).
const customDrawings: Record<string, (size: number) => JSX.Element> = {
  "polo-norte": (size) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Floco de neve"
    >
      <g
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      >
        {/* 6-fold snowflake */}
        <g transform="translate(50 50)">
          {[0, 60, 120, 180, 240, 300].map((deg) => (
            <g key={deg} transform={`rotate(${deg})`}>
              <line x1="0" y1="0" x2="0" y2="-38" />
              <line x1="0" y1="-15" x2="-8" y2="-22" />
              <line x1="0" y1="-15" x2="8" y2="-22" />
              <line x1="0" y1="-28" x2="-7" y2="-35" />
              <line x1="0" y1="-28" x2="7" y2="-35" />
            </g>
          ))}
        </g>
      </g>
    </svg>
  ),
};

export function SceneryIcon({
  biomeId,
  emoji,
  size = 48,
  className = "",
  style,
}: SceneryIconProps) {
  const draw = customDrawings[biomeId];
  if (draw) {
    return (
      <div
        className={className}
        style={{ width: size, height: size, ...style }}
      >
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
