//get grid element and button element from HTML document
const gridElem = document.querySelector(".grid");
const btnElem = document.querySelector("button");
//Array that will contain the mines
let mines = [];
//Step counter
let steps;
//Element tat will contain the final message
const msgElem = document.querySelector("h2");


//add an EventListener in the button
btnElem.addEventListener("click", function () {
    //Clears the gridElem from possible cells
    gridElem.innerHTML = "";
    //Clears the msgElem form possible messages
    msgElem.innerHTML = "";
    //Initialize the steps counter
    steps = 0;
    //Gets the number of cells
    numCell = getCellNumber();

    //Array with mines
    mines = buryMines(numCell);

    //Gets the level class based on the number of cells
    let classLevel = getLevelClass(numCell);
    
    //Generates the cells
    generateCells(numCell, classLevel, gridElem);
});

/*************************************************/
//FUNCTIONS

/**
 * Description: this function gets a value from the select element from the HTML document
 * @returns {Number}
 */
function getCellNumber() {
    const numberCell = document.querySelector("#lev");
    return parseInt(numberCell.value);
}

/**
 * Description: this function initializes a flag to false. the flag controls if the game is won or lost and creates a list with all the cell elements. The function controls if the mines array includes the clicked cell number, if it is the game is lost, else increments a step counter for each correct step. When the number of steps is equal to the number of cells minus the number of mines the flag changes to true. In any case it goes to the endGame function.
 * 
 */
function clickOnCell() {
    let flag = false;
    let cellList = document.querySelectorAll(".cell");
    if(mines.includes(parseInt(this.innerText))){
        endGame(flag, steps, mines, cellList);
    } else {
        this.classList.add("lightblue");
        steps++;
        if(steps === (numCell - mines.length)){
            flag = true;
            endGame(flag, steps, mines, cellList);
        }
    }
}

/*
* Description: this function takse a number as a parameter and returns a name of a class 
* @param {number}
* @retruns {String}
*/
function getLevelClass(num) {
    switch (num) {
        case 100:
            return "easy";
        case 81:
            return "medium";
        case 49:
            return "hard";
        default:
            break;
    }
}

/** 
 * Description: this function generates a number of cells passed by parameter with the level class and the cell class. Adds an eventListener and than appends it in the HTML element grid 
 * @params {number, String, HTML element}
 * 
 */
function generateCells(number, level, grid) {
    for (let i = 0; i < number; i++) {
        let cellElem = document.createElement("div");
        cellElem.classList.add("cell");
        cellElem.classList.add(level);
        cellElem.innerText = i + 1;
        cellElem.addEventListener("click", clickOnCell);
        grid.append(cellElem);
    }
}


/**
 * Description: this function generates 16 non-repeating random numbers and puts them in an array. 
 * @param {number} numberFields
 * @returns {Array}
 */
function buryMines(numberFields) {
    let numberMines = 16;
    let arrayMines = [];
    let mine;

    do { 
        mine = Math.floor(Math.random() * numberFields) + 1;
        if (!arrayMines.includes(mine)) {
            arrayMines.push(mine);
        }

    } while (arrayMines.length !== numberMines);
    return arrayMines;   
}

/**
 * Description: this function is called when the game is finished. It sets a void message and controls if the flag passed by parameter is true. If the flag is true removes every eventListener from every cell, prepares a message and inners it in the msgElem. If the flag is false removes the eventListener from every cell and sets the background color red for every cell that contains a number included in the arrayMines, prepares the message and inners it in the msgElem.
 * @param {Boolean} bool
 * @param {number} numberSteps
 * @param {Array} arrayMines
 * @param {Node} fields
 */
function endGame(bool, numberSteps, arrayMines, fields) {
    let message = "";
    if (bool) {
        for (let i = 0; i < fields.length; i++) {
            fields[i].removeEventListener("click", clickOnCell);
         } 
         message = `Hai vinto! Hai fatto ${numberSteps} passi.`;
         msgElem.innerHTML = message;
    } else {

        for (let i = 0; i < fields.length; i++) {
            fields[i].removeEventListener("click", clickOnCell);
             if (arrayMines.includes(parseInt(fields[i].innerText))) {
                 fields[i].style.background = "red";
             }
        }
        message = `Hai Perso! Hai fatto ${numberSteps} passi.`;
        msgElem.innerHTML = message;
    }
}