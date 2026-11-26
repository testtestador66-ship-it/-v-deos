cd /home/claude/vai && python3 -c "
import json;ln=json.dumps(json.load(open('vox/dur.json')))
open('main.js','w').write(open('chars.js').read()+open('scene.js').read()+open('logic.js').read().replace('__LN__',ln)+open('cams.js').read())" && cat base.js main.js > vai.js
