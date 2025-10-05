document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.card');

  // Hover effect
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => card.classList.add('hovered'));
    card.addEventListener('mouseleave', () => card.classList.remove('hovered'));
  });

  // Auto-group into sets of 3 per row
  const rows = document.querySelectorAll('.row');
  rows.forEach(row => {
    const cards = Array.from(row.querySelectorAll('.card'));

    if (cards.length > 3) {
      row.innerHTML = ''; // clear existing cards

      for (let i = 0; i < cards.length; i += 3) {
        const group = document.createElement('div');
        group.classList.add('card-group');
        group.style.display = 'flex';
        group.style.flexWrap = 'wrap';
        group.style.justifyContent = 'center';
        group.style.gap = '28px';
        group.style.width = '100%';
        group.style.marginBottom = '28px';

        cards.slice(i, i + 3).forEach(card => group.appendChild(card));
        row.appendChild(group);
      }
    } else {
      // <=3 cards, wrap in a single centered group
      const group = document.createElement('div');
      group.classList.add('card-group');
      group.style.display = 'flex';
      group.style.flexWrap = 'wrap';
      group.style.justifyContent = 'center';
      group.style.gap = '28px';
      group.style.width = '100%';
      group.style.marginBottom = '28px';

      cards.forEach(card => group.appendChild(card));
      row.innerHTML = '';
      row.appendChild(group);
    }
  });
});
