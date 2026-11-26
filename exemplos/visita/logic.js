
// ======================= EXTRA PROPS =======================
const ctable = new THREE.Group(); ctable.position.set(-.35, 0, -.82); S.add(ctable);
mk(BOX(.8, .05, .45), lam('#7a4a2a'), ctable, [0, .36, 0]); for (const [x, z] of [[-.35, -.18], [.35, -.18], [-.35, .18], [.35, .18]]) mk(BOX(.04, .36, .04), lam('#5a3418'), ctable, [x, .18, z]);
mk(new THREE.CylinderGeometry(.17, .17, .015, 14), lam('#f4f4f4'), ctable, [.12, .39, 0]);
const cake = new THREE.Group(); cake.position.set(.12, .4, 0); ctable.add(cake);
{ const g = new THREE.CylinderGeometry(.13, .13, .1, 14, 1, false, 0, Math.PI * 2 * 5 / 8); mk(g, lam('#5a2e16'), cake, [0, .05, 0]); const tp = new THREE.CylinderGeometry(.132, .132, .02, 14, 1, false, 0, Math.PI * 2 * 5 / 8); mk(tp, lam('#f4e8d8'), cake, [0, .11, 0]); mk(new THREE.SphereGeometry(.02, 6, 5), lam('#d01a2a'), cake, [.04, .13, .05]); }
const cups = [0, 1].map(i => { const c = mk(new THREE.CylinderGeometry(.035, .03, .06, 8), lam('#f4f4f4'), ctable, [-.22 + i * .12, .42, .08 - i * .1]); return c; });
const slice = new THREE.Group(); scene.add(slice); mk(BOX(.06, .08, .1), lam('#5a2e16'), slice, [0, 0, 0]); mk(BOX(.062, .02, .102), lam('#f4e8d8'), slice, [0, .05, 0]);
const umb = new THREE.Group(); scene.add(umb); mk(new THREE.CylinderGeometry(.012, .012, .55, 6), lam('#3a2a20'), umb, [0, 0, 0]);
mk(new THREE.ConeGeometry(.06, .42, 8), lam('#e8407a'), umb, [0, .06, 0], [Math.PI, 0, 0]); mk(new THREE.TorusGeometry(.04, .01, 5, 8, Math.PI), lam('#3a2a20'), umb, [.04, -.28, 0], [0, 0, Math.PI]);

// ======================= LIGHTS (day) =======================
const hemi = new THREE.HemisphereLight('#d8ecff', '#7a6a50', 1.0); scene.add(hemi);
const sun = new THREE.DirectionalLight('#fff2d8', 1.6); sun.position.set(3, 6, 8); sun.castShadow = true; sun.shadow.mapSize.set(1024, 1024); { const c = sun.shadow.camera; c.left = -6; c.right = 6; c.top = 6; c.bottom = -6; c.near = .5; c.far = 25; } scene.add(sun);
const roomL = new THREE.PointLight('#ffe2b8', 1.5, 6, 1.4); roomL.position.set(0, 2.3, -.3); scene.add(roomL);
const roomL2 = new THREE.PointLight('#ffe2b8', .8, 4, 1.4); roomL2.position.set(.6, 2.0, 1.0); scene.add(roomL2);
const porchL = new THREE.PointLight('#fff0d0', .8, 4, 1.4); porchL.position.set(.65, 2.2, ZF + .6); scene.add(porchL);
const fillL = new THREE.PointLight('#ffffff', .5, 2.5, 1.2); scene.add(fillL);
scene.background = new THREE.Color('#8ac4ff');

// ======================= SCHEDULE =======================
const LN = __LN__;
let T, SHOTS, DUR;
function build() {
  T = {}; T.clack = .05; T.snap = .32; T.m1 = .42; T.kf = T.m1 + LN.m1 + .1; T.m2 = T.kf + .9;
  T.k1 = T.m2 + LN.m2 + .15; T.m3 = T.k1 + LN.k1 + .15; T.k2 = T.m3 + LN.m3 + .15; T.m4 = T.k2 + LN.k2 + .15;
  T.knock = T.m4 + LN.m4 + .05; T.sweet = T.knock + .32; T.open = T.knock + 1.0; T.t1 = T.open + .45;
  T.m5 = T.t1 + LN.t1 + .15; T.bring = T.m5 + LN.m5 + .1; T.hand = T.bring + .8; T.t2 = T.hand + .15; T.m6 = T.t2 + LN.t2 + .1;
  T.bye = T.m6 + LN.m6 + .15; T.m0 = T.bye + .15; T.close = T.m0 + LN.m0 - .35; T.end = T.close + .55; DUR = T.end;
  makeShots();
}
const talk = (t, a, d) => (t > a && t < a + d) ? clamp(Math.abs(Math.sin((t - a) * 13)) * 1.1 - .1, 0, 1) : 0;
const spk = (t, a, d) => t > a - .03 && t < a + d;
const angry = t => t > T.snap && t < T.sweet;
const rage = t => angry(t) ? clamp(.45 + (t - T.snap) / (T.knock - T.snap) * .5, 0, .95) : 0;

