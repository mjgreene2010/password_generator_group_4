// Retrieving DOM elements from HTML
let password = document.getElementById("generated-password-box");
let range = document.getElementById("range-value");
let rangeOutput = document.getElementById("range-value-output");
let checkbox1 = document.getElementById("criteria1");
let checkbox2 = document.getElementById("criteria2");
let checkbox3 = document.getElementById("criteria3");
let checkbox4 = document.getElementById("criteria4");
let btnGenerate = document.getElementById("btn-generate");
let btnCopy = document.getElementById("btn-copy");

//SELECTING THE CRITERIA

// Array for the criteria that the user selects
let selectedCriteria = [];

// Create an array for each criteria
let specialCharacter = "!@#$%^&*?".split("");
let lowerCase = "abcdefghijklmnopqrstuvwxyz".split("");
let upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
let numeric = "0123456789".split("");

// Listens for when the user chooses the length of the password
range.addEventListener("onchange", function () {
  rangeOutput.innerText = this.target.value;
});

// A helper function: checks to see whether the user has selected and deselected a criteria
let isChecked = (checkbox, criteria) => {
  checkbox.addEventListener("click", function () {
    //if the user checks the criteria, the criteria will be pushed into the selected criteria array
    if (checkbox.checked) {
      selectedCriteria.push(criteria);
    }
    //if the user uncheck the criteria, the criteria will be removed from the array
    if (!checkbox.checked) {
      //an array of array(s)
      selectedCriteria.find((arr, i) => {
        if (arr.includes("a")) selectedCriteria[i] = null;
        selectedCriteria = selectedCriteria.filter((el) => el);
      });
    }
  });
};

isChecked(checkbox1, lowerCase);
isChecked(checkbox2, upperCase);
isChecked(checkbox3, numeric);
isChecked(checkbox4, specialCharacter);

//GENERATING THE PASSWORD

// Array that the password will be stored in
let generatedPassword = [];

// A helper function: checks to see if the selected criteria is in the password,
// if not, the password will be regenerated
let isIncluded = (checkbox, criteria) => {
  if (checkbox.checked) {
    if (!generatedPassword.includes(...criteria)) {
      generatedPassword = [];
      return generatingPassword();
    }
  }
};

//Function that generates the password
const generatingPassword = function () {
  // needed to copy the selected criteria array so i could flatten the array of array(s)
  let selectedCriteriaLoop = selectedCriteria.flat();
  let selectedCriteriaLength = selectedCriteriaLoop.length;
  let passwordLength = range.value;

  //the loop that generates the password
  //use math floor and math random to create a random number to select an element in selected criteria
  //then pushes to the generated password array
  for (let i = 0; i < passwordLength; i++) {
    let random = Math.floor(Math.random() * selectedCriteriaLength);
    generatedPassword.push(selectedCriteriaLoop[random]);
  }

  isIncluded(checkbox1, lowerCase);
  isIncluded(checkbox2, upperCase);
  isIncluded(checkbox3, numeric);
  isIncluded(checkbox4, specialCharacter);

  // uses the join method to turn the generated password into a string
  generatedPassword = generatedPassword.join("");
  password.value = generatedPassword;
  // empty the password array before the next password is generated
  generatedPassword = [];
};

// listens for a click on the generate button to run the generating password function
btnGenerate.addEventListener("click", generatingPassword);

// listens for a click on the copy button to copy the password
btnCopy.addEventListener("click", function () {
  password.select();
  document.execCommand("copy");
});
