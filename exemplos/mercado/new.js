
// ======================= SETUP =======================
pupils.forEach(h => h.root.visible = false); tia.root.visible = false;
const adult = (o) => ({ hipY: .86, sw: .19, d: 1.0, th: .54, hr: .21, hs: 1.15, ar: .055, ua: .28, fa: .25, lr: .062, tl: .43, sl: .41, ...o });
const aFace = (skin, hair, extra = {}) => ({ skin, hair, hairTop: .2, hairBack: .62, eyeY: .52, eyeDX: 27, browDY: 22, mouthY: .72, ew: 13, eh: 14, pr: 8, iris: '#3a2210', line: '#1a0d06', browC: hair, bw: 15, bt: 8, ...extra });
__CHARS__
const cashier = makeHuman(adult({ skin: '#8a5232', shirt: '#d6302f', sleeveCol: '#d6302f', pants: '#2a2a34', shoes: '#2a2a2a', socks: '#222', sw: .18, hr: .2,
  face: aFace('#8a5232', '#120c0a', { lash: true, lip: '#a8404a' }), hairFn(head, c, M) { const m = M('#120c0a'); mk(new THREE.SphereGeometry(c.hr * 1.09, 14, 9, 0, Math.PI * 2, 0, Math.PI * .55), m, head, [0, c.hr * .95, -.02], [-.2, 0, 0]); mk(new THREE.SphereGeometry(c.hr * .55, 9, 7), m, head, [0, c.hr * 1.4, -c.hr * .9]); mk(new THREE.CylinderGeometry(c.hr * 1.05, c.hr * 1.05, c.hr * .3, 12, 1, true), M('#d6302f'), head, [0, c.hr * 1.5, 0]).material.side = THREE.DoubleSide; },
  extraTorso(torso, c, M) { mk(BOX(.08, .05, .01), M('#f4f4f4'), torso, [.08, c.th * .7, c.sw * .9]); } }));
scene.add(cashier.root);

// ======================= SUPERMARKET at x = -30 =======================
const MX = -30;
const SM = new THREE.Group(); scene.add(SM); SM.position.set(MX, 0, 0);
mk(new THREE.PlaneGeometry(16, 14), lam('#ffffff', ctex(64, 64, (g, w, h) => { g.fillStyle = '#e8e4dc'; g.fillRect(0, 0, w, h); g.fillStyle = '#d0ccc2'; g.fillRect(0, 0, 32, 32); g.fillRect(32, 32, 32, 32); }, [16, 14])), SM, [2, 0, 0], [-Math.PI / 2, 0, 0], false, true);
mk(new THREE.PlaneGeometry(16, 14), lam('#f4f4f4'), SM, [2, 3.4, 0], [Math.PI / 2, 0, 0], false, false);
for (let i = 0; i < 5; i++) for (let j = 0; j < 4; j++) mk(BOX(1.2, .04, .3), lam('#ffffff', null, { emissive: '#ffffff', emissiveIntensity: .9 }), SM, [-2 + i * 2.2, 3.37, -5 + j * 3], [0, 0, 0], false, false);
mk(BOX(16, 3.4, .2), lam('#f2e6c0'), SM, [2, 1.7, -6.2]); mk(BOX(.2, 3.4, 14), lam('#f2e6c0'), SM, [-3.0, 1.7, 0]);
mk(BOX(16, .6, .05), lam('#2f9a6a'), SM, [2, 2.9, -6.08]);
// entrance glass + sign (front wall at z = 5.2)
mk(BOX(16, 1.0, .2), lam('#f2e6c0'), SM, [2, 2.9, 5.2]); for (const x of [-2.4, 1.6, 3.6, 6.0]) mk(BOX(.12, 2.4, .2), lam('#888'), SM, [x, 1.2, 5.2]);
mk(new THREE.PlaneGeometry(16, 2.4), new THREE.MeshLambertMaterial({ color: '#bfe0f0', transparent: true, opacity: .35, side: THREE.DoubleSide }), SM, [2, 1.2, 5.22], [0, 0, 0], false, false);
mk(BOX(3.0, .55, .06), lam('#ffffff', ctex(160, 30, (g, w, h) => { g.fillStyle = '#d6302f'; g.fillRect(0, 0, w, h); g.fillStyle = '#fff'; g.font = '900 20px Inter'; g.textAlign = 'center'; g.fillText('SUPERMERCADO', w / 2, 22); }, [1, 1], false)), SM, [0, 2.9, 5.08], [0, Math.PI, 0]);
// cart corral + baskets near the door
for (let i = 0; i < 4; i++) mk(BOX(.35, .25, .25), lam('#d6302f'), SM, [-2.4, .15 + i * .26, 4.3]);
// product textures
const PAL = ['#d6302f', '#3f74c8', '#f2c23a', '#2f9a6a', '#f08a24', '#8a4ac8', '#e85a8a', '#ffffff'];
function shelf(x, z, len, face, pal, kind) { const s = new THREE.Group(); SM.add(s); s.position.set(x, 0, z); s.rotation.y = face;
  mk(BOX(len, 2.0, .5), lam('#9aa0a8'), s, [0, 1.0, -.1]); for (let r = 0; r < 4; r++) { mk(BOX(len, .03, .5), lam('#c8ccd2'), s, [0, .3 + r * .45, .18]); const n = Math.floor(len / .17);
    for (let i = 0; i < n; i++) { const c = pal[(i * 3 + r) % pal.length]; if (kind === 'can') mk(new THREE.CylinderGeometry(.06, .06, .16, 8), lam(c), s, [-len / 2 + .09 + i * .17, .4 + r * .45, .25]); else mk(BOX(.13, .25 - (i % 2) * .04, .1), lam(c), s, [-len / 2 + .09 + i * .17, .45 + r * .45 - (i % 2) * .02, .27]); } }
  return s; }
