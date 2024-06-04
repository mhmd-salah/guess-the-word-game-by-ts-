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
let numberOfHints = 2;
//manage words
let wrodToGuess = "";
let words = ["CREATE", "Update", "Delete", "Master", "Branch"];
wrodToGuess = words[Math.floor(Math.random() * words.length)].toLowerCase();
let messageArea = document.querySelector(".message");
//manage hints
document.querySelector(".hint span").innerHTML = String(numberOfHints);
const getHintButton = document.querySelector(".hint");
getHintButton.addEventListener("click", getHint);
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
    var _a, _b;
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
    if (successGuess) {
        if (numberOfHints == 2) {
            messageArea.innerHTML = `Congratz, Your Win The word is `;
        }
        else {
            messageArea.innerHTML = `Your Win The word is `;
        }
        span.classList.add("correct");
        messageArea === null || messageArea === void 0 ? void 0 : messageArea.appendChild(span);
        //disabled all tryes
        let allTries = document.querySelectorAll(".inputs > div");
        allTries.forEach((tryDiv) => tryDiv.classList.add("disabled-inputs"));
        guessButton.disabled = true;
        guessButton.innerHTML = "Result";
    }
    else {
        (_a = document
            .querySelector(`.try-${currentTry}`)) === null || _a === void 0 ? void 0 : _a.classList.add("disabled-inputs");
        let currentTryInputs = document.querySelectorAll(`.try-${currentTry} input`);
        currentTryInputs.forEach((input) => {
            input.disabled = true;
        });
        currentTry++;
        console.log(currentTry);
        let nextTryInputs = document.querySelectorAll(`.try-${currentTry} input`);
        nextTryInputs.forEach((input) => (input.disabled = false));
        let el = document.querySelector(`.try-${currentTry}`);
        if (el) {
            (_b = document
                .querySelector(`.try-${currentTry}`)) === null || _b === void 0 ? void 0 : _b.classList.remove("disabled-inputs");
            el.children[1].focus();
        }
        else {
            span.classList.add("no");
            messageArea.innerHTML = `Your loas The word is `;
            messageArea === null || messageArea === void 0 ? void 0 : messageArea.appendChild(span);
            guessButton.disabled = true;
        }
    }
}
//handled hint button for add hint for user ;
function getHint() {
    if (numberOfHints > 0) {
        numberOfHints--;
        document.querySelector(".hint span").innerHTML = String(numberOfHints);
    }
    if (numberOfHints === 0) {
        getHintButton.disabled = true;
        getHintButton.classList.add("disabled");
    }
    const enabeldInputs = document.querySelectorAll("input:not([disabled])");
    const emptyEnableInputs = Array.from(enabeldInputs).filter((input) => input.value === "");
    if (enabeldInputs.length > 0) {
        const randomIndex = Math.floor(Math.random() * enabeldInputs.length);
        const randomInput = enabeldInputs[randomIndex];
        const indexToFill = Array.from(enabeldInputs).indexOf(randomInput);
        if (indexToFill !== -1) {
            randomInput.value = wrodToGuess[indexToFill].toUpperCase();
        }
    }
}
function handleBackSpace(e) {
    if (e.key === "Backspace") {
        const inputs = document.querySelectorAll("input:not([disabled])");
        const currentIndex = Array.from(inputs).indexOf(document.activeElement);
        if (currentIndex > 0) {
            const currentInput = inputs[currentIndex];
            const prevInput = inputs[currentIndex - 1];
            currentInput.value = "";
            prevInput.value = "";
            prevInput.focus();
        }
    }
}
document.addEventListener("keydown", handleBackSpace);
window.onload = function () {
    generateInputs();
};
