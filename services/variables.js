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
async function getVariables () {
    ACTIVEUSERKEY = getLocalStorage("activeUser");
    USERS = await getStorageData("users"); // tasks is empty so far
    if (!USERS[ACTIVEUSERKEY].tasks) {
      USERS[ACTIVEUSERKEY].tasks = {};
    }
    await getTasksFromLocalStorage(); // TODO check usage - it should only be used as buffer/cache
    userContacts = USERS[ACTIVEUSERKEY].contacts; 
    userTasks = USERS[ACTIVEUSERKEY].tasks;
    guestTasks = USERS["guest"].tasks;
}
    
function setVariables () {
  return true
}

/**
 * This function gets data from local storage
 * 
 * 
 */ 
async function getTasksFromLocalStorage() { 
  if (ACTIVEUSERKEY != 'guest') {
      USERS[ACTIVEUSERKEY].tasks = getLocalStorage("localUserTasks");
  }


  localGuestTasks = await getLocalStorage("localGuestTasks");
  Object.assign(USERS["guest"].tasks, localGuestTasks);
}