const ACTIVE_USER = '738927';

let userContacts = []; 

let activeContact = null;

function getUserContacts(){
    // todo main user JSON name? @sefa
    userContacts = Users[ACTIVE_USER][contacts];
    return true
}

function renderContacts () {
    // todo render all contacts within the userContacts object
    // todo design html div for contacts 
    let container = document.getElementById('');
    container.innerHTML = clear();
    for (const profile of userContacts) {
        let name = profile['name'];
        let email = profile['email'];
        let key = profile['contactID'];
        let initials = generateInitials(name);

        container.innerHTML = createContactProfilHTML(name, email, initials, key);
    }
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

function setActiveContact (contactID) {
    activeContact = contactID;
    return true
} 

function editContactData () {
    let contact = activeContact;
    // show modal-edit-contact
    // read contact data
    // insert contact data into input fields
    // wait for input or changes - user clicks edit button
    // read input/changes
    // save input/changes within the contacts array with the id/key
    // hide or move out the modal
    // show user sign with succesfull changes - user feedback


}

function showEditContactModal () {
    // remove hide class form modal
    // todo animations
    return true
}

function generateContactID () {
    let contactID = randomString();
    return contactID 
}

function showProfilDetails () {
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


function generateInitials (name) {
    // check string for the first char overall and first char after space
    name = name.trim();
    let firstLetter = name.charAt(0);
    let space = name.findIndex(" ");
    let secondLetter = name.charAt((space + 1));
    let initials = `${firstLetter}+${secondLetter}`;
    return initials.toUpperCase();
}

function clear () {
    return ``;
}