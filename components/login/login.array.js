// JSON
let USERS = [{
    "123abc": {
        userdata: {
            "email": "hallo@test.de",
            "password": "1234",
            "key": "123abc"
        },
        task: [],
        contacts: []
    },
    "456def": {
        userdata: {
            "email": "bye@test.de",
            "password": "5678",
            "key": "456def"
        },
        task: [],
        contacts: []
    }
}]


function checkLoginData (inputEmail, inputPassword) {

    for (const user of USERS) {
        let userPw = user.userdata.password;
        let userEmail = user.userdata.email; 

        if (userPw === inputPassword && userEmail === inputEmail) {
            console.log("Password and Email found.")
            return true
        }
        console.log("Password and Email not found.")
        return false
    }
}

function findByVariable (array, variable, value) {
    return array.find(item => item[variable] === value)
}

function  checkLoginData (inputEmail, inputPassword) {
    resultPassword = findByVariable(USERS, "password", inputPassword);
    resultEmail = findByVariable(USERS,"email", inputEmail);

    console.log(resultEmail);
    console.log(resultPassword);
}
