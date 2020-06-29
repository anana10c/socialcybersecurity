import json 

def parseconversations():
    with open('conversationhistoryfull.txt') as json_file:
        data = json.load(json_file)

    q_dict = dict()

    for x in data:
        if x["user"] not in q_dict.keys():
            q_dict[x["user"]] = set()
        q_dict[x["user"]].add(x["text"])

    textstring = ''

    for x in q_dict.values(): 
        for sentence in x:
            if sentence != '' and 'has joined the group' not in sentence:
                textstring = textstring + ' ' + sentence

    print(textstring, file=open('textstring.txt', 'w'))

    texts = set()
    for val in q_dict.values():
        for valval in val:
            texts.add(valval)
    
    return texts

parseconversations()