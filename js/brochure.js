const track = document.querySelector('.carousel-track');
const cards = Array.from(track.children);
const dotsContainer = document.querySelector('.carousel-dots');

let currentIndex = 0;

// Touch/swipe variables
let startX = 0;
let endX = 0;

// Generate dots dynamically based on number of cards
cards.forEach((_, i) => {
  const dot = document.createElement('span');
  dot.classList.add('dot');
  if (i === 0) dot.classList.add('active');
  dotsContainer.appendChild(dot);
});

const dots = Array.from(dotsContainer.querySelectorAll('.dot'));

// Update carousel state
function updateCarousel() {
  cards.forEach((card, i) => {
    card.classList.remove('active', 'prev', 'next');
    if (i === currentIndex) card.classList.add('active');
    else if (i === (currentIndex - 1 + cards.length) % cards.length) card.classList.add('prev');
    else if (i === (currentIndex + 1) % cards.length) card.classList.add('next');
  });

  // Enable click only for active card
  cards.forEach(card => {
    const link = card.querySelector('a');
    if (link) {
      link.style.pointerEvents = card.classList.contains('active') ? 'auto' : 'none';
      link.style.cursor = card.classList.contains('active') ? 'pointer' : 'default';
    }
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

// Swipe events for touch devices
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

// Keyboard navigation with arrow keys
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') {
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    updateCarousel();
  } else if (e.key === 'ArrowRight') {
    currentIndex = (currentIndex + 1) % cards.length;
    updateCarousel();
  }
});

// Initialize carousel
updateCarousel();
