document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.card');

  // Hover animation only
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => card.classList.add('hovered'));
    card.addEventListener('mouseleave', () => card.classList.remove('hovered'));
  });
});
