
// event listener 1:
// check if section join36, board, add tasks or contacts are active
// if so remove contact-view-profil-main


// event listener 2:
// check if modal (desktop or mobile) is active
// listen for innerwidth with changes event
// if innerwidth is < 1000 px activate modal mobile and close modal desktop
// if innderwidth is > 1000 px activete modal desktop and close modal mobile


/**
 * function for check window size and controlling modals
 * 
 */
function checkScreenSize() {
    // Bildschirmbreite abrufen
    var screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  
    // Überprüfen, ob die Bildschirmbreite größer als 1000px ist
    if (screenWidth > 1000) {
      // Modal_a schließen (falls es geöffnet ist)
      var modalA = document.getElementById('modal_a');
      if (modalA) {
        modalA.style.display = 'none';
      }
  
      // Modal_b öffnen (falls vorhanden)
      var modalB = document.getElementById('modal_b');
      if (modalB) {
        modalB.style.display = 'block';
      }
    }
  }
  
  // Eventlistener hinzufügen, um die Funktion bei Änderungen der Bildschirmgröße aufzurufen
  window.addEventListener('resize', checkScreenSize);
  
  // Die Funktion beim Laden der Seite einmalig aufrufen, um den initialen Status zu überprüfen
  window.addEventListener('load', checkScreenSize);