// ======================= ROOM: CLASSROOM =======================
const T_woodF = ctex(64, 64, (g, w, h) => { g.fillStyle = '#9a6a40'; g.fillRect(0, 0, w, h); for (let y = 0; y < h; y += 16) { g.fillStyle = 'rgba(40,20,5,.5)'; g.fillRect(0, y, w, 1); g.fillRect((y / 16 % 2) * 24, y, 1, 16); } }, [7, 7]);
const T_school = ctex(64, 64, (g, w, h) => { g.fillStyle = '#f2e6c0'; g.fillRect(0, 0, w, h); g.fillStyle = '#3f8a6a'; g.fillRect(0, h * .6, w, h * .4); g.fillStyle = '#2a6a4a'; g.fillRect(0, h * .6, w, 2); }, [6, 1]);
const S = new THREE.Group(); scene.add(S);
{ const x0 = -3.5, x1 = 3.5, z0 = -3.5, z1 = 3.5, hg = 3.0, wm = lam('#ffffff', T_school);
  mk(new THREE.PlaneGeometry(7, 7), lam('#ffffff', T_woodF), S, [0, 0, 0], [-Math.PI / 2, 0, 0], false, true); mk(new THREE.PlaneGeometry(7, 7), lam('#efeae0'), S, [0, hg, 0], [Math.PI / 2, 0, 0], false, false);
  mk(BOX(7, hg, .1), wm, S, [0, hg / 2, z0], [0, 0, 0], false); mk(BOX(7, hg, .1), wm, S, [0, hg / 2, z1], [0, 0, 0], false); mk(BOX(.1, hg, 7), wm, S, [x0, hg / 2, 0], [0, 0, 0], false); mk(BOX(.1, hg, 7), wm, S, [x1, hg / 2, 0], [0, 0, 0], false); }