// biscuit aisle (right), chocolate aisle (left), fridges at the back
shelf(1.25, .2, 3.6, -Math.PI / 2, ['#f2c23a', '#d6302f', '#3f74c8', '#f08a24'], 'box');
shelf(-1.25, .2, 3.6, Math.PI / 2, ['#6a3a1a', '#d6302f', '#8a4ac8', '#f4f4f4', '#3a2a1a'], 'box');
shelf(4.6, .2, 3.6, -Math.PI / 2, PAL, 'can'); shelf(2.2, .2, 3.6, Math.PI / 2, PAL, 'box');
{ const fr = new THREE.Group(); SM.add(fr); fr.position.set(0, 0, -3.4); mk(BOX(3.6, 2.1, .7), lam('#e8eef4'), fr, [0, 1.05, -.2]); for (let r = 0; r < 4; r++) for (let i = 0; i < 18; i++) mk(new THREE.CylinderGeometry(.05, .045, .11, 8), lam(['#ffffff', '#f2c8d8', '#f8f0a8', '#c8e8f8'][(i + r) % 4]), fr, [-1.65 + i * .19, .5 + r * .42, .05]);
  mk(new THREE.PlaneGeometry(3.5, 1.9), new THREE.MeshLambertMaterial({ color: '#cfe8f8', transparent: true, opacity: .25 }), fr, [0, 1.05, .16], [0, 0, 0], false, false); mk(BOX(3.6, .25, .1), lam('#3f74c8', null, { emissive: '#3f74c8', emissiveIntensity: .3 }), fr, [0, 2.0, .15]); }
// sign boards
for (const [x, z, txt] of [[0, -1.3, 'BISCOITOS'], [0, 1.6, 'DOCES']]) mk(BOX(1.4, .3, .04), lam('#ffffff', ctex(112, 24, (g, w, h) => { g.fillStyle = '#2f9a6a'; g.fillRect(0, 0, w, h); g.fillStyle = '#fff'; g.font = '900 15px Inter'; g.textAlign = 'center'; g.fillText(txt, w / 2, 18); }, [1, 1], false)), SM, [x, 2.75, z]);
// checkout at x = MX + 7
const CK = new THREE.Group(); SM.add(CK); CK.position.set(7, 0, 2.2);
mk(BOX(.8, .85, 2.4), lam('#3a3a44'), CK, [0, .425, 0]); mk(BOX(.6, .03, 2.2), lam('#1a1a1a'), CK, [0, .87, 0]); mk(BOX(.4, .4, .3), lam('#555'), CK, [.75, 1.0, -.9]); mk(BOX(.35, .25, .05), lam('#9ad0a8', null, { emissive: '#9ad0a8', emissiveIntensity: .5 }), CK, [.75, 1.3, -.82]);
mk(new THREE.CylinderGeometry(.04, .04, 1.4, 6), lam('#888'), CK, [.5, 1.5, -1.1]); mk(BOX(.25, .25, .05), lam('#ffffff', ctex(24, 24, (g) => { g.fillStyle = '#d6302f'; g.fillRect(0, 0, 24, 24); g.fillStyle = '#fff'; g.font = '900 16px Inter'; g.fillText('1', 8, 18); }, [1, 1], false)), CK, [.5, 2.25, -1.1]);
mk(BOX(.8, .9, .9), lam('#d6302f'), SM, [9.2, .45, 1.9]);

