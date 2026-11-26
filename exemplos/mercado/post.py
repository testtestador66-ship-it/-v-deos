import json
T=json.load(open('info.json'))['T']; D=json.load(open('vox/dur.json'))
keys=['m1','k1','k2','m2','m2b','k3','m3','m4','c1','m5a','k4','m5']
json.dump({k:{'t':round(T[k],3),'gain':.9 if k!='c1' else .75} for k in keys},open('vox/timing.json','w'))
txt={'k1':'Entendi, mãe.','k2':'Mãe... esse aqui tá na promoção...','m2':'Não.','m2b':'Esse é pro seu pai.','k3':'Manhê, só um iogurtezinho...','m3':'Tem iogurte em casa.','m4':'Eu tô vendo daqui, Lucas.','m5a':'E essa bala aí?','k4':'É só uma bala...','m5':'É por isso que a gente não tem dinheiro.'}
split={'m1':('Escuta aqui:','não é pra pedir nada. Entendeu?',.35),'c1':('Deu trezentos e','oitenta e sete e noventa.',.45),'m5':('É por isso que a gente','não tem dinheiro.',.55),'k2':('Mãe...','esse aqui tá na promoção...',.3)}
r=[]
for k in sorted(keys,key=lambda k:T[k]):
  a=T[k]; b=a+D[k]+.25
  if k in split: x,y,f=split[k]; s=a+D[k]*f; r+=[[a,s-.02,x],[s,b,y]]
  else: r.append([a,b,txt[k]])
for i in range(len(r)-1):
  if r[i][1]>=r[i+1][0]: r[i][1]=r[i+1][0]-.03
open('caps.txt','w').write('\n'.join(f'{a:.2f}|{b:.2f}|0.70|{t}' for a,b,t in r)+'\n')
