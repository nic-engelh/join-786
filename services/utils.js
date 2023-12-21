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
 * functions adds or removes class vom element whenever its already existing (remove) or not (add)
 * 
 * @param {string} id 
 * @param {string} cssClass 
 */
function toggleClass (id, cssClass) {
  let element = document.getElementById(id);
  element.toggleClass(cssClass);
}


function filterNestedObject(inputObject, targetValue, targetKey) {
 // Ergebnis-Objekt erstellen
 const filteredObject = {};
 // Durch das Eingabeobjekt iterieren
 for (const key in inputObject) {
   if (inputObject.hasOwnProperty(key)) {
     // Überprüfen, ob das Zielwert im aktuellen Objekt vorhanden ist
     if (((inputObject[key][targetKey]).toLowerCase().replaceAll(" ","")) === targetValue){
       // Wenn ja, füge das aktuelle Objekt zum gefilterten Objekt hinzu
       filteredObject[key] = inputObject[key];
     }
   }
 }
 return filteredObject;
}


function setBadgeColor (color, elementId) {
  let badge = document.getElementById(elementId);
  setContactStyleColor (color, elementId);
  badge.classList.add(`color${color}`);
  // to do: classlist.remove bei delete 
}



function setContactStyleColor (color) {
  let styleSheet = window.document.styleSheets[0];    
  let string = `.color${color} { background-color: #${color}; }`;
  styleSheet.insertRule(string, styleSheet.cssRules.length);
  return true
}