const abcString = 'ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÜ'; 

let activeContact = null;

function renderContactList() {
    // getUserContacts();
    renderContactsStructure("contact-list-mobile");
    renderContactsStructure("contact-list-desktop-container");
    updateStorageData("users", USERS);
}

function renderContacts (contacts, targetContainer) {
    for (const profile of contacts) {
        let name = profile['name'];
        let email = profile['email'];
        let key = profile['contactId'];
        let color = profile.color;
        let initials = generateInitials(name);
        targetContainer.innerHTML += createContactProfilHTML(name, email, initials, key);
        setBadgeColor(color, `badge-${key}`);
    }
}

function renderContactsStructure (targetContainer) {
    // functions renders contacts abc-structure
    // iterate abcSting
    // for each CHAR load profile form userContacts
    // for each CHAR insert the letter into container - group of profiles
    // for each CHAR and if there is a corresponding profile within userContacts add a marker line beneath the letter for each group
    // render profile for the iterated letter
    // do it again for next CHAR in abcString
    //sortUserContacts();
    const container = document.getElementById(targetContainer);
    if (container == null) {console.log("Element not found.");}
    container.innerHTML = clear();
    for (let index = 0; index < abcString.length; index++) {
        const char = abcString[index];
        let filteredContacts = filterContactsByInitials(char);
        if (filteredContacts.length > 0) {
            container.innerHTML += createCharHeaderHTML(char);
            container.innerHTML += createLineHTML();
            renderContacts(filteredContacts, container);
            filteredContacts = null;
        }
    }
    addCreateContactAddButton(container);
}

function addCreateContactAddButton (container) {
    if (container != "contact-view-profil-main") {
        return false
    }
    container.innerHTML += createContactAddButtonHtml();
    return true
}

