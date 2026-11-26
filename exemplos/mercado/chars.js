const mae = makeHuman(adult({ skin: '#e8b48a', shirt: '#c84a7a', sleeveCol: '#e8b48a', pants: '#e8b48a', shoes: '#f4f4f4', socks: '#e8b48a', shorts: true, sw: .17, hr: .2,
  face: aFace('#e8b48a', '#4a2a18', { ew: 13, eh: 15, pr: 9, browDY: 24, lash: true, lip: '#c84a5a', bt: 5 }),
  hairFn(head, c, M) { const m = M('#4a2a18'); mk(new THREE.SphereGeometry(c.hr * 1.09, 14, 9, 0, Math.PI * 2, 0, Math.PI * .55), m, head, [0, c.hr * .95, -.02], [-.2, 0, 0]); mk(new THREE.SphereGeometry(c.hr * .5, 9, 7), m, head, [0, c.hr * 1.55, -c.hr * .85]); for (let i = 0; i < 5; i++) mk(new THREE.SphereGeometry(c.hr * .3, 7, 5), m, head, [(i - 2) * c.hr * .3, c.hr * 1.45, c.hr * .82]).scale.set(1, .65, .55); },
  extraTorso(torso, c, M) { const sk = new THREE.CylinderGeometry(c.sw * 1.1, c.sw * 1.8, .5, 10); sk.translate(0, -.22, 0); mk(sk, M('#3a5aa8'), torso, [0, 0, 0]); } }));
scene.add(mae.root);
const kid = makeHuman({ ...uniform, shirt: '#2f9a6a', collar: '#1f7a4a', stripe: '#2f9a6a', pants: '#2f4f8a', skin: '#c98a5a', face: kidFace('#c98a5a', '#1a1210'), hairFn: HAIR.spiky('#1a1210') }); scene.add(kid.root);
