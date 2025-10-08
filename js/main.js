document.addEventListener("DOMContentLoaded", () => {
  // --- Load Header ---
  fetch('header.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('header-placeholder').innerHTML = data;

      // ✅ Dynamically load header.js so theme toggle and hamburger work
      const headerScript = document.createElement('script');
      headerScript.src = 'js/header.js';
      headerScript.defer = true;
      document.body.appendChild(headerScript);
    })
    .catch(err => console.error('Error loading header:', err));

  // --- Load Footer ---
  fetch('footer.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('footer-placeholder').innerHTML = data;

      // Optional: dynamically load footer.js if needed
      const footerScript = document.createElement('script');
      footerScript.src = 'js/footer.js';
      footerScript.defer = true;
      document.body.appendChild(footerScript);
    })
    .catch(err => console.error('Error loading footer:', err));
});
