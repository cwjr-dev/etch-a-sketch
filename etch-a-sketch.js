"use strict";

const newGridBtn = document.querySelector(".new-grid-btn");
const grid = document.querySelector(".grid");
const gridSizeDisplay = document.querySelector(".grid-size");
const blackBtn = document.querySelector(".color-btn-black");
const randomColorBtn = document.querySelector(".color-btn-random");
const clearBtn = document.querySelector(".clear-btn");
let colorStyle; // black or random

// generate new grid based on user input
function generateNewGrid() {
    let gridSize = +prompt("Please enter the size of the grid (min: 1, max: 100): ");

    // validate user input
    while (isNaN(gridSize) || gridSize < 1 || gridSize > 100) {
        gridSize = prompt("Invalid input. Please enter a number in the range of 1 - 100: ");
    }

    // clear the current grid
    clearGrid();

    // create the grid
    for (let row = 0; row < gridSize; row++) {
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
    while (grid.firstChild) {
        grid.firstChild.remove();
    }

    // reset grid size display to default message
    gridSizeDisplay.textContent = 'Click "Create a New Grid" to generate a new grid. You can enter the number of squares per side when prompted.';
}

// add border to the selected button and set color style
function setColorStyle() {
    const selectedBtn = this;
    const unSelectedBtn = selectedBtn.textContent === "Black" ? randomColorBtn : blackBtn;

    // set the border on the selected button
    if (!selectedBtn.classList.contains("selected")) {
        selectedBtn.classList.toggle("selected");
        colorStyle = selectedBtn.textContent;
    }

    // remove the border from the selected button
    if (unSelectedBtn.classList.contains("selected")) {
        unSelectedBtn.classList.toggle("selected");
    }
}

// color the grid square based on the color style (black or random color)
function colorSquare(event) {
    const element = event.target;

    if (element.classList[0] === "square") {
        element.style.backgroundColor = "black";
    }

    
}

newGridBtn.addEventListener("click", generateNewGrid);
grid.addEventListener("mouseover", colorSquare);
blackBtn.addEventListener("click", setColorStyle);
randomColorBtn.addEventListener("click", setColorStyle);
clearBtn.addEventListener("click", clearGrid);