const hamburger = document.querySelector(".header__hamburger");
const fullscreenNavbar = document.querySelector(".fullscreen-navbar");
const navbarClose = document.querySelector(".fullscreen-navbar__close");
const navbarItems = document.querySelectorAll(
  ".fullscreen-navbar .navbar__item"
);

function openFullscreenNavbar() {
  fullscreenNavbar.classList.add("fullscreen-navbar--active");
}

function closeFullscreenNavbar() {
  fullscreenNavbar.classList.remove("fullscreen-navbar--active");
}

hamburger.addEventListener("click", function () {
  openFullscreenNavbar();
});

navbarClose.addEventListener("click", function () {
  closeFullscreenNavbar();
});

navbarItems.forEach((item) => {
  item.addEventListener("click", function () {
    closeFullscreenNavbar();
  });
});
