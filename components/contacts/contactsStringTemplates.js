function createContactProfilHTML (name, email, badgeInitials, contactID) {
    return /*html*/`
        <div id="${contactID}" class="contact-list-profile-mobile" onclick="showProfileDetails(${contactID}); setActiveContact(${contactID})">
            <div class="contact-list-profile-badge-box" id="badge-${contactID}-box">
                    <div class="ellipse-profil-badge" id="badge-${contactID}">
                        <span id="badge-${contactID}-span">${badgeInitials}</span>
                    </div>
                </div>
                <div class="contact-name-box">
                    <span class="contact-name" id="contact-${contactID}-name">${name}</span>
                    <span class="contact-email" id="contact-${contactID}-email">${email}</span>
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

function createLineHTML () {
    return /*html*/`
        <div class="line">
            <svg xmlns="http://www.w3.org/2000/svg" width="354" height="2" viewBox="0 0 354 2" fill="none">
                <path d="M1 1H353" stroke="#D1D1D1" stroke-linecap="round"/>
            </svg>
        </div>
    `
}

function createCharHeaderHTML (char) {
    return /*html*/`
        <span class="contact-list-header-char-container">${char}</span>
    `
}
