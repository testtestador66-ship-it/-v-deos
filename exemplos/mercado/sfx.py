import numpy as np, wave, os, json
SR = 44100; DUR = json.load(open('info.json'))['DUR']; N = int(SR * DUR); out = np.zeros(N)
N = int(SR * DUR); out = np.zeros(N)
rng = np.random.default_rng(5)
def add(sig, t, g=1.0):
    i = int(t * SR); j = min(N, i + len(sig))
    if i >= N or j <= 0: return
    out[i:j] += sig[:j - i] * g
def tt(d): return np.arange(int(d * SR)) / SR
def env(d, a=.005, r=None):
    t = tt(d); e = np.minimum(1, t / max(a, 1e-4))
    if r: e *= np.exp(-t / r)
    return e
def noise(d): return rng.uniform(-1, 1, int(d * SR))
def lpf(x, k):
    L = int(min(len(x), 5 / k)); ker = k * (1 - k) ** np.arange(L); return np.convolve(x, ker)[:len(x)]
def tone(f, d, w='sine'):
    t = tt(d); f = np.broadcast_to(f, t.shape) if np.ndim(f) else np.full(t.shape, f); ph = 2 * np.pi * np.cumsum(f) / SR
    if w == 'sine': return np.sin(ph)
    if w == 'saw': return 2 * ((ph / (2 * np.pi)) % 1) - 1
    if w == 'square': return np.sign(np.sin(ph))
def fade(x, a=.01, b=.05):
    n = len(x); e = np.ones(n); ia = int(a * SR); ib = int(b * SR)
    if ia: e[:ia] = np.linspace(0, 1, ia)
    if ib: e[-ib:] = np.linspace(1, 0, ib)
    return x * e
def nf(m): return 440 * 2 ** ((m - 69) / 12)
def step(t, g=.12):
    d = .07; add(lpf(noise(d), .12) * env(d, .002, .015), t, g)
def whoosh(t, d=.5, g=.4): n = noise(d); add(lpf(n, .08) * np.sin(np.pi * tt(d) / d) ** 2 * 3, t, g)
seeded = lambda i: (np.sin(i * 127.1 + 311.7) * 43758.5453) % 1
def whoosh(t, d=.5, g=.4): n = noise(d); add(lpf(n, .08) * np.sin(np.pi * tt(d) / d) ** 2 * 3, t, g)
def boom(t, g=.8, d=1.2, f0=90): add(np.sin(2 * np.pi * np.cumsum(np.linspace(f0, 30, int(d * SR))) / SR) * env(d, .003, .35), t, g); add(lpf(noise(d), .05) * env(d, .002, .2) * 2, t, g)
def pluck(m, t, g=.15, d=.4, w='square', k=.25): add(lpf(tone(nf(m), d, w), k) * env(d, .003, d / 4), t, g)
def ding(t, f=1568, g=.2): add(np.sin(2 * np.pi * f * tt(.8)) * env(.8, .002, .25), t, g)
def creak(t, g=.25, d=.35, f0=180):
    f = f0 + 60 * np.sin(2 * np.pi * 2.5 * tt(d)); s = tone(f, d, 'saw') * (np.sin(2 * np.pi * 37 * tt(d)) > 0)
    add(fade(lpf(s, .15), .03, .08), t, g)
def click(t, g=.5): add(lpf(noise(.03), .7) * env(.03, .001, .006) * 2, t, g)
T = json.load(open('info.json'))['T']
def chirp(t, g=.06):
    for k in range(3): f = np.linspace(3200, 4200, int(.06 * SR)); add(fade(np.sin(2 * np.pi * np.cumsum(f) / SR), .005, .02), t + k * .09, g)
