"use strict";
let log = console.log;
let gameName = "Guess The Word";
document.title = gameName;
document.querySelector("h1").innerHTML = gameName;
document.querySelector("footer").innerHTML = `${gameName} Game Created With Elzero `;
// loading
let load = document.querySelector(".load");
setTimeout(() => {
    load === null || load === void 0 ? void 0 : load.remove();
}, 2000);
// settings game options
let numberOfTries = 5;
let numberOfLetters = 6;
let currentTry = 1;
//manage words
let wrodToGuess = "";
let words = ["CREATE", "Update", "Delete", "Master", "Branch"];
wrodToGuess = words[Math.floor(Math.random() * words.length)].toLowerCase();
let messageArea = document.querySelector(".message");
function generateInputs() {
    let inputsContainer = document.querySelector(".inputs");
    for (let i = 1; i <= numberOfTries; i++) {
        let tryDiv = document.createElement("div");
        tryDiv.classList.add(`try-${i}`);
        tryDiv.innerHTML = `<span>Try ${i}</span>`;
        if (i !== 1)
            tryDiv.classList.add("disabled-inputs");
        for (let j = 1; j <= numberOfLetters; j++) {
            let input = document.createElement("input");
            input.type = "text";
            input.id = `guess-${i}-letter-${j}`;
            input.setAttribute("maxlength", "1");
            tryDiv.appendChild(input);
        }
        inputsContainer === null || inputsContainer === void 0 ? void 0 : inputsContainer.appendChild(tryDiv);
    }
    (inputsContainer === null || inputsContainer === void 0 ? void 0 : inputsContainer.children[0].children[1]).focus();
    // disable all inputs except first one
    let inputsInDisabledDiv = document.querySelectorAll(".disabled-inputs input");
    inputsInDisabledDiv.forEach((input) => {
        input.disabled = true;
    });
    const inputs = document.querySelectorAll("input");
    inputs.forEach((input, index) => {
        //convert input to upper case
        input.addEventListener("input", function () {
            this.value = this.value.toUpperCase();
            const nextInput = inputs[index + 1];
            if (nextInput)
                nextInput.focus();
        });
        input.addEventListener("keydown", function (event) {
            const currentIndex = Array.from(inputs).indexOf(this);
            if (event.key === "ArrowRight") {
                const nextInput = currentIndex + 1;
                if (nextInput < inputs.length)
                    inputs[nextInput].focus();
            }
            if (event.key === "ArrowLeft") {
                const prevInput = currentIndex - 1;
                if (prevInput >= 0)
                    inputs[prevInput].focus();
            }
        });
    });
}
const guessButton = document.querySelector(".check");
guessButton === null || guessButton === void 0 ? void 0 : guessButton.addEventListener("click", handelGuesses);
console.log(wrodToGuess);
function handelGuesses() {
    console.log(wrodToGuess);
    let successGuess = true;
    for (let i = 1; i <= numberOfLetters; i++) {
        const inputFiled = document.querySelector(`#guess-${currentTry}-letter-${i}`);
        const letter = inputFiled.value.toLowerCase();
        const actualLetter = wrodToGuess[i - 1];
        //game logic
        if (letter === actualLetter && letter !== "") {
            // letter in place
            inputFiled.classList.add("in-place");
        }
        else if (wrodToGuess.includes(letter) && letter !== "") {
            // letter exiest but not in place
            inputFiled.classList.add("not-in-place");
            successGuess = false;
        }
        else {
            // letter not exist
            inputFiled.classList.add("no");
            successGuess = false;
        }
    }
    // check if user win or lose
    let span = document.createElement("span");
    span.appendChild(document.createTextNode(wrodToGuess));
    log(span);
    if (successGuess) {
        span.classList.add("correct");
        messageArea.innerHTML = `Your Wind The word is `;
        messageArea === null || messageArea === void 0 ? void 0 : messageArea.appendChild(span);
    }
    else {
        let span = document.createElement("span");
        span.appendChild(document.createTextNode(wrodToGuess));
        log(span);
        span.classList.add("no");
        messageArea.innerHTML = `Your loas The word is `;
        messageArea === null || messageArea === void 0 ? void 0 : messageArea.appendChild(span);
    }
}
window.onload = function () {
    generateInputs();
};
