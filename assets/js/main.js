// DOM elements 
const boxes = document.querySelectorAll(".box");
const newGame = document.querySelector("#new-game");
const plays = document.querySelector(".turn");
const btnComputer = document.querySelector("#computer");

// Player 1 starts the game 
let turn = 1
let computer = false; 


// Tic tac toe winner combos 
const winnerCombos = [
    ['1', '2', '3'],  
    ['4', '5', '6'], 
    ['7', '8', '9'],
    ['1', '4', '7'],
    ['2', '5', '8'],
    ['3', '6', '9'],
    ['1', '5', '9'],
    ['3', '5', '7']    
]

// New game function
const playNewGame =  () => {
    boxes.forEach((box) => {
        box.classList.remove('player1');
        box.classList.remove('player2');
        box.removeAttribute('played');
    });
} 

// Verifies if the player has won
const checkWinner = (boxesPlayer, player) => {
    for (let i = 0; i < winnerCombos.length; i++) {
        let count = 0;
        for (let j = 0; j < boxesPlayer.length; j++) {
            if (winnerCombos[i].includes(boxesPlayer[j])) {
                count++;
            }
        }
        if (count == 3) {
            alert(`Player ${player} has won! `);
            playNewGame(); 
        }
    }
}
// Assign the boxes played by each player
const playedBoxes = (boxesPlayer1, boxesPlayer2) => {
    boxes.forEach((box) => {
        if (box.getAttribute('played') != null) {
            if (box.getAttribute('played') == 1) {
                boxesPlayer1.push(box.getAttribute('number'));
            } else {
                boxesPlayer2.push(box.getAttribute('number'));
            }
        }
    });

    console.log('Jugadas', {boxesPlayer1}, {boxesPlayer2});
    return boxesPlayer1.concat(boxesPlayer2);

}
// Checks boxes played by each player
const checkPlays = () => {
    let boxesPlayer1 = [];
    let boxesPlayer2 = [];

    // Assign the boxes played by each player
    playedBoxes(boxesPlayer1, boxesPlayer2)

    // Check the winner combos 
    checkWinner(boxesPlayer1, 1);
    checkWinner(boxesPlayer2, 2);

}

// Computer plays
const computerPlay = () => {
    // Select a random not checked box 
    let validPlay = false;

    while (!validPlay) {
        let random = Math.floor(Math.random() * 9) + 1;
        let box = document.querySelector(`[number="${random}"]`);
        if (box.getAttribute('played') == null) {
            validPlay = true;
            box.click();
        }
    }
}

// Onclock function that changes the color of the box 
const onClick = (event) => {
    if (event.target.getAttribute('played') == null) {
        // The color changes depending on the turn
        color = (turn == 1 ) ? "player1" : "player2";

        // Box changes color and is marked as played
        box = event.target;
        box.classList.toggle(color);
        box.setAttribute('played', turn);

        // Check if there is a winner
        checkPlays(); 

        // Turn changes
        changeTurn(); 

        // Computer plays
        if (computer && turn == 2) {
            computerPlay();
        }
        
    }
    
}



// Change turn between players
const changeTurn = () => {
    turn = (turn == 1) ? turn = 2 : turn = 1;
    let text = (computer && turn==2) ? 'Computer plays!' : `Player ${turn} plays!`;
    plays.innerHTML = text; 
};


// Events
boxes.forEach((box) => {
    box.addEventListener('click', onClick);
});     
newGame.addEventListener('click', playNewGame);
btnComputer.addEventListener('click', () => {
    newGame.click(); 
    alert('Play with the computer!'); 
    computer = true;
}); 