// ======================= CHARACTER STATES =======================
const SEAT = { lift: -.19, lhx: -1.5, rhx: -1.5, lk: 1.45, rk: 1.45 };
const LUC = V(-.35, 0, -1.48), MS = V(.6, 0, -.3), MDIN = V(.65, 0, 1.28), MDOOR = V(.55, 0, 1.08), TDOOR = V(.78, 0, 1.95), TASIDE = V(1.0, 0, 1.85);
const faceTo = (from, to) => Math.atan2(to.x - from.x, to.z - from.z);
const AKIMBO = { lsx: -.15, lsz: .85, le: -1.9, rsx: -.15, rsz: .85, re: -1.9 };
function maeState(t) {
  let pos = MDIN.clone(), yaw = Math.PI, p = P({}), fs = { e: 'happy', b: 'up', m: 'bigsmile' };
  if (t < T.kf) {
    p = P({ lean: -.06, lsz: .12, rsz: .12, hx: .05 });
    if (t > T.snap) { const u = sm(T.snap, T.snap + .12, t); p = P({ lean: .08 * u, ...AKIMBO, hx: -.05 }); fs = { e: 'narrow', b: 'angry', m: spk(t, T.m1, LN.m1) ? 'talk' : 'grit', mo: Math.max(.6, talk(t, T.m1, LN.m1)), mrest: 'grit', red: rage(t) }; }
  } else if (t < T.open) {
    pos = MS.clone(); yaw = faceTo(MS, LUC);
    p = P({ ...AKIMBO, lean: .1, hx: .08 });
    const sp = ['m2', 'm3', 'm4'].find(k => spk(t, T[k], LN[k]));
    fs = { e: 'narrow', b: 'angry', m: sp ? 'talk' : 'grit', mo: sp ? talk(t, T[sp], LN[sp]) : 0, mrest: 'grit', red: rage(t), vein: t > T.m3 ? 1 : 0, sw: t > T.m4 ? 1 : 0 };
    if (spk(t, T.m2, LN.m2)) { p.rsz = .1; p.rsx = -1.1; p.re = -.15; p.rsy = -.4; }
    if (t > T.m4 && t < T.knock) { p.lean = .2; p.hx = .12; }
    if (t > T.knock && t < T.sweet) { fs.m = 'grit'; p.hy = .3 * sm(T.knock, T.knock + .15, t); }
    if (t >= T.sweet) { p = P({ lsx: -2.5, lsz: .2, le: -1.4, rsz: .12, hy: 0 }); fs = { e: 'happy', b: 'up', m: 'bigsmile', red: 0 }; }
  } else if (t < T.bye + .1) {
    pos = MDOOR.clone(); yaw = 0; p = P({ rsx: -.35, re: -.9, lsz: .12 }); fs = { e: 'happy', b: 'up', m: 'bigsmile' };
    if (t < T.t1 + .2) p = P({ lsx: -1.1, le: -.3, lsy: -.3, rsz: .12 }); // holding door
    if (spk(t, T.m5, LN.m5)) fs = { e: 'happy', b: 'up', m: 'talk', mo: talk(t, T.m5, LN.m5), mrest: 'bigsmile' };
    if (t > T.m5 + LN.m5 * .45 && t < T.bring) { p.yaw; p.hy = -.4 * sm(T.m5 + LN.m5 * .45, T.m5 + LN.m5 * .45 + .2, t); }
    
    if (t > T.m6 - .1) { const u = sm(T.m6 - .1, T.m6 + .1, t); const sq = Math.sin(t * 30) * .05; p = P({ lsx: -.75 * u, rsx: -.75 * u, le: -1.0 * u, re: -1.0 * u, lsz: -.15 * u + sq, rsz: -.15 * u + sq, lean: .08 * u }); fs = { e: 'happy', b: 'up', m: spk(t, T.m6, LN.m6) ? 'talk' : 'bigsmile', mo: talk(t, T.m6, LN.m6), mrest: 'bigsmile' }; }
  } else {
    pos = MDOOR.clone(); yaw = .25; const w = Math.sin((t - T.bye) * 11);
    p = P({ rsx: -2.6, rsz: .35 + .3 * w, re: -.3, lsx: -1.0, le: -.4, lsy: -.3 }); fs = { e: 'happy', b: 'up', m: spk(t, T.m0, LN.m0) ? 'talk' : 'bigsmile', mo: talk(t, T.m0, LN.m0), mrest: 'bigsmile' };
  }
  return { pos, yaw, p, fs };
}
function kidState(t) {
  let pos = LUC.clone(), yaw = 0, p = P({ ...SEAT }), fs = { e: 'normal', b: 'flat', m: 'tight' }, puff = 1.12, prop = 'slice';
  if (t < T.bring - .05) {
    p = P({ ...SEAT, rsx: -1.25, re: -1.7, rsz: -.15, lsz: .25, hy: .12 });
    fs = { e: 'wide', b: 'up', m: 'tight', sw: 1, lx: .3 };
    if (spk(t, T.k1, LN.k1)) fs = { e: 'normal', b: 'worried', m: 'talk', mo: talk(t, T.k1, LN.k1) * .6, mrest: 'tight', sw: 1 };
    if (t > T.k1 + LN.k1) puff = 1.0;
    if (spk(t, T.k2, LN.k2)) { fs = { e: 'normal', b: 'up', m: 'talk', mo: talk(t, T.k2, LN.k2), mrest: 'smallsmile' }; p.rsx = -.4; p.re = -.9; }
    if (t > T.k2 + LN.k2) fs = { e: 'normal', b: 'flat', m: 'smallsmile' };
    if (t > T.kf + 2 && t < T.k1 - .05 || t > T.m3 - .05 && t < T.k2) { }
  } else if (t < T.bye + .3) {
    const u = sm(T.bring - .05, T.bring + .55, t); pos = u < .6 ? V(lerp(-.6, .3, u / .6), 0, lerp(.6, 1.36, u / .6)) : V(lerp(.3, .7, (u - .6) / .4), 0, 1.36); yaw = u < .6 ? .85 : (u < 1 ? 1.2 : .25); puff = 1;
    p = u < 1 ? gait(t * 13, 1.2) : P({}); p.rsx = -1.4; p.re = -.2; prop = t < T.hand ? 'umb' : null; fs = { e: 'happy', b: 'up', m: 'bigsmile' };
    if (t > T.hand) p = P({});
    if (t > T.m6 - .1) { yaw = 0; p = P({ lsz: .3, rsz: .3, lift: -.03 }); fs = { e: 'squeeze', b: 'worried', m: 'wavy' }; puff = .84; }
  } else { pos = V(-9, 0, 0); }
  return { pos, yaw, p, fs, puff, prop };
}
function tiaState(t) {
  let pos = V(-9, 0, 0), yaw = Math.PI, p = P({}), fs = { e: 'normal', b: 'up', m: 'smallsmile' }, prop = null;
  if (t >= T.open && t < T.bye) {
    pos = t < T.m5 ? TDOOR.clone() : TASIDE.clone(); if (t > T.m6) pos.lerp(V(1.45, 0, 2.2), sm(T.m6, T.m6 + .25, t)); yaw = faceTo(pos, MDOOR);
    p = P({ lsx: -.3, le: -.6, rsz: .12 }); fs = { e: 'normal', b: 'worried', m: 'smallsmile' };
    if (spk(t, T.t1, LN.t1)) { fs = { e: 'happy', b: 'up', m: 'talk', mo: talk(t, T.t1, LN.t1), mrest: 'smile' }; p.rsx = -1.0; p.re = -1.3; p.rsz = -.2; }
    if (t > T.hand - .2) { p.rsx = -1.3; p.re = -.3; }
    if (t > T.hand) { prop = 'umb'; fs = { e: 'happy', b: 'up', m: spk(t, T.t2, LN.t2) ? 'talk' : 'smile', mo: talk(t, T.t2, LN.t2), mrest: 'smile' }; }
  } else if (t >= T.bye) {
    const u = sm(T.bye, T.bye + 1.4, t); pos = V(lerp(1.12, 2.6, u), 0, lerp(1.9, 2.8, u)); yaw = 1.2; p = gait(t * 9); prop = 'umb'; fs = { e: 'happy', b: 'up', m: 'smile' };
  }
  return { pos, yaw, p, fs, prop };
}

// ======================= APPLY =======================
const BLINKABLE = ['normal', 'wide', 'narrow'];
function applyState(h, st, t, seed) { const p = st.p; p.bob += Math.sin(t * 2.3 + seed) * .004;
  h.root.position.copy(st.pos); h.root.rotation.set(0, st.yaw, 0); h.pose(p); const fs = { ...st.fs }; if (BLINKABLE.includes(fs.e || 'normal') && ((t + seed * 1.37) % 3.3) < .12) fs.e = 'closed'; h.face.set(fs); h.setRed(fs.red || 0); }