// ======================= CART + ITEMS =======================
const cart = new THREE.Group(); scene.add(cart);
{ const wm = lam('#c8ccd2'); const W2 = .3, L2 = .38, B = .45, Ht = .42; mk(BOX(W2 * 2, .02, L2 * 2), wm, cart, [0, B, 0]);
  for (let i = 0; i <= 6; i++) { mk(BOX(.012, Ht, .012), wm, cart, [-W2, B + Ht / 2, -L2 + i * L2 / 3]); mk(BOX(.012, Ht, .012), wm, cart, [W2, B + Ht / 2, -L2 + i * L2 / 3]); }
  for (let i = 0; i <= 4; i++) { mk(BOX(.012, Ht, .012), wm, cart, [-W2 + i * W2 / 2, B + Ht / 2, -L2]); mk(BOX(.012, Ht, .012), wm, cart, [-W2 + i * W2 / 2, B + Ht / 2, L2]); }
  for (const y of [B + .15, B + .3, B + Ht]) { mk(BOX(W2 * 2, .012, .012), wm, cart, [0, y, -L2]); mk(BOX(W2 * 2, .012, .012), wm, cart, [0, y, L2]); mk(BOX(.012, .012, L2 * 2), wm, cart, [-W2, y, 0]); mk(BOX(.012, .012, L2 * 2), wm, cart, [W2, y, 0]); }
  mk(BOX(W2 * 2 + .06, .04, .04), lam('#d6302f'), cart, [0, B + Ht + .08, -L2 - .1]); for (const s of [-1, 1]) mk(BOX(.02, .12, .1), wm, cart, [s * W2, B + Ht + .03, -L2 - .05]);
  for (const s of [-1, 1]) for (const z of [-L2 + .05, L2 - .05]) { mk(BOX(.02, B, .02), wm, cart, [s * (W2 - .02), B / 2, z]); mk(new THREE.CylinderGeometry(.05, .05, .03, 8), lam('#222'), cart, [s * (W2 - .02), .05, z], [0, 0, Math.PI / 2]); } }
