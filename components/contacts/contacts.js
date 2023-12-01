const ACTIVE_USER = '738927';

let userContacts = []; 

const abcString = 'ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÜ'; 

let activeContact = null;

function getUserContacts(){
    // todo main user JSON name? @sefa
    userContacts = USERS[ACTIVE_USER][contacts];
    return true
}

function renderContacts (contacts, container) {
    // render all contacts within the userContacts object
    // todo design html div for contacts 
    for (const profile of contacts) {
        let name = profile['name'];
        let email = profile['email'];
        let key = profile['contactID'];
        let initials = generateInitials(name);
        container.innerHTML = createContactProfilHTML(name, email, initials, key);
    }
}

function renderContactsStructure () {
    // functions renders contacts abc-structure
    // iterate abcSting
    // for each CHAR load profile form userContacts
    // for each CHAR insert the letter into container - group of profiles
    // for each CHAR and if there is a corresponding profile within userContacts add a marker line beneath the letter for each group
    // render profile for the iterated letter
    // do it again for next CHAR in abcString
    sortUserContacts();
    let container = document.getElementById('');
    container = clear();
    for (let index = 0; index < abcString.length; index++) {
        const char = abcString[index];
        let results = filterByVariable(userContacts, "initials", char);
        container.innerHTML = createCharHeaderHTML(char);
        if (results) {
            container.innerHTML = createLineHTML();
            renderContacts(results, container);
            continue;
        }
    }
}

function sortUserContacts () {
    userContacts.sort((a,b) => {
        let fa = a.initials.toLowerCase(),
        fb = b.initials.toLowerCase();
        fa = fa[1];
        fb = fb[1];
        if (fa < fb) {
            return -1;
        }
        if (fa > fb) {
            return 1;
        }
        return 0;
    });
    return true
}


function addContactData () {
    let name = document.getElementById('add-contact-name').value;
    let email = document.getElementById('add-contact-email').value;
    let phone = document.getElementById('add-contact-phone').value;
    let id = generateContactID;
    let initials = generateInitials(name);
    userContacts.push({name: name, email: email, phone: phone , id: id, initials: initials});
    // Show Message - contact succesfully created
    window.location.href = ''; // link to contact view
    // or blend out add contact modal
}


function setActiveContact (contactID) {
    activeContact = contactID;
    return true
} 

function loadEditContactData () {
     // show modal-edit-contact
    // read/find contact data
    // insert contact data into input fields
    let name = document.getElementById('edit-contact-name');
    let email = document.getElementById('edit-contact-email');
    let phone = document.getElementById('edit-contact-phone');
    let initials = generateInitials(name);
    changeProfilBadge(initials);
    let contactObject = findContact(activeContact);
    name.value = contactObject.name;
    email.value = contactObject.email;
    phone.value = contactObject.phone;
}

function saveEditedContactData () {
    let contactObject = findContact(activeContact);
    // wait for input or changes - user clicks edit button
    // read input/changes
    // save input/changes within the contacts array with the id/key
    // hide or move out the modal
    // show user sign with succesfull changes - user feedback
    let nameEdited = document.getElementById('edit-contact-name').value;
    let emailEdited = document.getElementById('edit-contact-email').value;
    let phoneEdited = document.getElementById('edit-contact-phone').value;
    deleteContact(activeContact);
    userContacts.push({name: nameEdited, email: emailEdited, phone: phoneEdited , id: activeContact})
    hideEditContactModal();
    showSuccesInfo();
}

// search function returns found object
function findContact (searchId) {
    let result = findByVariable(userContacts, "id", searchId)
    return result
}

function showEditContactModal () {
    // remove hide class form modal
    // todo animations
    return true
}
function hideEditContactModal () {
    // add hide class form modal
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

function showSuccesInfo () {
    // todo design "Contact succesfully changed"

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

function changeProfilBadge(initials) {
    let badge = document.getElementById('contact-user-symbol-badge');
    let initialBox = document.getElementById('contact-user-symbol-initials');
    initialBox.innerHTML = initials;
    badge.style.backgroundColor = "#" + randomColor();
}

function clear () {
    return ``;
}