import subprocess, json, wave, sys
sys.path.insert(0, '/home/claude/tts'); import tts
L = {
 'm1': ('Escuta aqui: não é pra pedir nada. Entendeu?', 'pf_dora', 1.05, 1.0), 'k1': ('Entendi, mãe.', 'pm_alex', .95, 1.32),
 'k2': ('Mãe... esse aqui tá na promoção...', 'pm_alex', 1.0, 1.32), 'm2': ('Não.', 'pf_dora', 1.0, 1.0), 'm2b': ('Esse é pro seu pai.', 'pf_dora', 1.05, 1.0),
 'k3': ('Manhê, só um iogurtezinho...', 'pm_alex', 1.0, 1.32), 'm3': ('Tem iogurte em casa.', 'pf_dora', 1.05, 1.0),
 'm4': ('Eu tô vendo daqui, Lucas.', 'pf_dora', 1.0, 1.0), 'c1': ('Deu trezentos e oitenta e sete e noventa.', 'pf_dora', 1.15, 1.12),
 'm5a': ('E essa bala aí?', 'pf_dora', 1.0, 1.0), 'k4': ('É só uma bala...', 'pm_alex', .9, 1.32), 'm5': ('É por isso que a gente não tem dinheiro.', 'pf_dora', 1.0, 1.0),
}
D = {}
for k, (txt, v, sp, pitch) in L.items():
    tts.synth(txt, v, sp, f'/tmp/{k}.wav')
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', f'/tmp/{k}.wav', '-af', f'asetrate={int(24000 * pitch)},aresample=44100,atempo={1 / pitch:.4f},silenceremove=start_periods=1:start_threshold=-45dB,areverse,silenceremove=start_periods=1:start_threshold=-45dB,areverse', '-ar', '44100', '-ac', '1', f'vox/{k}.wav'], check=True)
    with wave.open(f'vox/{k}.wav') as w: D[k] = round(w.getnframes() / w.getframerate(), 2)
json.dump(D, open('vox/dur.json', 'w')); print(D)
