document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.card');
  
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.classList.add('hovered');
    });

    card.addEventListener('mouseleave', () => {
      card.classList.remove('hovered');
    });
  });

  // Ensure all members on the same tier display beside each other
  const rows = document.querySelectorAll('.row');
  rows.forEach(row => {
    row.style.display = 'flex';
    row.style.flexWrap = 'nowrap';
    row.style.justifyContent = 'center';
    row.style.gap = '20px';
  });
});