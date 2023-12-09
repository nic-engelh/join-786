let ACTIVE_USER = '738927';

let userContacts = [ 
    {"name": "Benedikt Ziegler", "email": "benediktz@gmail.com", "phone": "+1234567", "contactId": "98765abc", "initials": "Z"},
    {"name": "Anton Mayer", "email": "antom@gmail.com","phone": "+1234567", "contactId": "12345abc", "initials": "AM" },
    {"name": "Helena Eissele", "email": "helenae@gmail.com","phone": "+1234567", "contactId": "97345oiu", "initials": "HE" },
    {"name": "Izak Abraham", "email": "izaka@gmail.com","phone": "+1234567", "contactId": "12367oiu", "initials": "IA" },
    {"name": "Anja Schulz", "email": "anjas@gmail.com","phone": "+1234567", "contactId": "12345ghf", "initials": "AS" },
    {"name": "David Eisenberg", "email": "davide@gmail.com","phone": "+1234567", "contactId": "12345oiu", "initials": "DE" }
]; 

const abcString = 'ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÜ'; 

let activeContact = null;

function getUserContacts(){
    userContacts = USERS[ACTIVE_USER][contacts];
    return true
}

function renderContactList() {
    // getUserContacts();
    renderContactsStructure();
}

function renderContacts (contacts) {
    // render all contacts within the userContacts object
    let container = document.getElementById("contact-list-mobile");
    for (const profile of contacts) {
        let name = profile['name'];
        let email = profile['email'];
        let key = profile['contactId'];
        let initials = generateInitials(name);
        container.innerHTML += createContactProfilHTML(name, email, initials, key);
    }
}

async function renderContactsStructure () {
    // functions renders contacts abc-structure
    // iterate abcSting
    // for each CHAR load profile form userContacts
    // for each CHAR insert the letter into container - group of profiles
    // for each CHAR and if there is a corresponding profile within userContacts add a marker line beneath the letter for each group
    // render profile for the iterated letter
    // do it again for next CHAR in abcString
    //sortUserContacts();
    const container = document.getElementById("contact-list-mobile");
    if (container == null) {console.log("Element not found.");}
    container.innerHTML = clear();
    for (let index = 0; index < abcString.length; index++) {
        const char = abcString[index];
        let filteredContacts = filterContactsByInitials(char);
        if (filteredContacts.length > 0) {
            container.innerHTML += createCharHeaderHTML(char);
            container.innerHTML += createLineHTML();
            renderContacts(filteredContacts);
            filteredContacts = null;
        }
    }
    container.innerHTML += createContactAddButtonHtml();
}

function renderContactProfil (contactId) {
    let contactObject = findContact(contactId);
    const profil = document.createElement("div");
    let elementUsed = document.getElementById("contact-view-profil-main");
    if (elementUsed){elementUsed.remove();}
    profil.id = "contact-view-profil-main";
    profil.innerHTML = createContactViewProfilHTML(contactObject.initials, contactObject.name, contactObject.email, contactObject.phone);
    document.body.appendChild(profil);
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
    let id = generateContactID();
    let initials = generateInitials(name);
    userContacts.push({name: name, email: email, phone: phone , contactId: id, initials: initials});
    renderContactList();
    hideAddContactModal();
    showSuccessInfo("0");
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
    userContacts.push({name: nameEdited, email: emailEdited, phone: phoneEdited , contactId: activeContact})
    hideEditContactModal();
    showSuccesInfo("2");
}

// search function returns found object
function findContact (searchId) {
    let result = findByVariable(userContacts, "contactId", searchId)
    return result
}

function showAddContactModal () {
    // activate template functon - insert modal
    // remove hide class
    // activate animation
    const modal = document.getElementById("overlay-add-contact-mobile");
    modal.showModal();
}

function hideAddContactModal() {
    //active animation
    // add hide class
    const modal = document.getElementById("overlay-add-contact-mobile");
    modal.close();
}

function showContactProfilOptions () {
    // open options dialog with animation
    let modalId = "contact-options-modal";
    const modalExists = document.getElementById(modalId);
    if (modalExists == undefined){
        const modal = document.createElement("dialog");
        modal.id = modalId;
        modal.innerHTML = createContactOptionsHTML(activeContact);
        document.body.appendChild(modal);
        modal.show();
        return true;
    }
    modalExists.show();
}

function renderDialog (htmlString, modalId) {
    const dialog = document.createElement('dialog');
    dialog.innerHTML = (htmlString);
    dialog.id = modalId;
    document.body.appendChild(dialog);
}


function showSuccessInfo(number) {
    const texts = ["Contact successfully created", "Contact successfully edited", "Contact successfully deleted"];
    const modalId = "contact-alert";
    let modal = document.getElementById(modalId);

    if (!modal) {
        modal = document.createElement('dialog');
        modal.innerHTML = createSuccessInfoHTML(texts[number]);
        modal.id = modalId;
        document.body.appendChild(modal);
    }

    modal.showModal();
    setTimeout(() => modal.close(), 2000);
}

function hideContactProfilOptions() {
    const modal = document.getElementById("contact-options-modal");
    modal.close();
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

function showProfilDetails (contactId) {
    // function shows selected contact details from overview 
    // window.location.assign = 'route.contactView.html';
    // visual hide contacts lists
    toggleHide("contact-list-background");
    renderContactProfil(contactId);
}

function deleteContact (contactID) {
    let entryIndex = userContacts.findIndex(contact => contact["contactId"] === contactID);
    let response = userContacts.splice(entryIndex,1);
    if (response == undefined) {
        console.log("Error: deletion was unsuccesful.")
        return false
    }
    removeChild("contact-view-profil-main");
    renderContactList();
    toggleHide("contact-list-background");
    showSuccesInfo("2");
}

function removeChild(elementId) {
    document.getElementById(elementId).remove();
    return true
}



function getModal (elementId) {
    const modal = document.getElementById(elementId);
    return modal
}

function generateInitials (name) {
    // check string for the first char overall and first char after space
    name = name.trim();
    let firstLetter = name.charAt(0);
    let indexSpace = name.indexOf(' ');
    let secondLetter = name.charAt((indexSpace + 1));
    let initials = `${firstLetter}${secondLetter}`;
    return initials.toUpperCase();
}

function changeProfilBadge(initials) {
    let badge = document.getElementById('contact-user-symbol-badge');
    let initialBox = document.getElementById('contact-user-symbol-initials');
    initialBox.innerHTML = initials;
    badge.style.backgroundColor = "#" + randomColor();
}


function filterContactsByInitials(initial) {
    // Konvertiere den Input-Wert in Großbuchstaben, um die Groß-/Kleinschreibung zu ignorieren
    let targetInitial = initial.toUpperCase();
    // Verwende die filter-Methode, um die Objekte zu filtern
    let filteredContacts = userContacts.filter(contact => {
      // Überprüfe, ob das Initial des Kontakts den zweiten Buchstaben mit dem Zielinitial übereinstimmt
      return contact.initials.length >= 2 && contact.initials[1].toUpperCase() === targetInitial;
    });
    return filteredContacts;
  }

function toggleHide (elementId) {
    let element = document.getElementById(elementId);
    element.classList.toggle("visually-hidden")
    return true
}

function clear () {
    return ``;
}


/*
var el = document.getElementById('id');

// create named functions:
function alertFirst() { alert('hello world'); };
function alertSecond() { alert('hello world'); };

// assign functions to the event listeners (recommended):
el.addEventListener('click', alertFirst);
el.addEventListener('click', alertSecond);

// then you could remove either one of the functions using:
el.removeEventListener('click', alertFirst); 
*/