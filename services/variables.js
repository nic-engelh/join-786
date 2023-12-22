let USERS = {};

let ACTIVEUSERKEY = null;

let userContacts = []; 
let userTasks;
let localUserTasks = [];
let localGuestTasks = [];

/**
 * Functions loads / sets from USERS all important variables for further use
 * 
 */
async function setVariables () {
    userContacts = USERS[ACTIVEUSERKEY].contacts; 
    ACTIVEUSERKEY = getLocalStorage("activeUser");
    await getTasksFromStorage();
    userTasks = USERS[ACTIVEUSERKEY].tasks;
    guestTasks = USERS["guest"].tasks;
  }