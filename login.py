from sentencegenerator import generate, create_sentence
import random
from parseconversationhistory import parseconversations

def login():
    messages_dict = list(parseconversations())
    print("Login: ")

    name = input("Please enter your name: ")

    print("Here are some messages that you may or may not have received in the past two weeks.\n")

    options = dict()
    options["real"] = set()
    real = random.randint(9,12)
    while (len(options["real"]) < real):
        options["real"].add(random.choice(messages_dict))

    options["fake"] = set(generate(14-real))
    ops = set()
    for message in options["real"]:
        ops.add(message)
    for message in options["fake"]:
        ops.add(message)
    ops = list(ops)
    enumed = dict()
    for i in range(len(ops)):
        ops[i].replace('\n', ' ')
        print(f'{i}. {ops[i]}\n')
        enumed[str(i)] = ops[i]

    guesses = input("Enter the corresponding numbers of the messages that you recall receiving, separated by commas.")
    guesses = guesses.split(',')
    for guess in guesses: guess.strip()
    if len(guesses) != len(options["real"]):
        print(len(guesses), len(options["real"]))
        print("No, you didn't get all the messages.")
        return "Authentication failed."
    for guessInd in guesses:
        if int(guessInd) > 14 or enumed[guessInd] not in options["real"]:
            print('No, you have never received one or more of those messages.')
            return "Authentication failed."
    return f'Welcome, {name}'
    


print(login())