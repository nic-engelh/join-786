/**
 * function generates 10 char long string with random numbers and characters
 * 
 * @param {number} [length=10]
 * @pram {string} [allowed='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'] 
 * @return {string}
 */
function randomString(length = 10, allowed = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789") {
    let result = ""
    for (let i = 0; i < length; i++) {
      result += allowed.charAt(Math.floor(Math.random() * allowed.length))
    }
    return result
  }

/**
 * Function seraches arrays variables (key) for any given value
 * 
 * @param {array} array 
 * @param {string} variable 
 * @param {any} value 
 * @returns 
 */
  function findByVariable(array, variable, value) {
    return array.find(item => item[variable] === value);
  }