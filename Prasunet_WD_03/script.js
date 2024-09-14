let boxes = document.querySelectorAll(".game-box");
let restartbtn = document.querySelector(".restart-btn");
let newgamebtn = document.querySelector(".new-game-btn");
let messagecon = document.querySelector(".message-container");
let gamemessage = document.querySelector(".game-message");

let count = 0;
let turnO = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O";
            turnO = false;
        } else {
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;
        count++;

        let isWinner = checkWinner();

        if (count === 9 && !isWinner) {
            gameDraw();
        }
    });
});

const gameDraw = () => {
    gamemessage.innerText = `Game Was Draw!`;
    messagecon.classList.remove("hide");
    disableBoxes();
};

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

const showWinner = (winner) => {
    gamemessage.innerText = `Congrats, Winner is ${winner}`;
    messagecon.classList.remove("hide");
    disableBoxes();
};

const resetGame = () => {
    turnO = true;
    count = 0;
    enableBoxes();
    messagecon.classList.add("hide");
};

const checkWinner = () => {
    for (let pattern of winningConditions) {
        let position1 = boxes[pattern[0]].innerText;
        let position2 = boxes[pattern[1]].innerText;
        let position3 = boxes[pattern[2]].innerText;

        if (position1 !== "" && position2 !== "" && position3 !== "") {
            if (position1 === position2 && position2 === position3) {
                showWinner(position1);
                return true;
            }
        }
    }
    return false;
};

newgamebtn.addEventListener("click", resetGame);
restartbtn.addEventListener("click", resetGame);