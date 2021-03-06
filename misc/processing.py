import tensorflow as tf
import tensorflow_hub as hub
import numpy as np

module_url = "https://tfhub.dev/google/universal-sentence-encoder/4"
embed = hub.KerasLayer(module_url)
#print("model loading successful")

'''
lst: list of text inputs
returns: list of inputs vectorised
'''
def embed_list(lst):
    return np.array(embed(lst)).tolist()

'''
input: string being verified
cmplst: list of strings to be compared to
threshold: similarity threshold (between 0 and 1, where 1 is exactly the same);
           accept input if it passes threshold with any string in cmplst
           
returns: bool indicating whether input passes
'''
def verify(input, cmplst, threshold=0.5):
    v_input = np.array(embed([input]))[0]
    similarity = max([np.dot(v_input, x) for x in cmplst], default=0)
    return True if similarity >= threshold else False

def get_score(t1, t2):
    tmp = np.array(embed([t1, t2]))
    return np.dot(tmp[0], tmp[1])

#print(verify("this is a test", (np.array(embed(["is this a test?", "blah"]))).tolist()))