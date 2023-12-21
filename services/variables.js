let USERS = {};

let ACTIVEUSERKEY = null;

let userContacts = []; 

let userTasks;


/**
 * Functions loads / sets from USERS all important variables for further use
 * 
 */
function setVariables () {
    userContacts = USERS["guest"].contacts; 
    ACTIVEUSERKEY = getLocalStorage("activeUser");
    userTasks = USERS[ACTIVEUSERKEY].tasks;
  }