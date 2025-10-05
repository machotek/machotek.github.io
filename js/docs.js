document.addEventListener("DOMContentLoaded", () => {
  // Toggle brands
  document.querySelectorAll(".brand-docs > h4").forEach(header => {
    header.addEventListener("click", () => {
      header.parentElement.classList.toggle("active");
    });
  });

  // Toggle classifications
  document.querySelectorAll(".doc-category > h3").forEach(header => {
    header.addEventListener("click", () => {
      header.parentElement.classList.toggle("active");
    });
  });
});
