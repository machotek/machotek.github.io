document.addEventListener("DOMContentLoaded", () => {
  // --- Load Header ---
  fetch('header.html')
    .then(response => response.text())
    .then(data => {
      const headerPlaceholder = document.getElementById('header-placeholder');
      headerPlaceholder.innerHTML = data;

      // Initialize after header is inserted
      initHeader();
    })
    .catch(err => console.error('Error loading header:', err));

  // --- Load Footer ---
  fetch('footer.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('footer-placeholder').innerHTML = data;
    })
    .catch(err => console.error('Error loading footer:', err));
});

// --- Initialize header interactions ---
function initHeader() {
  const hamburger = document.getElementById("hamburger");
  const nav = document.querySelector(".header-nav");
  const themeToggle = document.getElementById("theme-toggle");

  // --- Mobile menu toggle ---
  if (hamburger && nav) {
    hamburger.addEventListener("click", () => {
      nav.classList.toggle("active");
    });
  }

  // --- Theme toggle ---
  if (themeToggle) {
    // Load saved theme preference
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "night") {
      document.body.classList.add("night-mode");
      themeToggle.textContent = "☀️ Day Mode";
    } else {
      themeToggle.textContent = "🌙 Night Mode";
    }

    // Toggle on click
    themeToggle.addEventListener("click", () => {
      const isNight = document.body.classList.toggle("night-mode");
      themeToggle.textContent = isNight ? "☀️ Day Mode" : "🌙 Night Mode";
      localStorage.setItem("theme", isNight ? "night" : "day");
    });
  }
}
