const fs = require("node:fs");

fs.readFile("input.txt", "utf8", (err, data) => {
    if (err) return console.error(err);
    readData(data.split("\n"));
});

function readData(list) {
    let result = list
        .map(getNumber)
        .reduce((partial, current) => partial + current, 0);
    console.log(result);
}

function getNumber(line) {
    let numbers = line.match(/[0-9]/g);
    let twoDigits = Number(numbers[0] + numbers[numbers.length - 1]) | 0;
    return twoDigits;
}
