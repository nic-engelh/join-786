

/**secuirity function if somone typed to often something wrong
 * 
 * @param {number} key 
 * @param {string} email 
 * @param {variable} message 
 */
function securitycheck(key, email, message) {
    if (checkkey(key, email)) {
        var objectTime = checkkey(key, email);
    }
    let timepassed = new Date().getTime() - objectTime;
    message.classList.remove('d-none');
    message.innerHTML = `you have to wait ${timeout / 1000} Seconds!`;
    if (timepassed > timeout) {
        loginTrys = USERS[key].value.userData.timepassed.logintrys = 2;
        TimeTrue(key, email);
        message.innerHTML = `you can try again `;
        timeout *= 2
    } else {
        if (timeobject(email)) {
            settime(key, email);
        } else {
            message.innerHTML = `your email is wrong you have to wait ${timeout / 1000} seconds`;
        }
    }
}


/**
 * secuirity checking things
 * @param {number} key 
 * @param {string} email 
 * @returns 
 */
function checkkey(key, email) {
    if (USERS[key]) {
        if (USERS[key].value.userData.timepassed) {
            if (USERS[key].value.userData.timepassed.time == null) {
                settime(key, email)
            } else {
                var objectTime = USERS[key].value.userData.timepassed.time;
                return objectTime
            }
        }
    }
}

/**
 * checks if failed attemped is true or false
 * @param {string} email 
 * @returns true or false
 */

function timeobject(email) {
    let usersArray = Object.values(USERS);
    let foundUser = usersArray.find(user =>
        user.value.userData.email == email)

    if (foundUser) {
        let failedTime = foundUser.value.userData.failedAttemped == true;
        return failedTime;
    } else {
        console.log('not found')
    }
}

/**
 * sets time mark in object array when he failes to login twice
 * @param {number} key 
 * @param {string} email 
 */
async function settime(key, email) {
    let time = new Date().getTime();
    let usersArray = Object.values(USERS);
    let founduser = usersArray.find(user =>
        user.value.userData.email == email)
    if (founduser) {
        founduser.value.userData.failedAttemped = false;
    }

    if (key) {
        USERS[key].value.userData.timepassed = { 'time': time, 'logintrys': 0 };
        await setStorageData('users', JSON.stringify(USERS))
    } else {
        console.log('not found')

    }
}

/**sets in storage that the person who failed has waiten his time 
 * 
 * @param {number} key 
 * @param {string} email 
 */
async function TimeTrue(key, email) {
    let usersArray = Object.values(USERS);
    let finduser = usersArray.find(user =>
        user.value.userData.email == email)
    if (finduser) {
        USERS[key].value.userData.failedAttemped = true;
        USERS[key].value.userData.timepassed.time = null;
        await setStorageData('users', JSON.stringify(USERS))
    }
}