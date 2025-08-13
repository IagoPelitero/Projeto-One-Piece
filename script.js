document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.crew-container');
  const members = Array.from(document.querySelectorAll('.crew-member'));
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const nextBtn = document.querySelector('.carousel-btn.next');

  let visibleCards = getVisibleCards();
  let cardWidth = members[0].offsetWidth + 20;
  let currentIndex = visibleCards;

  // Clonar elementos
  const clonesStart = members.slice(-visibleCards).map(el => el.cloneNode(true));
  const clonesEnd = members.slice(0, visibleCards).map(el => el.cloneNode(true));
  clonesStart.forEach(clone => container.prepend(clone));
  clonesEnd.forEach(clone => container.append(clone));

  function updateCarousel(animate = true) {
    container.style.transition = animate ? 'transform 0.4s ease' : 'none';
    container.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
  }

  nextBtn.addEventListener('click', () => {
    currentIndex++;
    updateCarousel();
    if (currentIndex === members.length + visibleCards) {
      setTimeout(() => {
        currentIndex = visibleCards;
        updateCarousel(false);
      }, 400);
    }
  });

  prevBtn.addEventListener('click', () => {
    currentIndex--;
    updateCarousel();
    if (currentIndex === 0) {
      setTimeout(() => {
        currentIndex = members.length;
        updateCarousel(false);
      }, 400);
    }
  });

  // Swipe / Drag
  let startX = 0;
  let isDragging = false;

  container.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
    isDragging = true;
  });

  container.addEventListener('touchend', e => {
    if (!isDragging) return;
    const endX = e.changedTouches[0].clientX;
    handleSwipe(endX - startX);
    isDragging = false;
  });

  container.addEventListener('mousedown', e => {
    startX = e.clientX;
    isDragging = true;
  });

  container.addEventListener('mouseup', e => {
    if (!isDragging) return;
    const endX = e.clientX;
    handleSwipe(endX - startX);
    isDragging = false;
  });

  function handleSwipe(deltaX) {
    if (deltaX > 50) {
      prevBtn.click();
    } else if (deltaX < -50) {
      nextBtn.click();
    }
  }

  function getVisibleCards() {
    const width = window.innerWidth;
    if (width < 600) return 1;
    if (width < 900) return 2;
    return 3;
  }

  window.addEventListener('resize', () => {
    visibleCards = getVisibleCards();
    cardWidth = members[0].offsetWidth + 20;
    updateCarousel(false);
  });

  updateCarousel(false);
});