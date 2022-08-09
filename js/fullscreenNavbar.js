const hamburger = $(".header__hamburger");
const fullscreenNavbar = $(".fullscreen-navbar");
const navbarClose = $(".fullscreen-navbar__close");
const navbarItems = $(".fullscreen-navbar .navbar__item");

function openFullscreenNavbar() {
  fullscreenNavbar.addClass("fullscreen-navbar--active");
}

function closeFullscreenNavbar() {
  fullscreenNavbar.removeClass("fullscreen-navbar--active");
}

hamburger.click(function () {
  openFullscreenNavbar();
});

navbarClose.click(function () {
  closeFullscreenNavbar();
});

navbarItems.each(function () {
  $(this).click(function () {
    closeFullscreenNavbar();
  });
});
