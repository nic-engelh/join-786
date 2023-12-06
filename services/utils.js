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
 * Function searches arrays variables with "keys" for any given value
 * 
 * @param {array} array 
 * @param {string} variable 
 * @param {any} value 
 * @returns 
 */
  function findByVariable(array, variable, value) {
    return array.find(item => item[variable] === value);
  }


  /**
   * Functions filters arrays variables with "keys" for any given value. Returns array with results.
   * 
   * @param {array} array 
   * @param {string} variable 
   * @param {any} value 
   * @returns 
   */
function filterByVariable(array, variable, value) {
  return array.find(item => item[variable] == value);
}

/**
 * function generates random color code
 * 
 * @returns 
 */
function randomColor (){
  return Math.floor(Math.random()*16777215).toString(16);
}