const track = document.querySelector('.carousel-track');
const cards = Array.from(track.children);
const dots = Array.from(document.querySelectorAll('.dot'));

let currentIndex = 0;

// Touch variables
let startX = 0;
let endX = 0;

function updateCarousel() {
  cards.forEach((card, i) => {
    card.classList.remove('active', 'prev', 'next');
    if (i === currentIndex) card.classList.add('active');
    else if (i === (currentIndex - 1 + cards.length) % cards.length) card.classList.add('prev');
    else if (i === (currentIndex + 1) % cards.length) card.classList.add('next');
  });

  // Center track
  const offset = (cards[currentIndex].offsetLeft + cards[currentIndex].offsetWidth / 2) - track.parentElement.offsetWidth / 2;
  track.style.transform = `translateX(${-offset}px)`;

  // Update dots
  dots.forEach((dot, i) => dot.classList.toggle('active', i === currentIndex));
}

// Dot navigation
dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    currentIndex = i;
    updateCarousel();
  });
});

// Swipe events
track.addEventListener('touchstart', e => {
  startX = e.touches[0].clientX;
});

track.addEventListener('touchmove', e => {
  endX = e.touches[0].clientX;
});

track.addEventListener('touchend', () => {
  const distance = endX - startX;
  const threshold = 50; // minimum distance to consider swipe

  if (distance > threshold) {
    // Swipe right → previous
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
  } else if (distance < -threshold) {
    // Swipe left → next
    currentIndex = (currentIndex + 1) % cards.length;
  }
  updateCarousel();
});

// Initialize
updateCarousel();
