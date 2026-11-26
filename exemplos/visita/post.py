import json
I=json.load(open('info.json')); T=I['T']; D=json.load(open('vox/dur.json'))
txt={'m1':'LUCAS!','m2':'Três pedaços de bolo?|Na frente da visita?','k1':'Ela que ofereceu...','m3':'E que história é essa|de contar que eu|pinto o cabelo?','k2':'Ela perguntou se era natural.','m4':'Você vai ver só uma coisa...','t1':'Desculpa,|esqueci minha sombrinha!','m5':'Imagina!|Lucas, meu amor,|pega a sombrinha da tia?','t2':'Que menino educado!','m6':'É um anjo!','m0':'Tchau, querida!|Volta sempre!'}
json.dump({k:{'t':round(T[k],3),'gain':.92} for k in txt},open('vox/timing.json','w'))
r=[]
for k,s in txt.items():
  a=T[k]; d=D[k]
  if '|' in s: chunks=[c.split() for c in s.split('|')]
  else: w=s.split(); n=max(1,-(-len(w)//3)); chunks=[w[round(i*len(w)/n):round((i+1)*len(w)/n)] for i in range(n)]
  tot=sum(len(' '.join(c)) for c in chunks); t0=a
  for c in chunks:
    seg=d*len(' '.join(c))/tot; r.append([t0,t0+seg+.12,' '.join(c)]); t0+=seg
r.sort()
for i in range(len(r)-1):
  if r[i][1]>=r[i+1][0]: r[i][1]=r[i+1][0]-.02
open('caps.txt','w').write('\n'.join(f'{a:.2f}|{b:.2f}|0.77|{t.replace(":", chr(92)+":")}' for a,b,t in r)+'\n')
print(len(r))
