python3 -c "
import json;ln=json.dumps(json.load(open('vox/dur.json')))
open('main.js','w').write(open('pieces.js').read()+open('new.js').read().replace('__LN__',ln).replace('__CHARS__',open('chars.js').read()))"
