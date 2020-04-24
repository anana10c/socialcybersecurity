from numpy.random import choice
from collections import defaultdict
import numpy as np
import pandas as pd
import random
import copy

# https://towardsdatascience.com/using-a-markov-chain-sentence-generator-in-python-to-generate-real-fake-news-e9c904e967e

with open('textstring.txt') as f:
    text = f.read()
    text = text.split(' ')

dict_df = pd.DataFrame(columns = ['lead', 'follow', 'freq'])
dict_df['lead'] = text
follow = text[1:]
follow.append('endword')
dict_df['follow'] = follow

end_words = [] 
for word in text:
    if (word not in ['', '.', '!', '?'] and 
       (len(word) < 2 or (word[-1] in ['.', '!', '?'] and word[:-1] not in ['', '.', '!', '?']))):
        end_words.append(word[:-1].replace('.', ''))

dict_df = dict_df.groupby(['lead', 'follow']).size().reset_index(name='freq')

pivot_df = dict_df.pivot_table(index = "lead", columns = 'follow', values = 'freq', fill_value=0)

sum_words = pivot_df.sum(axis=1)
pivot_df = pivot_df.apply(lambda x: x/sum_words)

def create_sentence(start):
    word = start
    sentence = [word] 
    while len(sentence) < 20:
        next_word = choice(a = list(pivot_df.columns), p=(pivot_df.iloc[pivot_df.index == word].fillna(0).values)[0])
        if next_word == 'endword' or (next_word in end_words and len(sentence) <= 8):
            continue
        elif next_word in end_words and len(sentence) > 8:
            sentence.append(next_word)
            break
        else:
            sentence.append(next_word)
        word = next_word
    sentence = ' '.join(sentence)
    # capitalize 
    first_letter = sentence[0].upper()
    return first_letter + sentence[1:]


def generate(num):
    sentences = []
    for i in range(num):
        star = random.choice(dict_df['lead'])
        sentences.append(create_sentence(star))
    return sentences