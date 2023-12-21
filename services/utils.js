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

/**
 * functions adds and removes the class visually hidden
 * 
 * @param {string} elementId 
 * @returns 
 */
function toggleHide (elementId) {
  let element = document.getElementById(elementId);
  element.classList.toggle("visually-hidden")
  return true
}

/**
 * functions opens target section and closes the remaining sections
 * 
 * @param {string} sectionID 
 */
function openSection (sectionID) {
  let sections = ["sectionAddTasks", "sectionBoard", "sectionJoin360", "contact-list-background"];
  for (const section of sections) {
    let element = document.getElementById(section);
    if (element.classList.contains('visually-hidden')){
      continue;
    }
    element.classList.add('visually-hidden');
  }
  toggleHide(sectionID);
}

/**
 * Functions loads / sets from USERS all important variables for further use
 * 
 */
function setVariables () {
  userContacts = USERS["guest"].contacts; 
  ACTIVEUSERKEY = getLocalStorage("activeUser");
}

/**
 * function saves an array with a specific key into the local storage a JSON string
 * 
 * @param {string} key 
 * @param {array} array 
 */
function setLocalStorage (key, array) {
  localStorage.setItem(key, JSON.stringify(array));
}

/**
 * functions get the JSON string from the local storage with the specific key and returns it
 * 
 * @param {*} key 
 * @returns 
 */
function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}


/**
 * functions adds or removes class vom element whenever its already existing (remove) or not (add)
 * 
 * @param {string} id 
 * @param {string} cssClass 
 */
function toggleClass (id, cssClass) {
  let element = document.getElementById(id);
  element.toggleClass(cssClass);
}