const ITEM = {
  bisc: c => { const g = new THREE.Group(); mk(BOX(.22, .07, .12), lam(c), g, [0, 0, 0]); mk(BOX(.2, .072, .03), lam('#f4f4f4'), g, [0, 0, 0]); return g; },
  req: c => { const g = new THREE.Group(); mk(new THREE.CylinderGeometry(.06, .055, .08, 10), lam('#f4f4f4'), g, [0, 0, 0]); mk(new THREE.CylinderGeometry(.062, .062, .015, 10), lam(c), g, [0, .045, 0]); return g; },
  queijo: () => { const g = new THREE.Group(); const ge = new THREE.CylinderGeometry(.12, .12, .08, 3, 1, false, 0, 1.2); mk(ge, lam('#f2d24a'), g, [0, 0, 0]); return g; },
  pizza: () => { const g = new THREE.Group(); mk(BOX(.3, .04, .3), lam('#d6302f'), g, [0, 0, 0]); mk(new THREE.CylinderGeometry(.09, .09, .042, 10), lam('#f2c23a'), g, [0, 0, 0]); return g; },
  mel: () => { const g = new THREE.Group(); mk(new THREE.SphereGeometry(.17, 10, 8), lam('#2f8a3a'), g, [0, 0, 0]).scale.set(1.3, 1, 1); return g; },
  papel: () => { const g = new THREE.Group(); for (let i = 0; i < 6; i++) mk(new THREE.CylinderGeometry(.055, .055, .11, 8), lam('#fbfbfb'), g, [(i % 3 - 1) * .11, 0, (Math.floor(i / 3) - .5) * .11]); mk(BOX(.36, .02, .24), lam('#3f74c8'), g, [0, .06, 0]); return g; },
  panela: () => { const g = new THREE.Group(); mk(new THREE.CylinderGeometry(.13, .12, .12, 12), lam('#9aa0a8'), g, [0, 0, 0]); mk(BOX(.18, .025, .03), lam('#2a2a2a'), g, [.2, .04, 0]); mk(new THREE.CylinderGeometry(.135, .135, .02, 12), lam('#b8bcc2'), g, [0, .07, 0]); return g; },
  box: c => { const g = new THREE.Group(); mk(BOX(.16, .2, .1), lam(c), g, [0, 0, 0]); return g; },
  refri: c => { const g = new THREE.Group(); mk(new THREE.CylinderGeometry(.045, .045, .3, 8), lam(c), g, [0, 0, 0]); mk(new THREE.CylinderGeometry(.02, .03, .05, 6), lam(c), g, [0, .17, 0]); return g; },
};
const ITEMS = []; // {obj, slot(cart local), t0 (key name), from(world)}
function addItem(kind, col, slot, key, rot = 0) { const o = ITEM[kind](col); scene.add(o); o.rotation.y = rot; ITEMS.push({ o, slot, key, rot }); return o; }
// throws: two biscuits, then three fridge items, then the overflow pile
addItem('bisc', '#f2c23a', V(-.12, .5, .1), 'b1'); addItem('bisc', '#3f74c8', V(.1, .5, -.05), 'b2', .3);
addItem('req', '#3f74c8', V(-.15, .51, -.2), 'r1'); addItem('queijo', null, V(.12, .51, .22), 'r2'); addItem('pizza', null, V(0, .6, 0), 'r3', .2);
const PILE = [['mel', null, V(0, .82, -.05)], ['papel', null, V(.05, .78, .25)], ['refri', '#d6302f', V(-.2, .78, .2)], ['box', '#f08a24', V(.2, .76, -.25)], ['refri', '#2f9a6a', V(-.22, .74, -.22)], ['box', '#8a4ac8', V(-.05, 1.0, .2)], ['bisc', '#d6302f', V(.15, .98, -.1)], ['req', '#f2c23a', V(-.15, 1.0, -.15)], ['panela', null, V(0, 1.1, 0)]];
PILE.forEach(([k, c, s], i) => addItem(k, c, s, 'pile', i * .7));
const bala = new THREE.Group(); scene.add(bala); mk(new THREE.SphereGeometry(.02, 8, 6), lam('#e85a8a'), bala, [0, 0, 0]).scale.set(1.5, 1, 1); for (const s of [-1, 1]) mk(new THREE.ConeGeometry(.015, .025, 5), lam('#e85a8a'), bala, [s * .04, 0, 0], [0, 0, s * Math.PI / 2]);
const BELT = []; for (let i = 0; i < 14; i++) { const ks = ['bisc', 'req', 'box', 'refri', 'box', 'bisc', 'papel', 'mel', 'pizza', 'box', 'req', 'refri', 'panela', 'bisc']; const o = ITEM[ks[i]](PAL[i % PAL.length]); scene.add(o); BELT.push(o); }

// ======================= SCHEDULE =======================
const LN = JSON.parse('__LN__');
let T, SHOTS, DUR;
function build() {
  T = {}; T.m1 = .05; T.k1 = T.m1 + LN.m1 + .25; T.s2 = T.k1 + LN.k1 + .35; T.k2 = T.s2 + .3; T.m2 = T.k2 + LN.k2 + .15; T.b1 = T.m2 + LN.m2 + .15; T.m2b = T.b1 + .15; T.b2 = T.b1 + .45; T.s3 = Math.max(T.m2b + LN.m2b, T.b2) + .6;
  T.k3 = T.s3 + .3; T.m3 = T.k3 + LN.k3 + .15; T.r1 = T.m3 + .3; T.r2 = T.r1 + .35; T.r3 = T.r2 + .35; T.s4 = Math.max(T.m3 + LN.m3, T.r3) + .7; T.point = T.s4 + .2; T.m4 = T.point + .9; T.over = T.m4 + LN.m4 + .35;
  T.chk = T.over + 2.0; T.c1 = T.chk + .6; T.bala = T.c1 + LN.c1 + .2; T.m5a = T.bala + .7; T.look = T.m5a - .3; T.k4 = T.m5a + LN.m5a + .25; T.m5 = T.k4 + LN.k4 + .35; T.stare = T.m5 + LN.m5 + .1; T.loop = T.stare + 1.7; T.end = T.loop + .6; DUR = T.end;
  makeShots();
}
function era(t) { if (t < T.s2) return 1; if (t < T.s3) return 2; if (t < T.s4) return 3; if (t < T.chk) return 4; if (t < T.loop) return 5; return 1; }

