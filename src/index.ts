let gameName = "Guess The Word";
document.title = gameName;
document.querySelector("h1")!.innerHTML = gameName;
document.querySelector(
  "footer"
)!.innerHTML = `${gameName} Game Created With Elzero `;

// settings game options
let numberOfTries: number = 5;
let numberOfLetters = 6;
let currentTry = 1;

function generateInputs() {
  let inputsContainer = document.querySelector(".inputs");
  for (let i = 1; i <= numberOfTries; i++) {
    let tryDiv = document.createElement("div") as HTMLDivElement;
    tryDiv.classList.add(`try-${i}`);
    tryDiv.innerHTML = `<span>Try ${i}</span>`;
    if (i !== 1) tryDiv.classList.add("disabled-inputs");
    for (let j = 1; j <= numberOfLetters; j++) {
      let input = document.createElement("input");
      input.type = "text";
      input.id = `guess-${i}-letter-${j}`;
      input.setAttribute("maxlength", "1");
      tryDiv.appendChild(input);
    }
    inputsContainer?.appendChild(tryDiv);
  }
  (inputsContainer?.children[0].children[1] as HTMLInputElement).focus();
  // disable all inputs except first one
  let inputsInDisabledDiv = document.querySelectorAll(".disabled-inputs input");
  inputsInDisabledDiv.forEach((input) => {
    (input as HTMLInputElement).disabled = true;
  });
  const inputs = document.querySelectorAll("input")
  inputs.forEach((input,index) => {
    //convert input to upper case
    input.addEventListener("input", function () {
      this.value = this.value.toUpperCase();
      const nextInput = inputs[index + 1]
      if(nextInput)nextInput.focus()
    });
  });
}

window.onload = function () {
  generateInputs();
};
