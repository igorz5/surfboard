const hamburger = $(".header__hamburger");
const fullscreenNavbar = $(".fullscreen-navbar");
const navbarClose = $(".fullscreen-navbar__close");
const navbarItems = $(".fullscreen-navbar .navbar__item");

function openFullscreenNavbar() {
  fullscreenNavbar.addClass("fullscreen-navbar--active");
  lockScroll();
}

function closeFullscreenNavbar() {
  fullscreenNavbar.removeClass("fullscreen-navbar--active");
  unlockScroll();
}

hamburger.on("click", function () {
  openFullscreenNavbar();
});

navbarClose.on("click", function () {
  closeFullscreenNavbar();
});

navbarItems.each(function () {
  $(this).on("click", function () {
    closeFullscreenNavbar();
  });
});
