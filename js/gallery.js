document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll(".gallery-img");
  let currentIndex = 0;
  let lightbox = null;

  images.forEach((img, index) => {
    img.addEventListener("click", () => {
      currentIndex = index;
      openLightbox();
    });
  });

  function openLightbox() {
    // If lightbox already exists, remove it first
    if (lightbox) lightbox.remove();

    // Create modal
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

    // Select modal elements
    const closeBtn = lightbox.querySelector(".close");
    const prevBtn = lightbox.querySelector(".prev");
    const nextBtn = lightbox.querySelector(".next");
    const lightboxImg = lightbox.querySelector(".lightbox-content");

    // Close
    closeBtn.onclick = () => lightbox.remove();

    // Prev
    prevBtn.onclick = () => {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      updateLightbox();
    };

    // Next
    nextBtn.onclick = () => {
      currentIndex = (currentIndex + 1) % images.length;
      updateLightbox();
    };

    // Click outside image closes modal
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) {
        lightbox.remove();
      }
    });

    // Keyboard support
    document.addEventListener("keydown", handleKey);

    // Swipe support
    let startX = 0;
    lightboxImg.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
    });
    lightboxImg.addEventListener("touchend", (e) => {
      let endX = e.changedTouches[0].clientX;
      let diff = startX - endX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) nextBtn.click();
        else prevBtn.click();
      }
    });
  }

  function updateLightbox() {
    if (!lightbox) return;
    const lightboxImg = lightbox.querySelector(".lightbox-content");
    const caption = lightbox.querySelector(".caption");
    lightboxImg.src = images[currentIndex].src;
    caption.textContent = images[currentIndex].alt;
  }

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
      lightbox = null;
    }
  }
});
