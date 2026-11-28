// ======================= SETS =======================
room(0, wallT('#a8cce8'), T_woodR, { right: 'door' });
// hallway behind the bedroom door
mk(BOX(.1, 2.6, 2.4), lam('#ffffff', wallT('#f2dca0')), S, [3.3, 1.3, 1.0], [0, 0, 0], false); mk(new THREE.PlaneGeometry(1.1, 2.4), lam('#ffffff', T_tile), S, [2.75, .005, 1.0], [-Math.PI / 2, 0, 0], false, true);
mk(BOX(1.2, 2.6, .1), lam('#ffffff', wallT('#f2dca0')), S, [2.75, 1.3, -.2], [0, 0, 0], false);
// bed (head at x -1)
mk(BOX(1.95, .3, 1.05), lam('#8a5a3a'), S, [0, .15, .62]); mk(BOX(1.9, .14, 1.0), lam('#f4f4f4'), S, [0, .37, .62]); mk(BOX(.4, .12, .7), lam('#f4f4f4'), S, [-.72, .48, .62]); mk(BOX(.08, .7, 1.05), lam('#7a4a2a'), S, [-1.0, .35, .62]);
const blanket = mk(BOX(1.25, .14, 1.04), lam('#3a6ac8'), S, [.3, .5, .62]);
mk(BOX(1.1, .6, .45), lam('#7a4a2a'), S, [0, .3, -1.9]); mk(BOX(.86, .52, .1), lam('#1a1a1e'), S, [0, .88, -1.9]);
for (const [x, c] of [[-1.2, '#d6302f'], [1.2, '#f2c23a']]) { mk(BOX(.5, .66, .02), lam('#f4f4f4'), S, [x, 1.6, -2.14]); mk(BOX(.42, .58, .01), lam(c), S, [x, 1.6, -2.13]); }
for (let i = 0; i < 4; i++) mk(BOX(.22, .03, .3), lam(['#d6302f', '#2f9a6a', '#f2c23a', '#40a0e8'][i]), S, [.9 + i * .15, .015, -.6 + i * .2], [0, i, 0]);
// window on the left wall + curtains
mk(BOX(.04, 1.0, 1.0), new THREE.MeshBasicMaterial({ color: '#fff2b0' }), S, [-2.14, 1.45, 1.2], [0, 0, 0], false, false); mk(BOX(.06, .06, 1.08), lam('#f4f4f4'), S, [-2.12, 1.45, 1.2]); mk(BOX(.06, 1.06, .06), lam('#f4f4f4'), S, [-2.12, 1.45, 1.2]);
const curtL = mk(BOX(.03, 1.2, .55), lam('#c84a8a'), S, [-2.08, 1.45, .95], [0, 0, 0], false); const curtR = mk(BOX(.03, 1.2, .55), lam('#c84a8a'), S, [-2.08, 1.45, 1.45], [0, 0, 0], false);
const sunbeam = mk(new THREE.PlaneGeometry(1.0, 2.2), new THREE.MeshBasicMaterial({ color: '#fff4b0', transparent: true, opacity: .22, depthWrite: false }), S, [-1.4, 1.0, 1.2], [0, Math.PI / 2, -.6], false, false);
// kitchen (cx 11)
room(11, wallT('#f2dca0'), T_tile);
mk(BOX(1.4, .05, .85), lam('#8a5a3a'), S, [10, .74, 0]); for (const [x, z] of [[-.62, -.36], [.62, -.36], [-.62, .36], [.62, .36]]) mk(BOX(.05, .74, .05), lam('#6a4024'), S, [10 + x, .37, z]);
mk(BOX(1.3, .006, .75), lam('#f4f4f4'), S, [10, .768, 0], [0, 0, 0], false);
const LCH = V(9.75, 0, -.66);
mk(BOX(.42, .05, .42), lam('#a86a3a'), S, [LCH.x, .44, LCH.z - .02]); mk(BOX(.42, .55, .05), lam('#a86a3a'), S, [LCH.x, .72, LCH.z - .23]); for (const [x, z] of [[-.18, -.2], [.18, -.2], [-.18, .16], [.18, .16]]) mk(BOX(.04, .44, .04), lam('#7a4a2a'), S, [LCH.x + x, .22, LCH.z + z]);
mk(new THREE.CylinderGeometry(.13, .11, .02, 14), lam('#f4f4f4'), S, [LCH.x, .78, -.2]);
const bell = new THREE.Group(); bell.position.set(10.05, .77, -.15); S.add(bell); mk(new THREE.CylinderGeometry(.07, .07, .02, 12), lam('#1a1a1e'), bell, [0, .01, 0]); mk(new THREE.SphereGeometry(.06, 10, 6, 0, 7, 0, 1.5), lam('#e8c84a'), bell, [0, .02, 0]); const bellBtn = mk(new THREE.CylinderGeometry(.012, .012, .03, 6), lam('#e8c84a'), bell, [0, .085, 0]);
mk(BOX(1.6, .9, .6), lam('#e8e8ec'), S, [12.3, .45, -1.9]); mk(BOX(1.6, .05, .6), lam('#8a5a3a'), S, [12.3, .92, -1.9]); mk(BOX(.5, .66, .02), lam('#f4f4f4'), S, [10.0, 1.65, -2.14]); mk(BOX(.42, .58, .01), lam('#3a8a5a'), S, [10.0, 1.65, -2.13]);
// props
const napkin = mk(new THREE.ConeGeometry(.1, .18, 3), lam('#f4f4f4'), kid.torso, [0, .3, .14], [Math.PI, 0, 0]);
const fork = mk(BOX(.015, .16, .015), lam('#c8c8d0'), scene, [0, 0, 0]); const knife = mk(BOX(.02, .17, .01), lam('#c8c8d0'), scene, [0, 0, 0]);
const towel = mk(BOX(.35, .5, .03), lam('#40a0e8'), scene, [0, 0, 0]);
const towelBed = mk(BOX(.5, .03, .4), lam('#40a0e8'), S, [.45, .58, .55], [0, .3, 0]);
const dripM = new THREE.MeshBasicMaterial({ color: '#7ac8ff' }); const drips = []; for (let i = 0; i < 6; i++) { const d = mk(new THREE.SphereGeometry(.018, 5, 4), dripM, scene, [0, 0, 0], [0, 0, 0], false, false); d.scale.y = 1.6; drips.push(d); }
const tear = mk(new THREE.SphereGeometry(.022, 6, 5), dripM, mae.head, [-.1, .17, .19], [0, 0, 0], false, false); tear.scale.y = 1.5;
const paiTowelless = mk(BOX(.44, .3, .3), lam('#f4f4f4'), pai.hips, [0, .02, 0]); // pai wrapped in a small hand towel... (shorts look)


