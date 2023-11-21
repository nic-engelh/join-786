const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';
const STORAGE_TOKEN = 'LMBAS4F9WBPBDZFK8259KHJQX6G2KD62SQOU7VKS';

/**
 * The function gets the JSON data from the backend storage.
 * 
 * @param {string} key 
 * @returns 
 */
async function getStorageData (key) {
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    return fetch(url).then(res => res.json()).then(res => {
        if (res.data) { 
            return res.data.value;
        } throw `Could not find data with key "${key}".`;
    }); 
}

/**
 * The function stores JSON data as a string into the backend storage with a specific token.
 * 
 * @param {string} key 
 * @param {object} value 
 * @returns 
 */
async function setStorageData (key, value) {
    const payload = {key, value, token: STORAGE_TOKEN};
    try {
        return await fetch(STORAGE_URL, writeServer("POST", payload))
        .then(getResponse());
    }
    catch(e) {
        console.error("Error: Data could not be stored!");
    }
}

/**
 * function handles response and changes the data into JSON format.
 * 
 * @param {response} response 
 * @returns 
 */
function getResponse(response) {
    return response.json();
}

/**
 * function handles the database writing information. Generates and returns the http request for the fetch call.
 * 
 * @param {string} action 
 * @param {object} data 
 * @returns 
 */
function writeServer(action, data) {
    return { method: action, body: JSON.stringify(data)};
}
