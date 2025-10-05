document.addEventListener("DOMContentLoaded", () => {
  // Toggle brand sections
  document.querySelectorAll(".brand-docs > h4").forEach(header => {
    header.addEventListener("click", () => {
      header.parentElement.classList.toggle("active");
    });
  });

  // Toggle classification sections
  document.querySelectorAll(".doc-category > h3").forEach(header => {
    header.addEventListener("click", (e) => {
      e.stopPropagation(); // prevent brand toggle when clicking h3
      header.parentElement.classList.toggle("active");
    });
  });
});
