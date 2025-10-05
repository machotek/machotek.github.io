document.addEventListener("DOMContentLoaded", () => {
  // Load Header
  fetch('header.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('header-placeholder').innerHTML = data;

      // ✅ Move hamburger code here so it runs AFTER header loads
      const hamburger = document.getElementById("hamburger");
      const nav = document.querySelector(".header-nav");

      if (hamburger && nav) {
        hamburger.addEventListener("click", () => {
          nav.classList.toggle("active");
        });
      }
    })
    .catch(err => console.error('Error loading header:', err));

  // Load Footer
  fetch('footer.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('footer-placeholder').innerHTML = data;
    })
    .catch(err => console.error('Error loading footer:', err));
});
