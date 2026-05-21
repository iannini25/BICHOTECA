# Sons dos animais

O app procura arquivos `.mp3` neste diretório usando o **id** do animal
como nome. Se o arquivo existir, ele é tocado; senão, o app cai para o
som sintetizado em `src/app/utils/sounds.ts`.

## Como usar

1. Baixe os efeitos sonoros do site que preferir (ex.: hooksounds.com,
   freesound.org, pixabay).
2. Renomeie cada arquivo para o id correspondente abaixo.
3. Cole nesta pasta. No build seguinte (`npm run dev` ou `npm run build`)
   o app passa a tocar os MP3s reais automaticamente — sem mexer no código.

## Lista de arquivos esperados

### Savana
- `leao.mp3`
- `elefante.mp3`
- `girafa.mp3`
- `zebra.mp3`

### Amazônia
- `macaco.mp3`
- `onca.mp3`
- `tucano.mp3`
- `preguica.mp3`

### Oceano
- `baleia.mp3`
- `golfinho.mp3`
- `tubarao.mp3`
- `polvo.mp3`

### Fazendinha
- `vaca.mp3`
- `porco.mp3`
- `cavalo.mp3`
- `ovelha.mp3`

### Polo Norte
- `pinguim.mp3`
- `urso.mp3`
- `morsa.mp3`
- `lobo.mp3`

## Observação sobre o hooksounds.com

O hooksounds exige conta paga e não permite hotlink, então o app **não**
busca os arquivos diretamente do site dele. O fluxo correto é: você
baixa cada som com sua conta hooksounds e cola aqui com o nome certo.
