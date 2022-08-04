const hamburger = document.querySelector(".header__hamburger");
const fullscreenNavbar = document.querySelector(".fullscreen-navbar");
const navbarClose = document.querySelector(".fullscreen-navbar__close");

function openFullscreenNavbar() {
  fullscreenNavbar.classList.add("fullscreen-navbar--active");
}

function closeFullscreenNavbar() {
  fullscreenNavbar.classList.remove("fullscreen-navbar--active");
}

hamburger.addEventListener("click", function (e) {
  openFullscreenNavbar();
});

navbarClose.addEventListener("click", function (e) {
  closeFullscreenNavbar();
});

fullscreenNavbar.addEventListener("click", function (e) {
  if (e.target.className === "navbar__link") {
    closeFullscreenNavbar();
  }
});
