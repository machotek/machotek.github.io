document.addEventListener("DOMContentLoaded", () => {
  // Load Header
  fetch('header.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('header-placeholder').innerHTML = data;
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
// nav.classList.toggle("active") adds/removes the .active class each time you click the hamburger.
<script>
  document.addEventListener("DOMContentLoaded", function() {
    const hamburger = document.getElementById("hamburger");
    const nav = document.querySelector(".header-nav");

    hamburger.addEventListener("click", function() {
      nav.classList.toggle("active");
    });
  });
</script>
