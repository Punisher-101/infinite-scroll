// HTML DOM ELEMENTS
const imageContainer = document.querySelector("#image-container");
const loader = document.querySelector("#loader");

// GLobal Variables
let ready = false;
let totalImages = 0;
let imagesLoaded = 0;
let photosArray = [];

// UNSPLASH API
const count = 10;
const apiKey = "dp3NsRLgUSC4q3BFB6t2k5YwJfZtbCaOHb0uPzkP_-I";
const apiURL = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

// To see when the images were loaded
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    loader.hidden = true;
    ready = true;
  }
}

// Helper Function to set the attributes
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Function to displau the photos on the web
function showPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  photosArray.forEach((photo) => {
    // Creating a Anchor element
    const item = document.createElement("a");
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });

    // Creating a img tag
    const img = document.createElement("img");
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.descriptions,
      title: photo.descriptions,
    });

    // Chekcing whether all the images are loaded
    img.addEventListener("load", imageLoaded);
    // Putting img inside of Anchor tag and then putting that inside imageContainer
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Getting photos from UNSPLASH API
async function getPhotos() {
  try {
    const response = await fetch(apiURL);
    photosArray = await response.json();
    showPhotos();
  } catch (error) {
    // CAtch error here
    console.log(error);
  }
}

// load more images when scrolling to the bottom of the page.
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    getPhotos();
  }
});

getPhotos();
