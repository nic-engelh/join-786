let USERS = {};

let ACTIVEUSERKEY = null;

let userContacts = []; 

let userTasks;

let backEndUserTasks = [];
let backEndUserTasksJSON;

let backEndGuestTasks = [];
let backEndGuestTasksJSON;

let localUserTasks = [];

let localGuestTasks = [];

/**
 * Functions loads / sets from USERS all important variables for further use
 * 
 */
function setVariables () {
    userContacts = USERS["guest"].contacts; 
    ACTIVEUSERKEY = getLocalStorage("activeUser");
    userTasks = USERS[ACTIVEUSERKEY].tasks;
    guestTasks = USERS["guest"].tasks;
  }