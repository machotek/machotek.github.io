document.addEventListener("DOMContentLoaded", () => {
  // Toggle main brand-docs sections (User and Service Manuals, etc.)
  document.querySelectorAll(".brand-docs > h4").forEach(header => {
    header.addEventListener("click", () => {
      header.parentElement.classList.toggle("active");
    });
  });

  // Toggle each brand-card (Advance Med, Memo, etc.)
  document.querySelectorAll(".brand-card > h3").forEach(cardHeader => {
    cardHeader.addEventListener("click", () => {
      cardHeader.parentElement.classList.toggle("active");
    });
  });
});
