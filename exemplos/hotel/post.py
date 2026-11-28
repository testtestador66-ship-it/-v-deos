import json
I=json.load(open('info.json')); T=dict(I['T']); D=json.load(open('vox/dur.json'))
txt={'m1':'Meio-dia, Lucas!|Aqui não é hotel!','k1':'Só mais|cinco minutinhos...','k2':'Mãe,|cadê meu café?','m2':'Café da manhã?|Aqui não é hotel!','m3':'Toalha molhada|na cama?!|AQUI NÃO É HOTEL!','k3':'Foi sem querer!','p1':'Amor,|cadê minha toalha?!','k4':'Aqui não é hotel.','m4':'Esse é|o meu filho.','p2':'...Oi?'}
json.dump({k:{'t':round(T[k],3),'gain':.92} for k in txt},open('vox/timing.json','w'))
r=[]
for k,s in txt.items():
  a=T[k]; d=D[k]; chunks=s.split('|'); tot=sum(len(c) for c in chunks); t0=a
  for c in chunks: seg=d*len(c)/tot; r.append([t0,t0+seg+.15,c]); t0+=seg
r.sort()
for i in range(len(r)-1):
  if r[i][1]>=r[i+1][0]: r[i][1]=r[i+1][0]-.02
open('caps.txt','w').write('\n'.join(f'{a:.2f}|{b:.2f}|0.77|{t}' for a,b,t in r)+'\n'); print(len(r))
