from flask import Flask, request, render_template, redirect, url_for
import json
import numpy as np
import tensorflow_hub as hub

module_url = "https://tfhub.dev/google/universal-sentence-encoder/4"
embed = hub.KerasLayer(module_url)
print("model loading successful")

def generate_mc(user):
    question = "this is a multiple select question"
    pairs = {"choice one": True, "choice two": True, "choice three": True, "none of the above": False}
    return question, pairs

def generate_short(user):
    question = "this is a short answer question"
    answers = ["this is a possible answer!", "this is another possible answer!"]
    return question, answers

def generate_questions(user):
    mc_question, mc_pairs = generate_mc(user)
    short_question, short_answers = generate_short(user)
    data = {"user": user,
            "mc_question": mc_question,
            "mc_pairs": mc_pairs,
            "short_question": short_question,
            "short_answers": short_answers}
    with open('current.json', 'w') as f:
        json.dump(data, f, ensure_ascii=False)
    return mc_question, mc_pairs, short_question, short_answers

def verify_short(input, answers, threshold=0.5):
    v_input = np.array(embed([input]))[0]
    vectors = (np.array(embed(answers))).tolist()
    similarity = max([np.dot(v_input, x) for x in vectors], default=0)
    return True if similarity >= threshold else False

app = Flask(__name__)

@app.route('/')
def hello():
    return "hello world"

@app.route('/login_data')
def get_login_data():
    username = 'bloop'
    mc_question, mc_pairs, short_question, short_answers = generate_questions(username)
    mc_choices = {choice: False for choice in mc_pairs}
    return {'name': username,
            'mcQuestion': mc_question,
            'mcChoices': mc_choices,
            'shortQuestion': short_question}

@app.route('/login_data', methods=['POST'])
def get_login_responses():
    if request.method == 'POST':
        with open('current.json') as f:
            data = json.load(f)
        request_data = request.get_json()
        mc_pairs = data["mc_pairs"]
        mc_responses = request_data['mcChoices']
        short_answers = data["short_answers"]
        short_response = request_data['shortResponse']
        mc_verify = True
        for choice in mc_pairs.keys():
            if mc_pairs[choice] != mc_responses[choice]:
                mc_verify = False
        if mc_verify and verify_short(short_response, short_answers):
            msg = "success"
        else:
            msg = "failed"
    else:
        msg = "error: not post"
    print(msg)
    data = {'msg': msg}
    with open('current.json', 'w') as f:
        json.dump(data, f, ensure_ascii=False)
    return msg

@app.route('/result')
def get_result():
    with open('current.json') as f:
        data = json.load(f)
    return data
