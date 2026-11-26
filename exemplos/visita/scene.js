// ======================= SET: house, yard, street =======================
const T_woodF = ctex(64, 64, (g, w, h) => { g.fillStyle = '#9a6a42'; g.fillRect(0, 0, w, h); for (let y = 0; y < h; y += 16) { g.fillStyle = 'rgba(40,20,5,.4)'; g.fillRect(0, y, w, 1); g.fillRect((y / 16 % 2) * 24, y, 1, 16); } }, [8, 6]);
const T_wallIn = ctex(64, 64, (g, w, h) => speckle(g, w, h, '#f2e6cc', .08), [5, 2]);
const T_wallOut = ctex(64, 64, (g, w, h) => speckle(g, w, h, '#e8c890', .14), [5, 2]);
const T_grass = ctex(64, 64, (g, w, h) => speckle(g, w, h, '#4a8a3a', .3), [8, 6]);
const T_asph = ctex(64, 64, (g, w, h) => speckle(g, w, h, '#3a3a40', .25), [10, 4]);
const T_side = ctex(64, 64, (g, w, h) => { speckle(g, w, h, '#a8a49a', .15); g.fillStyle = 'rgba(0,0,0,.3)'; for (let x = 0; x < w; x += 16) g.fillRect(x, 0, 1, h); }, [12, 1]);
const S = new THREE.Group(); scene.add(S);
const ZF = 1.5; // front wall
{ const wi = lam('#ffffff', T_wallIn), wo = lam('#ffffff', T_wallOut);
  mk(new THREE.PlaneGeometry(5, 3.5), lam('#ffffff', T_woodF), S, [0, 0, -.25], [-Math.PI / 2, 0, 0], false, true);
  mk(new THREE.PlaneGeometry(5, 3.5), lam('#f4efe6'), S, [0, 2.6, -.25], [Math.PI / 2, 0, 0], false, false);
  mk(BOX(5, 2.6, .1), wi, S, [0, 1.3, -2.0], [0, 0, 0], false); mk(BOX(.1, 2.6, 3.5), wi, S, [-2.5, 1.3, -.25], [0, 0, 0], false); mk(BOX(.1, 2.6, 3.5), wi, S, [2.5, 1.3, -.25], [0, 0, 0], false);
  // front wall with window (x -1.4..-.6, y .9..1.7) and door (x .2..1.1, h 2.0)
  const fw = (x0, x1, y0, y1) => { mk(BOX(x1 - x0, y1 - y0, .12), wi, S, [(x0 + x1) / 2, (y0 + y1) / 2, ZF - .03], [0, 0, 0], false); mk(BOX(x1 - x0, y1 - y0, .02), wo, S, [(x0 + x1) / 2, (y0 + y1) / 2, ZF + .04], [0, 0, 0], false); };
  fw(-2.55, -1.4, 0, 2.6); fw(-1.4, -.6, 0, .9); fw(-1.4, -.6, 1.7, 2.6); fw(-.6, .2, 0, 2.6); fw(.2, 1.1, 2.0, 2.6); fw(1.1, 2.55, 0, 2.6);
  mk(BOX(5.3, .25, 1.0), lam('#a8463a'), S, [0, 2.72, ZF + .3], [.25, 0, 0]); // roof edge
  for (const x of [-1.4, -.6]) mk(BOX(.06, .86, .16), lam('#f4f4f4'), S, [x, 1.3, ZF]); for (const y of [.9, 1.7]) mk(BOX(.86, .06, .16), lam('#f4f4f4'), S, [-1.0, y, ZF]);
  for (const x of [.2, 1.1]) mk(BOX(.06, 2.03, .16), lam('#f4f4f4'), S, [x, 1.0, ZF]); mk(BOX(.96, .06, .16), lam('#f4f4f4'), S, [.65, 2.02, ZF]); }
