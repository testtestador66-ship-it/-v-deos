# Poxel kit (shorts 3D low poly estilo PS2, three.js)

## Requisitos
node 18+, `npm i playwright && npx playwright install chromium`, python3 + numpy, ffmpeg, fonte Inter Black em /usr/share/fonts/opentype/inter/Inter-Black.otf (ou ajuste caps.sh).

## Fluxo de um vídeo
1. Copie `engine/*` para uma pasta nova do vídeo.
2. Escreva `new.js` (cenário, personagens, cronograma T, poses, câmeras, overlay, renderAt). Use `exemplo_mercado/new.js` como modelo.
3. `main.js` = `lib/pieces.js` (+ `lib/casa.js` se usar a sala) + `new.js` com `__LN__` (durações das falas, vox/dur.json) e `__CHARS__` (lib/chars.js) substituídos. Veja `exemplo_mercado/build.sh`.
4. Prévia: `bash pv.sh 0.5 3 7 12` gera `grid.jpg`. Olhe SEMPRE os frames antes de renderizar.
5. Render: `cat base.js main.js > video.js; node render.js shots` (um mp4 por plano em shots/).
6. Áudio: falas em vox/*.wav (dur.json), `post.py` gera vox/timing.json e caps.txt, `sfx.py` mixa efeitos + vozes em sfx.wav.
7. Montagem: concat dos shots, scale 1080x1920, `bash caps.sh raw.mp4 sfx.wav final.mp4`.

## API principal (base.js / pieces.js)
- `makeHuman(cfg)` boneco low poly; `h.pose(P({...}))`; `h.face.set({e, b, m, mo, mrest, lx, ly, sw})`.
  - e: normal, meh, wide, narrow, happy, closed, squeeze, shock, star · b: flat, up, worried, angry, one · m: talk, smile, smallsmile, bigsmile, o, flat, wavy, smirk, tight, grit, scream, shock
- Pose: lsx/rsx (ombro, -1.57 = braço pra frente), lsz/rsz, le/re (cotovelo, negativo), hy (vira cabeça; positivo = esquerda do personagem), hx, lean, lift, lhx/lk (pernas). `SIT()`, `STAND()`, `gait(fase, amp)`.
- `smoothState(fn, t, segLo)` + `applyState` suavizam; `CUTS()` evita suavizar entre cortes.
- yaw: frente do personagem = (sin(yaw), cos(yaw)).
- `look(posCam, alvo, fov)`; faceCam usa a direção real da cabeça (exemplo_mercado).
- Overlay em canvas 2D: `outlined(txt, x, y, size, fill, stroke, lw)`, `vignette()`.
