# 🦁 Bichoteca

App educativo para crianças que toca os sons dos animais agrupados por bioma
(Savana, Amazônia, Oceano, Fazendinha e Polo Norte).

Construído com **Vite + React + Tailwind + React Router + Motion**.

## Recursos

- 5 biomas, 4 animais cada (20 sons).
- Sons sintetizados em tempo real com a **Web Audio API** — nenhum arquivo de
  áudio extra é necessário, o app é leve e funciona offline depois de carregar.
- Desenhos SVG próprios para Morsa, Preguiça e Tucano (cujos emojis não
  renderizam consistentemente em todos os sistemas).
- Frame de smartphone ao redor do app para ficar com cara de aplicativo mobile
  quando aberto no desktop.

## Rodando localmente

```bash
npm install
npm run dev
```

Build de produção:

```bash
npm run build
npm run preview
```

## Deploy na Vercel

1. Suba o projeto para um repositório no GitHub.
2. Em https://vercel.com/new, importe o repositório.
3. A Vercel detecta Vite automaticamente — não precisa configurar nada.
4. O arquivo `vercel.json` já cuida do rewrite SPA para que rotas como
   `/biome/savana` funcionem em hard-reload.

## Estrutura

```
src/
├── app/
│   ├── components/   # Botões, Input, MobileLayout (frame), AnimalIcon
│   ├── pages/        # Splash, Login, Register, Home, Biome, Animal
│   ├── utils/        # sounds.ts (síntese Web Audio)
│   ├── data.ts       # biomas + animais
│   └── routes.tsx
├── styles/           # Tailwind + fontes + tema
└── main.tsx
```