const boardTex = ctex(256, 128, (g, w, h) => { g.fillStyle = '#2a4a3a'; g.fillRect(0, 0, w, h); g.fillStyle = '#f4f4f4'; g.font = '700 18px Inter'; g.fillText('06/11', 12, 26); g.font = '700 24px Inter'; g.fillText('FRAÇÕES', 12, 58); g.font = '700 22px Inter'; g.fillText('1/2 + 1/4 = 3/4', 12, 92); g.strokeStyle = '#f4f4f4'; g.lineWidth = 2; g.beginPath(); g.arc(200, 80, 28, 0, 7); g.moveTo(200, 52); g.lineTo(200, 108); g.moveTo(172, 80); g.lineTo(228, 80); g.stroke(); }, [1, 1], false);
mk(BOX(3.2, 1.5, .06), lam('#6a4022'), S, [0, 1.65, -3.42]); mk(new THREE.PlaneGeometry(3.0, 1.35), new THREE.MeshLambertMaterial({ map: boardTex }), S, [0, 1.65, -3.38], [0, 0, 0], false, false);
mk(BOX(3.0, .05, .1), lam('#8a5a32'), S, [0, .88, -3.36]);
const TDESK = V(-1.6, 0, -2.3); mk(BOX(1.4, .75, .7), lam('#8a5a32'), S, [TDESK.x, .375, TDESK.z]);
for (let i = 0; i < 3; i++) mk(BOX(1.0, .9, .05), lam('#cfe8ff', null, { emissive: '#bfe0ff', emissiveIntensity: .7 }), S, [-3.45, 1.8, -2 + i * 1.8], [0, Math.PI / 2, 0], false, false);
const doorG = new THREE.Group(); doorG.position.set(3.45, 0, -1.73); S.add(doorG); mk(BOX(.06, 2.1, .95), lam('#7a4422'), doorG, [0, 1.05, -.475]); mk(new THREE.SphereGeometry(.035, 8, 6), lam('#d8c040'), doorG, [-.05, 1.0, -.85]); mk(BOX(.04, .3, .22), lam('#cfe8ff', null, { emissive: '#bfe0ff', emissiveIntensity: .5 }), doorG, [0, 1.6, -.475]);
for (const z of [-1.68, -2.72]) mk(BOX(.12, 2.2, .06), lam('#f4f4f4'), S, [3.44, 1.1, z]); mk(BOX(.12, .08, 1.1), lam('#f4f4f4'), S, [3.44, 2.16, -2.2]);
mk(BOX(1.2, 2.6, .1), lam('#e8d8b8'), S, [4.1, 1.3, -2.2], [0, Math.PI / 2, 0], false);
// decor: alphabet strip, plant, sign, cubbies
mk(new THREE.PlaneGeometry(6.6, .22), new THREE.MeshLambertMaterial({ map: ctex(512, 18, (g, w, h) => { const c = ['#d6302f', '#3f74c8', '#f2c23a', '#2f9a6a', '#8a4ac8']; 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach((ch, i) => { g.fillStyle = c[i % 5]; g.fillRect(i * 19.6, 0, 18, 18); g.fillStyle = '#fff'; g.font = '900 13px Inter'; g.fillText(ch, i * 19.6 + 4, 14); }); }, [1, 1], false) }), S, [0, 2.65, -3.43], [0, 0, 0], false, false);
{ const pg = new THREE.Group(); pg.position.set(-3.1, 0, -3.1); S.add(pg); mk(new THREE.CylinderGeometry(.18, .14, .35, 10), lam('#c8643a'), pg, [0, .175, 0]); for (let i = 0; i < 9; i++) mk(new THREE.IcosahedronGeometry(.18, 0), lam(i % 2 ? '#3f8a3a' : '#5aa84a'), pg, [Math.sin(i * 2.4) * .16, .5 + seeded(i) * .45, Math.cos(i * 2.4) * .16]); }
mk(BOX(.9, .3, .03), lam('#ffffff', ctex(96, 32, (g, w, h) => { g.fillStyle = '#2f5aa8'; g.fillRect(0, 0, w, h); g.fillStyle = '#fff'; g.font = '900 16px Inter'; g.fillText('5º ANO B', 10, 22); }, [1, 1], false)), S, [3.44, 2.4, -2.2], [0, -Math.PI / 2, 0], false);
for (let i = 0; i < 6; i++) mk(BOX(.45, .45, .4), lam(['#d6302f', '#3f74c8', '#f2c23a', '#2f9a6a', '#8a4ac8', '#f08a24'][i]), S, [-1.4 + (i % 3) * .5, .25 + Math.floor(i / 3) * .5, 3.25]);
mk(BOX(1.4, .9, .03), lam('#f4f4f4', ctex(64, 40, (g, w, h) => { g.fillStyle = '#fff'; g.fillRect(0, 0, w, h); const c = ['#d6302f', '#3f74c8', '#f2c23a', '#2f9a6a']; for (let i = 0; i < 8; i++) { g.fillStyle = c[i % 4]; g.fillRect(4 + (i % 4) * 15, 4 + Math.floor(i / 4) * 18, 12, 14); } }, [1, 1], false)), S, [3.45, 1.7, .6], [0, -Math.PI / 2, 0], false);
mk(new THREE.CylinderGeometry(.16, .16, .03, 16), lam('#ffffff'), S, [1.8, 2.5, -3.42], [Math.PI / 2, 0, 0]);
const DESKS = [], CHAIRS = [];
for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) { const x = (c - 1) * 1.5, z = -1.2 + r * 1.4; DESKS.push(V(x, 0, z)); const dg = new THREE.Group(); dg.position.set(x, 0, z); S.add(dg);
  mk(BOX(.6, .04, .42), lam('#c8a070'), dg, [0, .55, -.18]); for (const [a, b] of [[-.27, -.36], [.27, -.36], [-.27, 0], [.27, 0]]) mk(BOX(.03, .55, .03), lam('#555'), dg, [a, .275, b]);
  const ch = new THREE.Group(); ch.position.set(x, 0, z + .38); S.add(ch); const cc = new THREE.Group(); ch.add(cc); cc.position.z = -.38 + .22 - .22;
  mk(BOX(.36, .03, .34), lam('#c8a070'), ch, [0, .33, -.16]); mk(BOX(.36, .35, .03), lam('#c8a070'), ch, [0, .52, .02]); for (const [a, b] of [[-.16, -.3], [.16, -.3], [-.16, -.02], [.16, -.02]]) mk(BOX(.025, .33, .025), lam('#555'), ch, [a, .165, b]); CHAIRS.push(ch); }
const ME = 7, LUC = 8;
const kidFace = (skin, hair, extra = {}) => ({ skin, hair, hairTop: .2, hairBack: .62, eyeY: .54, eyeDX: 28, browDY: 29, mouthY: .7, ew: 16, eh: 20, pr: 11, iris: '#4a2a12', line: '#1a0d06', browC: hair, bw: 14, bt: 6, ...extra });
const uniform = { shirt: '#f8f8f8', collar: '#2f5aa8', stripe: '#2f5aa8', pants: '#2f4f8a', shoes: '#f4f4f4', socks: '#f4f4f4', shorts: true, hipY: .64, sw: .15, d: 1, th: .4, hr: .26, hs: 1, ar: .05, ua: .22, fa: .2, lr: .055, tl: .31, sl: .3,
  extraTorso(torso, c, M) { mk(new THREE.CylinderGeometry(.035, .035, .01, 10), M('#f2c23a'), torso, [-.07, c.th * .72, c.sw * .66], [Math.PI / 2 - .2, 0, 0]); mk(BOX(.05, .02, .01), M('#2f5aa8'), torso, [-.07, c.th * .72 - .045, c.sw * .66]); } };
