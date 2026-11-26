import numpy as np, wave, json
SR=44100; I=json.load(open('info.json')); DUR=I['DUR']; T=I['T']; N=int(SR*DUR); out=np.zeros(N); rng=np.random.default_rng(3)
def add(sig,t,g=1.):
    i=int(t*SR); j=min(N,i+len(sig))
    if i>=N or j<=0: return
    if i<0: sig=sig[-i:]; i=0
    out[i:j]+=sig[:j-i]*g
tt=lambda d: np.arange(int(d*SR))/SR
def env(d,a=.005,r=None):
    t=tt(d); e=np.minimum(1,t/max(a,1e-4))
    if r: e*=np.exp(-t/r)
    return e
noise=lambda d: rng.uniform(-1,1,int(d*SR))
def lpf(x,k): L=int(min(len(x),5/k)); ker=k*(1-k)**np.arange(L); return np.convolve(x,ker)[:len(x)]
def tone(f,d,w='sine'):
    t=tt(d); f=np.broadcast_to(f,t.shape) if np.ndim(f) else np.full(t.shape,f); ph=2*np.pi*np.cumsum(f)/SR
    return np.sin(ph) if w=='sine' else (2*((ph/(2*np.pi))%1)-1 if w=='saw' else np.sign(np.sin(ph)))
nf=lambda m: 440*2**((m-69)/12)
def pluck(m,t,g=.1,d=.35,w='square',k=.25): add(lpf(tone(nf(m),d,w),k)*env(d,.003,d/4),t,g)
def knock(t,g=.9): add(lpf(noise(.08),.25)*env(.08,.001,.018)*2.5+np.sin(2*np.pi*110*tt(.08))*env(.08,.001,.03),t,g)
def clack(t,g=.9): add(lpf(noise(.12),.3)*env(.12,.001,.03)*2,t,g); add(np.sin(2*np.pi*80*tt(.25))*env(.25,.001,.07),t,g); add(lpf(noise(.04),.8)*env(.04,.001,.008),t+.09,.5)
def boom(t,g=.7,d=1.,f0=90): add(np.sin(2*np.pi*np.cumsum(np.linspace(f0,30,int(d*SR)))/SR)*env(d,.003,.3),t,g); add(lpf(noise(d),.05)*env(d,.002,.2)*2,t,g)
def harp(t,g=.07):
    for k,m in enumerate([72,76,79,84,88,91,96]): pluck(m,t+k*.045,g,.6,'sine',.6)
def step(t,g=.12): add(lpf(noise(.07),.12)*env(.07,.002,.015),t,g)
def creak(t,g=.2,d=.4,f0=170):
    f=f0+60*np.sin(2*np.pi*2.5*tt(d)); s=tone(f,d,'saw')*(np.sin(2*np.pi*37*tt(d))>0); add(lpf(s,.15)*np.sin(np.pi*tt(d)/d),t,g)
def chirp(t,g=.04):
    for k in range(3): f=np.linspace(3200,4200,int(.06*SR)); add(np.sin(2*np.pi*np.cumsum(f)/SR)*np.sin(np.pi*tt(.06)/.06),t+k*.09,g)
# door slam at start, snap boom
clack(T['clack'],1.0); boom(T['snap'],.55,.9,80)
# tense ostinato during scolding (low square pulses), gets denser
t=T['snap']+.3; i=0
while t<T['knock']-.05:
    pluck([40,40,43,40,46,45,43,41][i%8],t,.07+.03*(t/T['knock']),.22,'square',.2); i+=1; t+=.3 if t<T['m3'] else .22
# rising tension before knock
add(lpf(tone(np.linspace(nf(52),nf(64),int(1.4*SR)),1.4,'saw'),.15)*np.linspace(0,1,int(1.4*SR))**2,T['m4'],.12)
for k in range(3): knock(T['knock']+k*.16)
harp(T['sweet']-.05,.09)
# sweet music bed after
bass=[60,64,67,72,65,69,72,77]
t=T['sweet']+.5; i=0
while t<DUR-.1:
    pluck(bass[i%8],t,.035,.3,'sine',.5); t+=.25; i+=1
creak(T['open']+.02,.18,.45,190)
for k in range(5): chirp(T['open']+.4+k*.7)
for k in range(6): step(T['bring']+k*.11,.14)
add(np.sin(2*np.pi*np.cumsum(np.linspace(900,500,int(.4*SR)))/SR)*env(.4,.01,.15),T['m6'],.08)  # squeeze squeak
creak(T['close']+.05,.15,.4,160)
mix=out.copy()
for name,info in json.load(open('vox/timing.json')).items():
    with wave.open(f'vox/{name}.wav') as w: a=np.frombuffer(w.readframes(w.getnframes()),np.int16).astype(float)/32768
    a=a/(np.abs(a).max()+1e-9)*info['gain']; i=int(info['t']*SR); j=min(N,i+len(a)); mix[i:j]+=a[:j-i]
mix=mix/np.abs(mix).max()*.9; st=np.stack([mix,mix],1)
with wave.open('sfx.wav','wb') as w: w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((st*32767).astype(np.int16).tobytes())
print('ok',DUR)
