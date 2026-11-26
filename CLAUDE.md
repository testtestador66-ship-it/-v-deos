# Manual do canal Poxel (shorts 3D low poly estilo PS2)

Este repositório é a base do fluxo automático do canal do YouTube "Poxel" (@poxelito-s8j).
Ele guarda o motor de renderização, os exemplos e os vídeos finais (pasta `videos/`), que o Metricool baixa pelo link público do GitHub para postar.

O dono do canal é o MaAn. Fale sempre em português do Brasil, direto e curto, sem travessões (—).

## Fluxo de cada execução agendada (2 shorts por dia)

1. **Ler o desempenho** (só às segundas-feiras, ou se não houver `analise.md` desta semana): puxe pelo Windsor.ai (conector `youtube`, campos `video_title` e `views`, últimos 28 dias) e escreva em `analise.md` o que subiu e o que caiu. Use isso para escolher os temas.
2. **Escrever 2 roteiros novos** seguindo as REGRAS DE ROTEIRO abaixo. Confira `historico.md` para não repetir tema.
3. **Vozes automáticas (preferencial).** Se `ELEVENLABS_API_KEY` existir e `curl -s -o /dev/null -w "%{http_code}" https://api.elevenlabs.io/v1/models -H "xi-api-key: $ELEVENLABS_API_KEY"` devolver 200, escreva `falas.json` ({"chave": ["personagem", "[emoção] texto"]}, personagens: mae, lucas, pedro, pai, vo, tia, jorge) e rode `python3 /home/claude/-v-deos/motor/vozes_eleven.py falas.json` dentro da pasta do vídeo. Ele grava `vox/<chave>.wav` e `vox/dur.json`. Ouça mentalmente pela duração: se uma fala sair muito curta ou longa demais para o texto, gere só ela de novo uma vez. Pule o passo 4.
   **Se não houver chave ou acesso**, mande os textos das vozes para o MaAn (SendUserMessage e PushNotification), um bloco por personagem, no formato do ElevenLabs com `[pausa longa]` entre as falas. Vozes: Mãe = Jessica, Lucas = VALF, Pedro/irmão = "Lucas - Laid-back", Pai/médico = Thiago, Vó/professora/diretora = Lucinda, Tia/visita = Roberta, Seu Jorge/zelador/vô = Sergio. Peça um mp3 por personagem e avise que as vozes automáticas não estão funcionando (chave ou domínio faltando).
4. **Esperar os mp3** (só no modo manual). Quando chegarem, separe as falas com ffmpeg silencedetect (n=-38dB, d=0.4; ignore trechos menores que 0,3s ou mais baixos que -30 dB), corte com silenceremove + afade (d=0.02) + loudnorm, salve em `vox/<chave>.wav` e grave `vox/dur.json`.
5. **Montar o vídeo** copiando `exemplos/visita/` para uma pasta nova em /home/claude/<nome> (ajuste os caminhos `/home/claude/vai` e a porta do http.server nos scripts). O cronograma T sai das durações reais das falas.
6. **Revisar** com `bash pv.sh <tempos>` (um tempo por plano) e olhar o `grid.jpg`. Corrigir até passar no CONTROLE DE QUALIDADE.
7. **Renderizar** (`node render.js shots`), juntar, mixar (`sfx.py`), legendar (`caps.sh`), gerar `sheet.jpg` (um quadro a cada 0,7s) e conferir de novo.
8. **Publicar**: copie o mp4 final para `videos/AAAA-MM-DD_<slug>.mp4`, faça commit e push na `main`. Agende no Metricool (blogId `8384272`, rede `youtube`, `type: short`, `privacy: public`, `category: COMEDY`, `madeForKids: false`) com o link `https://raw.githubusercontent.com/testtestador66-ship-it/-v-deos/main/videos/<arquivo>.mp4`. Horários: **12:00** e **19:00** (America/Sao_Paulo). Se o horário já passou, use o próximo horário livre.
9. **Mandar o vídeo final** para o MaAn com SendUserFile, com título, horário e o link do planner do Metricool, e registrar em `historico.md` (data, título, tema, horário).

Se algo falhar (render, push, Metricool), corrija e tente de novo uma vez. Se falhar de novo, avise o MaAn com o erro exato e pare.

## Regras de roteiro (vêm dos dados do canal)

- Temas que mais funcionam: **mãe em casa** vista pelo filho (novela 2,3M, "vou chamar seu pai" 1,1M, "você não é todo mundo" 577k), vó, escola, e situações de infância brasileira (madrugada 994k, vizinho da bola 624k). Também vale família, irmãos, rua, amigos de infância. Evite profissões e fantasia sem ligação com a vida real.
- Título curto: "Toda mãe: '<frase dela>'", "Todo/Toda <pessoa> quando...", "Aquele amigo que...".
- **Frame 0** com rosto e ação: um personagem fala uma frase de conflito antes de 0,5s.
- **Uma frase reconhecível repetida** (ex.: "Uhum.", "Você não é todo mundo!") com **exagero visual crescente** em 3 níveis que funciona sem som.
- **Virada** de um destes tipos: o filho passa a perna no adulto; o adulto vira criança na frente da autoridade dele; outra pessoa da casa faz igual. Termina em piada, nunca em momento fofo.
- **Loop**: a última fala ou ação emenda no frame 0 (de preferência a mesma frase na boca de outra pessoa).
- 24 a 28 segundos. Pergunta nos últimos 2s em caixa escura ("Sua mãe também...? 👇").
- Personagens: só os do motor (mãe, Lucas de camiseta vermelha, Pedro, tia, vó, pai, Seu Jorge), nas mesmas proporções dos exemplos. Iluminação simples do motor, sem bloom ou luzes coloridas.

## Controle de qualidade (obrigatório antes de publicar)

- Rosto de quem fala sempre de frente ou em 3/4 (ângulo menor que 50°). Nunca de costas ou de lado.
- Nenhuma cabeça, braço, porta ou parede entre a câmera e o rosto de quem fala. Câmera nunca dentro de objetos.
- Cabelo nunca cobre os olhos ou a boca. Nada de cabeça cortada.
- Sinal do giro de cabeça: `hy` positivo vira para a esquerda do personagem.
- Legendas Inter Black 68px, no máximo 4 palavras, em 0.77 da altura, nunca em cima de rosto. Título no topo.
- Sem silêncio maior que 0,5s (`ffmpeg -af silencedetect=n=-35dB:d=0.5`).
- Portas abrindo não podem passar na frente da câmera; personagens não somem no meio de um plano.

## Ferramentas no ambiente

node + playwright (chromium), python3 + numpy, ffmpeg, fonte /usr/share/fonts/opentype/inter/Inter-Black.otf. Se o playwright faltar: `npm i -g playwright && npx playwright install chromium`.
