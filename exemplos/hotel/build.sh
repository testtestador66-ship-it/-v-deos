cd /home/claude/hotel && python3 -c "
import json;ln=json.dumps(json.load(open('vox/dur.json')))
open('main.js','w').write(open('/home/claude/shared/common.js').read()+open('scene.js').read().replace('__LN__',ln))" && cat base.js main.js > jv.js