const glass = mk(new THREE.PlaneGeometry(.8, .8), new THREE.MeshLambertMaterial({ color: '#a8c8e8', transparent: true, opacity: .18 }), S, [-1.0, 1.3, ZF + .02], [0, 0, 0], false, false);
// curtain (inside), slides closed
const curtL = mk(BOX(.42, .86, .02), lam('#c84a4a'), S, [-1.6, 1.3, ZF - .12], [0, 0, 0], false); const curtR = mk(BOX(.42, .86, .02), lam('#c84a4a'), S, [-.4, 1.3, ZF - .12], [0, 0, 0], false);
// door (hinge at x .2, opens inward)
const door = new THREE.Group(); door.position.set(.2, 0, ZF - .04); S.add(door); mk(BOX(.9, 1.98, .05), lam('#8a4a26'), door, [.45, .99, 0]); mk(new THREE.SphereGeometry(.03, 6, 5), lam('#e8c84a'), door, [.8, 1.0, -.04]); mk(new THREE.SphereGeometry(.03, 6, 5), lam('#e8c84a'), door, [.8, 1.0, .04]);
// cobweb on the door frame corner
const web = new THREE.Group(); web.position.set(.25, 1.95, ZF - .1); S.add(web); { const wm = new THREE.MeshBasicMaterial({ color: '#f4f4f4', transparent: true, opacity: .75 }); for (let i = 0; i < 5; i++) { const a = -Math.PI / 2 + i * Math.PI / 8; mk(BOX(.004, .32, .004), wm, web, [Math.cos(a) * .16, Math.sin(a) * .16, 0], [0, 0, a + Math.PI / 2], false, false); } for (const r of [.08, .16, .24]) mk(new THREE.TorusGeometry(r, .003, 3, 10, Math.PI / 2), wm, web, [0, 0, 0], [0, 0, -Math.PI / 2], false, false); }
// living room furniture: sofa, armchair, rug, lamp, tv
mk(BOX(1.8, .42, .62), lam('#4a6a8a'), S, [-.6, .21, -1.62]); mk(BOX(1.8, .5, .16), lam('#3f5a78'), S, [-.6, .67, -1.88]); for (const x of [-1.55, .35]) mk(BOX(.16, .6, .62), lam('#3f5a78'), S, [x, .3, -1.62]);
mk(BOX(.7, .42, .66), lam('#8a5a3a'), S, [1.55, .21, -1.3]); mk(BOX(.7, .55, .14), lam('#7a4a2a'), S, [1.55, .7, -1.6]);
mk(BOX(2.0, .01, 1.3), lam('#c86a3a'), S, [-.2, .005, -.5], [0, 0, 0], false, true);
mk(BOX(.9, .5, .08), lam('#111'), S, [-2.42, 1.3, -.4], [0, Math.PI / 2, 0]); mk(BOX(.2, .55, .4), lam('#5a3a22'), S, [-2.35, .28, -.4]);
for (const [x, c] of [[-1.3, '#d6302f'], [.4, '#2f9a6a']]) { mk(BOX(.42, .52, .03), lam('#7a4a2a'), S, [x, 1.75, -1.94]); mk(BOX(.34, .44, .01), lam(c), S, [x, 1.75, -1.92]); }
const ceilLamp = mk(new THREE.SphereGeometry(.16, 10, 6, 0, 7, 0, Math.PI / 2), lam('#fff4d8', null, { emissive: '#ffd890', emissiveIntensity: .9 }), S, [0, 2.6, -.3], [Math.PI, 0, 0], false, false);
// yard, fence + gate, sidewalk, street
mk(new THREE.PlaneGeometry(8, 3.5), lam('#ffffff', T_grass), S, [0, 0, ZF + 1.75], [-Math.PI / 2, 0, 0], false, true);
mk(BOX(1.0, .02, 3.5), lam('#b8b0a0'), S, [.65, .01, ZF + 1.75], [0, 0, 0], false, true);
mk(new THREE.PlaneGeometry(16, 1.2), lam('#ffffff', T_side), S, [0, .02, 5.6], [-Math.PI / 2, 0, 0], false, true);
mk(new THREE.PlaneGeometry(16, 4), lam('#ffffff', T_asph), S, [0, .01, 8.2], [-Math.PI / 2, 0, 0], false, true);
for (let x = -7; x < 8; x += 1.6) mk(BOX(.8, .005, .1), lam('#e8e0a0'), S, [x, .02, 8.2], [0, 0, 0], false, false);
const fence = lam('#f0e8d8'); mk(BOX(4.2, .9, .12), fence, S, [-1.9, .45, 5.0]); mk(BOX(2.8, .9, .12), fence, S, [2.6, .45, 5.0]); for (const x of [.15, 1.15]) mk(BOX(.16, 1.15, .16), lam('#d8d0c0'), S, [x, .57, 5.0]);
const gate = new THREE.Group(); gate.position.set(.25, 0, 5.0); S.add(gate); { const gm = lam('#2a2a2e'); mk(BOX(.86, .05, .04), gm, gate, [.43, .85, 0]); mk(BOX(.86, .05, .04), gm, gate, [.43, .1, 0]); for (let i = 0; i < 9; i++) mk(BOX(.025, .8, .025), gm, gate, [.04 + i * .1, .48, 0]); }
// streetlight
mk(new THREE.CylinderGeometry(.05, .07, 3.2, 6), lam('#3a3a40'), S, [2.6, 1.6, 5.5]); mk(BOX(.08, .08, .8), lam('#3a3a40'), S, [2.6, 3.15, 5.85]);
const bulb = mk(BOX(.22, .06, .3), lam('#fff2c0', null, { emissive: '#ffd070', emissiveIntensity: 1.2 }), S, [2.6, 3.1, 6.2], [0, 0, 0], false, false);
// neighbour house (left)
mk(BOX(3.6, 2.6, 3.4), lam('#ffffff', T_wallOut), S, [-4.75, 1.3, .1]); mk(BOX(3.9, .25, 3.8), lam('#5a6a8a'), S, [-4.75, 2.7, .1]);
const nWin = mk(BOX(.8, .7, .04), lam('#ffe6a0', null, { emissive: '#ffc860', emissiveIntensity: 1.0 }), S, [-4.3, 1.4, 1.82], [0, 0, 0], false, false);
mk(BOX(.8, 1.9, .04), lam('#6a3a20'), S, [-5.6, .95, 1.82]);
// car on the street, facing +x
const CAR = V(-.6, 0, 6.65);
const car = new THREE.Group(); car.position.copy(CAR); S.add(car);
{ const red = lam('#c83a3a'), dark = lam('#1a1a1e');
  mk(BOX(2.3, .42, 1.05), red, car, [0, .44, 0]); mk(BOX(2.32, .1, 1.07), lam('#9a2a2a'), car, [0, .26, 0]);
  mk(BOX(1.2, .06, .98), red, car, [-.15, 1.33, 0]); for (const [x, z] of [[-.72, -.47], [.4, -.47], [-.72, .47], [.4, .47]]) mk(BOX(.06, .68, .05), red, car, [x, .99, z]);
  for (const [x, z] of [[-.72, -.53], [.72, -.53], [-.72, .53], [.72, .53]]) mk(new THREE.CylinderGeometry(.19, .19, .14, 10), dark, car, [x, .19, z], [Math.PI / 2, 0, 0]);
  mk(BOX(.04, .66, .9), new THREE.MeshLambertMaterial({ color: '#203040', transparent: true, opacity: .45 }), car, [.4, .98, 0], [0, 0, 0], false, false);
  mk(BOX(.04, .62, .9), new THREE.MeshLambertMaterial({ color: '#203040', transparent: true, opacity: .45 }), car, [-.72, .98, 0], [0, 0, 0], false, false);
  mk(BOX(1.06, .62, .02), new THREE.MeshLambertMaterial({ color: '#203040', transparent: true, opacity: .45 }), car, [-.16, .98, .47], [0, 0, 0], false, false);
  mk(new THREE.TorusGeometry(.12, .02, 5, 12), dark, car, [.38, .8, -.2], [0, Math.PI / 2, .4]); }
