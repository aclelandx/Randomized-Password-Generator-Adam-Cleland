// creating an object to hold all the information for the users selections on how they would like the password to be formatted.
let userSelections = {
  characterLength: undefined,
  lowerCase: undefined,
  upperCase: undefined,
  special: undefined,
  numbers: undefined,
};

// Defining the base characters to be used; and then converting it into their own arrays.
let characterSet = {
  lowerCase: `abcdefghijklmnopqrstuvwxyz`.toLowerCase(),
  upperCase: `abcdefghijklmnopqrstuvwxyz`.toUpperCase(),
  numbers: `0123456789`,
  special: `!"#$%&'()*+,-./:;<=>?@][^_{|}~`
};

const arraySet = {
  lowerCase: characterSet.lowerCase.split(``),
  upperCase: characterSet.upperCase.split(``),
  numbers: characterSet.numbers.split(``),
  special: characterSet.special.split(``)
};

// used as undefined variables to be filled out for the final output.
let masterArray = [];
let randomPassword = ``;

// Allows the user to select which characters they would like their new password to contain, along with the length of said password.
function selectionsInterface() {
  //resets the master array to clear out previous selections
  masterArray = [];
  let lengthSelection = parseInt(prompt(`How many characters would you like your new password to be? (The password must be longer than 8 characters, and no more than 128.)`));

  // Checks to see if the input provided fits into the parameters.
  if (lengthSelection >= 8 && lengthSelection <= 128 && lengthSelection !== isNaN(lengthSelection)) { 
    userSelections.characterLength = lengthSelection;
    window.alert(`you have chosen to have your new password be ` + lengthSelection + ` characters long.`);
    oneRequired();

    // Displays an error message when the input was outside of the value range, then redirects to the input again.
  } else if (lengthSelection < 8 || lengthSelection > 128) {
    window.alert('Invalid selection, the password cannot be shorter than 8 or longer than 128 characters');
    selectionsInterface();

    // Displays an error message when the input was not a number and closes the document. Also happens when cancel is selected.
  } else if (isNaN(lengthSelection)) {
    window.alert(`This Requires a valid input`);
    return;
  }; return;
};

// updates global object to match choices.
function oneRequired() {
  // Changes the values inside the object userSelections to true or false base on user input.
  userSelections.lowerCase = characterType(`Lower-case Characters`, `(Example : qwerty)`, arraySet.lowerCase);
  userSelections.upperCase = characterType(`Upper-case Characters`, `(Example : QWERTY)`, arraySet.upperCase);
  userSelections.numbers = characterType(`Numbers`, `(Example : 12345)`, arraySet.numbers);
  userSelections.special = characterType(`Special Characters`, `(Example : !@#$%^&*`, arraySet.special);

  // Checks to make sure that the user has input at least one of the character types; provides the question if they would still like to generate a password, then re-directs to the correct path corresponding to their selection.
  if (userSelections.lowerCase === false && userSelections.upperCase === false && userSelections.numbers === false && userSelections.special === false) {
    window.alert(`You have to select at least one character type to generate a password`);
    if (window.confirm(`Would you still like to Generate a Password?`)) {
    oneRequired();
    };
  };
};

// Provides windows that allow the user to specify which kind of data they would like in their password. 
function characterType(charTypeName, example, arrayChoice) {
  let choice = confirm(`Would you like to include ` + charTypeName + ` in your password?` + example);

  // Adds the users selected choices into the masterArray variable.
  if (choice === true) {
    masterArray.unshift(arrayChoice);
    console.log();
  };
  return choice;
};

// Mathematical formula to pick a size at random
function mathRandomizeSelection(max) {
  return Math.round(Math.random() * max);
};

// Resets the current value of randomPassword to blank; flattens the masterArray to all be in one line then picks the amount of integers specified by the user and adds them to the randomPassword output
function generatePassword() {
  randomPassword = ``;
  masterArray = masterArray.flat(4);
  let integerMax = masterArray.length;
  for (var i = 0; i < userSelections.characterLength; i++) {
    let randomInteger = masterArray[mathRandomizeSelection(integerMax)];
    randomPassword += randomInteger;
  }
  return randomPassword;
};

// runs the generate password function then applies the information to the HTML document.
function writePassword() {
  generatePassword();
  const passwordText = document.querySelector("#password");
  let password = randomPassword;
  passwordText.value = password;
};
// Defining the buttons that are located on the HTML page.
const $generateBtn = document.querySelector("#generate");
const $parametersBtn = document.querySelector(`#set-parameters`);

// Defining the functions that will be put into action when the buttons are clicked via event listener.
$generateBtn.addEventListener(`click`, writePassword);
$parametersBtn.addEventListener(`click`, selectionsInterface);