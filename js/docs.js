document.addEventListener("DOMContentLoaded", () => {
  // Toggle main brand-docs sections (e.g., "User and Service Manuals")
  document.querySelectorAll(".brand-docs > h4").forEach(header => {
    header.addEventListener("click", () => {
      header.parentElement.classList.toggle("active");
    });
  });
});