const HAIR = {
  spiky: col => (head, c, M) => { const m = M(col); mk(new THREE.SphereGeometry(c.hr * 1.06, 12, 8, 0, Math.PI * 2, 0, Math.PI * .45), m, head, [0, c.hr * .95, -.01], [-.25, 0, 0]); for (let i = 0; i < 7; i++) { const a = (i / 7) * Math.PI * 2; const g = new THREE.ConeGeometry(c.hr * .22, c.hr * .5, 5); const s = mk(g, m, head, [Math.sin(a) * c.hr * .45, c.hr * 1.75, Math.cos(a) * c.hr * .45 - .02], [Math.cos(a) * .5, 0, -Math.sin(a) * .5]); } },
  bangs: col => (head, c, M) => { const m = M(col); mk(new THREE.SphereGeometry(c.hr * 1.07, 14, 9, 0, Math.PI * 2, 0, Math.PI * .5), m, head, [0, c.hr * .95, -.01], [-.25, 0, 0]); for (let i = 0; i < 5; i++) mk(new THREE.SphereGeometry(c.hr * .3, 7, 5), m, head, [(i - 2) * c.hr * .32, c.hr * 1.45 - Math.abs(i - 2) * .015, c.hr * .82]).scale.set(1, .7, .6); },
  curly: col => (head, c, M) => { const m = M(col); for (let i = 0; i < 22; i++) { const a = seeded(i) * Math.PI * 2, b = seeded(i + 40) * 1.2; mk(new THREE.IcosahedronGeometry(c.hr * .3, 0), m, head, [Math.sin(a) * Math.sin(b) * c.hr * 1.0, c.hr * (1.0 + Math.cos(b) * .75), Math.cos(a) * Math.sin(b) * c.hr * 1.0 - .03]); } },
  pony: (col, bow) => (head, c, M) => { const m = M(col); mk(new THREE.SphereGeometry(c.hr * 1.08, 14, 9, 0, Math.PI * 2, 0, Math.PI * .55), m, head, [0, c.hr * .95, -.02], [-.2, 0, 0]); for (let i = 0; i < 4; i++) mk(new THREE.SphereGeometry(c.hr * .3, 7, 5), m, head, [(i - 1.5) * c.hr * .38, c.hr * 1.42, c.hr * .82]).scale.set(1, .7, .6);
    const tail = new THREE.ConeGeometry(c.hr * .35, c.hr * 1.5, 8); tail.rotateX(Math.PI); mk(tail, m, head, [0, c.hr * 1.15, -c.hr * 1.2], [-.5, 0, 0]); mk(new THREE.TorusGeometry(c.hr * .16, c.hr * .07, 5, 10), M(bow), head, [0, c.hr * 1.55, -c.hr * .95], [0, 0, 0]); },
  buns: (col, bow) => (head, c, M) => { const m = M(col); mk(new THREE.SphereGeometry(c.hr * 1.08, 14, 9, 0, Math.PI * 2, 0, Math.PI * .55), m, head, [0, c.hr * .95, -.02], [-.2, 0, 0]); for (const s of [-1, 1]) { mk(new THREE.SphereGeometry(c.hr * .38, 9, 7), m, head, [s * c.hr * .8, c.hr * 1.65, -c.hr * .1]); mk(new THREE.TorusGeometry(c.hr * .2, c.hr * .06, 5, 10), M(bow), head, [s * c.hr * .7, c.hr * 1.45, -c.hr * .05], [0, s * .6, 0]); } },
};
const PUP = [ // [desk, skin, hair colour, style, girl]
  [0, '#f0c4a0', '#6a4022', 'spiky', 0], [1, '#8a5232', '#120c0a', 'curly', 0], [2, '#e0b090', '#c8a040', 'pony', 1], [3, '#f0c4a0', '#3a2010', 'spiky', 0], [4, '#5e3a22', '#0c0806', 'buns', 1], [5, '#e8b48a', '#4a2a18', 'pony', 1], [8, '#f0c4a0', '#b84a1a', 'bangs', 0]];
