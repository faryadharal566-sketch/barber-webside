
// Wait until page is loaded, then hide loader
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  setTimeout(() => loader.classList.add("hidden"), 1500);
});

// Mobile navigation
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => navLinks.classList.remove("active"));
});

// Navbar animation
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 50);
});

// Scroll reveal
const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealElements.forEach(element => revealObserver.observe(element));

// Custom cursor glow
const cursorGlow = document.querySelector(".cursor-glow");

window.addEventListener("mousemove", event => {
  cursorGlow.style.left = event.clientX + "px";
  cursorGlow.style.top = event.clientY + "px";
});

// Dark / Light theme
const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-theme");

  const lightMode = document.body.classList.contains("light-theme");
  themeToggle.textContent = lightMode ? "☾" : "☼";
});

// Before / After comparison slider
const compareRange = document.querySelector(".compare-range");
const comparisonAfter = document.querySelector(".comparison-after");
const compareLine = document.querySelector(".compare-line");

compareRange.addEventListener("input", () => {
  const value = compareRange.value;
  comparisonAfter.style.width = value + "%";
  compareLine.style.left = value + "%";
});

// Customer review slider (sample reviews)
const reviews = [
  {
    name: "Oliver R.",
    role: "CUSTOMER",
    stars: "★★★★★",
    text: "Great attention to detail. The team made the whole experience comfortable."
  },
  {
    name: "Daniel K.",
    role: "CUSTOMER",
    stars: "★★★★★",
    text: "Really pleased with the haircut. Professional service and a welcoming atmosphere."
  },
  {
    name: "James T.",
    role: "CUSTOMER",
    stars: "★★★★★",
    text: "Excellent grooming experience. I would definitely recommend this barber shop."
  }
];

let currentReview = 0;

const reviewName = document.getElementById("reviewName");
const reviewRole = document.getElementById("reviewRole");
const reviewText = document.getElementById("reviewText");
const reviewStars = document.getElementById("reviewStars");
const reviewDots = document.getElementById("reviewDots");

function showReview(index) {
  currentReview = (index + reviews.length) % reviews.length;

  const review = reviews[currentReview];

  reviewName.textContent = review.name;
  reviewRole.textContent = review.role;
  reviewText.textContent = "“" + review.text + "”";
  reviewStars.textContent = review.stars;

  reviewDots.querySelectorAll("button").forEach((dot, i) => {
    dot.classList.toggle("active", i === currentReview);
  });
}

// Create review navigation dots
reviews.forEach((review, index) => {
  const dot = document.createElement("button");
  dot.setAttribute("aria-label", "Show review " + (index + 1));
  dot.addEventListener("click", () => showReview(index));
  reviewDots.appendChild(dot);
});

document.getElementById("reviewPrev").addEventListener("click", () => {
  showReview(currentReview - 1);
});

document.getElementById("reviewNext").addEventListener("click", () => {
  showReview(currentReview + 1);
});

showReview(0);

// Booking date: use the visitor's local date
const bookingDate = document.getElementById("bookingDate");

function getLocalDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

bookingDate.min = getLocalDate();

// Demo booking form
const bookingForm = document.getElementById("bookingForm");
const formMessage = document.getElementById("formMessage");

bookingForm.addEventListener("submit", event => {
  event.preventDefault();

  const name = document.getElementById("customerName").value.trim();
  const phone = document.getElementById("customerPhone").value.trim();
  const service = document.getElementById("serviceSelect").value;
  const barber = document.getElementById("barberSelect").value;
  const date = bookingDate.value;
  const time = document.getElementById("bookingTime").value;

  if (!name || !phone || !service || !barber || !date || !time) {
    formMessage.textContent = "Please complete all required fields.";
    return;
  }

  formMessage.textContent =
    `Thank you, ${name}! Your demo request for ${service} with ${barber} on ${date} at ${time} has been prepared. This is not a confirmed appointment.`;

  bookingForm.reset();
  bookingDate.min = getLocalDate();
});

// WhatsApp booking button
// Replace with the real shop number, including country code, without + or spaces.
// Example format: 447XXXXXXXXX
const whatsappNumber = "";

const whatsappLink = document.getElementById("whatsappLink");

whatsappLink.addEventListener("click", event => {
  event.preventDefault();

  if (!whatsappNumber) {
    alert("Add the real barber shop WhatsApp number in script.js first.");
    return;
  }

  const message = encodeURIComponent(
    "Hello UK Barber! I would like to ask about booking an appointment."
  );

  window.open(
    `https://wa.me/${whatsappNumber}?text=${message}`,
    "_blank",
    "noopener"
  );
});

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();
