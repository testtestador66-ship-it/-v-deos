import numpy as np, wave, json
import numpy as np, wave, json
LN=json.load(open('vox/dur.json'))
import numpy as np, wave, json
LN=json.load(open('vox/dur.json'))
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
def whoosh(t,g=.3,d=.3): n=lpf(noise(d),.25)*np.sin(np.pi*tt(d)/d)**2; add(n,t,g)
def sting(t,g=.3):
    for m in [36,48,51,54]: pluck(m,t,g/2,1.0,'saw',.12)
    boom(t,g,.8,70)
def ding(t,g=.25):
    for f in [2093,4186,6272]: add(np.sin(2*np.pi*f*tt(1.2))*env(1.2,.001,.35),t,g/(1+f/3000))
def bed(t0,t1,notes,g=.05,step_=.25,w='sine'):
    t=t0; i=0
    while t<t1-.05: pluck(notes[i%len(notes)],t,g,.3,w,.5); t+=step_; i+=1
def finish():
    mix=out.copy()
    for name,info in json.load(open('vox/timing.json')).items():
        with wave.open(f"vox/{info.get('f',name)}.wav") as w: a=np.frombuffer(w.readframes(w.getnframes()),np.int16).astype(float)/32768
        a=a/(np.abs(a).max()+1e-9)*info['gain']; i=int(info['t']*SR); j=min(N,i+len(a)); mix[i:j]+=a[:j-i]
    mix=mix/np.abs(mix).max()*.9; st=np.stack([mix,mix],1)
    with wave.open('sfx.wav','wb') as w: w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((st*32767).astype(np.int16).tobytes())
    print('ok',DUR)
for k in range(6): chirp(.05+k*.55,.05)
bed(.0,T['bell'],[67,71,74,71],.04)
ding(T['bell'],.35)
bed(T['bell']+.4,T['m3'],[60,64,67,72],.045)
t=T['m3']-.05; i=0
while t<T['p1']-.1: pluck([40,43,40,46][i%4],t,.1,.2,'square',.2); t+=.18; i+=1
sting(T['m3']-.05,.3)
bed(T['p1'],T['m4']-.1,[55,58,62,58],.045,.3)
harp(T['m4']-.1,.09)
bed(T['m4']+.4,DUR,[60,64,67,72,65,69,72,77],.05)
add(lpf(noise(.25),.6)*env(.25,.002,.06),T['p2']-.1,.15)  # record scratch-ish
for k in ['c1','c2','c3']:
    harp(T[k]+.02,.08); ding(T[k]+.05,.18)
    for m in [72,76,79,84]: pluck(m,T[k]+.15,.05,.6,'sine',.6)
finish()
