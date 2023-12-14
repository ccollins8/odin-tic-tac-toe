
const gameboard = (function ()  {

    const board = ["1","2","3","4","5","6","7","8","9"]

    const updateBoard = (index,marker) => (
        board[index] = marker
    );

    return {board, updateBoard};


})();

const playerOne = {
    name: "Tim",
    marker: "X"
}

const playerTwo = {
    name: "jenn",
    marker: "O"
}

const game = (function () {



})();