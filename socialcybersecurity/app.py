from flask import Flask, request  # , render_template, redirect, url_for
from flask_cors import CORS
import json
import os
import random
import datetime
import numpy as np
import tensorflow_hub as hub

def generate_mc(user, notes_data):
    question = "who was present at the last meeting?"
    all_false = True
    pairs = {}
    for user in notes_data['users']:
        pairs[user['name']] = user['attendance']
        if user['attendance']:
            all_false = False
    pairs["none of the above"] = all_false
    return question, pairs

def generate_short(user, notes_data):
    question_type = random.choice(["agenda", "updates", "todo"])
    users = notes_data['users']
    question = "what was an item on the agenda at the last meeting?"
    answers = notes_data['agenda']
    if question_type == "updates":
        person = random.choice(users)
        if person['updates']:
            question = "what was one of " + person['name'] + "\'s updates?"
            answers = person['updates']
    elif question_type == "todo":
        person = random.choice(users)
        if person['todo']:
            question = "what was an item on " + person['name'] + "\'s to-do list?"
            answers = person['todo']
    return question, answers

def generate_questions(user):
    with open ('notes.json') as f:
        notes_data = json.load(f)
    mc_question, mc_pairs = generate_mc(user, notes_data)
    short_question, short_answers = generate_short(user, notes_data)
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

app = Flask(__name__, static_folder='/build', static_url_path='/')
CORS(app)

@app.route('/')
def hello():
    return "hello world"

@app.route('/admin_page')
def get_admin_data():
    with open('users.json') as f:
        data = json.load(f)
    return data

@app.route('/admin_page', methods=['POST'])
def get_admin_response():
    if request.method == 'POST':
        request_data = request.get_json()
        form = request_data['form']
        try:
            with open('users.json') as f:
                data = json.load(f)
            users = data['users']
        except FileNotFoundError:
            users = []
            data = {}
        if form == "newUser":
            users.append(request_data['newUser'])
        elif form == "removeUsers":
            removed = request_data['removedUsers']
            for user in removed:
                users.remove(user)
        else:
            return "failed: invalid form type"
        data['users'] = users
        with open('users.json', 'w') as f:
            json.dump(data, f, ensure_ascii=False)
        msg = "success"
    else:
        msg = "failed: not POST"
    return msg

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
        data['mc_responses'] = mc_responses
        short_answers = data["short_answers"]
        short_response = request_data['shortResponse']
        data['short_response'] = short_response
        mc_verify = True
        for choice in mc_pairs.keys():
            if mc_pairs[choice] != mc_responses[choice]:
                mc_verify = False
        if mc_verify and verify_short(short_response, short_answers):
            msg = "success"
        else:
            msg = "failed"
        data['msg'] = msg
        timestamp = datetime.datetime.now().strftime('%Y-%m-%d_%H-%M-%S-%f')
        data['timestamp'] = timestamp
        with open('attempts/attempt' + timestamp + '.json', 'w') as f:
            json.dump(data, f, ensure_ascii=False)
        with open('current.json', 'w') as f:
            json.dump({}, f, ensure_ascii=False)
    else:
        msg = "error: not post"
    print(msg)
    res = {'msg': msg}
    with open('result.json', 'w') as f:
        json.dump(res, f, ensure_ascii=False)
    return msg

@app.route('/result')
def get_result():
    with open('result.json', 'r') as f:
        data = json.load(f)
    return data

@app.route('/notes')
def get_notes_data():
    with open('users.json') as f:
        data = json.load(f)
    return data

@app.route('/notes', methods=['POST'])
def get_notes_response():
    if request.method == 'POST':
        request_data = request.get_json()
        timestamp = datetime.datetime.now().strftime('%Y-%m-%d_%H-%M-%S-%f')
        request_data['timestamp'] = timestamp
        try:
           os.rename('notes.json', 'notes/note' + timestamp + '.json')
        except FileNotFoundError:
            print("notes.json does not exist (yet)")
        with open('notes.json', 'w') as f:
            json.dump(request_data, f, ensure_ascii=False)
    return "done"

if __name__ == "__main__":
    module_url = "https://tfhub.dev/google/universal-sentence-encoder/4"
    embed = hub.KerasLayer(module_url)
    # embed = hub.load("https://tfhub.dev/google/universal-sentence-encoder/4")
    print("model loading successful")
    app.run()