// ---- extra dressing (bedroom)
mk(BOX(1.6, .01, 1.1), lam('#e8a030'), S, [.2, .006, -.6], [0, 0, 0], false, true);
mk(BOX(.9, 1.4, .3), lam('#8a5a3a'), S, [-1.6, .7, -2.0]); for (let i = 0; i < 3; i++) for (let j = 0; j < 5; j++) mk(BOX(.08, .22, .18), lam(['#d6302f', '#2f9a6a', '#f2c23a', '#40a0e8', '#e8407a'][(i + j) % 5]), S, [-1.9 + j * .13, .55 + i * .42, -1.98]);
mk(new THREE.IcosahedronGeometry(.12, 1), lam('#f4f4f4'), S, [1.6, .12, -.9]); mk(BOX(.5, .35, .35), lam('#e85a3a'), S, [1.7, .17, -1.8]);
mk(BOX(.4, .5, .4), lam('#7a4a2a'), S, [-1.25, .25, 1.8]); mk(new THREE.CylinderGeometry(.03, .03, .4, 6), lam('#3a3a40'), S, [-1.25, .7, 1.8]); mk(new THREE.ConeGeometry(.15, .18, 8, 1, true), lam('#f2e050'), S, [-1.25, .95, 1.8]);
// ---- extra dressing (kitchen): checker floor, tiles, fridge, stove, cabinets, fruit
const T_check = ctex(64, 64, (g, w, h) => { for (let y = 0; y < 4; y++) for (let x = 0; x < 4; x++) { g.fillStyle = (x + y) % 2 ? '#f4f0e8' : '#e8703a'; g.fillRect(x * 16, y * 16, 16, 16); } }, [8, 8]);
mk(new THREE.PlaneGeometry(4.4, 4.4), lam('#ffffff', T_check), S, [11, .003, 0], [-Math.PI / 2, 0, 0], false, true);
for (let x = 8.9; x < 13.2; x += .2) mk(BOX(.19, .19, .02), lam(['#40a0e8', '#f4f4f4', '#f2c23a', '#f4f4f4'][Math.round((x - 8.9) / .2) % 4]), S, [x, 1.15, -2.13], [0, 0, 0], false);
mk(BOX(.7, 1.8, .65), lam('#f4f4f4'), S, [12.75, .9, -1.8]); mk(BOX(.04, .5, .04), lam('#b8b8c0'), S, [12.45, 1.25, -1.46]);
mk(BOX(.7, .9, .6), lam('#e8e8ec'), S, [11.9, .45, -1.85]); for (const [x, z] of [[-.15, -.1], [.15, -.1], [-.15, .12], [.15, .12]]) mk(new THREE.CylinderGeometry(.08, .08, .02, 10), lam('#1a1a1e'), S, [11.9 + x, .91, -1.85 + z]);
mk(new THREE.CylinderGeometry(.13, .13, .16, 10), lam('#b8b8c0'), S, [11.75, 1.0, -1.95]);
mk(BOX(2.2, .6, .4), lam('#d6302f'), S, [11.4, 2.0, -2.0]);
mk(new THREE.SphereGeometry(.14, 10, 6, 0, 7, Math.PI / 2, Math.PI / 2), lam('#f4f4f4'), S, [10.3, .78, .15]); for (let i = 0; i < 4; i++) mk(new THREE.SphereGeometry(.05, 7, 5), lam(['#e8403a', '#f2c23a', '#40a020', '#f08a24'][i]), S, [10.25 + (i % 2) * .09, .83 + Math.floor(i / 2) * .04, .12 + (i % 2) * .05]);
// ---- HOTEL fantasy set (cx 20)
const T_gold = ctex(64, 64, (g, w, h) => { g.fillStyle = '#7a1a2a'; g.fillRect(0, 0, w, h); g.fillStyle = 'rgba(240,200,80,.35)'; for (let x = 0; x < w; x += 16) g.fillRect(x, 0, 3, h); }, [8, 3]);
room(20, T_gold, ctex(32, 32, (g, w, h) => speckle(g, w, h, '#b8222a', .1), [6, 6]));
const signT = ctex(512, 128, (g, w, h) => { g.fillStyle = '#1a1208'; g.fillRect(0, 0, w, h); g.strokeStyle = '#f2c23a'; g.lineWidth = 8; g.strokeRect(6, 6, w - 12, h - 12); g.fillStyle = '#f2c23a'; g.font = '900 64px Inter'; g.textAlign = 'center'; g.fillText('HOTEL ★★★★★', w / 2, 86); }, [1, 1], false);
mk(new THREE.PlaneGeometry(1.8, .45), new THREE.MeshBasicMaterial({ map: signT }), S, [20, 2.1, -2.13], [0, 0, 0], false, false);
mk(BOX(2.0, .35, 1.6), lam('#f4f4f4'), S, [20, .3, -1.2]); mk(BOX(2.1, 1.3, .12), lam('#d8a830'), S, [20, .9, -2.05]); mk(BOX(2.0, .08, 1.0), lam('#f2c23a'), S, [20, .5, -.8]);
for (const x of [19.4, 20.6]) mk(BOX(.5, .14, .32), lam('#f4f4f4'), S, [x, .56, -1.75]);
const swan = new THREE.Group(); swan.position.set(20, .55, -1.0); S.add(swan); { const wm2 = lam('#f8f8f8'); mk(new THREE.SphereGeometry(.18, 10, 7), wm2, swan, [0, .1, 0]).scale.set(1, .7, 1.4); mk(new THREE.CylinderGeometry(.035, .05, .35, 8), wm2, swan, [0, .3, .18], [-.3, 0, 0]); mk(new THREE.SphereGeometry(.06, 8, 6), wm2, swan, [0, .47, .24]); mk(new THREE.ConeGeometry(.025, .08, 6), lam('#f08a24'), swan, [0, .46, .32], [Math.PI / 2, 0, 0]); for (let i = 0; i < 8; i++) mk(new THREE.SphereGeometry(.03, 5, 4), lam('#d0103a'), swan, [Math.cos(i) * .35, 0, Math.sin(i * 1.7) * .3]).scale.y = .3; }
const chand = new THREE.Group(); chand.position.set(20, 2.3, -.5); S.add(chand); for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2; mk(new THREE.SphereGeometry(.05, 6, 5), lam('#fff4c0', null, { emissive: '#ffe080', emissiveIntensity: .8 }), chand, [Math.cos(a) * .35, 0, Math.sin(a) * .35], [0, 0, 0], false, false); } mk(new THREE.TorusGeometry(.35, .02, 4, 16), lam('#f2c23a'), chand, [0, 0, 0], [Math.PI / 2, 0, 0]);
for (const x of [18.4, 21.6]) { mk(new THREE.CylinderGeometry(.18, .14, .4, 8), lam('#f2c23a'), S, [x, .2, -1.6]); for (let i = 0; i < 5; i++) mk(BOX(.06, .55, .2), lam('#2f9a4a'), S, [x, .65, -1.6], [(i - 2) * .35, i, (i % 2 - .5) * .6]); }
const hangT = ctex(128, 256, (g, w, h) => { g.fillStyle = '#f2c23a'; g.fillRect(0, 0, w, h); g.fillStyle = '#7a1a2a'; g.beginPath(); g.arc(64, 40, 26, 0, 7); g.fill(); g.fillStyle = '#1a1208'; g.font = '900 30px Inter'; g.textAlign = 'center'; g.fillText('NÃO', 64, 130); g.fillText('PERTURBE', 64, 170); g.font = '900 40px Inter'; g.fillText('Zzz', 64, 230); }, [1, 1], false);
mk(new THREE.PlaneGeometry(.3, .6), new THREE.MeshBasicMaterial({ map: hangT }), S, [21.5, 1.55, -2.13], [0, 0, 0], false, false);
const ctable2 = new THREE.Group(); ctable2.position.set(20.6, 0, .6); S.add(ctable2); mk(new THREE.CylinderGeometry(.5, .5, .04, 16), lam('#f4f4f4'), ctable2, [0, .74, 0]); mk(new THREE.CylinderGeometry(.06, .2, .74, 8), lam('#d8a830'), ctable2, [0, .37, 0]);
const cloche = mk(new THREE.SphereGeometry(.2, 12, 8, 0, 7, 0, Math.PI / 2), lam('#d8d8e0'), ctable2, [0, .77, 0]); mk(new THREE.CylinderGeometry(.24, .24, .02, 14), lam('#d8d8e0'), ctable2, [0, .765, 0]);
const feast = new THREE.Group(); ctable2.add(feast); feast.position.y = .78; for (let i = 0; i < 6; i++) mk(new THREE.SphereGeometry(.05, 6, 5), lam(['#c88a3a', '#f2c23a', '#e8403a', '#8a4a20', '#f4f4f4', '#40a020'][i]), feast, [Math.cos(i) * .1, .03, Math.sin(i) * .1]);
const sparkles = new THREE.Group(); scene.add(sparkles); for (let i = 0; i < 10; i++) mk(new THREE.OctahedronGeometry(.03, 0), new THREE.MeshBasicMaterial({ color: '#fff2a0' }), sparkles, [(seeded(i) - .5) * 1.2, seeded(i + 4) * 1.2, (seeded(i + 8) - .5) * .4], [0, 0, 0], false, false);
const mask = mk(BOX(.36, .09, .05), lam('#1a1a1e'), kid.head, [0, .27, .23], [-.1, 0, 0]);
const robe = new THREE.Group(); kid.torso.add(robe); mk(new THREE.CylinderGeometry(.19, .21, .45, 9), lam('#f4f4f4'), robe, [0, .2, 0]).scale.z = .85;

