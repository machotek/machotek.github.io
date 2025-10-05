// Dynamic Lightbox for Gallery
document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll(".gallery-img"); // All gallery images
  let currentIndex = 0;
  let lightbox = null;

  // Attach click event to each image
  images.forEach((img, index) => {
    img.addEventListener("click", () => {
      currentIndex = index;
      openLightbox();
    });
  });

  // Function to create and open the lightbox
  function openLightbox() {
    // Remove existing lightbox if present
    if (lightbox) lightbox.remove();

    // Create modal elements dynamically
    lightbox = document.createElement("div");
    lightbox.className = "lightbox";
    lightbox.innerHTML = `
      <span class="close">&times;</span>
      <a class="prev">&#10094;</a>
      <a class="next">&#10095;</a>
      <img class="lightbox-content" src="${images[currentIndex].src}">
      <div class="caption">${images[currentIndex].alt}</div>
    `;
    document.body.appendChild(lightbox);

    const closeBtn = lightbox.querySelector(".close");
    const prevBtn = lightbox.querySelector(".prev");
    const nextBtn = lightbox.querySelector(".next");

    // Close lightbox
    closeBtn.onclick = () => lightbox.remove();

    // Navigate prev
    prevBtn.onclick = () => {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      updateLightbox();
    };

    // Navigate next
    nextBtn.onclick = () => {
      currentIndex = (currentIndex + 1) % images.length;
      updateLightbox();
    };

    // Click outside image closes modal
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) lightbox.remove();
    });

    // Keyboard navigation
    document.addEventListener("keydown", handleKey);

    // Touch swipe support
    let startX = 0;
    lightbox.querySelector(".lightbox-content").addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
    });
    lightbox.querySelector(".lightbox-content").addEventListener("touchend", (e) => {
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) nextBtn.click();
        else prevBtn.click();
      }
    });

    // Remove keyboard listener when lightbox is removed
    lightbox.addEventListener("DOMNodeRemoved", () => {
      document.removeEventListener("keydown", handleKey);
      lightbox = null;
    });
  }

  // Update lightbox image and caption
  function updateLightbox() {
    if (!lightbox) return;
    lightbox.querySelector(".lightbox-content").src = images[currentIndex].src;
    lightbox.querySelector(".caption").textContent = images[currentIndex].alt;
  }

  // Keyboard navigation handler
  function handleKey(e) {
    if (!lightbox) return;
    if (e.key === "ArrowLeft") {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      updateLightbox();
    } else if (e.key === "ArrowRight") {
      currentIndex = (currentIndex + 1) % images.length;
      updateLightbox();
    } else if (e.key === "Escape") {
      lightbox.remove();
    }
  }
});
