let board: number = 511;
let prevBoard: number = 511;
let roll: number = -1;
let d1: number = 0;
let d2: number = 0;
let tiles: HTMLElement[];
let tileState: number[];
let currentSelection: number[];

const generateRoll = (): void => {
    d1 = Math.floor((Math.random() * 100) % 6 + 1);
    d2 = Math.floor((Math.random() * 100) % 6 + 1);
}

const resetCurrentSelection = (): void => {
    for (let i:number = 0; i < 9; ++i)
    {
        if (tileState[i] === 1)
            tileState[i] = 2
        currentSelection[i] = 0;
    }
}

const checkCurrectSelection = (): boolean => {
    let sum: number = 0;
    for (let i: number = 0; i < 9; ++i)
    {
        if (currentSelection[i] === 1)
        {
            sum += (i + 1);
        }
    }
    return sum === (d1 + d2)
}

function rollDice(): void {
    if (d1 > 0)
    {
        if (checkCurrectSelection())
            console.log("Valid Combination");
        else
        {
            console.log("Invalid Combination");
            return;
        }

    }
    resetCurrentSelection();
    generateRoll();
    console.log(`Die 1: ${d1}. Die 2: ${d2}`)

    const die1Element = document.getElementById("die1")!;
    die1Element.textContent = d1.toString();
    const die2Element = document.getElementById("die2")!;
    die2Element.textContent = d2.toString();
}

function tileClicked(e: Event): void {
    console.log(e);
    const tileElement = e.target as HTMLElement;
    let tileIndex: number = Number(tileElement.textContent) - 1;
    console.log(tileElement.style.backgroundColor)
    if (0 === tileState[tileIndex])
    {
        tileElement.style.backgroundColor = 'green';
        currentSelection[tileIndex] = 1;
        console.log(currentSelection);
        tileState[tileIndex] = 1
    }
    else if (1 === tileState[tileIndex])
    {
        tileElement.style.backgroundColor = 'red';
        currentSelection[tileIndex] = 0;
        console.log(currentSelection);
        tileState[tileIndex] = 0        
    }
    else {
        console.log("Cannot change a tile from a previous roll")
    }
}

function attachEventToRoll(): void {
    const rollElement: HTMLElement = document.getElementById("roll2") as HTMLElement
    rollElement.addEventListener("click", rollDice);
}

function attachEventsToTiles(): void {
    tileState = []
    tiles = []
    currentSelection = []
    for (let i: number = 1; i < 10; ++i)
    {
        let tName: string = `tile${i}`
        const tileElement = document.getElementById(tName);
        tileElement?.addEventListener("click", tileClicked)
        tileState.push(0);
        currentSelection.push(0);
    }
}

attachEventToRoll();
attachEventsToTiles();