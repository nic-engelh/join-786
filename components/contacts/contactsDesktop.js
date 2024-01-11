
function renderContactProfilDesktop (contactId) {
    let contactObject = findContact(contactId);
    const profil = document.createElement("div");
    let elementUsed = document.getElementById("contact-profil-desktop");
    if (elementUsed){elementUsed.remove();}
    profil.id = "contact-profil-desktop";
    profil.innerHTML = createContactProfilViewDesktopHTML(contactObject.initials, contactObject.name, contactObject.email, contactObject.phone);
    document.body.appendChild(profil);
    setBadgeColor(contactObject.color,"frame-105");
}   
