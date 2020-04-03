# Goal: Parse a meeting notes file and store info in a question-answer bank

import re
import pandas as pd

QA = dict()
QA["Who was at the meeting?"] = set()
QA["What are some updates?"] = dict()
QA["What are some action items?"] = dict()
QA["What is a fun fact?"] = set()
QA['Categories'] = set()

regex_dict = { 'headers' : re.compile(r'\bAgenda\b|\bUpdates\b|\bAction\sItems\b|\bFun\sFact\b|\bCustom\sQuestions\b'),  
               'items' : re.compile(r'\s*([a-z]|\d)\.\s(.*)\n'), 
               'attendees' : re.compile(r'-\s(\S*)\n'),
               'facts' : re.compile(r'.*')}


def parseLine(line):
    for (key, reg) in regex_dict.items():
        match = reg.search(line)
        if match: 
            return key, match
    return None, None


def parseFile():
    agendaCount = updatesCount = actionCount = factCount = questionCount = len(open('samplemeetingminutes.txt').readlines())
    individual = []
        
    with open('samplemeetingminutes.txt', 'r') as fileObject:
        line = fileObject.readline()
        lineNum = 1
        while line:
            key, match = parseLine(line)
            line = fileObject.readline()

            # headers
            if key == "headers":
                if match.group(0) == "Agenda": agendaCount = lineNum
                elif match.group(0) == 'Updates': updatesCount = lineNum
                elif match.group(0) == 'Action Items': actionCount = lineNum
                elif match.group(0) == 'Fun Fact': factCount = lineNum
                elif match.group(0) == 'Custom Questions': questionCount = lineNum
                (QA["Categories"]).add(match.group(0))
            lineNum += 1 
        
    with open('samplemeetingminutes.txt', 'r') as fileObject:
        line = fileObject.readline()
        lineNum = 1
        while line:
            key, match = parseLine(line)
            line = fileObject.readline()

            # attendees
            if key == "attendees" and lineNum < agendaCount:
                (QA["Who was at the meeting?"]).add(match.group(1))

            # updates
            elif key == "items" and lineNum < factCount and lineNum > updatesCount:
                if match.group(1).isdigit():
                    if individual != [] or lineNum == actionCount - 1 or lineNum == factCount - 1: 
                        if lineNum < actionCount: 
                            QA["What are some updates?"][individual[0]] = individual[1:]
                        else: 
                            QA["What are some action items?"][individual[0]] = individual[1:]
                    individual = [match.group(2)]
                else:
                    individual.append(match.group(2))
                    if lineNum == actionCount - 1:
                        QA["What are some updates?"][individual[0]] = individual[1:]
                    elif lineNum == factCount - 1:
                        QA["What are some action items?"][individual[0]] = individual[1:]
    
            elif key == "facts" and lineNum > factCount and lineNum < questionCount:
                QA["What is a fun fact?"].add(match.group(0))

            lineNum += 1
    for (key, value) in QA.items():
        print(key, value)

parseFile()