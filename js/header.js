document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const nav = document.querySelector(".header-nav");
  const themeToggle = document.getElementById("theme-toggle");

  // --- Mobile menu toggle ---
  hamburger.addEventListener("click", () => {
    nav.classList.toggle("active");
  });

  // --- Load saved theme preference ---
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "night") {
    document.body.classList.add("night-mode");
    themeToggle.textContent = "☀️ Day Mode";
  } else {
    themeToggle.textContent = "🌙 Night Mode";
  }

  // --- Toggle theme and save ---
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("night-mode");
    const isNight = document.body.classList.contains("night-mode");

    themeToggle.textContent = isNight ? "☀️ Day Mode" : "🌙 Night Mode";
    localStorage.setItem("theme", isNight ? "night" : "day");
  });
});