renderer.toneMappingExposure = 1.3;
// ======================= LIGHTS =======================
for (const [x, z, i] of [[0, .3, 1.9], [10.5, 0, 1.9], [2.75, 1.0, .7], [20, -.3, 1.8]]) { const l = new THREE.PointLight('#ffe8c0', i, 7, 1.3); l.position.set(x, 2.3, z); scene.add(l); }
scene.background = new THREE.Color('#e8e0d0');

// ======================= SCHEDULE =======================
const LN = __LN__;
let T, SHOTS, DUR;
function build() {
  T = {}; T.m1 = .2; T.c1 = T.m1 + LN.m1 + .05; T.k1 = T.c1 + 1.15; T.bell = T.k1 + LN.k1 + .3; T.k2 = T.bell + .4; T.m2 = T.k2 + LN.k2 + .12; T.c2 = T.m2 + LN.m2 + .05; T.m3 = T.c2 + 1.25;
  T.c3 = T.m3 + LN.m3 + .05; T.k3 = T.c3 + 1.1; T.p1 = T.k3 + LN.k3 + .35; T.k4 = T.p1 + LN.p1 + .25; T.m4 = T.k4 + LN.k4 + .3; T.p2 = T.m4 + LN.m4 + .15; T.end = T.p2 + LN.p2 + 2.2; DUR = T.end;
  makeShots();
}
const lvl = t => t < T.bell ? 1 : t < T.m3 ? 2 : t < T.p1 ? 3 : 4;
const cut = t => (t >= T.c1 && t < T.k1) ? 1 : (t >= T.c2 && t < T.m3) ? 2 : (t >= T.c3 && t < T.k3) ? 3 : 0;
const LBED = V(.55, 0, .62), MB = V(-.95, 0, 1.6), MK = V(10.8, 0, .55), MC = V(.15, 0, 1.55), LD = V(1.5, 0, 1.05), PD = V(2.65, 0, 1.0);
function maeState(t) {
  let pos, yaw, p = P({}), fs, prop = null; const L = lvl(t);
  if (cut(t)) return { pos: V(-30, 0, 0), yaw: 0, p: P({}), fs: { e: 'normal' }, prop: null };
  const sp = ['m1', 'm2', 'm3', 'm4'].find(k => spk(t, T[k], LN[k])); const mo = sp ? talk(t, T[sp], LN[sp]) : 0;
  if (L === 1) { pos = MB.clone(); yaw = t < .15 ? -Math.PI / 2 : faceTo(MB, V(-.6, 0, .62)); p = P({ ...AKIMBO }); if (t < .35) p = P({ lsx: -1.4, rsx: -1.4, lsz: .6, rsz: .6, le: -.2, re: -.2 });
    fs = { e: 'narrow', b: 'angry', m: sp ? 'talk' : 'flat', mo, mrest: 'flat', red: .3 }; }
  else if (L === 2) { pos = MK.clone(); yaw = faceTo(MK, LCH); p = P({ ...AKIMBO }); fs = { e: t < T.m2 ? 'wide' : 'narrow', b: 'angry', m: sp ? 'talk' : 'flat', mo, mrest: 'flat', red: t < T.m2 ? .2 : .6, vein: t > T.m2 ? 1 : 0 }; if (sp) { p.rsx = -1.3; p.re = -.15; p.rsz = .05; } }
  else if (L === 3) { pos = MC.clone(); yaw = faceTo(MC, LD); const sh = Math.sin(t * 40) * .05; p = P({ rsx: -1.6 + sh, re: -.4, rsz: .15, lsx: -.15, lsz: .85, le: -1.9 }); prop = 'towel'; fs = { e: 'narrow', b: 'angry', m: sp ? 'talk' : 'grit', mo, mrest: 'grit', red: .95, vein: 1, sw: 1 }; }
  else { pos = MC.clone(); yaw = faceTo(MC, PD) - .3; p = P({ lsz: .15, rsz: .15 }); fs = { e: 'narrow', b: 'angry', m: 'flat', red: .3 };
    if (t > T.k4 + LN.k4 * .5) { yaw = faceTo(MC, LD); fs = { e: 'wide', b: 'up', m: 'o' }; }
    if (t > T.m4 - .2) { yaw = faceTo(MC, LD) + .5; p = P({ lsx: -.6, rsx: -.6, le: -1.5, re: -1.5, lsz: -.3, rsz: -.3 }); fs = { e: 'happy', b: 'worried', m: sp ? 'talk' : 'bigsmile', mo, mrest: 'bigsmile' }; prop = 'tear'; } }
  return { pos, yaw, p, fs, prop };
}
function kidState(t) {
  let pos, yaw, p, fs, prop = null; const L = lvl(t); const C = cut(t);
  if (C === 1) return { pos: V(20.0, 0, -.35), yaw: 0, p: P({ pitch: -Math.PI / 2, lift: .55, lsz: .1, rsz: .1 }), fs: { e: 'closed', b: 'up', m: 'smallsmile' }, prop: 'mask' };
  if (C === 2) { const sw = Math.sin(t * 3) * .1; return { pos: V(20.6, 0, .05), yaw: 0, p: P({ ...SEAT, lsx: -1.0, rsx: -1.0, le: -.9, re: -.9, lsz: .2, rsz: .2, hy: sw }), fs: { e: 'happy', b: 'up', m: 'bigsmile' }, prop: 'cutlery' }; }
  if (C === 3) return { pos: V(-30, 0, 0), yaw: 0, p: P({}), fs: { e: 'normal' }, prop: null };
  const sp = ['k1', 'k2', 'k3', 'k4'].find(k => spk(t, T[k], LN[k])); const mo = sp ? talk(t, T[sp], LN[sp]) : 0;
  if (L === 1) { pos = LBED.clone(); yaw = Math.PI / 2; p = P({ pitch: -Math.PI / 2, lift: .47, lsz: .1, rsz: .1 }); fs = { e: 'closed', b: 'flat', m: sp ? 'talk' : 'o', mo: mo * .6, mrest: 'flat' }; if (sp) fs.e = 'meh'; }
  else if (L === 2) { pos = LCH.clone(); yaw = 0; p = P({ ...SEAT, lsx: -1.0, rsx: -1.0, le: -.9, re: -.9, lsz: .2, rsz: .2 }); prop = 'cutlery'; fs = { e: 'happy', b: 'up', m: sp ? 'talk' : 'bigsmile', mo, mrest: 'bigsmile' };
    if (t > T.bell - .2 && t < T.bell + .25) { p.rsx = -1.0; p.re = -.4; p.rsz = -.25; }
    if (t > T.m2) { fs = { e: 'wide', b: 'worried', m: 'o' }; } }
  else if (L === 3) { pos = LD.clone(); yaw = faceTo(LD, MC); p = P({ lsx: -.4, rsx: -.4, lsz: .3, rsz: .3, le: -.8, re: -.8 }); fs = { e: 'wide', b: 'worried', m: sp ? 'talk' : 'wavy', mo, mrest: 'wavy', sw: 1 }; }
  else { pos = LD.clone(); yaw = faceTo(LD, PD) - .6; p = P({ lsz: .15, rsz: .15 }); fs = { e: 'normal', b: 'flat', m: 'flat' };
    if (t > T.k4 - .3) { yaw = faceTo(LD, V(2.5, 0, 2.1)); p = P({ lsx: -.5, rsx: -.5, le: -1.5, re: -1.5, lsz: -.45, rsz: -.45 }); fs = { e: 'narrow', b: 'angry', m: sp ? 'talk' : 'smirk', mo, mrest: 'smirk' }; }
    if (t > T.m4) { fs = { e: 'sus', b: 'flat', m: 'smirk' }; } }
  return { pos, yaw, p, fs, prop };
}
function paiState(t) {
  let pos = V(-20, 0, 0), yaw = -Math.PI / 2, p = P({}), fs = { e: 'normal', b: 'up', m: 'flat' };
  if (t > T.p1 - .4) { pos = PD.clone(); yaw = faceTo(PD, V(.8, 0, 1.2)); p = P({ lsx: -.2, lsz: .3, rsx: -1.4, re: -1.5, rsz: .3 });
    const sp = spk(t, T.p1, LN.p1) ? 'p1' : spk(t, T.p2, LN.p2) ? 'p2' : null; const mo = sp ? talk(t, T[sp], LN[sp]) : 0;
    fs = { e: 'normal', b: 'up', m: sp ? 'talk' : 'flat', mo, mrest: 'flat' };
    if (t > T.k4 + .2) fs = { e: 'wide', b: 'worried', m: sp ? 'talk' : 'o', mo, mrest: 'o' };
    if (t > T.p2) { fs = { e: 'meh', b: 'worried', m: sp ? 'talk' : 'flat', mo, mrest: 'flat' }; p.rsx = -.2; p.re = -.2; } }
  return { pos, yaw, p, fs };
}

