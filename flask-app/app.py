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

def verify_short(input, answers, threshold=0.5):
    v_input = np.array(embed([input]))[0]
    vectors = (np.array(embed(answers))).tolist()
    similarity = max([np.dot(v_input, x) for x in vectors], default=0)
    return True if similarity >= threshold else False

app = Flask(__name__)

@app.route('/')
def hello():
    return "hello world"

@app.route('/username')
def username():
    return render_template('username.html')

@app.route('/username', methods=['POST'])
def username_post():
    user = request.form['user']
    return redirect(url_for('login', user=user))

@app.route('/login')
def login_re():
    return redirect(url_for('username'))

@app.route('/login/<string:user>')
def login(user):
    mc, pairs = generate_mc(user)
    choices = pairs.keys()
    short, answers = generate_short(user)
    data = {"user": user, "mc": mc, "mc_answers": pairs, "short": short, "short_answers": answers}
    with open('current.json', 'w') as f:
        json.dump(data, f, ensure_ascii=False)
    return render_template('login.html', user=user, mc=mc, choices=choices, short=short)

@app.route('/login/<string:user>', methods=['POST'])
def login_post(user):
    with open('current.json') as f:
        data = json.load(f)
    pairs = data["mc_answers"]
    answers = data["short_answers"]
    mc_verify = True
    for choice in pairs.keys():
        if (choice in request.form and not pairs[choice]) or (choice not in request.form and pairs[choice]):
            mc_verify = False
    short_input = request.form['short']
    if mc_verify and verify_short(short_input, answers):
        msg = "success"
    else:
        msg = "failed"
    return redirect(url_for('result', msg=msg))

@app.route('/result/<string:msg>')
def result(msg):
    return render_template('result.html', msg=msg)