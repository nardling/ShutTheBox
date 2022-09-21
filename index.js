"use strict";
let board = 511;
let prevBoard = 511;
let roll = -1;
let d1 = 0;
let d2 = 0;
let tiles;
let tileState;
let currentSelection;
const generateRoll = () => {
    d1 = Math.floor((Math.random() * 100) % 6 + 1);
    d2 = Math.floor((Math.random() * 100) % 6 + 1);
};
const resetCurrentSelection = () => {
    for (let i = 0; i < 9; ++i) {
        if (tileState[i] === 1)
            tileState[i] = 2;
        currentSelection[i] = 0;
    }
};
const checkCurrectSelection = () => {
    let sum = 0;
    for (let i = 0; i < 9; ++i) {
        if (currentSelection[i] === 1) {
            sum += (i + 1);
        }
    }
    return sum === (d1 + d2);
};
function rollDice() {
    if (d1 > 0) {
        if (checkCurrectSelection())
            console.log("Valid Combination");
        else {
            console.log("Invalid Combination");
            return;
        }
    }
    resetCurrentSelection();
    generateRoll();
    console.log(`Die 1: ${d1}. Die 2: ${d2}`);
    const die1Element = document.getElementById("die1");
    die1Element.textContent = d1.toString();
    const die2Element = document.getElementById("die2");
    die2Element.textContent = d2.toString();
}
function tileClicked(e) {
    console.log(e);
    const tileElement = e.target;
    let tileIndex = Number(tileElement.textContent) - 1;
    console.log(tileElement.style.backgroundColor);
    if (0 === tileState[tileIndex]) {
        tileElement.style.backgroundColor = 'green';
        currentSelection[tileIndex] = 1;
        console.log(currentSelection);
        tileState[tileIndex] = 1;
    }
    else if (1 === tileState[tileIndex]) {
        tileElement.style.backgroundColor = 'red';
        currentSelection[tileIndex] = 0;
        console.log(currentSelection);
        tileState[tileIndex] = 0;
    }
    else {
        console.log("Cannot change a tile from a previous roll");
    }
}
function attachEventToRoll() {
    const rollElement = document.getElementById("roll2");
    rollElement.addEventListener("click", rollDice);
}
function attachEventsToTiles() {
    tileState = [];
    tiles = [];
    currentSelection = [];
    for (let i = 1; i < 10; ++i) {
        let tName = `tile${i}`;
        const tileElement = document.getElementById(tName);
        tileElement?.addEventListener("click", tileClicked);
        tileState.push(0);
        currentSelection.push(0);
    }
}
attachEventToRoll();
attachEventsToTiles();
