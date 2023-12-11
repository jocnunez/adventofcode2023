import re

FILE_NAME = 'input.txt'
NUMBER_REGEX = r'\d+'

result = 0
nextCopies = []
with open(FILE_NAME) as file:
    lines = file.readlines()
    for line in lines:
        cleanLine = line.split(':')[1].split('|')

        card = []
        for side in cleanLine:
            card.append(re.findall(NUMBER_REGEX, side))
        
        points = 0
        for winner in card[0]:
            for mine in card[1]:
                if winner == mine:
                    points += 1
                    break
        
        current = 1
        if nextCopies:
            current += nextCopies.pop(0)
            
        for x in range(points):
            if len(nextCopies) > x:
                nextCopies[x] += current
            else:
                nextCopies.append(current)
        
        result += current

print('Result: ', result)
                