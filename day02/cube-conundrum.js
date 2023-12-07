const fs = require("node:fs");

const firstWordSize = "Game ".length;
const maxCubes = {
    blue: 14,
    green: 13,
    red: 12,
};

fs.readFile("input.txt", "utf8", (err, data) => {
    if (err) return console.error(err);
    readData(data.split("\n"));
});

function readData(list) {
    let result = list
        .map(getInfo)
        .filter((item) => possibleGames(Object.values(item)[0]))
        .reduce(reducer, 0);
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

function possibleGames(game) {
    let isPossible = true;
    for (let i = 0; i < game.length && isPossible; i++) {
        isPossible = checkCubeSet(game[i]);
    }
    return isPossible;
}

function checkCubeSet(cubeSet) {
    let colors = Object.keys(cubeSet);
    let isValid = true;
    for (let i = 0; i < colors.length && isValid; i++) {
        isValid = cubeSet[colors[i]] <= maxCubes[colors[i]];
    }
    return isValid;
}

function reducer(partial, current) {
    let key = Object.keys(current)[0];
    return partial + Number(key);
}
