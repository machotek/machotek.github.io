// Collapsible toggle script with icons
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".brand-docs h3").forEach(header => {
    header.addEventListener("click", () => {
      header.parentElement.classList.toggle("active");
    });
  });
});
