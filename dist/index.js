"use strict";
let gameName = "Guess The Word";
document.title = gameName;
document.querySelector("h1").innerHTML = gameName;
document.querySelector("footer").innerHTML = `${gameName} Game Created With Elzero `;
// settings game options
let numberOfTries = 5;
let numberOfLetters = 6;
let currentTry = 1;
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
    inputsInDisabledDiv.forEach((input) => { input.disabled = true; });
}
window.onload = function () {
    generateInputs();
};
