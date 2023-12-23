let userData = {};

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
     if (!await getStorageData('users')) {
          USERS =await getStorageData('users');
     }
}

/**
 * overall register function
 */
async function register() {
     let name = document.getElementById('Name').value;
     let email = document.getElementById('mail').value;
     let password = document.getElementById('password').value;
     let passwordConfirm = document.getElementById('passwordConfirm').value;
     let key = Math.floor((Math.random() * 1000000) + 1);
     let notsame = document.getElementById('notsame');
     if (findUserByEmail(email)) {
          notsame.innerHTML = 'email is already in use';
          notsame.classList.remove('d-none')
     } else {
          if (checkPassword(password, passwordConfirm)) {
               userData = { 'userData': { key: key, name: name, email: email, password: password, failedAttemped: true } };
               USERS[key] = userData;
               if (!await getStorageData('users')) {
                    updateStorageData('users', USERS);    
                    await popup();
               }else{
                    setStorageData('users', USERS);      
                    await popup();
               }
          } else {
               notsame.innerHTML = 'password are not the same';
               notsame.classList.remove('d-none');
          }
     }
}

/**
 * checks if the email is already been taken 
 * @param {string} email 
 * @returns true
 */
function findUserByEmail(email) {
     if (USERS.length == 0) {
          console.log('ist nicht existent')

     } else {
          let usersArray = Object.values(USERS);
          let foundUser = usersArray.find(user =>
               user.userData.email === email)
          return foundUser;
     }

}

/**
 * checks if the password and confirm password are the same
 * @param {string} password 
 * @param {string} passwordConfirm 
 * @returns true
 */
function checkPassword(password, passwordConfirm) {//check if both passwords are the same
     return password == passwordConfirm;
}

/**
 * is the popup function after you are registerd
 */
function popup() {
     let popupScreen = document.getElementById('popup');
     popupScreen.classList.remove('d-none');
     setTimeout(() => {
          openLogin();
     }, 2000);
}

/**
 * leads you to login html
 */
function openLogin() {
     window.location.href = '/components/login/login.html';
}

/**
 * /from register back to login html
 */
function back() {
     window.location.href = '/components/login/login.html';
}

/**
 * password vissibility and changes the img
 */
function passwordVisibleRegister() {//changes the lock img and the passwort vissibility
     let password = document.getElementById('password');
     let passwordConfirm = document.getElementById('passwordConfirm');

     if (password.type == 'password') {
          password.type = 'text';
          passwordConfirm.type = 'text';
          password.style.backgroundImage = "url('/assets/img/—Pngtree—cartoon unlock icon_4438287.png')";
          passwordConfirm.style.backgroundImage = "url('/assets/img/—Pngtree—cartoon unlock icon_4438287.png')";
     } else {
          password.type = 'password';
          passwordConfirm.type = 'password';
          password.style.backgroundImage = "url('/assets/img/lock.jpg')";
          passwordConfirm.style.backgroundImage = "url('/assets/img/lock.jpg')";
     }
}