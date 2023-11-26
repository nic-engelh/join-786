const ACTIVE_USER = '738927';

let userContacts = []; 

let activeContact = null;

function renderContactOverview () {
    // todo render all contacts within the userContacts object
}

function addContactData () {
    let name = document.getElementById('frame-155').value;
    let email = document.getElementById('frame-157').value;
    let phone = document.getElementById('frame-156').value;
    let id = generateContactID;
    userContacts.push({name: name, email: email, phone: phone , id: id});
    // Show Message - contact succesfully created
    window.location.href = ''; // link to contact view
    // or blend out add contact modal
}

function editContactData () {
    let contact = activeContact;

}

function generateContactID () {
    let contactID = randomString();
    return contactID 
}

function showContactDetails () {
    // function shows selected contact details from overview 
    window.location.href = '';

}

function deleteContact (contactID) {
    let entryIndex = userContacts.findIndex(contactID); 
    let response = userContacts.splice(entryIndex,1);
    if (response == undefined) {
        console.log("Error: deletion was unsuccesful.")
        return false
    }
    return true
}