// ======================= CHOREOGRAPHY =======================
const SPOT = { 1: [V(MX - .3, 0, 3.0), V(MX + .32, 0, 3.0)], 2: [V(MX - .1, 0, 1.6), V(MX + .65, 0, .5)], 3: [V(MX + .15, 0, -1.4), V(MX - .4, 0, -2.4)], 4: [V(MX + .1, 0, 1.5), V(MX - .65, 0, 1.0)], 5: [V(MX + 6.15, 0, 1.4), V(MX + 6.3, 0, 2.3)] };
const say = (t, k, base, rest) => spk(t, T[k], LN[k]) ? { ...base, m: 'talk', mo: talk(t, T[k], LN[k]) * .85, mrest: rest } : { ...base, m: rest };
const pushCart = p => { p.lsx = -1.05; p.rsx = -1.05; p.le = -.35; p.re = -.35; p.lsz = -.05; p.rsz = -.05; };
const tossArm = (p, t, ts) => { for (const t0 of ts) { const u = (t - t0 + .3) / .6; if (u > 0 && u < 1) { const a = Math.sin(u * Math.PI); p.rsx = lerp(-1.05, -2.0, a); p.re = lerp(-.35, -.2, a); p.rsz = lerp(-.05, .5, a); } } };
function maeTarget(t) { const E = era(t); const [mp, kp] = SPOT[E]; let pos = mp.clone(), yaw = 0, p = STAND(), fs = { e: 'narrow', b: 'angry', m: 'flat' };
  if (E === 1) { yaw = Math.PI / 2 + .2; p.lean = .14; p.hx = -.05; p.lhx = -.15; p.rhx = -.15; p.lk = .3; p.rk = .3; p.lift = -.03; p.rsx = -1.4; p.re = -.15; p.rsz = .05; p.lsx = -.1; p.lsz = .5; p.le = -1.3; fs = say(t, 'm1', { e: 'narrow', b: 'angry' }, 'tight');
    if (t > T.k1 - .15 && t < T.loop) { p = STAND(); p.lsx = -.1; p.lsz = .5; p.le = -1.3; p.rsz = .5; p.re = -1.3; p.rsx = -.1; fs = { e: 'normal', b: 'one', m: 'flat' }; } }
  else if (E === 2) { yaw = Math.PI; pushCart(p); tossArm(p, t, [T.b1, T.b2]); p.hy = .5; fs = say(t, 'm2', { e: 'normal', b: 'flat', ly: 0 }, 'flat'); if (t > T.m2b - .1) fs = say(t, 'm2b', { e: 'happy', b: 'up' }, 'smallsmile'); }
  else if (E === 3) { yaw = Math.PI; pushCart(p); tossArm(p, t, [T.r1, T.r2, T.r3]); p.hy = -.5; fs = say(t, 'm3', { e: 'normal', b: 'flat' }, 'flat'); }
  else if (E === 4) { yaw = Math.PI; pushCart(p); p.hy = .55; fs = { e: 'normal', b: 'flat', m: 'flat' }; if (t > T.m4 - .2 && t < T.over) { fs = say(t, 'm4', { e: 'meh', b: 'one' }, 'flat'); } if (t > T.over) { p = gait((t - T.over) * 6.5, .6); pushCart(p); fs = { e: 'happy', b: 'up', m: 'smile' }; pos = mp.clone().add(V(0, 0, -(t - T.over) * .5)); } }
  else { yaw = Math.PI; p = STAND(); fs = { e: 'normal', b: 'flat', m: 'smallsmile', lx: .5 }; p.lsx = -.6; p.le = -1.2;
    if (t > T.c1 + LN.c1 * .6) fs = { e: 'wide', b: 'worried', m: 'o', lx: .5 };
    if (t > T.look) { yaw = angTo(mp, kp); fs = say(t, 'm5a', { e: 'narrow', b: 'one' }, 'flat'); p.rsx = -1.2; p.re = -.3; p.rsz = .1; }
    if (t > T.k4) { p.rsx = -.2; fs = { e: 'narrow', b: 'one', m: 'flat' }; }
    if (t > T.m5 - .1) { fs = say(t, 'm5', { e: 'narrow', b: 'angry' }, 'tight'); p.lsx = .25; p.rsx = .25; p.lsz = .5; p.rsz = .5; p.le = -1.3; p.re = -1.3; } }
  return { pos, yaw, p, fs }; }