def murmur(a, b, g=.10, seed=0):
    if b - a < .3: return
    d = b - a; n = noise(d); x = lpf(n, .06) * 4; tt_ = tt(d); r = np.random.default_rng(seed)
    env_ = np.zeros(len(x)); i = 0
    while i < len(x): L = int(r.uniform(.07, .2) * SR); env_[i:i + L] = r.uniform(.3, 1.0) * np.sin(np.pi * np.arange(min(L, len(x) - i)) / L); i += L + int(r.uniform(.01, .08) * SR)
    v = x * env_ * (1 + .5 * np.sin(2 * np.pi * r.uniform(3, 6) * tt_)); add(fade(v, .1, .1), a, g)
def gossip(a, b, g=.09): murmur(a, b, g, 1); murmur(a + .13, b, g * .8, 2)
def jump(t): whoosh(t - .2, .35, .35); [click(t + k * .035, .15) for k in range(8)]; ding(t + .3, 1760, .05)
def engine(a, b, g=.12):
    d = b - a; f = 32 + 3 * np.sin(2 * np.pi * .7 * tt(d)); x = tone(f, d, 'saw'); add(fade(lpf(x, .05) * (1 + .3 * np.sin(2 * np.pi * 11 * tt(d))), .3, .3), a, g)



def wind(a, b, g=.12):
    d = b - a
    if d < .2: return
    x = lpf(noise(d), .03) * 4 * (1 + .4 * np.sin(2 * np.pi * .7 * tt(d))); add(fade(x, .2, .2), a, g)
def gameding(t, gold=False):
    for i, m in enumerate([76, 79, 84] + ([88, 91] if gold else [])): add(fade(tone(nf(m), .1, 'square') * .4, .002, .03), t + i * .06, .09)
def buzzer(t): add(fade(tone(110, .45, 'square') * .5 + tone(116, .45, 'square') * .5, .005, .05), t, .18)
def beep(t, g=.08): add(fade(np.sin(2 * np.pi * 2350 * tt(.07)), .002, .02), t, g)
def muzak(a, b, g=.03):
    prog = [[60, 64, 67], [57, 60, 64], [65, 69, 72], [67, 71, 74]]; i = 0
    while a + i * .3 < b: ch = prog[(i // 4) % 4]; add(fade(np.sin(2 * np.pi * nf(ch[i % 3] + 12) * tt(.28)) * .5 + np.sin(2 * np.pi * nf(ch[0]) * tt(.28)) * .3, .01, .1), a + i * .3, g); i += 1
def thud(t, g=.15): add(lpf(noise(.1), .2) * env(.1, .002, .03) * 2, t, g)
muzak(0, T['chk'], .035); murmur(0, T['end'], .03, 5)
for k in ['b1', 'b2', 'r1', 'r2', 'r3']: whoosh(T[k] - .25, .25, .12); thud(T[k] + .15)
for k in range(int((T['over'] - T['s2']) / .45)): add(lpf(noise(.03), .3) * env(.03, .002, .01) * 1.5, T['s2'] + k * .45, .02)
thud(T['over'] + .05, .3); thud(T['over'] + .15, .25); thud(T['over'] + .3, .2)
i = 0; tb = T['chk'] + .2
while tb < T['c1'] - .1: beep(tb, .07); tb += max(.09, .3 - i * .015); i += 1
beep(T['bala'] + .3, .1)
add(fade(lpf(noise(1.6), .03) * 1.5, .2, .4), T['stare'], .03)
mix = out.copy()
cfg = json.load(open('vox/timing.json'))
for name, info in cfg.items():
    with wave.open(f'vox/{name}.wav') as w: a = np.frombuffer(w.readframes(w.getnframes()), np.int16).astype(float) / 32768
    a = a / (np.abs(a).max() + 1e-9) * info.get('gain', .9)
    i = int(info['t'] * SR); j = min(N, i + len(a)); mix[i:j] += a[:j - i]
mix = mix / np.abs(mix).max() * .9
st = np.stack([mix, mix], 1)
with wave.open('sfx.wav', 'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((st * 32767).astype(np.int16).tobytes())
print('ok', DUR)
