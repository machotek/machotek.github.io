document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll(".gallery-img");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const caption = document.getElementById("caption");
  const closeBtn = document.querySelector(".lightbox .close");
  const prevBtn = document.querySelector(".lightbox .prev");
  const nextBtn = document.querySelector(".lightbox .next");

  let currentIndex = 0;

  // Open lightbox when clicking an image
  images.forEach((img, index) => {
    img.addEventListener("click", () => {
      lightbox.style.display = "block";
      currentIndex = index;
      showImage(currentIndex);
    });
  });

  // Close lightbox
  closeBtn.addEventListener("click", () => {
    lightbox.style.display = "none";
  });

  // Navigate left
  prevBtn.addEventListener("click", () => {
    showPrev();
  });

  // Navigate right
  nextBtn.addEventListener("click", () => {
    showNext();
  });

  // Close when clicking outside image
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.style.display = "none";
    }
  });

  // ✅ Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (lightbox.style.display === "block") {
      if (e.key === "ArrowLeft") showPrev();
      else if (e.key === "ArrowRight") showNext();
      else if (e.key === "Escape") lightbox.style.display = "none";
    }
  });

  // ✅ Touch-swipe support
  let startX = 0;
  lightboxImg.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  lightboxImg.addEventListener("touchend", (e) => {
    let endX = e.changedTouches[0].clientX;
    let diff = startX - endX;

    if (Math.abs(diff) > 50) { // swipe threshold
      if (diff > 0) {
        showNext(); // swipe left → next
      } else {
        showPrev(); // swipe right → prev
      }
    }
  });

  // Helpers
  function showImage(index, direction = null) {
    // Remove classes before transition
    lightboxImg.classList.remove("show", "slide-left", "slide-right");

    // Small delay to restart animation
    setTimeout(() => {
      if (direction === "left") {
        lightboxImg.classList.add("slide-left");
      } else if (direction === "right") {
        lightboxImg.classList.add("slide-right");
      }

      lightboxImg.src = images[index].src;
      caption.textContent = images[index].alt;

      // Force reflow so transition triggers
      void lightboxImg.offsetWidth;

      lightboxImg.classList.add("show");
    }, 50);
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex, "right"); // slide in from right
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex, "left"); // slide in from left
  }
});
