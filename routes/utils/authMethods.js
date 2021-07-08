//brings in validator middleware methods
const {
  isEmpty,
  isStrongPassword,
  isEmail,
  isAlpha,
  isAlphanumeric,
} = require("validator");

//checks if input is empty
const checkIsEmpty = (target) => (isEmpty(target) ? true : false);
//checks if password is strong enough
const checkIsStrongPassword = (password) =>
  isStrongPassword(password) ? true : false;
//checks if input is in email format
const checkIsEmail = (email) => (isEmail(email) ? true : false);
//checks if input is letters
const checkIsAlpha = (target) => (isAlpha(target) ? true : false);
//checks if input is alphanumeric
const checkIsAlphanumeric = (target) => (isAlphanumeric(target) ? true : false);
//exports all functions
module.exports = {
  checkIsEmpty,
  checkIsStrongPassword,
  checkIsEmail,
  checkIsAlpha,
  checkIsAlphanumeric,
};
