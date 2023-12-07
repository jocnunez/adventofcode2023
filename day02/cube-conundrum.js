const fs = require("node:fs");

const firstWordSize = "Game ".length;

fs.readFile("input.txt", "utf8", (err, data) => {
    if (err) return console.error(err);
    readData(data.split("\n"));
});

function readData(list) {
    let result = list.map(getInfo).map(getMinimumSet).reduce(calcPower, 0);
    console.log(result);
}

function getInfo(line) {
    let splitted = line.split(":");
    let key = splitted[0].slice(firstWordSize);
    let games = splitted[1].split(";").map(getGame);
    return { [key]: games };
}

function getGame(game) {
    let cubesSet = {};
    game.split(",").forEach((item) => {
        let color = item.trim().split(" ");
        cubesSet[color[1]] = Number(color[0]);
    });
    return cubesSet;
}

function getMinimumSet(game) {
    let minimum = {
        blue: 1,
        green: 1,
        red: 1,
    };
    let cubeSets = Object.values(game)[0];
    for (let i = 0; i < cubeSets.length; i++) {
        let current = cubeSets[i];
        Object.keys(current).forEach((key) => {
            minimum[key] = Math.max(minimum[key], current[key]);
        });
    }
    return minimum;
}

function calcPower(partial, current) {
    let power = Object.values(current).reduce((p, c) => p * c);
    return partial + power;
}
