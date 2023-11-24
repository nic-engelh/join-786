let users = [
     {
          'email': 'sefa_guer@hotmail.com',
          'password': 'asdasdasd'
     }
];

async function init() {
     // await getStorageData(key)
}

async function register() {

     let name = document.getElementById('Name').value;
     let email = document.getElementById('mail').value;
     let password = document.getElementById('password').value;
     let passwordConfirm = document.getElementById('passwordConfirm').value;
     let key = Math.floor((Math.random() * 1000000) + 1);

     if (checkEmail(email)) {
          window.alert("Email is already in use");

     } else {
          if (checkPassword(password, passwordConfirm)) {
               users.push({ name: name, email: email, password: password });
               // setStorageData(`${key}`, users);
               await popup();
          } else {
               window.alert("password is incorrect");
          }
     }
}

function checkEmail(email) {//check if email is already in email
     return users.findIndex(users => users['email'] === email) > -1;
}

function checkPassword(password, passwordConfirm) {//check if both passwords are the same
     return password == passwordConfirm;
}

function popup() {
     let popupScreen = document.getElementById('popup');
     popupScreen.classList.remove('d-none');
     setTimeout(() => {
          openLogin();
     }, 2000);
}

function openLogin() {
     window.location.href = '/components/login/login.html';
}

function back() {//from register back to login html
     window.location.href = '/components/login/login.html';
}

function passwordVisibleRegister() {
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

//////////////////////////////////////////////////////////////////////////// LOG IN /////////////////////////////////////////////////////////////////////////////////////////

function login() {

     let email = document.getElementById('mail').value;
     let password = document.getElementById('password').value;

     if (checkEmailLogin(email)) {
          if (checkPasswordLogin(password)) {
               console.log('du bist eingeloggt')
          } else {
               window.alert("password is incorrect");
          }
     } else {
          window.alert("Email is incorrect");
     }
}

function checkEmailLogin(email) {//check if email is already in useer

     return users.findIndex(users => users['email'] == email) > -1;

}

function checkPasswordLogin(password) {//check if  password is correct

     return users.findIndex(users => users['password'] == password) > -1;
}

function signup() {//from login to register html

     window.location.href = '/components/login/register.html';

}

function passwordVisible() {//for log in and register password vissibility
     let password = document.getElementById('password');
     if (password.type == 'password') {
          password.type = 'text';
          password.style.backgroundImage = "url('/assets/img/—Pngtree—cartoon unlock icon_4438287.png')";
     } else {
          password.type = 'password';
          password.style.backgroundImage = "url('/assets/img/lock.jpg')";
     }
}