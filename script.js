
const gameboard = (function ()  {

    const board = ["-","-","-","-","-","-","-","-","-"]

    const updateBoard = (index,marker) => (
        board[index] = marker
    );

    const reset = () => {
        for (let i = 0; i < board.length; i++) {
            board[i] = "-"
        }
        displayController.render()
    }

    return {board, updateBoard, reset};


})();

const playerOne = {
    name: "Player X",
    marker: "X"
}

const playerTwo = {
    name: "Player O",
    marker: "O"
}

const displayController = ( function() {
    
    const form = document.querySelector('form');
    const playerOneInput = document.querySelector('form #one')
    const playerTwoInput = document.querySelector('form #two')


    const messageElement = document.querySelector('.message')
    const gridItems = document.querySelectorAll('.grid-container button')
    const restartBtn = document.querySelector('.restart')

    form.addEventListener("click", (e) => {
        e.preventDefault()
        playerOne.name = playerOneInput.value
        playerTwo.name = playerTwoInput.value
    })

    const render = () => {
        for (let i = 0; i < gridItems.length; i++ ) {
            gridItems[i].textContent = gameboard.board[i]
        }
    }

    render()

    gridItems.forEach((button) => {
        button.addEventListener("click", () => {
            if (button.textContent != "X" && button.textContent != "O" && gameController.getGameOver() == false) {
            gameboard.updateBoard(button.getAttribute('id'),currentPlayer.marker)
            gameController.playTurn()
            // button.textContent = gameboard.board[button.getAttribute('id')];
            render()
            }
        })
    })

    restartBtn.addEventListener('click', () => {
        gameboard.reset()
        gameController.reset()
    })

    const setMessage = (message) => {
        messageElement.textContent = message;
    }
    

    return {
        render,
        setMessage
    }


})();

const gameController = (function () {

    currentPlayer = playerOne;
    gameOver = false;
    let turn = 0;

    const getGameOver = () => gameOver

    displayController.setMessage(
        `${playerOne.name}'s Turn!`
    )


    const playTurn = () => {
        determineWinner();
        if (gameOver != true) {
            changeCurrentPlayer();
            displayController.setMessage(
                `${currentPlayer.name}'s Turn!`
            )
        }
        

    }

    function determineWinner() {
        const winningPositions =
        [[0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]];

        winningPositions.forEach(position => {
            if (gameboard.board[position[0]] == currentPlayer.marker &&
                gameboard.board[position[1]] == currentPlayer.marker &&
                gameboard.board[position[2]] == currentPlayer.marker) {
                    gameOver = true;
                    displayController.setMessage(
                        `${currentPlayer.name} has won!`
                    )

                }
        })

        if (gameboard.board.every(elem => (elem == "X" || elem == "O"))) {
            gameOver = true;
            displayController.setMessage(`Tie!`)
        }

    }

    // function endGame() {
    //     // if (gameboard.board.every(elem => (elem == "X" || elem == "O"))) {
    //     //     displayController.setMessage(
    //     //         `Tie!`
    //     //     )
    //     // } else {
    //     //     displayController.setMessage(
    //     //         `${currentPlayer.name} has won!`
    //     //     )
    //     }
    // }

    function changeCurrentPlayer() {
        if (currentPlayer == playerOne) {
            currentPlayer = playerTwo;
        } else {
            currentPlayer = playerOne;
        }
    }

    const reset = () => {
        gameOver = false;
        changeCurrentPlayer();
        displayController.setMessage(
            `${currentPlayer.name}'s Turn!`
        )
    }

    return {
        playTurn, reset, getGameOver
    }
    

})();