const pupils = PUP.map(([dk, sk, hr, st, girl], i) => { const h = makeHuman({ ...uniform, skin: sk, face: kidFace(sk, hr, girl ? { lash: true, lip: '#d0606a' } : {}), hairFn: st === 'pony' || st === 'buns' ? HAIR[st](hr, ['#e8407a', '#f2c23a', '#40a0e8'][i % 3]) : HAIR[st](hr) }); h.desk = dk; scene.add(h.root); return h; });
const P_OF = d => pupils.find(p => p.desk === d);
const TSKIN = '#e8b48a', THAIR = '#3a2014', TDRESS = '#7a4ac8';
const tia = makeHuman({ skin: TSKIN, shirt: TDRESS, sleeveCol: TDRESS, long: true, pants: TSKIN, shoes: '#2fa0d6', socks: TSKIN, shorts: true, hipY: .84, sw: .17, d: 1.0, th: .54, hr: .2, hs: 1.1, ar: .05, ua: .27, fa: .24, lr: .058, tl: .42, sl: .4,
  face: { skin: TSKIN, hair: THAIR, hairTop: .24, hairBack: .7, eyeY: .53, eyeDX: 27, browDY: 24, mouthY: .72, ew: 14, eh: 15, pr: 9, iris: '#3a2210', line: '#1d120a', browC: THAIR, bw: 15, bt: 5, lash: true, lip: '#c8405a' },
  hairFn(head, c, M) { const hm = M(THAIR); mk(new THREE.SphereGeometry(c.hr * 1.09, 14, 9, 0, Math.PI * 2, 0, Math.PI * .55), hm, head, [0, c.hr * .95, -.02], [-.2, 0, 0]);
    const back = new THREE.CylinderGeometry(c.hr * .95, c.hr * 1.1, c.hr * 2.2, 12, 1, true, Math.PI * .6, Math.PI * .8); mk(back, hm, head, [0, c.hr * .6, -c.hr * .05], [0, 0, 0]).material.side = THREE.DoubleSide;
    for (let i = 0; i < 5; i++) mk(new THREE.SphereGeometry(c.hr * .32, 7, 5), hm, head, [(i - 2) * c.hr * .3 + .02, c.hr * 1.45 - (i - 2) * .012, c.hr * .82]).scale.set(1, .65, .55);
    for (const s of [-1, 1]) mk(new THREE.SphereGeometry(.018, 6, 5), M('#f2c23a'), head, [s * c.hr * 1.0, c.hr * .62, 0]); mk(new THREE.CylinderGeometry(.008, .008, .14, 5), M('#f2c23a'), head, [-.06, c.hr * 1.75, -c.hr * .7], [0, 0, 1.0]); },
  extraTorso(torso, c, M) { const sk = new THREE.CylinderGeometry(c.sw * 1.1, c.sw * 1.85, .5, 10); sk.translate(0, -.22, 0); mk(sk, M(TDRESS), torso, [0, 0, 0]); mk(new THREE.CylinderGeometry(c.sw * .98, c.sw * .98, .05, 10), M('#3a2a4a'), torso, [0, .02, 0]).scale.z = .72; mk(new THREE.TorusGeometry(c.sw * .55, .01, 4, 14), M('#f2c23a'), torso, [0, c.th - .03, .03], [Math.PI / 2 + .4, 0, 0]); } });
