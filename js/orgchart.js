document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.card');

  // Hover animation
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => card.classList.add('hovered'));
    card.addEventListener('mouseleave', () => card.classList.remove('hovered'));
  });

  // Auto-format tiers: max 3 cards per line
  const rows = document.querySelectorAll('.row');
  rows.forEach(row => {
    const cards = Array.from(row.children);
    if (cards.length > 3) {
      // Clear existing children
      row.innerHTML = '';

      // Group cards into sets of 3
      for (let i = 0; i < cards.length; i += 3) {
        const group = document.createElement('div');
        group.classList.add('card-group');
        group.style.display = 'flex';
        group.style.justifyContent = 'center';
        group.style.gap = '28px';
        group.style.flexWrap = 'nowrap';

        cards.slice(i, i + 3).forEach(card => group.appendChild(card));
        row.appendChild(group);
      }
    } else {
      // Normal layout for 3 or fewer
      row.style.display = 'flex';
      row.style.flexWrap = 'nowrap';
      row.style.justifyContent = 'center';
      row.style.gap = '28px';
    }
  });
});
