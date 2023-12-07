const fs = require("node:fs");

const spelled = {
    one: "1",
    two: "2",
    three: "3",
    four: "4",
    five: "5",
    six: "6",
    seven: "7",
    eight: "8",
    nine: "9",
};

const pattern = "([0-9]|one|two|three|four|five|six|seven|eight|nine)";

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
    let firstDigit = trim(line);
    let secondDigit = trim(line, true);
    return Number(firstDigit + secondDigit);
}

function trim(line, reverse) {
    let regex = new RegExp(reverse ? pattern + "$" : "^" + pattern);
    let match = line.match(regex);
    if (!match)
        return reverse ? trim(line.slice(0, -1), true) : trim(line.slice(1));

    let current = match[0];
    return current.length === 1 ? current : spelled[current];
}
