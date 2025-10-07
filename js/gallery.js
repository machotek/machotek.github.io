// Dynamic Lightbox for Gallery
document.addEventListener("DOMContentLoaded", () => {
const images = document.querySelectorAll(".gallery-img");
let currentIndex = 0;
let lightbox = null;

// Open lightbox when an image is clicked
images.forEach((img, index) => {
img.addEventListener("click", () => {
currentIndex = index;
openLightbox();
});
});

// Open the lightbox
function openLightbox() {
if (lightbox) lightbox.remove();

```
lightbox = document.createElement("div");
lightbox.className = "lightbox";
lightbox.innerHTML = `
  <span class="close">&times;</span>
  <a class="prev">&#10094;</a>
  <a class="next">&#10095;</a>
  <img class="lightbox-content" src="${images[currentIndex].src}">
  <div class="caption">${images[currentIndex].alt}</div>
  <div class="lightbox-thumbs">
    ${Array.from(images)
      .map(
        (img, i) =>
          `<img src="${img.src}" alt="${img.alt}" class="${i === currentIndex ? "active" : ""}">`
      )
      .join("")}
  </div>
`;
document.body.appendChild(lightbox);

// Lock background scroll
document.body.style.overflow = "hidden";

const closeBtn = lightbox.querySelector(".close");
const prevBtn = lightbox.querySelector(".prev");
const nextBtn = lightbox.querySelector(".next");
const thumbs = lightbox.querySelectorAll(".lightbox-thumbs img");
const mainImg = lightbox.querySelector(".lightbox-content");

// Close lightbox
closeBtn.onclick = closeLightbox;

// Prev / Next navigation
prevBtn.onclick = () => navigate(-1);
nextBtn.onclick = () => navigate(1);

// Thumbnail click navigation
thumbs.forEach((thumb, idx) => {
  thumb.addEventListener("click", () => {
    currentIndex = idx;
    updateLightbox();
  });
});

// Click outside closes lightbox
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});

// Keyboard navigation
document.addEventListener("keydown", handleKey);

// Touch swipe
let startX = 0;
mainImg.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});
mainImg.addEventListener("touchend", (e) => {
  const diff = startX - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 50) navigate(diff > 0 ? 1 : -1);
});
```

}

// Update image, caption, and active thumb
function updateLightbox() {
if (!lightbox) return;
const mainImg = lightbox.querySelector(".lightbox-content");
const caption = lightbox.querySelector(".caption");
const thumbs = lightbox.querySelectorAll(".lightbox-thumbs img");

```
mainImg.src = images[currentIndex].src;
caption.textContent = images[currentIndex].alt;

thumbs.forEach((thumb, idx) => {
  thumb.classList.toggle("active", idx === currentIndex);
  if (idx === currentIndex) {
    thumb.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }
});
```

}

// Navigate through images
function navigate(direction) {
currentIndex = (currentIndex + direction + images.length) % images.length;
updateLightbox();
}

// Handle keyboard navigation
function handleKey(e) {
if (!lightbox) return;
if (e.key === "ArrowLeft") navigate(-1);
else if (e.key === "ArrowRight") navigate(1);
else if (e.key === "Escape") closeLightbox();
}

// Close the lightbox and restore scroll
function closeLightbox() {
if (lightbox) {
document.body.style.overflow = ""; // ✅ restore scroll
document.removeEventListener("keydown", handleKey);
lightbox.remove();
lightbox = null;
}
}
});
