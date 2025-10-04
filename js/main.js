// Select all gallery images
const galleryImages = document.querySelectorAll('.gallery-img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const caption = document.getElementById('caption');
const closeBtn = document.querySelector('.close');

// Open lightbox on image click
galleryImages.forEach(img => {
  img.addEventListener('click', () => {
    lightbox.style.display = 'block';
    lightboxImg.src = img.src;
    caption.textContent = img.alt;
  });
});

// Close lightbox
closeBtn.addEventListener('click', () => {
  lightbox.style.display = 'none';
});

// Close on clicking outside image
lightbox.addEventListener('click', e => {
  if(e.target === lightbox) {
    lightbox.style.display = 'none';
  }
});

//LOAD HEADER
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
