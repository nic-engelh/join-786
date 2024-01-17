
function renderContactProfilDesktop (contactId) {
    let contactObject = findContact(contactId);
    const profil = document.createElement("div");
    let elementUsed = document.getElementById("contact-profil-desktop-container");
    if (elementUsed){elementUsed.remove();}
    profil.id = "contact-profil-desktop-container";
    profil.innerHTML = createContactProfilViewDesktopHTML(contactObject.initials, contactObject.name, contactObject.email, contactObject.phone);
    // document.body.appendChild(profil);
    document.getElementById("contact-profil-desktop").appendChild(profil);
    setBadgeColor(contactObject.color,"frame-105-desktop");
    // TODO set badge color contact-user-symbol-badge-desktop
}   

function deleteContactDesktop (contactID, bool) {
    let entryIndex = userContacts.findIndex(contact => contact["contactId"] === contactID);
    let response = userContacts.splice(entryIndex,1);
    if (response == undefined) {
        console.log("Error: deletion was unsuccesful.");
        return false
    }
    USERS[ACTIVEUSERKEY].contacts = userContacts;
    removeElemente("contact-profil-desktop-container");
    renderContactList();
    if (bool){showSuccessInfo("1");}
    activeContact = null;
}