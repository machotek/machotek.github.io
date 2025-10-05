document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.card');

  // Hover animation
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => card.classList.add('hovered'));
    card.addEventListener('mouseleave', () => card.classList.remove('hovered'));
  });

  // Auto-group cards into sets of 3 per row
  const rows = document.querySelectorAll('.row');
  rows.forEach(row => {
    const cards = Array.from(row.children).filter(c => c.classList.contains('card'));

    if (cards.length > 3) {
      row.innerHTML = ''; // clear old layout

      for (let i = 0; i < cards.length; i += 3) {
        const group = document.createElement('div');
        group.classList.add('card-group'); // styling handled by CSS
        cards.slice(i, i + 3).forEach(card => group.appendChild(card));
        row.appendChild(group);
      }
    } else {
      // If <= 3 cards, just wrap them in one group
      const group = document.createElement('div');
      group.classList.add('card-group');
      cards.forEach(card => group.appendChild(card));
      row.innerHTML = '';
      row.appendChild(group);
    }
  });
});
