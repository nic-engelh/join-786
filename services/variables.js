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
    ACTIVEUSERKEY = getLocalStorage("activeUser");
    USERS = await getTasksFromStorage();
    userContacts = USERS[ACTIVEUSERKEY].contacts; 
    userTasks = USERS[ACTIVEUSERKEY].tasks;
    guestTasks = USERS["guest"].tasks;
  }