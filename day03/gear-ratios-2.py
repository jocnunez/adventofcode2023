import functools
import re

NUMBER_REGEX = "\d+"

prev = ''
next = ''
partNumbers = []

def checkSides(gearPos, line):
    result = []
    
    # left
    match = re.search(NUMBER_REGEX + "$", line[:gearPos])
    if match:
        result.append(int(match.group()))
    
    # right
    match = re.search("^" + NUMBER_REGEX, line[gearPos+1:])
    if match:
        result.append(int(match.group()))

    return result

def checkLine(gearPos, line):
    result = []
    index = 0
    while index <= gearPos:
        match = re.search(NUMBER_REGEX, line[index:])
        if not match:
            break
        
        start = index + match.start()
        end = index + match.end()
        index = end

        if start > gearPos+1:
            break
        
        if end >= gearPos:
            result.append(int(match.group()))
  
    return result
        

file = open('input.txt', 'r')
line = file.readline()

while line:
    next = file.readline()

    index = 0
    while True:
        gear = line[index:].find("*")
        if gear < 0:
             break
        index += gear + 1
        
        parts = checkLine(index-1, prev) + checkSides(index-1, line) + checkLine(index-1, next)
        if len(parts) == 2:
            partNumbers.append(parts[0] * parts[1])        
    
    prev = line
    line = next

file.close()

result = partNumbers and functools.reduce(lambda a, b: a+b, partNumbers)
print("result: ", result)
