"use strict";
let gameName = "Guess The Word";
document.title = gameName;
document.querySelector("h1").innerHTML = gameName;
document.querySelector("footer").innerHTML = `${gameName} Game Created With Elzero `;
// loading
let load = document.querySelector(".load");
console.log(load);
setTimeout(() => {
    load === null || load === void 0 ? void 0 : load.remove();
}, 2000);
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
window.onload = function () {
    generateInputs();
};
