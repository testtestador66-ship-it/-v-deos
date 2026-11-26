# Gera as falas direto pela API do ElevenLabs (precisa de ELEVENLABS_API_KEY e acesso a api.elevenlabs.io).
# uso: python3 vozes_eleven.py falas.json   (falas.json: {"m1": ["mae", "[gritando] LUCAS!"], "k1": ["lucas", "Ela que ofereceu..."]})
# saida: vox/<chave>.wav (44.1 kHz mono, sem silencio nas pontas, loudnorm) e vox/dur.json
import json, os, sys, subprocess, urllib.request, wave
VOZES = {
  'mae': 'lxYfHSkYm1EzQzGhdbfc',      # Jessica Anne Bogart
  'lucas': 'lWIsRH3GhtePXZJ0ktqh',    # VALF
  'pedro': 'TKhYICZ7DQCllNhOa4DT',    # Lucas - Laid-back
  'pai': 'ELBrtmIkk40wCZ5YnlwM',      # Thiago
  'vo': 'fs3nd19KF2GO2hLTzkBm',       # Lucinda
  'tia': 'RGymW84CSmfVugnA5tvA',      # Roberta
  'jorge': 'RGbeQtiShYRDVCrd9b9w',    # Sergio
}
KEY = os.environ['ELEVENLABS_API_KEY']
def tts(texto, voz, out):
    for model in ('eleven_v4', 'eleven_v3', 'eleven_multilingual_v2'):
        req = urllib.request.Request(f'https://api.elevenlabs.io/v1/text-to-speech/{voz}?output_format=mp3_44100_128',
            data=json.dumps({'text': texto, 'model_id': model, 'language_code': 'pt'}).encode(),
            headers={'xi-api-key': KEY, 'Content-Type': 'application/json'})
        try:
            open(out, 'wb').write(urllib.request.urlopen(req, timeout=120).read()); return model
        except urllib.error.HTTPError as e:
            print('modelo', model, 'falhou:', e.code, e.read()[:200])
    raise SystemExit('ElevenLabs falhou em todos os modelos')
falas = json.load(open(sys.argv[1])); os.makedirs('vox', exist_ok=True); D = {}
for k, (pers, texto) in falas.items():
    m = tts(texto, VOZES[pers], f'/tmp/{k}.mp3')
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', f'/tmp/{k}.mp3', '-af', 'silenceremove=start_periods=1:start_threshold=-40dB,areverse,silenceremove=start_periods=1:start_threshold=-40dB,areverse,afade=t=in:d=0.02,loudnorm=I=-16:TP=-1.5', '-ar', '44100', '-ac', '1', f'vox/{k}.wav'], check=True)
    with wave.open(f'vox/{k}.wav') as w: D[k] = round(w.getnframes() / w.getframerate(), 2)
    print(k, pers, m, D[k])
json.dump(D, open('vox/dur.json', 'w')); print(D)
