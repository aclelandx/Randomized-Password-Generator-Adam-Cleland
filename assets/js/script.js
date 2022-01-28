// Assignment Code
let numberOfCharacters = prompt(`How many characters would you like your new password to be? (The password must be longer than 8 characters, and no more than 128.)`, `Character Amount`);

if (numberOfCharacters >= 8 && numberOfCharacters <= 128) {
  console.log(`you have chosen to have your new password be ` + numberOfCharacters + ` long`);
} else if (isNaN(numberOfCharacters)) {
  console.log(`You need to choose a number. (example: 47 not fourty-seven)`);
} else {
  console.log('incorrect selection, the password cannot be shorter than 8 or longer than 128 characters');
};

// sanity checker
//console.log(numberOfCharacters); 




const generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
