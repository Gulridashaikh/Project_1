const rockButton = document.getElementById("rock");
const paperButton = document.getElementById("paper");
const scissorsButton = document.getElementById("scissors");
const triangle = document.getElementById("triangle");
const playerPickContainer = document.getElementById("player-pick-container");
const housePickContainer = document.getElementById("house-pick-container");
const playerSelection = document.getElementById("player-selection");
const placeholder = document.getElementById("placeholder");
const houseSelection = document.getElementById("house-selection");
const youWinText = document.getElementById("win-text");
const youLoseText = document.getElementById("lose-text");
const drawText = document.getElementById("draw-text");
const playAgainButton = document.getElementById("play-again-button");
const playerscoreValue = document.getElementById("player-score-value");
const housescoreValue = document.getElementById("house-score-value");
const rulesButton = document.getElementById("rules-button");
const rulesModal = document.getElementById("rules-modal");
const modalContent = document.getElementById("modal-content");
const closeIcon = document.getElementById("close-icon");
const resetButton = document.getElementById("reset-button");
let playerscore = Number(localStorage.getItem("playerscore")) || 0;
let housescore = Number(localStorage.getItem("housescore")) || 0;

const makeSelection = (event) => {
    triangle.style.display = "none";

    const clickedItem = event.target.id;
    playerSelection.classList.add(clickedItem);
    // houseSelection.classList.add(clickedItem);

    playerPickContainer.style.display = "block";
    housePickContainer.style.display = "block";

    const options = ["rock", "paper", "scissors"];
    const num = Math.floor(Math.random() * 3);
    let selection = options[num];

    setTimeout(() => {
        placeholder.style.display = "none";
        houseSelection.classList.add(selection);
        houseSelection.style.display = "block";

        const house = selection;
        const player = event.target.id;
        let winner = "house";

        if (house === player) {
            winner = "draw";
        }
        else if (
            (player === "rock" && house === "scissors") ||
            (player === "paper" && house === "rock") ||
            (player === "scissors" && house === "paper")
        ) {
            winner = "player";
        }

        setTimeout(() => {
            playerPickContainer.classList.add("shift-left");
            housePickContainer.classList.add("shift-right");
            if (winner === "player") {
                youWinText.style.display = "block";
                playerSelection.classList.add("winner");
                playerscoreValue.innerHTML = playerscore += 1;
                localStorage.setItem("playerscore", playerscore);
            }else if (winner === "house") {
                youLoseText.style.display = "block";
                houseSelection.classList.add("winner");
                housescoreValue.innerHTML = housescore += 1;
                localStorage.setItem("housescore", housescore);
            }else {
                drawText.style.display = "block";
                }
            playAgainButton.style.display = "block";

            let resetButtonStatus = window
                .getComputedStyle(resetButton)
                .getPropertyValue("display");
            console.log(resetButtonStatus);

            if (playerscore !== 0 && resetButtonStatus == "none") {
                resetButton.style.display = "block";
            }
        }, 500);
    }, 1500);
};

rockButton.addEventListener("click", makeSelection);
paperButton.addEventListener("click", makeSelection);
scissorsButton.addEventListener("click", makeSelection);

const resetGame = () => {
    playerPickContainer.style.display = "none";
    housePickContainer.style.display = "none";
    houseSelection.style.display = "none";
    placeholder.style.display = "block";
    playAgainButton.style.display = "none";
    youLoseText.style.display = "none";
    youWinText.style.display = "none";
    drawText.style.display = "none";
    triangle.style.display = "block";
    playerPickContainer.classList.remove("shift-left");
    housePickContainer.classList.remove("shift-right");
    houseSelection.classList.remove("rock", "paper", "scissors", "winner");
    playerSelection.classList.remove("rock", "paper", "scissors", "winner");
};

playAgainButton.addEventListener("click", resetGame);

const showRules = () => {
    rulesModal.style.display = "block";
};

const closeRules = () => {
    rulesModal.style.display = "none";
};

rulesButton.addEventListener("click", showRules);
closeIcon.addEventListener("click", closeRules);

window.onclick = function (event) {
    if (event.target == rulesModal) {
        closeRules();
    }
};

const setplayerScore = () => {
    playerscoreValue.innerHTML = playerscore;
};
const sethouseScore = () => {
    housescoreValue.innerHTML = housescore;
};

playerscoreValue.onload = setplayerScore();
housescoreValue.onload = sethouseScore();

const resetplayerScore = () => {
    playerscore = 0;
    localStorage.setItem("playerscore", playerscore);
    playerscoreValue.innerHTML = playerscore;
    resetButton.style.display = "none";
};

resetButton.addEventListener("click", resetplayerScore);

const resethouseScore = () => {
    housescore = 0;
    localStorage.setItem("housescore", housescore);
    housescoreValue.innerHTML = housescore;
    resetButton.style.display = "none";
};

resetButton.addEventListener("click", resethouseScore);


const showReset = () => {
    if (playerscore !=0 && housescore != 0) {
        resetButton.style.display = "block";
    }
};

resetButton.onload = showReset();