// ======================= CAMERAS =======================
function makeShots() {
  const mc = (dist, off = 0, dy = .1) => (lt, t) => { const st = maeState(t); const c = faceCam(mae, st.yaw + off, dist - lt * .04, dy, 46, 0); c.p.add(shake(t, (st.fs.red || 0) * .012)); return c; };
  const kc = (dist, off = 0, dy = .08) => (lt, t) => { const st = kidState(t); return faceCam(kid, st.yaw + off, dist - lt * .04, dy, 46, 0); };
  const pc = (dist, off = 0, dy = .05) => (lt, t) => faceCam(pai, paiState(t).yaw + off, dist - lt * .04, dy, 46, 0);
  const hotelCam = (C) => (lt, t) => C === 1 ? look(V(20.75 - lt * .1, 1.55, .6), V(20.0, .55, -1.3), 52) : C === 2 ? look(V(20.45, 1.55, 1.75 - lt * .15), V(20.6, .95, .2), 50) : look(V(20.4, 1.25, .4 - lt * .2), V(20.0, .65, -1.0), 48);
  SHOTS = [
    { a: 0, b: T.c1, cam: mc(1.8, .5) },
    { a: T.c1, b: T.k1, cam: hotelCam(1) },
    { a: T.k1, b: T.bell - .1, cam: (lt, t) => { const hp = head(kid); return look(hp.clone().add(V(.65, 1.05 - lt * .05, .45)), hp.clone().add(V(.1, -.1, 0)), 50); } },
    { a: T.bell - .1, b: T.m2, cam: (lt, t) => look(V(9.75, 1.35, 1.3 - lt * .08), V(9.85, .95, -.5), 58) },
    { a: T.m2, b: T.c2, cam: mc(1.7, -.4) },
    { a: T.c2, b: T.m3, cam: hotelCam(2) },
    { a: T.m3, b: T.c3, cam: mc(1.6, -.55) },
    { a: T.c3, b: T.k3, cam: hotelCam(3) },
    { a: T.k3, b: T.p1, cam: kc(1.7, -.5) },
    { a: T.p1, b: T.k4, cam: pc(1.7, .35) },
    { a: T.k4, b: T.m4, cam: (lt, t) => look(V(2.2, 1.22, 2.15 - lt * .04), head(kid).add(V(0, -.12, 0)), 54) },
    { a: T.m4, b: T.p2, cam: mc(1.6, .2) },
    { a: T.p2, b: T.end + 1, cam: pc(1.55, .3) },
  ];
}
build();
const shotAt = t => { for (const s of SHOTS) if (t >= s.a && t < s.b) return s; return SHOTS[SHOTS.length - 1]; };
function overlay(t) { const r = maeState(t).fs.red || 0; if (r > .5) vignette(.05 + r * .2, '200,20,10', .35); titleCta(t, DUR, 'Toda mãe:', '"Aqui não é hotel!"', 'Sua mãe também falava isso? 👇'); }

