import * as THREE from 'three';

// ======================= setup =======================
const W = 1080, H = 1920, RW = 540, RH = 960;
let _s = 777;
function rnd() { _s |= 0; _s = _s + 0x6D2B79F5 | 0; let t = Math.imul(_s ^ _s >>> 15, 1 | _s); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }
const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
const lerp = (a, b, u) => a + (b - a) * u;
const sm = (a, b, x) => { const u = clamp((x - a) / (b - a), 0, 1); return u * u * (3 - 2 * u); };
const eOut = u => 1 - Math.pow(1 - clamp(u, 0, 1), 3);
const eIn = u => Math.pow(clamp(u, 0, 1), 3);
const eIO = u => { u = clamp(u, 0, 1); return u < .5 ? 4 * u * u * u : 1 - Math.pow(-2 * u + 2, 3) / 2; };
const eBack = u => { u = clamp(u, 0, 1); const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(u - 1, 3) + c1 * Math.pow(u - 1, 2); };
const V = (x, y, z) => new THREE.Vector3(x, y, z);
function seeded(i) { let x = Math.sin(i * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); }
const nz = (t, k = 0) => Math.sin(t * 13.1 + k) * .5 + Math.sin(t * 29.7 + k * 2.3) * .3 + Math.sin(t * 51.3 + k * 4.1) * .2;

const renderer = new THREE.WebGLRenderer({ antialias: false, preserveDrawingBuffer: true });
renderer.setPixelRatio(1); renderer.setSize(RW, RH, false);
renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFShadowMap;
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.1;
const out = document.createElement('canvas'); out.width = W; out.height = H; document.body.appendChild(out);
const ctx = out.getContext('2d');
const scene = new THREE.Scene(); scene.background = new THREE.Color('#1a1a1e');
const camera = new THREE.PerspectiveCamera(50, RW / RH, 0.03, 900);

// ======================= textures / helpers =======================
function ctex(w, h, draw, rep = [1, 1], nearest = true) {
  const c = document.createElement('canvas'); c.width = w; c.height = h; const g = c.getContext('2d'); draw(g, w, h);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(rep[0], rep[1]);
  if (nearest) t.magFilter = THREE.NearestFilter; t.anisotropy = 4; return t;
}
function speckle(g, w, h, base, amt, n) { g.fillStyle = base; g.fillRect(0, 0, w, h); n = n || w * h / 3; for (let i = 0; i < n; i++) { const v = (rnd() - .5) * amt; g.fillStyle = v > 0 ? `rgba(255,255,255,${v})` : `rgba(0,0,0,${-v})`; g.fillRect(rnd() * w | 0, rnd() * h | 0, 1 + (rnd() * 2 | 0), 1 + (rnd() * 2 | 0)); } }
const T_marble = ctex(128, 128, (g, w, h) => {
  for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) { const dark = (i + j) % 2; g.fillStyle = dark ? '#5d4a44' : '#e9e2d6'; g.fillRect(i * 64, j * 64, 64, 64);
    g.strokeStyle = dark ? 'rgba(255,255,255,.12)' : 'rgba(90,80,70,.18)'; g.lineWidth = 1.5; for (let k = 0; k < 3; k++) { g.beginPath(); let x = i * 64 + rnd() * 64, y = j * 64; g.moveTo(x, y); for (let s = 0; s < 6; s++) { x += (rnd() - .5) * 18; y += 11; g.lineTo(x, y); } g.stroke(); } }
  g.fillStyle = 'rgba(0,0,0,.25)'; g.fillRect(0, 0, w, 1); g.fillRect(0, 64, w, 1); g.fillRect(0, 0, 1, h); g.fillRect(64, 0, 1, h);
}, [10, 10]);
const T_steel = ctex(64, 128, (g, w, h) => { g.fillStyle = '#c3c7cc'; g.fillRect(0, 0, w, h); for (let i = 0; i < 260; i++) { g.fillStyle = `rgba(${rnd() > .5 ? '255,255,255' : '40,45,55'},${rnd() * .18})`; g.fillRect(rnd() * w | 0, 0, 1, h); } }, [2, 1]);
const T_wallL = ctex(64, 64, (g, w, h) => { speckle(g, w, h, '#efe3cc', .1); }, [6, 2]);
const T_wood = ctex(64, 64, (g, w, h) => { g.fillStyle = '#7a4b2a'; g.fillRect(0, 0, w, h); for (let y = 0; y < h; y += 2) { g.fillStyle = `rgba(${rnd() > .5 ? '255,220,180' : '40,20,10'},${rnd() * .18})`; g.fillRect(0, y, w, 2); } g.fillStyle = 'rgba(0,0,0,.35)'; g.fillRect(0, 0, 2, h); g.fillRect(32, 0, 2, h); }, [8, 1]);
const T_rubber = ctex(64, 64, (g, w, h) => { speckle(g, w, h, '#4a4c52', .2); g.fillStyle = 'rgba(0,0,0,.35)'; for (let x = 4; x < w; x += 16) for (let y = 4; y < h; y += 16) { g.beginPath(); g.arc(x, y, 3, 0, 7); g.fill(); } }, [4, 4]);
const matCache = {};
function lam(color, map, extra = {}) { const k = color + (map ? map.uuid : '') + JSON.stringify(extra); if (matCache[k]) return matCache[k]; const m = new THREE.MeshLambertMaterial({ color, map: map || null, flatShading: true, ...extra }); matCache[k] = m; return m; }
function mk(geo, mat, parent, pos = [0, 0, 0], rot = [0, 0, 0], cast = true, recv = true) { const m = new THREE.Mesh(geo, mat); m.position.set(...pos); m.rotation.set(...rot); m.castShadow = cast; m.receiveShadow = recv; if (parent) parent.add(m); return m; }
const BOX = (x, y, z) => new THREE.BoxGeometry(x, y, z);
function limb(rt, rb, len, seg = 7) { const g = new THREE.CylinderGeometry(rt, rb, len, seg); g.translate(0, -len / 2, 0); return g; }

