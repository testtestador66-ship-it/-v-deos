function kidHair(head, c, M) { const m = M('#1a1210'); mk(new THREE.SphereGeometry(c.hr * 1.07, 14, 9, 0, Math.PI * 2, 0, Math.PI * .5), m, head, [0, c.hr * .95, -.01], [-.25, 0, 0]); for (let i = 0; i < 5; i++) mk(new THREE.SphereGeometry(c.hr * .3, 7, 5), m, head, [(i - 2) * c.hr * .32, c.hr * 1.45 - Math.abs(i - 2) * .015, c.hr * .82]).scale.set(1, .7, .6); }

// ======================= CHARACTERS =======================
const face = (skin, hair, extra = {}) => ({ skin, hair, hairTop: .2, hairBack: .62, eyeY: .54, eyeDX: 27, browDY: 27, mouthY: .7, ew: 15, eh: 18, pr: 10, iris: '#4a2a12', line: '#1a0d06', browC: hair, bw: 14, bt: 6, ...extra });
const kid = makeHuman({ skin: '#c98a5a', shirt: '#d6302f', collar: '#a01a1a', pants: '#2f4f8a', shoes: '#f4f4f4', socks: '#f4f4f4', shorts: true, hipY: .64, sw: .15, d: 1, th: .4, hr: .26, hs: 1, ar: .05, ua: .22, fa: .2, lr: .055, tl: .31, sl: .3, face: face('#c98a5a', '#1a1210'),
  hairFn: kidHair });
const adult = (o) => ({ hipY: .86, sw: .19, d: 1.0, th: .54, hr: .21, hs: 1.15, ar: .055, ua: .28, fa: .25, lr: .062, tl: .43, sl: .41, ...o });
const mae = makeHuman(adult({ skin: '#e8b48a', shirt: '#2f9a6a', sleeveCol: '#e8b48a', pants: '#e8b48a', shoes: '#e85a8a', socks: '#e8b48a', shorts: true, sw: .17, hr: .2,
  face: face('#e8b48a', '#4a2a18', { ew: 13, eh: 15, pr: 9, browDY: 24, mouthY: .72, lash: true, lip: '#c84a5a', bt: 5 }),
  hairFn(head, c, M) { const m = M('#4a2a18'); mk(new THREE.SphereGeometry(c.hr * 1.09, 14, 9, 0, Math.PI * 2, 0, Math.PI * .55), m, head, [0, c.hr * .95, -.02], [-.2, 0, 0]); mk(new THREE.SphereGeometry(c.hr * .5, 9, 7), m, head, [0, c.hr * 1.55, -c.hr * .85]); for (let i = 0; i < 5; i++) mk(new THREE.SphereGeometry(c.hr * .3, 7, 5), m, head, [(i - 2) * c.hr * .3, c.hr * 1.45, c.hr * .82]).scale.set(1, .65, .55); },
  extraTorso(torso, c, M) { const sk = new THREE.CylinderGeometry(c.sw * 1.1, c.sw * 1.8, .5, 10); sk.translate(0, -.22, 0); mk(sk, M('#2f9a6a'), torso, [0, 0, 0]); mk(BOX(c.sw * 1.4, .28, .02), M('#f4f4f4'), torso, [0, .05, c.sw * .74]); } }));
const tia = makeHuman(adult({ skin: '#f0c4a0', shirt: '#f08a24', sleeveCol: '#f08a24', long: true, pants: '#5a3a6a', shoes: '#3a2a20', socks: '#f0c4a0', sw: .19, hr: .2,
  face: face('#f0c4a0', '#8a3a7a', { ew: 13, eh: 15, pr: 9, browDY: 24, mouthY: .72, lash: true, lip: '#d0305a', bt: 5 }),
  hairFn(head, c, M) { const m = M('#8a3a7a'); for (let i = 0; i < 26; i++) { const a = seeded(i) * Math.PI * 2, b = seeded(i + 40) * 1.35; mk(new THREE.IcosahedronGeometry(c.hr * .34, 0), m, head, [Math.sin(a) * Math.sin(b) * c.hr * 1.08, c.hr * (1.0 + Math.cos(b) * .8), Math.cos(a) * Math.sin(b) * c.hr * 1.05 - .04]); } for (const s of [-1, 1]) mk(new THREE.TorusGeometry(.03, .007, 5, 10), M('#f2c23a'), head, [s * c.hr * 1.0, c.hr * .5, 0], [0, Math.PI / 2, 0]); },
  extraTorso(torso, c, M) { for (let i = 0; i < 6; i++) mk(new THREE.SphereGeometry(.022, 6, 5), M(['#f2e050', '#e8407a', '#40a0e8'][i % 3]), torso, [Math.sin(i * 2.1) * c.sw * .7, .08 + i * .065, c.sw * .66]); } }));
const kidPJ = makeHuman({ skin: '#c98a5a', shirt: '#8ab8ee', collar: '#f4f4f4', sleeveCol: '#8ab8ee', long: true, pants: '#8ab8ee', shoes: '#f0f0f0', socks: '#f4f4f4', hipY: .64, sw: .15, d: 1, th: .4, hr: .26, hs: 1, ar: .05, ua: .22, fa: .2, lr: .055, tl: .31, sl: .3, face: face('#c98a5a', '#1a1210'), hairFn: kidHair, extraTorso(torso, c, M) { for (let i = 0; i < 5; i++) mk(new THREE.OctahedronGeometry(.022, 0), M('#f2e050'), torso, [Math.sin(i * 2.3) * c.sw * .6, .06 + i * .07, c.sw * .66]); } });
for (const h of [kid, kidPJ, mae, tia]) scene.add(h.root);
// dog
const dog = new THREE.Group(); scene.add(dog); const dogM = lam('#b8783a'), dogD = lam('#7a4a20');
mk(BOX(.2, .17, .42), dogM, dog, [0, .26, 0]); for (const [x, z] of [[-.07, .15], [.07, .15], [-.07, -.15], [.07, -.15]]) mk(BOX(.055, .2, .055), dogM, dog, [x, .1, z]);
const dogHead = new THREE.Group(); dogHead.position.set(0, .38, .22); dog.add(dogHead); mk(BOX(.17, .15, .16), dogM, dogHead, [0, 0, 0]); mk(BOX(.1, .07, .1), lam('#d8a868'), dogHead, [0, -.03, .11]); mk(BOX(.04, .03, .02), lam('#111'), dogHead, [0, .0, .165]);
for (const s of [-1, 1]) { mk(BOX(.04, .1, .06), dogD, dogHead, [s * .09, .03, -.02], [0, 0, s * .25]); mk(new THREE.SphereGeometry(.018, 6, 5), lam('#ffffff'), dogHead, [s * .045, .03, .08]); mk(new THREE.SphereGeometry(.01, 5, 4), lam('#111'), dogHead, [s * .045, .03, .095]); }
const tail = mk(BOX(.03, .03, .16), dogM, dog, [0, .32, -.25], [.6, 0, 0]);
