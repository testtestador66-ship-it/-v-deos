function kidHair(head, c, M) { const m = M('#1a1210'); mk(new THREE.SphereGeometry(c.hr * 1.07, 14, 9, 0, Math.PI * 2, 0, Math.PI * .5), m, head, [0, c.hr * .95, -.01], [-.25, 0, 0]); for (let i = 0; i < 5; i++) mk(new THREE.SphereGeometry(c.hr * .3, 7, 5), m, head, [(i - 2) * c.hr * .32, c.hr * 1.45 - Math.abs(i - 2) * .015, c.hr * .82]).scale.set(1, .7, .6); }

// ======================= CHARACTERS =======================
const face = (skin, hair, extra = {}) => ({ skin, hair, hairTop: .2, hairBack: .62, eyeY: .54, eyeDX: 27, browDY: 27, mouthY: .7, ew: 15, eh: 18, pr: 10, iris: '#4a2a12', line: '#1a0d06', browC: hair, bw: 14, bt: 6, ...extra });
const kid = makeHuman({ skin: '#c98a5a', shirt: '#d6302f', collar: '#a01a1a', pants: '#2f4f8a', shoes: '#f4f4f4', socks: '#f4f4f4', shorts: true, hipY: .64, sw: .15, d: 1, th: .4, hr: .26, hs: 1, ar: .05, ua: .22, fa: .2, lr: .055, tl: .31, sl: .3, face: face('#c98a5a', '#1a1210'), hairFn: kidHair });
const adult = (o) => ({ hipY: .86, sw: .19, d: 1.0, th: .54, hr: .21, hs: 1.15, ar: .055, ua: .28, fa: .25, lr: .062, tl: .43, sl: .41, ...o });
const mae = makeHuman(adult({ skin: '#e8b48a', shirt: '#2f9a6a', sleeveCol: '#e8b48a', pants: '#e8b48a', shoes: '#e85a8a', socks: '#e8b48a', shorts: true, sw: .17, hr: .2,
  face: face('#e8b48a', '#4a2a18', { ew: 13, eh: 15, pr: 9, browDY: 24, mouthY: .72, lash: true, lip: '#c84a5a', bt: 5 }),
  hairFn(head, c, M) { const m = M('#4a2a18'); mk(new THREE.SphereGeometry(c.hr * 1.09, 14, 9, 0, Math.PI * 2, 0, Math.PI * .55), m, head, [0, c.hr * .95, -.02], [-.2, 0, 0]); mk(new THREE.SphereGeometry(c.hr * .5, 9, 7), m, head, [0, c.hr * 1.55, -c.hr * .85]); for (let i = 0; i < 5; i++) mk(new THREE.SphereGeometry(c.hr * .3, 7, 5), m, head, [(i - 2) * c.hr * .3, c.hr * 1.45, c.hr * .82]).scale.set(1, .65, .55); },
  extraTorso(torso, c, M) { const sk = new THREE.CylinderGeometry(c.sw * 1.1, c.sw * 1.8, .5, 10); sk.translate(0, -.22, 0); mk(sk, M('#2f9a6a'), torso, [0, 0, 0]); mk(BOX(c.sw * 1.4, .28, .02), M('#f4f4f4'), torso, [0, .05, c.sw * .74]); } }));
const pai = makeHuman(adult({ skin: '#d8a070', shirt: '#3f74c8', collar: '#2f5aa8', pants: '#3a3a44', shoes: '#3a2a20', socks: '#222', sw: .21,
  face: face('#d8a070', '#2a1a10', { eyeY: .52, ew: 13, eh: 14, pr: 8, browDY: 22, mouthY: .72, bt: 8, stubble: true }),
  hairFn(head, c, M) { const m = M('#2a1a10'); mk(new THREE.SphereGeometry(c.hr * 1.06, 14, 9, 0, Math.PI * 2, 0, Math.PI * .4), m, head, [0, c.hr * .95, -.03], [-.35, 0, 0]); mk(BOX(c.hr * .7, c.hr * .09, c.hr * .15), m, head, [0, c.hr * .7, c.hr * .92]); },
  extraTorso(torso, c, M) { mk(new THREE.SphereGeometry(c.sw * 1.05, 10, 8), M('#3f74c8'), torso, [0, c.th * .3, .03]).scale.set(1, .9, .85); } }));
