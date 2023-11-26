const ACTIVE_USER = '738927';

let userContacts = []; 

let activeContact = null;

function renderContactOverview () {
    // todo render all contacts within the userContacts object
}

function addContactData () {
    // ToDo: Namen der IDs von Add und Edit Input Feldern ändern
    let name = document.getElementById('add-contact-name').value;
    let email = document.getElementById('add-contact-email').value;
    let phone = document.getElementById('add-contact-phone').value;
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