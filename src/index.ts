let gameName = "Guess The Word";
document.title = gameName;
document.querySelector("h1")!.innerHTML = gameName;
document.querySelector(
  "footer"
)!.innerHTML = `${gameName} Game Created With Elzero `;

// settings game options
let numberOfTries:number = 5;