function kidTarget(t) { const E = era(t); const [mp, kp] = SPOT[E]; let pos = kp.clone(), yaw = 0, p = STAND(), fs = { e: 'normal', b: 'flat', m: 'flat' };
  if (E === 1) { yaw = -Math.PI / 2; p.hx = -.1; fs = { e: 'wide', b: 'worried', m: 'o', sw: 1 }; if (t > T.k1 - .1 && t < T.loop) { fs = say(t, 'k1', { e: 'normal', b: 'worried' }, 'flat'); p.hx = Math.sin(clamp((t - T.k1) / .5, 0, 1) * Math.PI * 2) * .2; } }
  else if (E === 2) { yaw = Math.PI / 2; fs = { e: 'wide', b: 'up', m: 'smile', lx: .3 }; if (t > T.k2 - .1) { yaw = -.6; fs = say(t, 'k2', { e: 'wide', b: 'up' }, 'smallsmile'); p.rsx = -1.25; p.re = -.15; p.rsz = .25; } if (t > T.m2) { fs = { e: 'meh', b: 'worried', m: 'flat' }; p.rsx = -.2; } if (t > T.b1) { yaw = -.6; fs = { e: 'meh', b: 'flat', m: 'flat', lx: -.5 }; } }
  else if (E === 3) { yaw = Math.PI; fs = { e: 'wide', b: 'up', m: 'smile' }; p.hx = -.1; if (t > T.k3 - .1) { yaw = .3; fs = say(t, 'k3', { e: 'happy', b: 'worried' }, 'smallsmile'); p.lsx = -1.0; p.rsx = -1.0; p.le = -1.5; p.re = -1.5; p.lsz = -.3; p.rsz = -.3; } if (t > T.m3 + .2) { fs = { e: 'meh', b: 'worried', m: 'flat' }; p = STAND(); } if (t > T.r1) fs = { e: 'meh', b: 'flat', m: 'flat', lx: .5 }; }
  else if (E === 4) { yaw = -Math.PI / 2 - .3; p.rsx = -1.5; p.re = -.05; p.rsz = .1; fs = { e: 'wide', b: 'up', m: 'flat', lx: -.4 }; if (t > T.m4 + .3) { p.rsx = -.2; fs = { e: 'meh', b: 'flat', m: 'flat' }; } if (t > T.over) { p = gait((t - T.over) * 7, .6); yaw = Math.PI; fs = { e: 'meh', b: 'flat', m: 'flat' }; pos = kp.clone().add(V(0, 0, -(t - T.over) * .5)); } }
  else { yaw = -Math.PI / 2; p = STAND(); fs = { e: 'meh', b: 'flat', m: 'flat' }; if (t > T.bala - .5 && t < T.look) { p.rsx = -1.1; p.re = -.4; p.rsz = .1; fs = { e: 'normal', b: 'up', m: 'smallsmile', ly: .5 }; }
    if (t > T.look) { yaw = angTo(kp, mp); fs = { e: 'wide', b: 'worried', m: 'flat' }; } if (t > T.k4 - .1) fs = say(t, 'k4', { e: 'normal', b: 'worried' }, 'flat'); if (t > T.m5) fs = { e: 'meh', b: 'worried', m: 'flat' }; if (t > T.stare) { yaw = 0; fs = { e: 'meh', b: 'flat', m: 'flat' }; } }
  return { pos, yaw, p, fs }; }
function cashierT(t) { const E = era(t); if (E !== 5) return { pos: V(300, 0, 0), yaw: 0, p: STAND(), fs: { e: 'normal' } }; const p = STAND(); let fs = { e: 'meh', b: 'flat', m: 'flat' };
  if (t < T.c1) { p.rsx = -1.2 + Math.sin(t * 18) * .35; p.re = -.6; p.lsx = -1.0; p.le = -.6; } else { fs = spk(t, T.c1, LN.c1) ? { e: 'meh', b: 'flat', m: 'talk', mo: talk(t, T.c1, LN.c1) * .6, mrest: 'flat' } : { e: 'meh', b: 'flat', m: 'flat' }; }
  return { pos: V(MX + 7.85, 0, 1.6), yaw: -Math.PI / 2, p, fs }; }
