let users = [];

async function init() {
     // await getStorageData(key)
}


function register() {

     let name = document.getElementById('Names').value;
     let email = document.getElementById('mails').value;
     let password = document.getElementById('password').value;
     let passwordConfirm = document.getElementById('passwordConfirm').value;
     let key = Math.floor((Math.random() * 1000000) + 1);

     if (checkEmail(email)) {
          window.alert("Email is already in use");

     } else {
          if (checkPassword(password, passwordConfirm)) {
               users.push({ name: name, email: email, password: password })
               window.location.href = '/components/login/login.html';
               // setStorageData(`${key}`, users)
          } else {
               window.alert("password is incorrect");
          }
     }
}


function back() {//from register back to login html

     window.location.href = '/components/login/login.html';

}


function checkEmail(email) {//check if email is already in email
     return users.findIndex(users => users['email'] === email) > -1;
}


function checkPassword(password, passwordConfirm) {//check if both passwords are the same
     return password == passwordConfirm;
}


//////////////////////////////////////////////////////////////////////////// LOG IN /////////////////////////////////////////////////////////////////////////////////////////



function signup() {//from login to register html

     window.location.href = '/components/login/register.html';

}


function popup(){
     document.getElementById('popup').classList.remove('d-none');
}