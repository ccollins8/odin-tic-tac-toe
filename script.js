
const gameboard = (function ()  {

    const board = ["-","-","-","-","-","-","-","-","-"]

    const updateBoard = (index,marker) => (
        board[index] = marker
    );

    const reset = () => {
        for (let i = 0; i < board.length; i++) {
            board[i] = ""
        }
    }

    return {board, updateBoard, reset};


})();

const playerOne = {
    name: "Tim",
    marker: "X"
}

const playerTwo = {
    name: "jenn",
    marker: "O"
}

const displayController = ( function() {
    
    const messageElement = document.querySelector('.message')
    const gridItems = document.querySelectorAll('.grid-container button')

    const render = () => {
        for (let i = 0; i < gridItems.length; i++ ) {
            gridItems[i].textContent = gameboard.board[i]
        }
    }

    render()

    const buttons = document.querySelectorAll('button')

    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            gameboard.updateBoard(button.getAttribute('id'),currentPlayer.marker)
            gameController.playTurn()
            // button.textContent = gameboard.board[button.getAttribute('id')];
            render()
        })
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

    // const play = () => {
    //     while (gameOver == false && turn < 8) {
    //         playTurn();
    //         turn++;
    //     }
    // }

    const playTurn = () => {
        // const choice = prompt(`Your turn ${currentPlayer.name}`)
        // gameboard.updateBoard(choice,currentPlayer.marker)
        // alert(`${gameboard.board.slice(0,3)}\n${gameboard.board.slice(3,6)}\n${gameboard.board.slice(6,9)}
        // `)
        determineWinner();
        if (gameOver == true) {
            endGame();
        } else {
            changeCurrentPlayer();

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
                }
        })
    }

    function endGame() {
        // alert(`${currentPlayer.name} has won!`)
        displayController.setMessage(
            `${currentPlayer.name} has won!`
        )
        gameboard.reset()
        // displayController.reset()
    }

    function changeCurrentPlayer() {
        if (currentPlayer == playerOne) {
            currentPlayer = playerTwo;
        } else {
            currentPlayer = playerOne;
        }
    }

    return {
        playTurn
    }
    

})();