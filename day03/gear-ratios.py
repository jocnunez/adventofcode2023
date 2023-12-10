import functools
import re

NUMBER_REGEX = "\d+"
SYMBOL_REGEX = "[^\d.\n]"

prev = ''
next = ''
partNumbers = []

def isValid(base, span, line, prev, next):
    start = base + span[0] - 1
    start = (0, start)[start > 0]
    end = base + span[1] + 1
    
    if re.search(SYMBOL_REGEX, line[start:end]):
        return True
    if re.search(SYMBOL_REGEX, prev[start:end]):
        return True
    if re.search(SYMBOL_REGEX, next[start:end]):
        return True
    return False

file = open('input.txt', 'r')
line = file.readline()

while line:
    next = file.readline()

    index = 0
    while True:
        match = re.search(NUMBER_REGEX, line[index:])
        if not match:
            break
        
        if isValid(index, match.span(), line, prev, next):
            partNumbers.append(int(match.group()))
        
        index += match.end()
    
    prev = line
    line = next

file.close()

result = partNumbers and functools.reduce(lambda a, b: a+b, partNumbers)
print(result)
