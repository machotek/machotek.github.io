// ==============================
// Dynamic Lightbox for Gallery
// ==============================
document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll(".gallery-img"); // all gallery images
  let currentIndex = 0;
  let lightbox = null;

  // Open lightbox when clicking an image
  images.forEach((img, index) => {
    img.addEventListener("click", () => {
      currentIndex = index;
      openLightbox();
    });
  });

  // ------------------------------
  // Open Lightbox
  // ------------------------------
  function openLightbox() {
    if (lightbox) lightbox.remove();

    lightbox = document.createElement("div");
    lightbox.className = "lightbox";
    lightbox.innerHTML = `
      <span class="close">&times;</span>
      <a class="prev">&#10094;</a>
      <a class="next">&#10095;</a>
      <img class="lightbox-content" src="${images[currentIndex].src}">
      <div class="caption">${images[currentIndex].alt}</div>
      <div class="lightbox-thumbs"></div>
    `;
    document.body.appendChild(lightbox);

    // Lock background scroll
    document.body.style.overflow = "hidden";

    const closeBtn = lightbox.querySelector(".close");
    const prevBtn = lightbox.querySelector(".prev");
    const nextBtn = lightbox.querySelector(".next");
    const thumbsContainer = lightbox.querySelector(".lightbox-thumbs");

    // Add thumbnails dynamically
    images.forEach((img, idx) => {
      const thumb = document.createElement("img");
      thumb.src = img.src;
      thumb.alt = img.alt;
      thumb.className = "thumb" + (idx === currentIndex ? " active" : "");
      thumb.addEventListener("click", () => {
        currentIndex = idx;
        updateLightbox();
      });
      thumbsContainer.appendChild(thumb);
    });

    // Close lightbox
    closeBtn.onclick = () => closeLightbox();

    // Prev/Next navigation
    prevBtn.onclick = () => {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      updateLightbox();
    };
    nextBtn.onclick = () => {
      currentIndex = (currentIndex + 1) % images.length;
      updateLightbox();
    };

    // Click outside image closes modal
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closeLightbox();
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

    // Clean up when lightbox removed
    lightbox.addEventListener("DOMNodeRemoved", () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = ""; // unlock background scroll
      lightbox = null;
    });
  }

  // ------------------------------
  // Close Lightbox
  // ------------------------------
  function closeLightbox() {
    if (lightbox) {
      lightbox.remove();
      document.body.style.overflow = ""; // unlock scroll
    }
  }

  // ------------------------------
  // Update Lightbox (image, caption, active thumb)
  // ------------------------------
  function updateLightbox() {
    if (!lightbox) return;

    const mainImg = lightbox.querySelector(".lightbox-content");
    const caption = lightbox.querySelector(".caption");
    const thumbs = lightbox.querySelectorAll(".lightbox-thumbs img");

    // Update image & caption
    mainImg.src = images[currentIndex].src;
    caption.textContent = images[currentIndex].alt;

    // Highlight active thumbnail
    thumbs.forEach((t, i) => {
      t.classList.toggle("active", i === currentIndex);
    });

    // Scroll active thumbnail into view
    const activeThumb = thumbs[currentIndex];
    if (activeThumb) {
      activeThumb.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest"
      });
    }
  }

  // ------------------------------
  // Keyboard navigation handler
  // ------------------------------
  function handleKey(e) {
    if (!lightbox) return;
    if (e.key === "ArrowLeft") {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      updateLightbox();
    } else if (e.key === "ArrowRight") {
      currentIndex = (currentIndex + 1) % images.length;
      updateLightbox();
    } else if (e.key === "Escape") {
      closeLightbox();
    }
  }
});