const carGlassBack = mk(BOX(.5, .62, .02), new THREE.MeshLambertMaterial({ color: '#203040', transparent: true, opacity: .45 }), car, [-.45, .98, -.47], [0, 0, 0], false, false);
const carGlass = mk(BOX(.52, .62, .02), new THREE.MeshLambertMaterial({ color: '#203040', transparent: true, opacity: .45 }), car, [.1, .98, -.47], [0, 0, 0], false, false);
const heads = [-1, 1].map(s => mk(BOX(.04, .12, .2), lam('#f4f4e0', null, { emissive: '#000000' }), car, [1.16, .5, s * .32], [0, 0, 0], false, false));
// props
const purse = mk(BOX(.2, .16, .08), lam('#d8306a'), scene, [0, 0, 0]); const tphone = mk(BOX(.08, .15, .012), lam('#1a1a1e'), scene, [0, 0, 0]); mk(new THREE.PlaneGeometry(.07, .13), new THREE.MeshBasicMaterial({ color: '#8ad0ff' }), tphone, [0, 0, .007], [0, 0, 0], false, false);
const brush = new THREE.Group(); scene.add(brush); mk(BOX(.02, .02, .17), lam('#40a0e8'), brush, [0, 0, .06]); mk(BOX(.03, .03, .03), new THREE.MeshBasicMaterial({ color: '#ffffff' }), brush, [0, .015, .14], [0, 0, 0], false, false);
const mugs = [0, 1].map(i => { const g = new THREE.Group(); scene.add(g); mk(new THREE.CylinderGeometry(.045, .04, .1, 8), lam(i ? '#f2f2f2' : '#e8c84a'), g, [0, 0, 0]); mk(new THREE.TorusGeometry(.025, .008, 4, 8), lam(i ? '#f2f2f2' : '#e8c84a'), g, [.05, 0, 0]); return g; });
const bag = mk(BOX(.26, .32, .12), lam('#e8a030'), kid.torso, [0, .2, -.14]);
const robe = (h, col, sw) => { const g = new THREE.Group(); h.torso.add(g); mk(new THREE.CylinderGeometry(sw * 1.05, sw * 1.2, .5, 9), lam(col), g, [0, .25, 0]).scale.z = .8; const sk = new THREE.CylinderGeometry(sw * 1.2, sw * 1.55, .55, 9); sk.translate(0, -.3, 0); mk(sk, lam(col), g, [0, 0, 0]).scale.z = .85; mk(new THREE.TorusGeometry(sw * 1.15, .025, 4, 10), lam('#f4f4f4'), g, [0, .02, 0], [Math.PI / 2, 0, 0]); return g; };
const robeM = robe(mae, '#e88ab0', .17), robeT = robe(tia, '#f4f4f4', .19);
