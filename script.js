document.addEventListener("DOMContentLoaded", () => {
  const list = document.getElementById("carouselList");
  const btnPrev = document.getElementById("btnPrev");
  const btnNext = document.getElementById("btnNext");
  const announcer = document.getElementById("carouselAnnouncer");
  const items = document.querySelectorAll(".carousel-item");
  const totalItems = items.length;
  
  // calcoliamo le card visibili contemporaneamente (nel nostro design sono 3)
  const cardsPerView = 3;

  function updateAnnouncer() {
    // la larghezza di uno spostamento equivale a un list item più il suo gap
    const itemWidth = items[0].offsetWidth + 16; 
    
    // calcoliamo quale card si trova all'estrema sinistra della finestra visibile
    const scrollPosition = list.scrollLeft;
    const firstVisibleIndex = Math.round(scrollPosition / itemWidth) + 1;
    
    let lastVisibleIndex = firstVisibleIndex + (cardsPerView - 1);
    if (lastVisibleIndex > totalItems) {
      lastVisibleIndex = totalItems;
    }

    // aggiorniamo la regione live polite
    announcer.textContent = `Visualizzate card da ${firstVisibleIndex} a ${lastVisibleIndex} di ${totalItems}.`;
  }

  // gestione dei pulsanti per gli utenti mouse/touch
  btnNext.addEventListener("click", () => {
    const itemWidth = items[0].offsetWidth + 16;
    list.scrollBy({ left: itemWidth, behavior: "smooth" });
  });

  btnPrev.addEventListener("click", () => {
    const itemWidth = items[0].offsetWidth + 16;
    list.scrollBy({ left: -itemWidth, behavior: "smooth" });
  });

  // intercettiamo lo scorrimento, utile in caso di navigazione tramite tasto tab
  let scrollTimeout;
  list.addEventListener("scroll", () => {
    clearTimeout(scrollTimeout);
    // attendiamo un breve istante dopo che lo scorrimento si è fermato
    scrollTimeout = setTimeout(updateAnnouncer, 200); 
  });
});
