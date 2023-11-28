
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
    if (USERS.length ==0) {
         console.log('empty')
    }else{
         USERS = JSON.parse(await getStorageData('users'));
    }
}

/**
 * overall login function 
 */
function login() {

    let email = document.getElementById('mail').value;
    let password = document.getElementById('password').value;

    if (checkEmailLogin(email)) {
         if (checkPasswordLogin(password)) {
              console.log('du bist eingeloggt')
              let key = findkey(email);
              ACTIVEUSERKEY=key;
              console.log(ACTIVEUSERKEY)
         } else {
              window.alert("password is incorrect");

         }
    } else {
         window.alert("Email is incorrect");
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
function findkey(email){
    let usersArray = Object.values(USERS);
    let foundUser = usersArray.find(user =>
         user.value.userData.email == email )

         if (foundUser) {
              let key= foundUser.value.userData.key;
              return key;
         }else{
              console.log('not found')
         }
}