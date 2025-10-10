document.addEventListener("DOMContentLoaded", () => {
  // Toggle main section (e.g., "User and Service Manuals")
  document.querySelectorAll(".brand-docs > h4").forEach(header => {
    header.addEventListener("click", () => {
      header.parentElement.classList.toggle("active");
    });
  });

  // Toggle each brand card (e.g., "Advance Med")
  document.querySelectorAll(".brand-card > h3").forEach(brandHeader => {
    brandHeader.addEventListener("click", () => {
      brandHeader.parentElement.classList.toggle("active");
    });
  });
});