// ======================= faces =======================
function makeFace(drawFn) {
  const c = document.createElement('canvas'); c.width = 512; c.height = 256; const g = c.getContext('2d');
  const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = 4; let key = '';
  return { tex, set(st) { const k = JSON.stringify(st); if (k === key) return; key = k; drawFn(g, 512, 256, st); tex.needsUpdate = true; } };
}
function drawEye(g, x, y, cx, st, o) {
  const E = st.e || 'normal'; let ew = o.ew, eh = o.eh, pr = o.pr;
  if (E === 'wide' || E === 'shock' || E === 'star') { ew *= 1.12; eh *= 1.25; pr *= .6; }
  if (E === 'happy') { g.strokeStyle = o.line; g.lineWidth = 6; g.lineCap = 'round'; g.beginPath(); g.arc(x, y + 6, ew * .85, Math.PI * 1.12, Math.PI * 1.88); g.stroke(); return; }
  if (E === 'closed') { g.strokeStyle = o.line; g.lineWidth = 5; g.lineCap = 'round'; g.beginPath(); g.moveTo(x - ew, y); g.quadraticCurveTo(x, y + 7, x + ew, y); g.stroke(); return; }
  if (E === 'relief') { g.strokeStyle = o.line; g.lineWidth = 6; g.lineCap = 'round'; g.beginPath(); g.arc(x, y - 4, ew * .85, Math.PI * .12, Math.PI * .88); g.stroke(); return; }
  if (E === 'squeeze') { const s = x < cx ? 1 : -1; g.strokeStyle = o.line; g.lineWidth = 6; g.lineCap = 'round'; g.lineJoin = 'round'; g.beginPath(); g.moveTo(x - s * ew, y - eh * .7); g.lineTo(x + s * ew * .9, y); g.lineTo(x - s * ew, y + eh * .7); g.stroke(); return; }
  g.fillStyle = '#fff'; g.beginPath(); g.ellipse(x, y, ew, eh, 0, 0, 7); g.fill();
  const lx = clamp(st.lx || 0, -1, 1), ly = clamp(st.ly || 0, -1, 1);
  const px = x + lx * (ew - pr * .9), py = y + ly * (eh - pr);
  g.fillStyle = o.iris; g.beginPath(); g.ellipse(px, py, pr, pr * 1.12, 0, 0, 7); g.fill();
  g.fillStyle = '#0d0d0d'; g.beginPath(); g.arc(px, py, pr * .55, 0, 7); g.fill();
  g.fillStyle = '#fff'; g.beginPath(); g.arc(px - pr * .35, py - pr * .45, pr * .3, 0, 7); g.fill();
  if (E === 'star') { g.fillStyle = '#fff'; const st4 = (sx, sy, r) => { g.beginPath(); g.moveTo(sx, sy - r); g.lineTo(sx + r * .3, sy - r * .3); g.lineTo(sx + r, sy); g.lineTo(sx + r * .3, sy + r * .3); g.lineTo(sx, sy + r); g.lineTo(sx - r * .3, sy + r * .3); g.lineTo(sx - r, sy); g.lineTo(sx - r * .3, sy - r * .3); g.closePath(); g.fill(); }; st4(px - pr * .2, py - pr * .25, pr * .9); st4(px + pr * .5, py + pr * .5, pr * .45); }
  const inner = x < cx ? x + ew : x - ew, outer = x < cx ? x - ew : x + ew;
  g.fillStyle = o.skinNow;
  if (E === 'narrow' || E === 'sus') { const k = E === 'sus' ? .35 : .15; g.beginPath(); g.moveTo(outer, y - eh - 3); g.lineTo(inner, y - eh - 3); g.lineTo(inner, y + eh * k); g.lineTo(outer, y - eh * .2); g.closePath(); g.fill(); g.beginPath(); g.moveTo(outer - 2, y + eh + 3); g.lineTo(inner + 2, y + eh + 3); g.lineTo(inner, y + eh * .5); g.lineTo(outer, y + eh * .5); g.fill(); }
  if (E === 'meh') g.fillRect(x - ew - 2, y - eh - 3, ew * 2 + 4, eh * .95);
  g.strokeStyle = o.line; g.lineWidth = 3; g.beginPath(); g.ellipse(x, y, ew, eh, 0, 0, 7); g.stroke();
  if (E === 'narrow' || E === 'sus') { g.lineWidth = 5; g.beginPath(); g.moveTo(outer, y - eh * .2); g.lineTo(inner, y + eh * (E === 'sus' ? .35 : .15)); g.stroke(); }
  if (E === 'meh') { g.lineWidth = 5; g.beginPath(); g.moveTo(x - ew, y - eh + eh * .95); g.lineTo(x + ew, y - eh + eh * .95); g.stroke(); }
  if (o.lash) { g.strokeStyle = o.line; g.lineWidth = 3; for (let k = 0; k < 3; k++) { const a = Math.PI * (1.15 + k * .15); const sx = x + Math.cos(a) * ew, sy = y + Math.sin(a) * eh; g.beginPath(); g.moveTo(sx, sy); g.lineTo(sx + Math.cos(a) * 7, sy + Math.sin(a) * 7); g.stroke(); } }
}
function drawBrow(g, x, y, cx, kind, o) {
  const inner = x < cx ? 1 : -1; const w = o.bw; let a = [x - inner * w, y], b = [x + inner * w * .9, y];
  if (kind === 'angry') { a[1] -= 7; b[1] += 9; } if (kind === 'worried') { a[1] += 5; b[1] -= 11; } if (kind === 'up') { a[1] -= 12; b[1] -= 14; } if (kind === 'flat') { a[1] += 5; b[1] += 5; }
  if (kind === 'one' && x < cx) { a[1] -= 14; b[1] -= 16; } else if (kind === 'one') { a[1] -= 2; b[1] += 8; }
  g.strokeStyle = o.brow; g.lineWidth = o.bt; g.lineCap = 'round'; g.beginPath(); g.moveTo(a[0], a[1]); g.quadraticCurveTo((a[0] + b[0]) / 2, Math.min(a[1], b[1]) - (kind === 'angry' ? 0 : 5), b[0], b[1]); g.stroke();
}
function drawMouth(g, x, y, st, o) {
  let m = st.m || 'smile'; const mo = st.mo || 0; g.lineCap = 'round'; g.lineJoin = 'round'; g.strokeStyle = o.mline || o.line; g.lineWidth = 5; const darkIn = '#4a1414';
  if (m === 'talk') { if (mo < .15) m = st.mrest || 'smallsmile'; else { g.fillStyle = darkIn; g.beginPath(); g.ellipse(x, y + 2, 14 + mo * 5, 4 + mo * 13, 0, 0, 7); g.fill(); g.stroke(); return; } }
  if (m === 'smile') { g.beginPath(); g.arc(x, y - 12, 20, Math.PI * .2, Math.PI * .8); g.stroke(); }
  else if (m === 'smallsmile') { g.beginPath(); g.arc(x, y - 8, 12, Math.PI * .25, Math.PI * .75); g.stroke(); }
  else if (m === 'bigsmile') { g.fillStyle = '#fff'; g.beginPath(); g.moveTo(x - 24, y - 5); g.quadraticCurveTo(x, y + 24, x + 24, y - 5); g.closePath(); g.fill(); g.stroke(); }
  else if (m === 'o') { g.fillStyle = darkIn; g.beginPath(); g.ellipse(x, y, 6, 7, 0, 0, 7); g.fill(); g.stroke(); }
  else if (m === 'flat') { g.beginPath(); g.moveTo(x - 14, y); g.lineTo(x + 14, y); g.stroke(); }
  else if (m === 'slant') { g.beginPath(); g.moveTo(x - 16, y + 3); g.quadraticCurveTo(x + 2, y + 2, x + 16, y - 6); g.stroke(); }
  else if (m === 'frown') { g.beginPath(); g.arc(x, y + 14, 16, Math.PI * 1.2, Math.PI * 1.8); g.stroke(); }
  else if (m === 'shock') { g.fillStyle = darkIn; g.beginPath(); g.ellipse(x, y + 4, 14, 20, 0, 0, 7); g.fill(); g.stroke(); }
  else if (m === 'tight') { g.lineWidth = 6; g.beginPath(); g.moveTo(x - 10, y); g.lineTo(x + 10, y); g.stroke(); g.lineWidth = 2; g.beginPath(); g.moveTo(x - 10, y - 4); g.lineTo(x - 13, y + 4); g.moveTo(x + 10, y - 4); g.lineTo(x + 13, y + 4); g.stroke(); }
  else if (m === 'grit') { g.fillStyle = '#fff'; g.beginPath(); g.roundRect(x - 24, y - 8, 48, 18, 6); g.fill(); g.stroke(); g.lineWidth = 2; g.beginPath(); g.moveTo(x - 24, y + 1); g.lineTo(x + 24, y + 1); for (let k = -2; k <= 2; k++) { g.moveTo(x + k * 9, y - 8); g.lineTo(x + k * 9, y + 10); } g.stroke(); }
  else if (m === 'wavy') { g.beginPath(); g.moveTo(x - 20, y); for (let k = 0; k <= 8; k++) g.lineTo(x - 20 + k * 5, y + (k % 2 ? -4 : 4)); g.stroke(); }
  else if (m === 'scream') { g.fillStyle = darkIn; g.beginPath(); g.moveTo(x - 26, y - 8); g.lineTo(x + 26, y - 8); g.lineTo(x + 16, y + 24); g.lineTo(x - 16, y + 24); g.closePath(); g.fill(); g.stroke(); g.fillStyle = '#fff'; g.fillRect(x - 22, y - 7, 44, 6); g.fillStyle = '#e06666'; g.beginPath(); g.ellipse(x, y + 17, 10, 5, 0, 0, 7); g.fill(); }
  else if (m === 'smirk') { g.beginPath(); g.moveTo(x - 16, y + 2); g.quadraticCurveTo(x + 6, y + 6, x + 20, y - 9); g.stroke(); }
  else if (m === 'disgust') { g.beginPath(); g.moveTo(x - 20, y + 4); g.lineTo(x - 8, y - 4); g.lineTo(x + 4, y + 4); g.lineTo(x + 18, y - 3); g.stroke(); }
}
function sweat(g, x, y) { g.fillStyle = '#a8dcff'; g.strokeStyle = '#2b6fa8'; g.lineWidth = 2; g.beginPath(); g.moveTo(x, y - 14); g.quadraticCurveTo(x + 10, y + 2, x, y + 6); g.quadraticCurveTo(x - 10, y + 2, x, y - 14); g.fill(); g.stroke(); }
const mixCol = (a, b, u) => '#' + new THREE.Color(a).lerp(new THREE.Color(b), u).getHexString();
function faceFn(o) {
  return (g, w, h, st) => {
    const red = st.red || 0; const skin = mixCol(o.skin, '#d8382a', red * .8);
    g.fillStyle = skin; g.fillRect(0, 0, w, h);
    if (o.hair) { g.fillStyle = o.hair; g.fillRect(0, 0, w, h * o.hairTop); g.fillRect(w * .405, 0, w * .62, h * o.hairBack); g.fillRect(0, 0, w * .095, h * o.hairBack); }
    const cx = w * .25;
    g.fillStyle = `rgba(230,70,70,${.22 + red * .5})`; g.beginPath(); g.ellipse(cx - 46, h * .63, 15 + red * 8, 9 + red * 5, 0, 0, 7); g.ellipse(cx + 46, h * .63, 15 + red * 8, 9 + red * 5, 0, 0, 7); g.fill();
    if (o.stubble) { g.fillStyle = 'rgba(40,30,25,.22)'; g.beginPath(); g.ellipse(cx, h * .76, 58, 24, 0, 0, 7); g.fill(); }
    const oo = { ...o, skinNow: skin, brow: o.browC };
    const ey = h * o.eyeY;
    for (const ex of [cx - o.eyeDX, cx + o.eyeDX]) { drawEye(g, ex, ey, cx, st, oo); drawBrow(g, ex, ey - o.browDY, cx, st.b || 'normal', oo); }
    if (o.glasses) { g.strokeStyle = '#3a2a4a'; g.lineWidth = 4; for (const ex of [cx - o.eyeDX, cx + o.eyeDX]) { g.beginPath(); g.roundRect(ex - o.ew - 7, ey - o.eh - 6, (o.ew + 7) * 2, (o.eh + 6) * 2, 7); g.stroke(); } g.beginPath(); g.moveTo(cx - o.eyeDX + o.ew + 7, ey - 2); g.lineTo(cx + o.eyeDX - o.ew - 7, ey - 2); g.stroke(); }
    g.fillStyle = 'rgba(120,60,30,.3)'; g.beginPath(); g.ellipse(cx, h * .6, 5, 3, 0, 0, 7); g.fill();
    if (o.mustache) { g.fillStyle = o.browC; g.beginPath(); g.moveTo(cx - 30, h * .69); g.quadraticCurveTo(cx - 20, h * .61, cx, h * .64); g.quadraticCurveTo(cx + 20, h * .61, cx + 30, h * .69); g.quadraticCurveTo(cx, h * .66, cx - 30, h * .69); g.fill(); }
    drawMouth(g, cx, h * o.mouthY, st, { ...oo, mline: o.lip || o.line });
    if (st.foam) { g.fillStyle = '#ffffff'; for (let k = 0; k < 7; k++) { g.beginPath(); g.arc(cx - 26 + k * 9, h * o.mouthY + 8 + Math.sin(k * 2.1) * 6, 7 + (k % 3) * 2, 0, 7); g.fill(); } }
    if (st.sw) { sweat(g, cx + 58, h * .42); sweat(g, cx - 62, h * .46); if (st.sw > 1) { sweat(g, cx + 30, h * .33); sweat(g, cx - 75, h * .6); } }
    if (st.vein) { g.strokeStyle = '#a01818'; g.lineWidth = 4; const vx = cx + 40, vy = h * .3; g.beginPath(); for (let k = 0; k < 4; k++) { const a = k * Math.PI / 2 + .78; g.moveTo(vx + Math.cos(a) * 4, vy + Math.sin(a) * 4); g.quadraticCurveTo(vx + Math.cos(a + .4) * 10, vy + Math.sin(a + .4) * 10, vx + Math.cos(a) * 14, vy + Math.sin(a) * 14); } g.stroke(); }
  };
}

