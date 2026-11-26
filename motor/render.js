// usage: node render.js preview t1 t2 ...   |  node render.js shots [i j ...]
const { chromium } = require('playwright');
const { spawn } = require('child_process');
const fs = require('fs');
(async () => {
  const mode = process.argv[2];
  const browser = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
  const page = await browser.newPage({ viewport: { width: 600, height: 600 } });
  page.on('console', m => { if (m.type() === 'error' || m.type() === 'warning') console.log('PAGE:', m.text()); });
  page.on('pageerror', e => console.log('PAGEERR:', e.message));
  await page.goto('http://127.0.0.1:8791/index.html');
  await page.waitForFunction('window.ready === true', null, { timeout: 60000 });
  const info = await page.evaluate('window.INFO'); fs.writeFileSync('info.json', JSON.stringify(info));
  if (mode === 'preview') {
    fs.mkdirSync('prev', { recursive: true });
    for (const ts of process.argv.slice(3)) {
      const t = parseFloat(ts);
      const t0 = Date.now();
      const d = await page.evaluate(`(renderAt(${t}), grab(.85))`);
      fs.writeFileSync(`prev/f_${t.toFixed(2)}.jpg`, Buffer.from(d.split(',')[1], 'base64'));
      console.log('frame', t, Date.now() - t0, 'ms');
    }
    console.log(JSON.stringify(info));
  } else {
    fs.mkdirSync('shots', { recursive: true });
    const FPS = 30;
    const idx = process.argv.slice(3).map(Number);
    const list = idx.length ? idx : info.SHOTS.map((_, i) => i);
    for (const i of list) {
      const [a, b] = info.SHOTS[i];
      const f0 = Math.round(a * FPS), f1 = Math.round(b * FPS);
      const tmp = `shots/s${String(i).padStart(2, '0')}.tmp.mp4`, fin = `shots/s${String(i).padStart(2, '0')}.mp4`;
      const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-', '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '18', '-pix_fmt', 'yuv420p', '-r', String(FPS), tmp]);
      const done = new Promise(r => ff.on('close', r));
      const t0 = Date.now();
      for (let f = f0; f < f1; f++) {
        const d = await page.evaluate(`(renderAt(${(f + .5) / FPS}), grab(.93))`);
        const buf = Buffer.from(d.split(',')[1], 'base64');
        if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
      }
      ff.stdin.end(); const code = await done;
      if (code === 0) fs.renameSync(tmp, fin);
      console.log('shot', i, f1 - f0, 'frames', ((Date.now() - t0) / 1000).toFixed(1), 's code', code);
    }
  }
  await browser.close();
})();
