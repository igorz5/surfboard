const menuItems = $(".menu__item");

menuItems.on("click", function (e) {
  if ($(e.target).hasClass("menu__btn")) {
    const elem = $(this);
    elem.toggleClass("menu__item--active");
    menuItems.each(function () {
      if (!$(this).is(elem)) {
        $(this).removeClass("menu__item--active");
      }
    });
  }
});
