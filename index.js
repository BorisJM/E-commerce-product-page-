"use strict";
const thumbnailsContainer = document.querySelector(".thumbnails-container");
const thumbnailsPictures = Array.from(
  document.querySelectorAll(".picture-slide")
);
const articleContainer = document.querySelector("article");
const imagesContainer = document.querySelector(".images-container");
const lightbox = document.querySelector(".lightbox-container");
const activeSlide = document.querySelector(".active-slide");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const signContainer = document.querySelector(".sign-container");
const addToCart = document.querySelector(".add-btn");
const productAmount = document.querySelector(".product-amount");
const userCart = document.querySelector(".user-products");
const userCartContainer = document.querySelector(".user-cart");
const userContainer = document.querySelector(".user-container");
const cartBtn = document.querySelector(".cart-btn");
const overlay = document.querySelector(".overlay");
const menuBtn = document.querySelector(".menu-icon");
const closeBtn = document.querySelector(".close-icon");
const navBar = document.querySelector(".nav-list");
const navigation = document.querySelector(".navbar");
const body = document.querySelector("body");

let shoesAmount = 0;
let currentSlide = 1;

function closeLightBox() {
  overlay.classList.add("hidden");
  document.querySelector(".lightbox-container").remove();
  body.style.overflow = "auto";
}

function changeSlide(el) {
  el.setAttribute("src", `./images/image-product-${currentSlide}.jpg`);
  removeBorderPicture();
}

function previousSlide() {
  const activeSlideCopy = document.querySelector(".active-slide-copy");
  currentSlide--;
  if (currentSlide === 0) {
    currentSlide = 4;
    changeSlide(activeSlide);
    changeSlide(activeSlideCopy);
  }
  if (currentSlide > 0) {
    changeSlide(activeSlide);
    changeSlide(activeSlideCopy);
  }
}

function nextSlide() {
  const activeSlideCopy = document.querySelector(".active-slide-copy");
  currentSlide++;
  if (currentSlide === 5) {
    currentSlide = 1;
    changeSlide(activeSlide);
    changeSlide(activeSlideCopy);
  }
  if (currentSlide < 5) {
    changeSlide(activeSlide);
    changeSlide(activeSlideCopy);
  }
}

prevBtn.addEventListener("click", previousSlide);
nextBtn.addEventListener("click", nextSlide);
// ////////

function showNav() {
  navBar.classList.add("transform-nav");
  closeBtn.classList.remove("hidden");
  overlay.classList.remove("hidden");
  body.style.overflowY = "hidden";
}

function hideNav() {
  navBar.classList.remove("transform-nav");
  closeBtn.classList.add("hidden");
  overlay.classList.add("hidden");
  body.style.overflowY = "auto";
}

menuBtn.addEventListener("click", showNav);
closeBtn.addEventListener("click", hideNav);

// HOVER FOR PICTURES

function mouseOverthumb(e) {
  if (e.target.closest(".selected-picture")) return;
  if (e.target.closest(".picture-slide")) {
    e.target.style.opacity = "0.5";
  }
}

function mouseOutThumb(e) {
  if (e.target.closest(".selected-picture")) return;
  if (e.target.closest(".picture-slide")) {
    e.target.style.opacity = "1";
  }
}

thumbnailsContainer.addEventListener("mouseover", mouseOverthumb);
thumbnailsContainer.addEventListener("mouseout", mouseOutThumb);

////////////////////////
// CHANGING ACTIVE PICTURE

function removeBorderPicture(thumbnailsContainer) {
  Array.from(document.querySelectorAll(".picture-slide")).forEach((el) => {
    el.firstChild.nextSibling.style.opacity = "1";
    el.classList.remove("selected-picture");
  });
}

function changeOpacity(e) {
  const pictureSlide = e.target.closest(".picture-slide");
  const slideNumber = e.target.closest(".picture-slide").dataset.slide;
  currentSlide = +slideNumber;
  pictureSlide.classList.add("selected-picture");
  pictureSlide.firstChild.nextSibling.style.opacity = "0.5";
}

thumbnailsContainer.addEventListener("click", function (e) {
  if (e.target.closest(".picture-slide")) {
    removeBorderPicture();
    changeOpacity(e);
    document
      .querySelector(".active-slide")
      .setAttribute("src", `./images/image-product-${currentSlide}.jpg`);
  }
});

