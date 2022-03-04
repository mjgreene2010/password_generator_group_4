let password = document.getElementById("generated-password-box");
let range = document.getElementById("range-value");
let rangeOutput = document.getElementById("range-value-output");
let checkbox1 = document.getElementById("criteria1");
let checkbox2 = document.getElementById("criteria2");
let checkbox3 = document.getElementById("criteria3");
let checkbox4 = document.getElementById("criteria4");
let btnGenerate = document.getElementById("btn-generate");
let btnCopy = document.getElementById("btn-copy");

let selectedCriteria = [];

let specialCharacter = "!@#$%^&*?".split("");
let lowerCase = "abcdefghijklmnopqrstuvwxyz".split("");
let upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
let numeric = "0123456789".split("");

range.addEventListener("onchange", function () {
  rangeOutput.innerText = this.target.value;
});

checkbox1.addEventListener("click", function () {
  if (checkbox1.checked) {
    selectedCriteria.push(lowerCase);
  }

  if (!checkbox1.checked) {
    selectedCriteria.find((arr, i) => {
      if (arr.includes("a")) selectedCriteria[i] = null;
      selectedCriteria = selectedCriteria.filter((el) => el);
    });
  }
});

checkbox2.addEventListener("click", function () {
  if (checkbox2.checked) {
    selectedCriteria.push(upperCase);
  }
  if (!checkbox2.checked) {
    selectedCriteria.find((arr, i) => {
      if (arr.includes("A")) selectedCriteria[i] = null;
      selectedCriteria = selectedCriteria.filter((el) => el);
    });
  }
});

checkbox3.addEventListener("click", function () {
  if (checkbox3.checked) {
    selectedCriteria.push(numeric);
  }
  if (!checkbox3.checked) {
    selectedCriteria.find((arr, i) => {
      if (arr.includes("0")) selectedCriteria[i] = null;
      selectedCriteria = selectedCriteria.filter((el) => el);
    });
  }
});

checkbox4.addEventListener("click", function () {
  if (checkbox4.checked) {
    selectedCriteria.push(specialCharacter);
  }
  if (!checkbox4.checked) {
    selectedCriteria.find((arr, i) => {
      if (arr.includes("!")) selectedCriteria[i] = null;
      selectedCriteria = selectedCriteria.filter((el) => el);
    });
  }
});

let generatedPassword = [];

const generatingPassword = function () {
  let selectedCriteriaLoop = selectedCriteria.flat();
  let selectedCriteriaLength = selectedCriteriaLoop.length;
  let passwordLength = range.value;

  for (let i = 0; i < passwordLength; i++) {
    let random = Math.floor(Math.random() * selectedCriteriaLength);
    generatedPassword.push(selectedCriteriaLoop[random]);
  }

  if (checkbox1.checked) {
    if (!generatedPassword.includes(...lowerCase)) {
      generatedPassword = [];
      return generatingPassword();
    }
  }
  if (checkbox2.checked) {
    if (!generatedPassword.includes(...upperCase)) {
      generatedPassword = [];
      return generatingPassword();
    }
  }
  if (checkbox3.checked) {
    if (!generatedPassword.includes(...numeric)) {
      generatedPassword = [];
      return generatingPassword();
    }
  }
  if (checkbox4.checked) {
    if (!generatedPassword.includes(...specialCharacter)) {
      generatedPassword = [];
      return generatingPassword();
    }
  }

  generatedPassword = generatedPassword.join("");
  password.value = generatedPassword;
  generatedPassword = [];
};

btnGenerate.addEventListener("click", generatingPassword);

btnCopy.addEventListener("click", function () {
  password.select();
  document.execCommand("copy");
});

//
