function createContactProfilHTML (name, email, badgeInitials, contactID) {
    return /*html*/`
        <div id="${contactID}" class="contact-profile" onclick="showProfileDetails(${contactID}); setActiveContact(${contactID})">
            <div>
                <div id="badge-${contactID}" class="contact-profile-badge user-color">
                    ${badgeInitials}
                </div>
                <div>
                    <span>${name}</span>
                    <span>${email}</span>
                </div>
            </div>
        </div>
    `
}

function createSuccessInfoHTML (text) {
    return  /*html*/`
        <div class="alert d-flex align-items-center justify-content-center slide-in visually-hidden" id="contact-alert">
            <span class="fw-4 fs-2">${text}</span>
        </div>
    `
}
