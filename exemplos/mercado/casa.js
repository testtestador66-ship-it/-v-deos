// CASA (sala) at x = 30
const CX = 30;
const HS = new THREE.Group(); scene.add(HS); HS.position.set(CX, 0, 0);
mk(new THREE.PlaneGeometry(7, 7), lam('#ffffff', ctex(64, 64, (g, w, h) => { g.fillStyle = '#b07a4a'; g.fillRect(0, 0, w, h); for (let y = 0; y < h; y += 16) { g.fillStyle = 'rgba(40,20,5,.4)'; g.fillRect(0, y, w, 1); } }, [6, 6])), HS, [0, 0, 0], [-Math.PI / 2, 0, 0], false, true);
{ const wm = lam('#ffffff', ctex(32, 32, (g, w, h) => { g.fillStyle = '#e8d8b0'; g.fillRect(0, 0, w, h); g.fillStyle = '#dccaa0'; g.fillRect(0, 0, 4, h); }, [10, 2])); mk(BOX(7, 3, .1), wm, HS, [0, 1.5, -1.6]); mk(BOX(.1, 3, 7), wm, HS, [-3.0, 1.5, 0]); mk(BOX(.1, 3, 7), wm, HS, [3.0, 1.5, 0]); }
// sofa
mk(BOX(2.0, .4, .8), lam('#3f6aa8'), HS, [0, .2, -1.0]); mk(BOX(2.0, .55, .25), lam('#35598e'), HS, [0, .62, -1.35]); for (const s of [-1, 1]) mk(BOX(.25, .6, .8), lam('#35598e'), HS, [s * 1.05, .3, -1.0]);
mk(BOX(.4, .4, .12), lam('#f2c23a'), HS, [-.7, .55, -1.2], [-.3, 0, .2]);
// frame + lamp + rug
mk(BOX(.8, .6, .04), lam('#6a4022'), HS, [.6, 1.8, -1.54]); mk(new THREE.PlaneGeometry(.7, .5), lam('#7ac8ff'), HS, [.6, 1.8, -1.51], [0, 0, 0], false, false);
mk(new THREE.CylinderGeometry(.03, .03, 1.5, 6), lam('#333'), HS, [1.6, .75, -1.2]); mk(new THREE.CylinderGeometry(.15, .25, .3, 10), lam('#f2e6c0', null, { emissive: '#ffe0a0', emissiveIntensity: .5 }), HS, [1.6, 1.55, -1.2]);
mk(new THREE.CircleGeometry(1.2, 18), lam('#c84a5a'), HS, [0, .005, -.2], [-Math.PI / 2, 0, 0], false, true);
mk(BOX(1.3, .5, .4), lam('#6a4022'), HS, [0, .25, 2.6]); mk(BOX(1.2, .7, .06), lam('#111'), HS, [0, .85, 2.55]); const tvS = mk(new THREE.PlaneGeometry(1.1, .6), new THREE.MeshBasicMaterial({ color: '#5ab0ff' }), HS, [0, .85, 2.51], [0, Math.PI, 0], false, false);
const pad = new THREE.Group(); scene.add(pad); mk(BOX(.16, .04, .08), lam('#2a2a2e'), pad, [0, 0, 0]); for (const s of [-1, 1]) mk(BOX(.05, .04, .07), lam('#2a2a2e'), pad, [s * .08, -.015, -.02]);
const houseL = new THREE.PointLight('#ffe0b0', 4, 9, 1.4); houseL.position.set(CX, 2.5, .5); scene.add(houseL);
