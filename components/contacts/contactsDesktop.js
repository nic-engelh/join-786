
function renderContactProfilDesktop (contactId) {
    let contactObject = findContact(contactId);
    const profil = document.createElement("div");
    let elementUsed = document.getElementById("contact-profil-desktop");
    if (elementUsed){elementUsed.remove();}
    profil.id = "contact-profil-desktop";
    profil.innerHTML = createContactProfilViewDesktopHTML(contactObject.initials, contactObject.name, contactObject.email, contactObject.phone);
    // document.body.appendChild(profil);
    document.getElementbyId("contact-view-desktop-section-right").appendChild(profil);
    setBadgeColor(contactObject.color,"frame-105");
}   

function deleteContactDesktop (contactID, bool) {
    let entryIndex = userContacts.findIndex(contact => contact["contactId"] === contactID);
    let response = userContacts.splice(entryIndex,1);
    if (response == undefined) {
        console.log("Error: deletion was unsuccesful.");
        return false
    }
    USERS[ACTIVEUSERKEY].contacts = userContacts;
    removeElemente("contact-profil-desktop");
    renderContactList();
    if (bool){showSuccessInfo("1");}
}