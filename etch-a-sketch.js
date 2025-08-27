"use strict";

const newGridBtn = document.querySelector(".new-grid-btn");
const grid = document.querySelector(".grid");
const gridSizeDisplay = document.querySelector(".grid-size");
const blackBtn = document.querySelector(".color-btn-black");
const randomColorBtn = document.querySelector(".color-btn-random");
const clearBtn = document.querySelector(".clear-btn");
let colorMode = ""; // determines which style (black or random) to color a square

// generate new grid based on user input
function generateNewGrid() {
    let gridSize = +prompt("Please enter the size of the grid (min: 1, max: 100): ");

    // validate user input
    while (isNaN(gridSize) || gridSize < 1 || gridSize > 100) {
        gridSize = +prompt("Invalid input. Please enter a number in the range of 1 - 100: ");
    }

    // reset the grid to default
    removeGrid();

    // create the grid
    for (let rowIndex = 0; rowIndex < gridSize; rowIndex++) {
        const row = document.createElement("div");
        row.classList.add("row");

        for (let squareCnt = 0; squareCnt < gridSize; squareCnt++) {
            const square = document.createElement("div");
            square.classList.add("square");
            row.appendChild(square);
        }

        grid.appendChild(row);
    }

    // update the grid size display
    gridSizeDisplay.textContent = `${gridSize} X ${gridSize}`;
}

// clear the grid
function clearGrid() {
    const rows = grid.children;

    for (let row of rows) {
        const squares = row.children;

        for (let square of squares) {
            square.style.backgroundColor = "";
            square.style.opacity = 1;
        }
    }
}

// removes the grid from display
function removeGrid() {
    while (grid.firstChild) {
        grid.firstChild.remove();
    }
} 

// add highlight to the selected button and set color mode
function setColorStyle() {
    const selectedBtn = this;
    const nonSelectedBtn = selectedBtn.textContent === "Black" ? randomColorBtn : blackBtn;
    colorMode = selectedBtn.textContent;

    // add highlight
    if (!selectedBtn.classList.contains("highlight")) {
        selectedBtn.classList.toggle("highlight");
    }

    // remove highlight
    if (nonSelectedBtn.classList.contains("highlight")) {
        nonSelectedBtn.classList.toggle("highlight");
    }
}

// color the grid square based on the color mode (black or random color)
function colorSquare(event) {
    const BLACK  = "rgb(0, 0, 0)";
    const DEFAULT_OPACITY = 0.1;
    const MAX_OPACITY = 1;
    const square = event.target;    

    if (square.classList.contains("square") && colorMode !== "") {
        const selectedColor = colorMode === "Black" ? BLACK : getRandomColor();

        if (square.style.backgroundColor === "") {
            square.style.backgroundColor = selectedColor;
            square.style.opacity = DEFAULT_OPACITY;
        }
        else if (square.style.opacity < MAX_OPACITY) {
            square.style.opacity = Math.min(Number(square.style.opacity) + 0.1, MAX_OPACITY);
        }        
    }    
}

// return a random rgba color string
function getRandomColor() {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);

    return `rgb(${red}, ${green}, ${blue})`;
}

newGridBtn.addEventListener("click", generateNewGrid);
grid.addEventListener("mouseover", colorSquare);

blackBtn.addEventListener("click", setColorStyle);
randomColorBtn.addEventListener("click", setColorStyle);
clearBtn.addEventListener("click", clearGrid);