const CUTS = () => [T.s2, T.s3, T.s4, T.chk, T.loop];
const segLo = t => { let lo = 0; for (const c of CUTS()) if (t >= c) lo = c; return lo; };

// ======================= CAMERAS =======================
function makeShots() {
  const MH = () => head(mae), KH = () => head(kid);
  const _q = new THREE.Quaternion();
  const faceCam = (h, d = 1.0, side = .2, dy = .03, fov = 44) => (lt) => { const k = head(h); h.head.getWorldQuaternion(_q); const f = V(0, 0, 1).applyQuaternion(_q).setY(0).normalize(); const sd = V(f.z, 0, -f.x); return look(k.clone().addScaledVector(f, d).addScaledVector(sd, side).add(V(0, dy, 0)), k.clone().add(V(0, -.03, 0)), fov); };
  const open = () => look(V(MX + .7, 1.48, 1.55), V(MX - .2, 1.22, 3.0), 46);
  const close = (getH, dx, dz, d = .95, fov = 44) => (lt) => { const k = getH(); return look(V(k.x + dx * d, k.y + .03, k.z + dz * d), V(k.x, k.y - .03, k.z), fov); };
  SHOTS = [
    { a: 0, b: T.k1 - .1, cam: open },
    { a: T.k1 - .1, b: T.s2, cam(lt) { const k = KH(); return look(V(MX - .2, 1.15, 3.8), V(k.x, k.y - .04, k.z), 46); } },
    { a: T.s2, b: T.m2 - .05, cam: faceCam(kid, .9, .25) },
    { a: T.m2 - .05, b: T.s3, cam(lt) { const u = eOut(clamp(lt / 1.5, 0, 1)); return look(V(MX + .25, 1.5, -.7 + .2 * u), V(MX, 1.12, 1.6), 58); } },
    { a: T.s3, b: T.m3 - .05, cam: faceCam(kid, 1.0, .2) },
    { a: T.m3 - .05, b: T.s4, cam(lt) { return look(V(MX + .35, 1.5, -3.0), V(MX + .1, 1.1, -.6), 56); } },
    { a: T.s4, b: T.m4 - .2, cam(lt) { const k = KH(); return look(V(MX - .1, 1.25, .1), V(k.x - .2, k.y - .2, k.z + .1), 58); } },
    { a: T.m4 - .2, b: T.over, cam: faceCam(mae, 1.0, .15) },
    { a: T.over, b: T.chk, cam(lt) { const u = eOut(clamp(lt / 2, 0, 1)); return look(V(MX + .05, lerp(.55, .45, u), lerp(-1.6, -1.3, u)), V(MX + .1, 1.0, 1.5), lerp(56, 62, u)); } },
    { a: T.chk, b: T.c1 - .1, cam(lt) { const u = eIO(clamp(lt / 1.0, 0, 1)); return look(V(MX + 5.2, 1.6, lerp(4.6, 4.3, u)), V(MX + 6.8, .95, 1.8), 52); } },
    { a: T.c1 - .1, b: T.bala - .3, cam: faceCam(cashier, 1.0, .1) },
    { a: T.bala - .3, b: T.m5a - .1, cam(lt) { return look(V(MX + 6.25, 1.35, 3.25), V(MX + 6.8, .9, 2.65), 46); } },
    { a: T.m5a - .1, b: T.k4 - .1, cam: faceCam(mae, 1.0, -.15) },
    { a: T.k4 - .1, b: T.m5 - .1, cam: faceCam(kid, .8, .6) },
    { a: T.m5 - .1, b: T.stare, cam: faceCam(mae, .85, -.1) },
    { a: T.stare, b: T.loop, cam(lt) { const k = KH(); const u = eOut(clamp(lt / 1.7, 0, 1)); return look(V(k.x + .02, k.y + .02, k.z + lerp(1.0, .82, u)), V(k.x, k.y - .02, k.z), 44); } },
    { a: T.loop, b: T.end + 1, cam: open },
  ];
  SHOTS.sort((x, y) => x.a - y.a);
}
build();
const shotAt = t => { for (const s of SHOTS) if (t >= s.a && t < s.b) return s; return SHOTS[SHOTS.length - 1]; };