// ======================= human rig =======================
const DEF = { pitch: 0, lift: 0, bob: 0, lean: 0, twist: 0, side: 0, hx: 0, hy: 0, hz: 0, lsx: 0, lsz: .1, lsy: 0, le: -.2, rsx: 0, rsz: .1, rsy: 0, re: -.2, lhx: 0, lhz: 0, rhx: 0, rhz: 0, lk: 0, rk: 0 };
const P = o => ({ ...DEF, ...o });
const mixP = (a, b, u) => { const r = {}; for (const k in DEF) r[k] = lerp(a[k] ?? DEF[k], b[k] ?? DEF[k], u); return r; };
function makeHuman(c) {
  const h = { mats: [] };
  const M = (col) => { const m = new THREE.MeshLambertMaterial({ color: col, flatShading: true }); h.mats.push(m); return m; };
  const skin = M(c.skin), shirt = M(c.shirt), pants = M(c.pants), shoe = M(c.shoes), sock = M(c.socks || '#f4f4f4'), sole = M('#f2f2f2'), sleeve = c.sleeveCol ? M(c.sleeveCol) : shirt;
  h.skinMat = skin; h.skinCol = new THREE.Color(c.skin);
  h.root = new THREE.Group(); h.body = new THREE.Group(); h.root.add(h.body);
  h.hipY = c.hipY; h.hips = new THREE.Group(); h.hips.position.y = c.hipY; h.body.add(h.hips);
  mk(BOX(c.sw * 1.55, .17, .2 * c.d), pants, h.hips, [0, .02, 0]);
  h.torso = new THREE.Group(); h.torso.position.y = .08; h.hips.add(h.torso);
  const tg = new THREE.CylinderGeometry(c.sw * .95, c.sw * .8, c.th, 7); tg.translate(0, c.th / 2, 0); mk(tg, shirt, h.torso).scale.z = .7 * c.d;
  if (c.collar) { const cm = mk(new THREE.TorusGeometry(c.sw * .45, .025, 5, 10), M(c.collar), h.torso, [0, c.th - .01, 0], [Math.PI / 2, 0, 0]); cm.scale.y = .75; }
  if (c.stripe) { mk(new THREE.CylinderGeometry(c.sw * .9, c.sw * .87, .05, 7), M(c.stripe), h.torso, [0, c.th * .55, 0]).scale.z = .72 * c.d; }
  if (c.extraTorso) c.extraTorso(h.torso, c, M);
  mk(new THREE.CylinderGeometry(.045 * c.hs, .05 * c.hs, .09, 6), skin, h.torso, [0, c.th + .03, 0]);
  h.head = new THREE.Group(); h.head.position.y = c.th + .06; h.torso.add(h.head);
  h.face = makeFace(faceFn(c.face));
  const headM = new THREE.MeshLambertMaterial({ map: h.face.tex, flatShading: true }); h.mats.push(headM);
  h.headMesh = mk(new THREE.SphereGeometry(c.hr, 16, 12), headM, h.head, [0, c.hr * .92, 0]); h.headMesh.scale.set(1, 1.04, .96);
  for (const s of [-1, 1]) mk(new THREE.SphereGeometry(c.hr * .22, 6, 5), skin, h.head, [s * c.hr * .98, c.hr * .86, -.01]).scale.set(.6, 1, .8);
  mk(new THREE.SphereGeometry(c.hr * .11, 6, 5), skin, h.head, [0, c.hr * .82, c.hr * .97]).scale.set(1, .75, .8);
  if (c.hairFn) c.hairFn(h.head, c, M);
  const arm = (s) => {
    const sh = new THREE.Group(); sh.position.set(s * c.sw * 1.0, c.th - .06, 0); h.torso.add(sh);
    mk(new THREE.SphereGeometry(c.ar * 1.25, 6, 5), sleeve, sh);
    mk(limb(c.ar * 1.25, c.ar * 1.15, c.ua * (c.long ? 1 : .45)), sleeve, sh);
    if (!c.long) mk(limb(c.ar, c.ar * .92, c.ua * .58), skin, sh, [0, -c.ua * .42, 0]);
    const el = new THREE.Group(); el.position.y = -c.ua; sh.add(el);
    mk(limb(c.ar * (c.long ? 1.1 : .92), c.ar * (c.long ? 1.05 : .8), c.fa * (c.long ? .85 : 1)), c.long ? sleeve : skin, el);
    if (c.long) mk(limb(c.ar * .85, c.ar * .8, c.fa * .2), skin, el, [0, -c.fa * .82, 0]);
    const hand = new THREE.Group(); hand.position.y = -c.fa - c.ar * .6; el.add(hand);
    mk(new THREE.SphereGeometry(c.ar * 1.25, 6, 5), skin, hand).scale.set(.85, 1.15, 1);
    return [sh, el, hand];
  };
  [h.shL, h.elL, h.handL] = arm(1); [h.shR, h.elR, h.handR] = arm(-1);
  const leg = (s) => {
    const hp = new THREE.Group(); hp.position.set(s * c.sw * .5, 0, 0); h.hips.add(hp);
    mk(limb(c.lr * 1.25, c.lr * 1.15, c.tl * (c.shorts ? .55 : 1)), pants, hp);
    if (c.shorts) mk(limb(c.lr * .92, c.lr * .82, c.tl * .5), skin, hp, [0, -c.tl * .5, 0]);
    const kn = new THREE.Group(); kn.position.y = -c.tl; hp.add(kn);
    if (c.shorts) { mk(limb(c.lr * .82, c.lr * .7, c.sl * .6), skin, kn); mk(limb(c.lr * .75, c.lr * .72, c.sl * .4), sock, kn, [0, -c.sl * .6, 0]); }
    else mk(limb(c.lr * 1.05, c.lr * .95, c.sl), pants, kn);
    mk(BOX(c.lr * 1.9, c.lr * 1.1, c.lr * 3.2), shoe, kn, [0, -c.sl - c.lr * .35, c.lr * .7]);
    mk(BOX(c.lr * 2.0, c.lr * .35, c.lr * 3.3), sole, kn, [0, -c.sl - c.lr * .85, c.lr * .7]);
    return [hp, kn];
  };
  [h.hipL, h.knL] = leg(1); [h.hipR, h.knR] = leg(-1);
  h.root.traverse(o => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
  h.pose = (p) => {
    h.body.rotation.x = p.pitch; h.body.position.y = p.lift; h.hips.position.y = h.hipY + p.bob;
    h.torso.rotation.set(p.lean, p.twist, p.side); h.head.rotation.set(p.hx, p.hy, p.hz);
    h.shL.rotation.set(p.lsx, p.lsy, p.lsz); h.shR.rotation.set(p.rsx, -p.rsy, -p.rsz);
    h.elL.rotation.x = p.le; h.elR.rotation.x = p.re;
    h.hipL.rotation.set(p.lhx, 0, p.lhz); h.hipR.rotation.set(p.rhx, 0, -p.rhz);
    h.knL.rotation.x = p.lk; h.knR.rotation.x = p.rk;
  };
  h.setRed = (r) => { h.skinMat.color.copy(h.skinCol).lerp(new THREE.Color('#d8382a'), r * .8); };
  return h;
}
function gait(ph, amp = 1) {
  const s = Math.sin(ph), c = Math.cos(ph); amp *= 1.18;
  return P({ lhx: -.45 * s * amp, rhx: .45 * s * amp, lk: (.12 + .65 * Math.max(0, c)) * amp, rk: (.12 + .65 * Math.max(0, -c)) * amp, lsx: .35 * s * amp, rsx: -.35 * s * amp, bob: Math.abs(c) * .025 * amp, lean: .03, twist: .08 * s * amp });
}

