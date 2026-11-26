
// ======================= CAMERAS =======================
const look = (p, l, fov = 50, roll = 0) => ({ p, l, fov, roll });
const head = h => h.headMesh.getWorldPosition(new THREE.Vector3());
function faceCam(h, yawOf, dist = .78, dy = .03, fov = 46, side = 0) { const hp = head(h); const y = yawOf; const d = V(Math.sin(y), 0, Math.cos(y)); const s = V(Math.cos(y), 0, -Math.sin(y)); return look(hp.clone().add(d.multiplyScalar(dist)).add(V(0, dy, 0)).add(s.multiplyScalar(side)), hp.clone().add(V(0, .07, 0)), fov); }
const shake = (t, k) => V(nz(t * 2.1, 1) * k, nz(t * 2.3, 5) * k, 0);
function makeShots() {
  const mumCam = (dist, fov) => (lt, t) => { const st = maeState(t); const c = faceCam(mae, st.yaw, dist, t < T.kf ? .05 : -.02, fov, t < T.kf ? .06 : .38); const r = rage(t); c.p.add(shake(t, .006 + r * .014)); return c; };
  const kidCam = (lt, t) => { const c = faceCam(kid, 0, 1.5, .1, 46, -.25); c.p.z -= lt * .03; return c; };
  const tiaCam = (lt, t) => { const tp = head(tia); const mp = head(mae); return look(V(.98, 1.55, .72), tp.clone().add(V(0, .06, 0)), 40); };
  const outTwo = (z, fov, x = .55, ly = 1.32, cy = .13) => (lt, t) => look(V(x, ly + cy, z - lt * .03), V(x + .02, ly, 1.1), fov);
  SHOTS = [
    { a: 0, b: T.kf, cam: mumCam(1.35, 46) },
    { a: T.kf, b: T.m2, cam: kidCam },
    { a: T.m2, b: T.k1, cam: mumCam(1.3, 46) },
    { a: T.k1, b: T.m3, cam: kidCam },
    { a: T.m3, b: T.k2, cam: mumCam(1.2, 46) },
    { a: T.k2, b: T.m4, cam: kidCam },
    { a: T.m4, b: T.open, cam: mumCam(1.1, 46) },
    { a: T.open, b: T.m5, cam: tiaCam },
    { a: T.m5, b: T.bring, cam: (lt, t) => faceCam(mae, 0, 1.35, .08, 46, .05) },
    { a: T.bring, b: T.t2, cam: outTwo(3.3, 50, .6, 1.3, .45) },
    { a: T.t2, b: T.m6, cam: tiaCam },
    { a: T.m6, b: T.bye, cam: outTwo(3.3, 38, .64, 1.33, .45) },
    { a: T.bye, b: T.end + 1, cam: outTwo(3.2, 50) },
  ];
}
build();
const shotAt = t => { for (const s of SHOTS) if (t >= s.a && t < s.b) return s; return SHOTS[SHOTS.length - 1]; };

// ======================= OVERLAY =======================
function vignette(strength, col = '0,0,0', r0 = .3) { const g = ctx.createRadialGradient(W / 2, H / 2, H * r0, W / 2, H / 2, H * .72); g.addColorStop(0, `rgba(${col},0)`); g.addColorStop(1, `rgba(${col},${strength})`); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); }
function outlined(txt, x, y, size, fill = '#fff', stroke = '#111', lw = 12) { ctx.font = `900 ${size}px Inter`; ctx.lineJoin = 'round'; ctx.strokeStyle = stroke; ctx.lineWidth = lw; ctx.strokeText(txt, x, y); ctx.fillStyle = fill; ctx.fillText(txt, x, y); }
function overlay(t) {
  vignette(.25);
  const r = rage(t); if (r > 0) vignette(.25 + r * .35, '200,20,10', .32);
  ctx.textAlign = 'center'; outlined('Toda mãe quando a', W / 2, 120, 62, '#ffe14a', '#111', 13); outlined('visita vai embora:', W / 2, 192, 62, '#ffe14a', '#111', 13);
  if (t > DUR - 2.0) { const k = clamp((t - (DUR - 2.0)) / .2, 0, 1); ctx.globalAlpha = k; ctx.fillStyle = 'rgba(10,10,14,.78)'; ctx.beginPath(); ctx.roundRect(W / 2 - 470, H * .885 - 60, 940, 120, 30); ctx.fill(); ctx.font = '900 46px Inter'; ctx.fillStyle = '#fff'; ctx.fillText('Sua mãe também era assim? 👇', W / 2, H * .885 + 16); ctx.globalAlpha = 1; }
}

// ======================= RENDER =======================
const atHand = (h, side, obj, off = V(0, 0, 0)) => { const hand = side === 'R' ? h.handR : h.handL; hand.getWorldPosition(obj.position); obj.position.add(off); };
window.renderAt = function (t) {
  const s = shotAt(t);
  const ks = kidState(t), ts = tiaState(t), ms = maeState(t);
  applyState(kid, ks, t, 1); applyState(tia, ts, t, 3); applyState(mae, ms, t, 4);
  kid.headMesh.scale.set(ks.puff, 1.04, .96);
  kidPJ.root.visible = false; dog.visible = false; car.visible = false; web.visible = false; robeM.visible = robeT.visible = false; bag.visible = false;
  purse.visible = tphone.visible = brush.visible = false; mugs[0].visible = mugs[1].visible = false; bulb.material.emissiveIntensity = 0; nWin.material.emissiveIntensity = 0; ceilLamp.material.emissiveIntensity = .2;
  scene.updateMatrixWorld(true);
  slice.visible = ks.prop === 'slice' && t < T.k1 + LN.k1 * .6; if (slice.visible) { atHand(kid, 'R', slice, V(0, .04, .02)); slice.rotation.set(0, 0, 0); }
  if (ks.prop === 'umb') { atHand(kid, 'R', umb, V(0, -.05, .05)); umb.rotation.set(.3, 0, 0); }
  else if (ts.prop === 'umb') { atHand(tia, 'R', umb, V(0, -.05, 0)); umb.rotation.set(0, 0, .15); }
  else { umb.position.set(-1.55, .32, -1.2); umb.rotation.set(0, 0, .35); }
  let dr = 0; if (t > T.open - .5 && t < T.close) dr = 1.25 * sm(T.open - .5, T.open - .1, t); if (t >= T.close) dr = 1.25 * (1 - sm(T.close, T.close + .5, t)); door.rotation.y = dr;
  curtL.position.x = -1.6; curtR.position.x = -.4;
  const c = s.cam(t - s.a, t); camera.position.copy(c.p); camera.up.set(0, 1, 0); camera.lookAt(c.l); if (c.roll) camera.rotateZ(c.roll); camera.fov = c.fov; camera.near = .02; camera.updateProjectionMatrix();
  fillL.position.copy(camera.position);
  renderer.render(scene, camera); ctx.imageSmoothingEnabled = false; ctx.drawImage(renderer.domElement, 0, 0, W, H);
  overlay(t);
};
window.grab = (q = .92) => out.toDataURL('image/jpeg', q);
Object.defineProperty(window, 'INFO', { get() { return { DUR, SHOTS: SHOTS.map(s => [s.a, s.b]), T }; } });
window.ready = true;
