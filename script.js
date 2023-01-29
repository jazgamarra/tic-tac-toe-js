
// Player 1 stats the game 
turn = 0 

// Tic tac toe winner combos 
const winnerCombos = [
    ['0', '1', '2'], ['3', '4', '5'], ['6', '7', '8'],
    ['0', '3', '6'], ['1', '4', '7'], ['2', '5', '8'], 
    ['0', '4', '8'], ['2', '4', '6']            
]

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
            alert(`Ganó el jugador ${player}`);
            break;
        }
    }
}



// Checks boxes played by each player
const checkPlays = () => {
    let boxesPlayer1 = [];
    let boxesPlayer2 = [];

    // Assign the boxes played by each player
    boxes.forEach((box) => {
        if (box.getAttribute('played') != null) {
            if (box.getAttribute('played') == 0) {
                boxesPlayer1.push(box.getAttribute('number'));
            } else {
                boxesPlayer2.push(box.getAttribute('number'));
            }
        }
    });

    console.log('Jugadas', {boxesPlayer1}, {boxesPlayer2});

    // Check the winner combos 
    checkWinner(boxesPlayer1, 1);
    checkWinner(boxesPlayer2, 2);
}

// Onclock function that changes the color of the box 
const onClick = (event) => {
    if (event.target.getAttribute('played') == null) {
        // The color changes depending on the turn
        color = (turn == 0 ) ? "player1" : "player2";

        // Box changes color and is marked as played
        box = event.target;
        box.classList.toggle(color);
        box.setAttribute('played', turn);

        // Check if there is a winner
        checkPlays(); 

        // Turn changes
        turn = (turn == 0) ? turn = 1 : turn = 0; 

    }
    
}

// Seleccionar los elementos del DOM
boxes = document.querySelectorAll(".box");

// Agregar el evento click a cada caja
boxes.forEach((box) => {
    box.addEventListener('click', onClick);
});     