scene.add(tia.root);
const hemi = new THREE.HemisphereLight('#f2f4ff', '#8a7058', 1.45); scene.add(hemi);
const sun = new THREE.DirectionalLight('#fff0d8', 1.3); sun.castShadow = true; sun.shadow.mapSize.set(2048, 2048); sun.shadow.intensity = .3; sun.position.set(-3, 6, 3); scene.add(sun, sun.target);
{ const sc = sun.shadow.camera; sc.left = -5; sc.right = 5; sc.top = 5; sc.bottom = -5; sc.near = .5; sc.far = 20; sc.updateProjectionMatrix(); }
const roomL = new THREE.PointLight('#ffe8c0', 5, 12, 1.4); roomL.position.set(0, 2.6, 0); scene.add(roomL);
const puffT = ctex(64, 64, (g) => { const gr = g.createRadialGradient(32, 32, 0, 32, 32, 32); gr.addColorStop(0, 'rgba(255,255,255,.95)'); gr.addColorStop(.6, 'rgba(255,255,255,.5)'); gr.addColorStop(1, 'rgba(255,255,255,0)'); g.fillStyle = gr; g.fillRect(0, 0, 64, 64); }, [1, 1], false);
const PUFFS = []; for (let i = 0; i < 40; i++) { const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: puffT, transparent: true, depthWrite: false })); s.visible = false; scene.add(s); PUFFS.push(s); }
const talk = (t, a, d) => (t > a && t < a + d) ? clamp(Math.abs(Math.sin((t - a) * 13)) * 1.1 - .1, 0, 1) : 0;
const spk = (t, a, d) => t > a && t < a + d;
const lerpA = (a, b, u) => { const d = ((b - a + Math.PI) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI) - Math.PI; return a + d * u; };
const angTo = (a, b) => Math.atan2(b.x - a.x, b.z - a.z);
function seatPos(d) { const D = DESKS[d]; return V(D.x, 0, D.z + .22); }
const SIT = () => P({ lhx: -1.5, lk: 1.5, rhx: -1.5, rk: 1.5, lift: .36 - .62, lsx: -.7, rsx: -.7, le: -1.2, re: -1.2, lsz: .1, rsz: .1 });
const STAND = () => P({ lsx: -.1, rsx: -.1, lsz: .12, rsz: .12, le: -.25, re: -.25 });
const headTurn = (from, to) => { let dy = angTo(from, to) - Math.PI; while (dy < -Math.PI) dy += Math.PI * 2; while (dy > Math.PI) dy -= Math.PI * 2; return dy; };
const CURVES = new Map();
function curveAt(key, pts, u) { let c = CURVES.get(key); if (!c) { c = new THREE.CatmullRomCurve3(pts, false, 'centripetal'); c.arcLengthDivisions = 300; CURVES.set(key, c); } const uu = clamp(u, 0, 1); const p = c.getPointAt(uu), tg = c.getTangentAt(uu); return { pos: p, yaw: Math.atan2(tg.x, tg.z) }; }
function smoothState(fn, t, lo = 0) { const N = 10, dt = .022, tau = .06; let acc = null, ws = 0; const now0 = fn(t);
  for (let i = 0; i < N; i++) { const ti = Math.max(lo, t - i * dt); const st = fn(ti); const w = Math.exp(-i * dt / tau); while (st.yaw - now0.yaw > Math.PI) st.yaw -= 2 * Math.PI; while (st.yaw - now0.yaw < -Math.PI) st.yaw += 2 * Math.PI;
    if (!acc) { acc = { pos: V(0, 0, 0), yaw: 0, p: {}, lx: 0, ly: 0, fs: now0.fs }; for (const k in DEF) acc.p[k] = 0; }
    acc.pos.addScaledVector(st.pos, w); acc.yaw += st.yaw * w; for (const k in DEF) acc.p[k] += (st.p[k] ?? DEF[k]) * w; acc.lx += (st.fs.lx || 0) * w; acc.ly += (st.fs.ly || 0) * w; ws += w; }
  acc.pos.multiplyScalar(1 / ws); acc.yaw /= ws; for (const k in DEF) acc.p[k] /= ws; acc.lx /= ws; acc.ly /= ws; return acc; }
const BLINKABLE = ['normal', 'meh', 'wide', 'narrow'];
function applyState(h, st, t, seed) { const p = st.p, br = Math.sin(t * 2.3 + seed); p.bob += br * .005; p.lsz += br * .012; p.rsz += br * .012;
  h.root.position.copy(st.pos); h.root.rotation.set(0, st.yaw, 0); h.pose(p); const fs = { ...st.fs, lx: Math.round(st.lx * 20) / 20, ly: Math.round(st.ly * 20) / 20 };
  if (BLINKABLE.includes(fs.e || 'normal') && ((t + seed * 1.37) % 3.3) < .12) fs.e = 'closed'; h.face.set(fs); }
const look = (p, l, fov = 50, roll = 0) => ({ p, l, fov, roll });
const head = h => h.headMesh.getWorldPosition(new THREE.Vector3());
const shake = (t, a) => V(nz(t * 3, 1) * a, nz(t * 3, 5) * a, 0);
function vignette(strength, col = '0,0,0', r0 = .3) { const g = ctx.createRadialGradient(W / 2, H / 2, H * r0, W / 2, H / 2, H * .72); g.addColorStop(0, `rgba(${col},0)`); g.addColorStop(1, `rgba(${col},${strength})`); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); }
function outlined(txt, x, y, size, fill = '#fff', stroke = '#111', lw = 12) { ctx.font = `900 ${size}px Inter`; ctx.lineJoin = 'round'; ctx.strokeStyle = stroke; ctx.lineWidth = lw; ctx.strokeText(txt, x, y); ctx.fillStyle = fill; ctx.fillText(txt, x, y); }