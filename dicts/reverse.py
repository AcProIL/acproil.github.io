'''
Build lsf-xxx dictionaries
'''

import json

for lang in ['eng', 'fra']:
    res = []
    seen = {}
    with open('%s-lsf.json' % lang, 'r') as file:
        dict = json.load(file)
    index = -1
    for item in dict:
        for lsf in item['lsf']:
            pos, tr = lsf['pos'], lsf['translation']
            if tr not in seen.keys():
                res.append({
                    'lsf': tr,
                    lang: [{'pos': pos, 'translation': item[lang]}],
                })
                index += 1
                if 'examples' in item.keys():
                    res[-1]['examples'] = item['examples']
                seen[tr] = index
            else:
                res[index][lang].append({
                    'pos': pos, 'translation': item[lang]
                })
                if 'examples' in item.keys():
                    if 'examples' not in res[index].keys():
                        res[index]['examples'] = []
                    res[index]['examples'] += item['examples']

    with open('lsf-%s.json' % lang, 'w') as file:
        file.write(json.dumps(res))