//

// LightBox
activeSlide.addEventListener("click", function (e) {
  const slideNumber = e.target.getAttribute("src");
  articleContainer.insertAdjacentHTML(
    "afterend",
    `
  <div class="lightbox-container">
  <button class="close-slides"><img src="./images/icon-close white.svg"  /></button>
      <div class="images-container-copy">
        <div class="main-image">
          <button class="prev-btn prev-btn-two">
            <img src="./images/icon-previous.svg" alt="Previous slide button" />
          </button>
          <button class="next-btn next-btn-two">
            <img src="./images/icon-next.svg" alt="Next slide button" />
          </button>
          <img
            class="active-slide active-slide-copy"
            src="${slideNumber}"
            alt="first slide of product"
          />
        </div>
        <div class="thumbnails-container thumbnails-copy">
         ${thumbnailsContainer.innerHTML}
        </div>
      </div>
    </div>

  `
  );
  const prevBtncopy = document.querySelector(".prev-btn-two");
  const nextBtncopy = document.querySelector(".next-btn-two");
  const closeBoxbtn = document.querySelector(".close-slides");
  const thumbnailsContainerCopy = document.querySelector(".thumbnails-copy");
  overlay.classList.remove("hidden");
  body.style.overflow = "hidden";
  prevBtncopy.addEventListener("click", previousSlide);
  nextBtncopy.addEventListener("click", nextSlide);
  thumbnailsContainerCopy.addEventListener("mouseover", mouseOverthumb);
  thumbnailsContainerCopy.addEventListener("mouseout", mouseOutThumb);
  thumbnailsContainerCopy.addEventListener("click", function (e) {
    if (e.target.closest(".picture-slide")) {
      removeBorderPicture();
      changeOpacity(e);
      document
        .querySelector(".active-slide-copy")
        .setAttribute("src", `./images/image-product-${currentSlide}.jpg`);
      document
        .querySelector(".active-slide")
        .setAttribute("src", `./images/image-product-${currentSlide}.jpg`);
    }
  });
  closeBoxbtn.addEventListener("click", closeLightBox);
});
//

// Increase , decrease
signContainer.addEventListener("click", function (e) {
  if (e.target.closest(".minus-btn")) {
    if (shoesAmount === 0) return;
    else {
      shoesAmount--;
    }
  }
  if (e.target.closest(".plus-btn")) {
    shoesAmount++;
  }
  productAmount.textContent = shoesAmount;
});

addToCart.addEventListener("click", function (e) {
  userCart.innerHTML = "";
  if (shoesAmount === 0) {
    userCart.insertAdjacentHTML(
      "afterbegin",
      ` <p class="empty-cart">Your cart is empty.</p>`
    );
    document.querySelector(".added-amount").remove();
    return;
  }
  userCart.insertAdjacentHTML(
    "afterbegin",
    `
  <div class="product-details">
  <img
    class="product-added-img"
    src="./images/image-product-1-thumbnail.jpg"
    alt="Product thumbnail"
  />
  <div class="price-description">
    <p class="collection-title">Fall Limited Edition Sneakers</p>
    <p>
      $125.00 x <span class="bought-amount">${shoesAmount}</span>
      <span class="final-price">$${(125.0 * shoesAmount).toFixed(2)}</span>
    </p>
  </div>
  <img
    src="./images/icon-delete.svg"
    alt="Delete icon"
    class="delete-icon"
  />
</div>
<button class="checkout-btn">Checkout</button>
  `
  );
  if (document.querySelector(".added-amount")) {
    document.querySelector(".added-amount").remove();
  }
  userContainer.insertAdjacentHTML(
    "afterbegin",
    `  <span class="added-amount">${shoesAmount}</span>`
  );
  document
    .querySelector(".delete-icon")
    .addEventListener("click", function (e) {
      userCart.innerHTML = "";
      userCart.insertAdjacentHTML(
        "afterbegin",
        ` <p class="empty-cart">Your cart is empty.</p>`
      );
      document.querySelector(".added-amount").remove();
      productAmount.textContent = "0";
      shoesAmount = 0;
    });
});

cartBtn.addEventListener("click", function (e) {
  userCartContainer.classList.toggle("hidden");
});