// ======================= RENDER =======================
window.renderAt = function (t) {
  const s = shotAt(t);
  const ks = kidState(t), ps = paiState(t), ms = maeState(t);
  applyState(kid, ks, t, 1); applyState(pai, ps, t, 3); applyState(mae, ms, t, 4);
  scene.updateMatrixWorld(true);
  const L = lvl(t);
  const op = sm(0, .35, t); curtL.position.z = .95 - .35 * op; curtR.position.z = 1.45 + .35 * op; sunbeam.visible = L === 1;
  blanket.visible = L === 1;
  fork.visible = knife.visible = ks.prop === 'cutlery'; if (fork.visible) { atHand(kid, 'L', fork, V(0, .08, 0)); atHand(kid, 'R', knife, V(0, .08, 0)); fork.rotation.set(0, 0, 0); knife.rotation.set(0, 0, 0); }
  bellBtn.position.y = (t > T.bell && t < T.bell + .15) ? .07 : .085;
  towel.visible = ms.prop === 'towel'; towelBed.visible = L !== 3 && t > T.bell; if (towel.visible) { atHand(mae, 'R', towel, V(0, -.2, .03)); towel.rotation.set(0, ms.yaw, Math.sin(t * 40) * .08); }
  drips.forEach((d, i) => { d.visible = towel.visible; if (d.visible) { const f = (t * 1.6 + i / 6) % 1; d.position.copy(towel.position).add(V((i % 3 - 1) * .1, -.25 - f * .9, 0)); } });
  tear.visible = ms.prop === 'tear';
  const C = cut(t); mask.visible = C === 1; swan.visible = C === 3; robe.visible = C === 1 || C === 2;
  if (C === 2) { const u = sm(T.c2 + .15, T.c2 + .55, t); cloche.position.set(u * .55, .77 + u * .25, 0); cloche.rotation.z = -u * .6; } else { cloche.position.set(0, .77, 0); cloche.rotation.z = 0; }
  sparkles.visible = C > 0; if (C) { const at = C === 1 ? V(20.0, .9, -1.3) : C === 2 ? V(20.6, 1.0, .5) : V(20, .7, -1.0); sparkles.position.copy(at); sparkles.children.forEach((m, i) => { m.scale.setScalar(.5 + .5 * Math.abs(Math.sin(t * 6 + i))); m.rotation.y = t * 3 + i; }); }
  napkin.visible = L === 2 || C === 2;
  paiTowelless.visible = false;
  finishRender(s, t, overlay);
};
window.grab = (q = .92) => out.toDataURL('image/jpeg', q);
Object.defineProperty(window, 'INFO', { get() { return { DUR, SHOTS: SHOTS.map(s => [s.a, s.b]), T }; } });
window.ready = true;
