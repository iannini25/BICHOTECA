export type Animal = {
  id: string;
  name: string;
  emoji: string;
};

export type Biome = {
  id: string;
  name: string;
  color: string;
  emoji: string;
  sceneryEmoji: string;
  animals: Animal[];
};

export const biomes: Biome[] = [
  {
    id: "savana",
    name: "SAVANA",
    color: "#F4A261", // laranja
    emoji: "🦁",
    sceneryEmoji: "🌳",
    animals: [
      { id: "leao", name: "LEÃO", emoji: "🦁" },
      { id: "elefante", name: "ELEFANTE", emoji: "🐘" },
      { id: "girafa", name: "GIRAFA", emoji: "🦒" },
      { id: "zebra", name: "ZEBRA", emoji: "🦓" },
    ],
  },
  {
    id: "amazonia",
    name: "AMAZÔNIA",
    color: "#2D6A4F", // verde
    emoji: "🐒",
    sceneryEmoji: "🌴",
    animals: [
      { id: "macaco", name: "MACACO", emoji: "🐒" },
      { id: "onca", name: "ONÇA", emoji: "🐆" },
      { id: "tucano", name: "TUCANO", emoji: "🦜" }, // using parrot for toucan fallback if needed, but parrot is good
      { id: "preguica", name: "PREGUIÇA", emoji: "🦥" },
    ],
  },
  {
    id: "oceano",
    name: "OCEANO",
    color: "#0077B6", // azul
    emoji: "🐳",
    sceneryEmoji: "🌊",
    animals: [
      { id: "baleia", name: "BALEIA", emoji: "🐳" },
      { id: "golfinho", name: "GOLFINHO", emoji: "🐬" },
      { id: "tubarao", name: "TUBARÃO", emoji: "🦈" },
      { id: "polvo", name: "POLVO", emoji: "🐙" },
    ],
  },
  {
    id: "fazendinha",
    name: "FAZENDINHA",
    color: "#E76F51", // vermelho
    emoji: "🐄",
    sceneryEmoji: "🌾",
    animals: [
      { id: "vaca", name: "VACA", emoji: "🐄" },
      { id: "porco", name: "PORCO", emoji: "🐖" },
      { id: "cavalo", name: "CAVALO", emoji: "🐎" },
      { id: "ovelha", name: "OVELHA", emoji: "🐑" },
    ],
  },
  {
    id: "polo-norte",
    name: "POLO NORTE",
    color: "#A8DADC", // azul claro
    emoji: "🐧",
    sceneryEmoji: "❄️",
    animals: [
      { id: "pinguim", name: "PINGUIM", emoji: "🐧" },
      { id: "urso", name: "URSO POLAR", emoji: "🐻‍❄️" },
      { id: "morsa", name: "MORSA", emoji: "🦭" }, // seal
      { id: "lobo", name: "LOBO", emoji: "🐺" },
    ],
  },
];
