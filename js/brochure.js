const track = document.querySelector('.carousel-track');
const cards = Array.from(track.children);
const nextBtn = document.querySelector('.arrow.right');
const prevBtn = document.querySelector('.arrow.left');
const dots = Array.from(document.querySelectorAll('.dot'));

let currentIndex = 0;

function updateCarousel() {
  cards.forEach((card, i) => {
    card.classList.remove('active', 'prev', 'next');
    if (i === currentIndex) card.classList.add('active');
    else if (i === (currentIndex - 1 + cards.length) % cards.length) card.classList.add('prev');
    else if (i === (currentIndex + 1) % cards.length) card.classList.add('next');
  });
  
  // Update dots
  dots.forEach((dot, i) => dot.classList.toggle('active', i === currentIndex));
  
  // Center track
  const offset = (cards[currentIndex].offsetLeft + cards[currentIndex].offsetWidth / 2) - track.parentElement.offsetWidth / 2;
  track.style.transform = `translateX(${-offset}px)`;
}

nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % cards.length;
  updateCarousel();
});

prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + cards.length) % cards.length;
  updateCarousel();
});

dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    currentIndex = i;
    updateCarousel();
  });
});

// Initialize
updateCarousel();
