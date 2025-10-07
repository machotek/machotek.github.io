// Optimized Dynamic Lightbox for Gallery
document.addEventListener("DOMContentLoaded", () => {
const images = document.querySelectorAll(".gallery-img");
let currentIndex = 0;
let lightbox, lightboxImg, caption, thumbs;

// Create lightbox once
lightbox = document.createElement("div");
lightbox.className = "lightbox";
lightbox.innerHTML = `     <span class="close">&times;</span>     <a class="prev">&#10094;</a>     <a class="next">&#10095;</a>     <img class="lightbox-content" src="">     <div class="caption"></div>     <div class="lightbox-thumbs"></div>
  `;
document.body.appendChild(lightbox);
lightbox.style.display = "none";

// Reference elements
const closeBtn = lightbox.querySelector(".close");
const prevBtn = lightbox.querySelector(".prev");
const nextBtn = lightbox.querySelector(".next");
lightboxImg = lightbox.querySelector(".lightbox-content");
caption = lightbox.querySelector(".caption");
const thumbsContainer = lightbox.querySelector(".lightbox-thumbs");

// Build thumbnails once (for speed)
thumbsContainer.innerHTML = Array.from(images)
.map((img, i) => `<img src="${img.src}" alt="${img.alt}" data-index="${i}">`)
.join("");
thumbs = thumbsContainer.querySelectorAll("img");

// Open lightbox
images.forEach((img, index) => {
img.addEventListener("click", () => openLightbox(index));
});

function openLightbox(index) {
currentIndex = index;
updateLightbox();
lightbox.style.display = "flex";
document.body.style.overflow = "hidden"; // lock background scroll
}

function closeLightbox() {
lightbox.style.display = "none";
document.body.style.overflow = ""; // restore scroll
}

// Update image + caption + active thumb
function updateLightbox() {
lightboxImg.src = images[currentIndex].src;
caption.textContent = images[currentIndex].alt;
thumbs.forEach((t) => t.classList.remove("active"));
thumbs[currentIndex].classList.add("active");
thumbs[currentIndex].scrollIntoView({ inline: "center", behavior: "smooth" });
}

// Navigation
function navigate(dir) {
currentIndex = (currentIndex + dir + images.length) % images.length;
updateLightbox();
}

// Event listeners
closeBtn.addEventListener("click", closeLightbox);
prevBtn.addEventListener("click", () => navigate(-1));
nextBtn.addEventListener("click", () => navigate(1));

// Click outside closes
lightbox.addEventListener("click", (e) => {
if (e.target === lightbox) closeLightbox();
});

// Keyboard navigation
document.addEventListener("keydown", (e) => {
if (lightbox.style.display === "flex") {
if (e.key === "ArrowLeft") navigate(-1);
if (e.key === "ArrowRight") navigate(1);
if (e.key === "Escape") closeLightbox();
}
});

// Touch swipe
let startX = 0;
lightboxImg.addEventListener("touchstart", (e) => (startX = e.touches[0].clientX));
lightboxImg.addEventListener("touchend", (e) => {
const diff = startX - e.changedTouches[0].clientX;
if (Math.abs(diff) > 50) navigate(diff > 0 ? 1 : -1);
});

// Thumbnail click
thumbs.forEach((thumb) =>
thumb.addEventListener("click", (e) => {
currentIndex = parseInt(e.target.dataset.index);
updateLightbox();
})
);
});
