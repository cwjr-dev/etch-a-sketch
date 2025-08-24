"use strict";

const newGridBtn = document.querySelector(".new-grid-btn");
const grid = document.querySelector(".grid");
const gridSizeDisplay = document.querySelector(".grid-size");

// generate new grid based on user input
function generateNewGrid() {
    let gridSize = +prompt("Please enter the size of the grid (min: 1, max: 100): ");

    // validate user input
    while (isNaN(gridSize) || gridSize < 1 || gridSize > 100) {
        gridSize = prompt("Invalid input. Please enter a number in the range of 1 - 100: ");
    }

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

newGridBtn.addEventListener("click", generateNewGrid);