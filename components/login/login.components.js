
let loginTrys = 2;
let timeout = 15000
/**
 * is the onload function 
 */
async function init() {
     await loadusers()
}

/**
 * loads the user object array from the backend
 */
async function loadusers() {
     if (USERS.length == 0) {
          console.log('empty')
     } else {
          USERS = JSON.parse(await getStorageData('users'));
     }
}

/**
 * login and secuirity check function
 */
async function login() {
     let email = document.getElementById('mail').value;
     let password = document.getElementById('password').value;
     let message = document.getElementById('message');

     if (findkey(email)) {
          var key = findkey(email)
          timeoutcheck(key)
     }
     if (loginTrys == 0) {
          securitycheck(key, email, message)
     } else {
          if (checkEmailLogin(email)) {
               if (checkPasswordLogin(password)) {
                    ACTIVEUSERKEY = key;
                    console.log('eingeloggt')
               } else {
                    incorrect(message)
                    if (USERS[key]) {
                         if (user[key].value.userData.timepassed) {
                              keysettStrorage(key)
                         } else {
                              loginTrys -= 1
                         }
                    } else {
                         loginTrys -= 1
                    }
               }
          } else {
               incorrect(message)
               if (USERS[key]) {
                    if (user[key].value.userData.timepassed) {
                         keysettStrorage(key)
                    } else {
                         loginTrys -= 1
                    }
               } else {
                    loginTrys -= 1
               }
          }
     }
}

/**
 * div container message innder html
 * @param {string} message 
 */
function incorrect(message) {
     message.innerHTML = 'Email or password is Incorrect';
     message.classList.remove('d-none');
}

/**
 * setting login trys frim storage
 * @param {number} key 
 */
function timeoutcheck(key) {
     if (USERS[key].value.userData.timepassed) {
          if (USERS[key].value.userData.timepassed.logintrys > -1) {
               loginTrys = USERS[key].value.userData.timepassed.logintrys;
          }
     }
}

/**
 * //check if email is already in user
 * @param {string} email 
 * @returns the person with the email is founded
 */
function checkEmailLogin(email) {
     if (USERS.length == 0) {
          console.log('ist nicht existent')

     } else {
          let usersArray = Object.values(USERS);
          let foundUser = usersArray.find(user =>
               user.value.userData.email === email)
          return foundUser;
     }


}

/**
 * check if  password is in user
 * @param {string} password 
 * @returns  the person with the password 
 */
function checkPasswordLogin(password) {
     if (USERS.length == 0) {
          console.log('passwort ist falsch')

     } else {
          let usersArray = Object.values(USERS);
          let foundUser = usersArray.find(user =>
               user.value.userData.password === password)
          return foundUser;
     }
}

/**
 * from login to register html
 */
function signup() {
     window.location.href = '/components/login/register.html';
}

/**
 * changes the lock img and the passwort vissibility
 */
function passwordVisible() {
     let password = document.getElementById('password');
     if (password.type == 'password') {
          password.type = 'text';
          password.style.backgroundImage = "url('/assets/img/—Pngtree—cartoon unlock icon_4438287.png')";
     } else {
          password.type = 'password';
          password.style.backgroundImage = "url('/assets/img/lock.jpg')";
     }
}

/**
 * this function is to find the user who logs in and filter out his specific unique key
 * 
 * @param {string} email email from the person who trys to log in
 * @returns key
 */
function findkey(email) {
     let usersArray = Object.values(USERS);
     let foundUser = usersArray.find(user =>
          user.value.userData.email == email)

     if (foundUser) {
          let key = foundUser.value.userData.key;
          return key;
     } else {
          console.log('not found')
     }
}
/**
 * sets storage with new data
 * @param {number} key 
 */
async function keysettStrorage(key) {
     await setStorageData('users', JSON.stringify(USERS[key].value.userData.timepassed.logintrys -= 1))
}

function guestlogin() {
     contacts =[ 
          {"name": "Benedikt Ziegler", "email": "benediktz@gmail.com", "phone": "+1234567", "contactId": "98765abc", "initials": "BZ", "color": "812731"},
          {"name": "Anton Mayer", "email": "antom@gmail.com","phone": "+1234567", "contactId": "12345abc", "initials": "AM", "color": "3e59c2"},
          {"name": "Helena Eissele", "email": "helenae@gmail.com","phone": "+1234567", "contactId": "97345oiu", "initials": "HE", "color": "2b3430"},
          {"name": "Izak Abraham", "email": "izaka@gmail.com","phone": "+1234567", "contactId": "12367oiu", "initials": "IA", "color": "907ee1"},
          {"name": "Anja Schulz", "email": "anjas@gmail.com","phone": "+1234567", "contactId": "12345ghf", "initials": "AS", "color": "3e59c2"},
          {"name": "David Eisenberg", "email": "davide@gmail.com","phone": "+1234567", "contactId": "12345oiu", "initials": "DE", "color": "4f98ce"}
      ];
     userData = { key: 0, name: 'Guest', email: 'GuestTest@hotmail.de', password: 'password', failedAttemped: true };
     // initalize entry with key guest and empty value as an object
     USERS["guest"] = {};
     // add an object into guest object; bracket string is going to be the key
     USERS["guest"]["userData"] = userData ;
     USERS["guest"]["contacts"] = contacts ;
     setStorageData('users', JSON.stringify(USERS))
     window.location.href = '/index.html';
}