for (const h of [kid, mae, pai]) scene.add(h.root);


// ======================= COMMON SET / HELPERS =======================
const T_woodR = ctex(64, 64, (g, w, h) => { g.fillStyle = '#9a6a42'; g.fillRect(0, 0, w, h); for (let y = 0; y < h; y += 16) { g.fillStyle = 'rgba(40,20,5,.4)'; g.fillRect(0, y, w, 1); g.fillRect((y / 16 % 2) * 24, y, 1, 16); } }, [8, 8]);
const T_tile = ctex(64, 64, (g, w, h) => { speckle(g, w, h, '#e8e0d0', .08); g.fillStyle = 'rgba(0,0,0,.18)'; for (let x = 0; x < w; x += 16) { g.fillRect(x, 0, 1, h); g.fillRect(0, x, w, 1); } }, [10, 10]);
const T_tileB = ctex(64, 64, (g, w, h) => { speckle(g, w, h, '#bfe0e8', .06); g.fillStyle = 'rgba(0,0,0,.15)'; for (let x = 0; x < w; x += 16) { g.fillRect(x, 0, 1, h); g.fillRect(0, x, w, 1); } }, [8, 4]);
const wallT = c => ctex(64, 64, (g, w, h) => speckle(g, w, h, c, .08), [5, 2]);
const S = new THREE.Group(); scene.add(S);
// room centred at cx, 4.4 x 4.4; sides: {left:'wall'|'door'|'none', right:...}
function room(cx, wallTex, floorTex, o = {}) {
  const L = o.left || 'wall', R = o.right || 'wall';
  mk(new THREE.PlaneGeometry(4.4, 4.4), lam('#ffffff', floorTex), S, [cx, 0, 0], [-Math.PI / 2, 0, 0], false, true);
  const wm = lam('#ffffff', wallTex);
  mk(BOX(4.4, 2.6, .1), wm, S, [cx, 1.3, -2.2], [0, 0, 0], false); mk(BOX(4.4, 2.6, .1), wm, S, [cx, 1.3, 2.25], [0, 0, 0], false);
  mk(BOX(4.6, .1, 4.6), lam('#f4efe6'), S, [cx, 2.65, 0], [0, 0, 0], false); mk(BOX(4.4, .1, .03), lam('#f4f4f4'), S, [cx, .05, -2.14], [0, 0, 0], false);
  for (const [side, x] of [[L, cx - 2.2], [R, cx + 2.2]]) {
    if (side === 'wall') mk(BOX(.1, 2.6, 4.4), wm, S, [x, 1.3, 0], [0, 0, 0], false);
    if (side === 'door') { mk(BOX(.1, 2.6, 2.75), wm, S, [x, 1.3, -.825], [0, 0, 0], false); mk(BOX(.1, 2.6, .75), wm, S, [x, 1.3, 1.825], [0, 0, 0], false); mk(BOX(.1, .6, .9), wm, S, [x, 2.3, 1.0], [0, 0, 0], false); for (const z of [.55, 1.45]) mk(BOX(.16, 2.03, .06), lam('#f4f4f4'), S, [x, 1.0, z]); }
  }
}
const faceTo = (from, to) => Math.atan2(to.x - from.x, to.z - from.z);
const talk = (t, a, d) => (t > a && t < a + d) ? clamp(Math.abs(Math.sin((t - a) * 13)) * 1.1 - .1, 0, 1) : 0;
const spk = (t, a, d) => t > a - .03 && t < a + d;
const SEAT = { lift: -.19, lhx: -1.5, rhx: -1.5, lk: 1.45, rk: 1.45 };
const ASEAT = { lift: -.4, lhx: -1.5, rhx: -1.5, lk: 1.45, rk: 1.45 };
const AKIMBO = { lsx: -.15, lsz: .85, le: -1.9, rsx: -.15, rsz: .85, re: -1.9 };
const BLINKABLE = ['normal', 'wide', 'narrow', 'meh'];
function applyState(h, st, t, seed) { const p = st.p; p.bob += Math.sin(t * 2.3 + seed) * .004; h.root.position.copy(st.pos); h.root.rotation.set(0, st.yaw, 0); h.pose(p); const fs = { ...st.fs }; if (BLINKABLE.includes(fs.e || 'normal') && ((t + seed * 1.37) % 3.3) < .12) fs.e = 'closed'; h.face.set(fs); h.setRed(fs.red || 0); }
const look = (p, l, fov = 50) => ({ p, l, fov });
const head = h => h.headMesh.getWorldPosition(new THREE.Vector3());
function faceCam(h, yawOf, dist, dy = .03, fov = 46, side = 0) { const hp = head(h); const d = V(Math.sin(yawOf), 0, Math.cos(yawOf)); const s = V(Math.cos(yawOf), 0, -Math.sin(yawOf)); return look(hp.clone().add(d.multiplyScalar(dist)).add(V(0, dy, 0)).add(s.multiplyScalar(side)), hp.clone().add(V(0, -.1, 0)), fov); }
const shake = (t, k) => V(nz(t * 2.1, 1) * k, nz(t * 2.3, 5) * k, 0);
const atHand = (h, side, obj, off = V(0, 0, 0)) => { const hand = side === 'R' ? h.handR : h.handL; hand.getWorldPosition(obj.position); obj.position.add(off); };
function vignette(strength, col = '0,0,0', r0 = .3) { const g = ctx.createRadialGradient(W / 2, H / 2, H * r0, W / 2, H / 2, H * .72); g.addColorStop(0, `rgba(${col},0)`); g.addColorStop(1, `rgba(${col},${strength})`); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); }
function outlined(txt, x, y, size, fill = '#fff', stroke = '#111', lw = 12) { ctx.font = `900 ${size}px Inter`; ctx.lineJoin = 'round'; ctx.strokeStyle = stroke; ctx.lineWidth = lw; ctx.strokeText(txt, x, y); ctx.fillStyle = fill; ctx.fillText(txt, x, y); }
function titleCta(t, DUR, l1, l2, cta) { ctx.textAlign = 'center'; outlined(l1, W / 2, 120, 64, '#ffe14a', '#111', 13); outlined(l2, W / 2, 194, 64, '#ffe14a', '#111', 13);
  if (t > DUR - 2.0) { const k = clamp((t - (DUR - 2.0)) / .2, 0, 1); ctx.globalAlpha = k; ctx.fillStyle = 'rgba(10,10,14,.78)'; ctx.beginPath(); ctx.roundRect(W / 2 - 480, H * .885 - 60, 960, 120, 30); ctx.fill(); ctx.font = '900 46px Inter'; ctx.fillStyle = '#fff'; ctx.fillText(cta, W / 2, H * .885 + 16); ctx.globalAlpha = 1; } }
const fillL = new THREE.PointLight('#ffffff', .5, 2.5, 1.2); scene.add(fillL);
scene.add(new THREE.HemisphereLight('#fff4e8', '#7a6a50', 1.05));
function finishRender(s, t, overlay) { const c = s.cam(t - s.a, t); camera.position.copy(c.p); camera.up.set(0, 1, 0); camera.lookAt(c.l); camera.fov = c.fov; camera.near = .02; camera.updateProjectionMatrix(); fillL.position.copy(camera.position); renderer.render(scene, camera); ctx.imageSmoothingEnabled = false; ctx.drawImage(renderer.domElement, 0, 0, W, H); overlay(t); }