function renderContactProfil (contactId) {
    let contactObject = findContact(contactId);
    const profil = document.createElement("div");
    let elementUsed = document.getElementById("contact-view-profil-main");
    if (elementUsed){elementUsed.remove();}
    profil.id = "contact-view-profil-main";
    profil.innerHTML = createContactViewProfilHTML(contactObject.initials, contactObject.name, contactObject.email, contactObject.phone);
    document.body.appendChild(profil);
    setBadgeColor(contactObject.color,"frame-105");
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

function addContactData (target) {
    let name = document.getElementById(`add-contact-name-${target}`).value;
    let email = document.getElementById(`add-contact-email-${target}`).value;
    let phone = document.getElementById(`add-contact-phone-${target}`).value;
    let id = generateContactID();
    let initials = generateInitials(name);
    userContacts.push({name: name, email: email, phone: phone , contactId: id, initials: initials, color: randomColor()});
    USERS[ACTIVEUSERKEY].contacts = userContacts;
    renderContactList();
    hideDialog(`overlay-add-contact-${target}`);
    showSuccessInfo("0");
}

function setActiveContact (contactID) {
    activeContact = contactID;
    return true
} 

/**
 * function loads needed contact data into the input fields of the opened edit contact modal version
 * 
 */
function loadEditContactData () {
    let contactObject = findContact(activeContact);
     // show modal-edit-contact
    // read/find contact data
    // insert contact data into input fields
    let targetElement = "mobile";
    if (checkWindowWidth){
        targetElement = "desktop";
    }
    let name = document.getElementById(`edit-contact-name-${targetElement}`);
    let email = document.getElementById(`edit-contact-email-${targetElement}`);
    let phone = document.getElementById(`edit-contact-phone-${targetElement}`);
    let initials = generateInitials(contactObject.name);
    let color = contactObject.color;
    changeProfilBadge(initials, color);
    name.value = contactObject.name;
    email.value = contactObject.email;
    phone.value = contactObject.phone;
}

/**
 * function fetches all values from input fields and updates USERS Object accordingly
 * 
 * @param {string} target 
 */
function saveEditedContactData (target) {
    let contactObject = findContact(activeContact);
    // wait for input or changes - user clicks edit button
    // read input/changes
    // save input/changes within the contacts array with the id/key
    // hide or move out the modal
    // show user sign with succesfull changes - user feedback
    let nameEdited = document.getElementById(`edit-contact-name-${target}`).value;
    let emailEdited = document.getElementById(`edit-contact-email-${target}`).value;
    let phoneEdited = document.getElementById(`edit-contact-phone-${target}`).value;
    userContacts.push({name: nameEdited, email: emailEdited, phone: phoneEdited , contactId: activeContact, initials: contactObject.initials, color: contactObject.color});
    hideDialog(`overlay-edit-contact-${target}`);
    deleteContact(activeContact, false);
    USERS[ACTIVEUSERKEY].contacts = userContacts;
    renderContactList();
    showSuccessInfo("2");
}

function hideDialog (elementId) {
    const modal = document.getElementById(elementId);
    modal.close();
}

function showDialog (elementId) {
    const modal = document.getElementById(elementId);
    modal.showModal();
}

// search function returns found object
function findContact (searchId) {
    let result = findByVariable(userContacts, "contactId", searchId)
    return result
}

function showContactProfilOptions () {
    // open options dialog with animation
    const modalId = "contact-options-modal";
    let modal = document.getElementById(modalId);
    const htmlString = createContactOptionsHTML(activeContact);
    if (!modal){
       modal = renderDialog(htmlString, modalId);
    }
    modal.show();
    setTimeout(() => clickModal(), 500);
}

function clickModal() {
    document.getElementById('contact-options-modal').addEventListener('click', (event) => {
        if (document.getElementById('contact-options-modal').open) {
            if (event.target.id !== 'contact-options-box'){
                document.getElementById('contact-options-modal').close(); 
            }
        }
    });

}

function renderDialog (htmlString, modalId) {
    const dialog = document.createElement('dialog');
    dialog.innerHTML = (htmlString);
    dialog.id = modalId;
    document.body.appendChild(dialog);
    return dialog
}

function showSuccessInfo(number) {
    const texts = ["Contact successfully created", "Contact successfully edited", "Contact successfully deleted", "Task succesfully deleted", , "Task successfully edited"];
    const modalId = "contact-alert";
    const htmlString = createSuccessInfoHTML();
    let modal = document.getElementById(modalId);
    if (!modal) {
       modal = renderDialog(htmlString, modalId);
    }
    document.getElementById("succes-info-text").innerHTML = texts[number];
    modal.showModal();
    setTimeout(() => modal.close(), 2000);
}

function generateContactID () {
    let contactID = randomString();
    return contactID 
}

function showProfilDetails (contactId) {
    if (checkWindowWidth()) {
        renderContactProfilDesktop(contactId);
        return true
    }
    toggleHide("contact-list-background");
    renderContactProfil(contactId);
    return false
}

function checkWindowWidth () {
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    if (vw >= 1000) {
        return true; 
    }
    return false;
}

function deleteContact (contactID, bool) {
    if (checkWindowWidth ()) {
        deleteContactDesktop(contactID, bool);
        return true
    }
    let entryIndex = userContacts.findIndex(contact => contact["contactId"] === contactID);
    let response = userContacts.splice(entryIndex,1);
    if (response == undefined) {
        console.log("Error: deletion was unsuccesful.");
        return false
    }
    USERS[ACTIVEUSERKEY].contacts = userContacts;
    removeElemente("contact-view-profil-main");
    renderContactList();
    toggleHide("contact-list-background");
    if (bool){showSuccessInfo("1");}
    return true
}

function removeElemente(elementId) {
    let element = document.getElementById(elementId);
    if (!element) { return false; }
    element.remove();
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

function changeProfilBadge(initials, color) {
    let target = "mobile";
    if (checkWindowWidth) {
        target = "desktop";
    }
    let badge = document.getElementById(`contact-user-symbol-badge-${target}`);
    let initialBox = document.getElementById(`contact-user-symbol-initials-${target}`);
    initialBox.innerHTML = initials;
    setBadgeColor(color, badge);
    // TODO add setbadgecolor 
}


function filterContactsByInitials(initial) {
    // Konvertiere den Input-Wert in Großbuchstaben, um die Groß-/Kleinschreibung zu ignorieren
    let targetInitial = initial.toUpperCase();
    // Verwende die filter-Methode, um die Objekte zu filtern
    let contacts = USERS[ACTIVEUSERKEY].contacts;
    let filteredContacts = contacts.filter(contact => {
      // Überprüfe, ob das Initial des Kontakts den zweiten Buchstaben mit dem Zielinitial übereinstimmt
      return contact.initials.length >= 2 && contact.initials[1].toUpperCase() === targetInitial;
    });
    return filteredContacts;
  }

function clear () {
    return ``;
}