// ======================= OVERLAY =======================
function overlay(t, s) {
  ctx.textAlign = 'center'; vignette(.22);
  if (t < 2.6 && t < T.loop) { outlined('Aquela mãe no mercado:', W / 2, 160, 70, '#ffe14a', '#111', 14); }
  if (t > T.end - 2.0) { const a = sm(T.end - 2.0, T.end - 1.75, t); ctx.globalAlpha = a; ctx.fillStyle = 'rgba(0,0,0,.55)'; ctx.beginPath(); ctx.roundRect(W / 2 - 430, H * .85 - 60, 860, 110, 30); ctx.fill(); outlined('Sua mãe também fazia isso? 👇', W / 2, H * .85 + 16, 50, '#ffffff', '#111', 8); ctx.globalAlpha = 1; }
}

// ======================= RENDER =======================
window.renderAt = function (t) {
  const s = shotAt(t), lo = segLo(t), E = era(t);
  applyState(mae, smoothState(maeTarget, t, lo), t, 2); applyState(kid, smoothState(kidTarget, t, lo), t, 3); applyState(cashier, cashierT(t), t, 5);
  scene.updateMatrixWorld(true);
  // cart in front of mom (hidden at checkout and entrance)
  cart.visible = E >= 2 && E <= 4; if (cart.visible) { const y = mae.root.rotation.y; cart.position.copy(mae.root.position).add(V(Math.sin(y) * .7, 0, Math.cos(y) * .7)); cart.rotation.y = y + Math.PI; }
  cart.updateMatrixWorld(true);
  const throwT = { b1: T.b1, b2: T.b2, r1: T.r1, r2: T.r2, r3: T.r3 };
  ITEMS.forEach(it => { const t0 = it.key === 'pile' ? T.over : throwT[it.key]; it.o.visible = cart.visible && t > t0 - .3 && (it.key !== 'pile' || t > T.over);
    if (!it.o.visible) return; const dst = cart.localToWorld(it.slot.clone()); if (it.key !== 'pile' && t < t0 + .15) { const src = mae.handR.getWorldPosition(V(0, 0, 0)); const u = clamp((t - t0 + .3) / .45, 0, 1); it.o.position.copy(src.lerp(dst, u)).add(V(0, Math.sin(u * Math.PI) * .25, 0)); it.o.rotation.set(u * 4, it.rot, u * 2); } else { it.o.position.copy(dst); it.o.rotation.set(0, cart.rotation.y + it.rot, 0); } });
  // checkout belt
  BELT.forEach((o, i) => { o.visible = E === 5; if (!o.visible) return; const sp = t < T.bala ? 1.1 : .2; const z = ((i * .32 - (t - T.chk) * sp) % 4.5 + 4.5) % 4.5; o.position.set(MX + 7, .95, 3.4 - z * .55); o.rotation.set(0, i, 0); o.visible = z * .55 < 2.3; });
  bala.visible = E === 5 && t > T.bala - .5; if (bala.visible) { if (t < T.bala) kid.handR.getWorldPosition(bala.position); else bala.position.set(MX + 6.82, .9, 2.65); }
  sun.position.set(MX - 3, 6, 3); sun.target.position.set(MX, 0, 0); sun.intensity = .8; hemi.intensity = 1.5; roomL.intensity = 0; scene.background = new THREE.Color('#f4f4f4');
  scene.updateMatrixWorld(true);
  const c = s.cam(t - s.a, t); camera.position.copy(c.p); camera.up.set(0, 1, 0); camera.lookAt(c.l); if (c.roll) camera.rotateZ(c.roll); camera.fov = c.fov; camera.near = .02; camera.updateProjectionMatrix();
  renderer.render(scene, camera); ctx.imageSmoothingEnabled = false; ctx.drawImage(renderer.domElement, 0, 0, W, H);
  overlay(t, s);
};
window.grab = (q = .92) => out.toDataURL('image/jpeg', q);
Object.defineProperty(window, 'INFO', { get() { return { DUR, SHOTS: SHOTS.map(s => [s.a, s.b]), T }; } });
window.ready = true;
