Crie um protótipo de aplicativo mobile chamado "Bichoteca" — um app educativo 
para crianças de 4 a 7 anos em fase de alfabetização aprenderem os sons dos 
animais por bioma. Dimensões mobile padrão (375 x 812px, iPhone). 

PERSONA E TOM:
O usuário final é uma criança pequena. Tudo deve ser GRANDE, COLORIDO, 
ARREDONDADO e INTUITIVO. Estilo de ilustração: flat design infantil com 
traços simples, cores chapadas saturadas, semelhante a livros ilustrados 
infantis modernos (referências: Sago Mini, Khan Academy Kids, Duolingo ABC).

DESIGN SYSTEM:
- Fonte principal: Fredoka (Google Fonts), pesos Regular e Bold
- Cor primária: #4CAF50 (verde folha)
- Cor secundária: #FFD54F (amarelo sol)
- Acento: #FF8A65 (coral)
- Fundo: #FFF8E7 (creme suave, NUNCA branco puro)
- Texto: #5D4037 (marrom terra)
- Border-radius padrão: 24px em cards, 32px em botões
- Sombras suaves: 0 4px 12px rgba(0,0,0,0.08)
- Botões mínimos: 75px de altura
- Espaçamento generoso entre elementos (16-24px)

CRIE EXATAMENTE 6 TELAS:

TELA 1 — SPLASH:
Fundo creme #FFF8E7. Logo central "Bichoteca" em Fredoka Bold 48pt cor verde 
#4CAF50, com uma ilustração de um leão sorridente e fofinho ao lado. Abaixo, 
texto pequeno "Os sons da natureza ao seu alcance" em marrom #5D4037. 
Pequenos ícones de folhas e estrelinhas decorando os cantos.

TELA 2 — LOGIN DOS PAIS:
Header com texto pequeno no topo "Área dos Pais" em cinza, deixando claro que 
essa tela NÃO é para a criança. Título grande "Olá, pais!" em verde. 
Subtítulo "Entre para liberar a aventura do seu filho". Um único campo de 
input grande arredondado com placeholder "Seu nome". Botão verde grande 
"Entrar" ocupando largura quase total. Abaixo, link em texto "Primeira vez 
aqui? Cadastre-se" levando à tela 3. Ilustração decorativa de uma família 
fofinha no topo ou rodapé.

TELA 3 — CADASTRO DOS PAIS:
Mesma estética visual da tela 2. Título "Vamos começar!". Três campos 
arredondados grandes: "Seu nome (responsável)", "Nome da criança", "Idade 
da criança". Botão verde grande "Criar conta". Link "Já tenho conta" no rodapé. 
Sem senha, sem email, mantém ultra simples.

TELA 4 — HOME / SELEÇÃO DE BIOMAS:
Header simples: à esquerda, ilustração de um avatar de criança e texto "Oi, 
[Nome]!" em letra grande. À direita, um ícone discreto de engrenagem 
(configurações dos pais). 
Título grande centralizado: "Pra onde vamos hoje?" em Fredoka Bold 32pt.
Grid 2x3 de cards GRANDES (cada card ~160x180px) com cantos bem arredondados 
e ilustração colorida ocupando o card todo + nome em letra grande embaixo:
  1. SAVANA — fundo laranja #F4A261, ilustração de leão e acácia
  2. AMAZÔNIA — fundo verde #2D6A4F, ilustração de macaco e árvores
  3. OCEANO — fundo azul #0077B6, ilustração de baleia e ondas
  4. FAZENDINHA — fundo vermelho #E76F51, ilustração de vaca e celeiro
  5. POLO NORTE — fundo azul claro #A8DADC, ilustração de pinguim e iceberg
Sem barra de navegação inferior — a criança volta tocando no cabeçalho.

TELA 5 — DENTRO DO BIOMA (exemplo: SAVANA):
Fundo na cor temática do bioma (laranja savana #F4A261) com ilustração de 
paisagem ao fundo (acácias, sol). 
Topo: botão circular grande de "voltar" (seta branca em círculo) e título 
"SAVANA" em letra grande branca.
Grid 2x2 de cards de animais (~150x170px), cada um com fundo branco 
arredondado, ilustração fofinha do animal centralizada e nome embaixo em 
letra GRANDE:
  - LEÃO (ilustração de leão sorridente)
  - ELEFANTE (ilustração de elefante alegre)
  - GIRAFA (ilustração de girafa com pescoço comprido)
  - ZEBRA (ilustração de zebra listrada)
Cada card com pequeno ícone de auto-falante no canto, indicando que faz som.

TELA 6 — TELA DO ANIMAL TOCANDO SOM (exemplo: LEÃO):
Fundo gradiente suave laranja → amarelo. 
Topo: botão circular de voltar.
Centro: ilustração GIGANTE do leão (ocupando metade da tela), com a boca 
aberta como se estivesse rugindo.
Ao redor da cabeça do leão: ondas sonoras animadas saindo (círculos 
concêntricos amarelos).
Abaixo: nome "LEÃO" em Fredoka Bold 48pt cor branca com sombra.
Texto pequeno embaixo: "Toque para ouvir de novo!"
Botão circular GRANDE amarelo com ícone de auto-falante (~100px) centralizado 
no rodapé.
Pequenas estrelinhas brilhando ao redor para dar sensação de "mágica".

INTERAÇÕES E FLUXO (prototipar com transições):
- Splash → Login (após 2s, fade)
- Login → Home (ao clicar "Entrar", slide horizontal)
- Login → Cadastro (link inferior, slide vertical)
- Cadastro → Home (ao clicar "Criar conta", slide horizontal)
- Home → Bioma (ao clicar em qualquer card, zoom in / scale up)
- Bioma → Animal (ao clicar em card de animal, slide vertical)
- Animal → Bioma (botão voltar, slide vertical reverso)
- Bioma → Home (botão voltar, zoom out)

OBSERVAÇÕES FINAIS DE ESTILO:
- TODAS as ilustrações devem ter o mesmo estilo: flat, traços arredondados, 
  cores chapadas, expressões fofas e amigáveis nos animais (sempre sorrindo).
- ZERO elementos com cantos retos ou aparência "séria/profissional".
- ZERO menus laterais, hambúrgueres ou navegação complexa nas telas infantis.
- Use bastante white space (na verdade "cream space") para não poluir.
- Todos os botões devem ter feedback visual claro (sombra que some quando 
  pressionado).