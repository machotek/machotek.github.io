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

  // Function to open the lightbox
  function openLightbox() {
    if (lightbox) lightbox.remove(); // remove existing if open

    lightbox = document.createElement("div");
    lightbox.className = "lightbox";
    lightbox.innerHTML = `
      <span class="close">&times;</span>
      <a class="prev">&#10094;</a>
      <a class="next">&#10095;</a>
      <img class="lightbox-content" src="${images[currentIndex].src}">
      <div class="caption">${images[currentIndex].alt}</div>
      <div class="lightbox-thumbs">
        ${Array.from(images).map((img, i) =>
          `<img src="${img.src}" alt="${img.alt}" class="${i === currentIndex ? "active" : ""}">`
        ).join("")}
      </div>
    `;
    document.body.appendChild(lightbox);

    // Lock background scroll
    document.body.style.overflow = "hidden";

    const closeBtn = lightbox.querySelector(".close");
    const prevBtn = lightbox.querySelector(".prev");
    const nextBtn = lightbox.querySelector(".next");
    const thumbs = lightbox.querySelectorAll(".lightbox-thumbs img");

    // Close lightbox
    closeBtn.onclick = () => closeLightbox();

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

    // Thumbnail click navigation
    thumbs.forEach((thumb, idx) => {
      thumb.addEventListener("click", () => {
        currentIndex = idx;
        updateLightbox();
      });
    });

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

    // Clean up on removal
    lightbox.addEventListener("DOMNodeRemoved", () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = ""; // unlock scroll
      lightbox = null;
    });
  }

  // Update lightbox image, caption, and active thumb
  function updateLightbox() {
    if (!lightbox) return;
    lightbox.querySelector(".lightbox-content").src = images[currentIndex].src;
    lightbox.querySelector(".caption").textContent = images[currentIndex].alt;

    const thumbs = lightbox.querySelectorAll(".lightbox-thumbs img");
    thumbs.forEach((thumb, idx) => {
      thumb.classList.toggle("active", idx === currentIndex);
      if (idx === currentIndex) {
        thumb.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      }
    });
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
      closeLightbox();
    }
  }

  // Close lightbox helper
  function closeLightbox() {
    if (lightbox) lightbox.remove();
  }
});
