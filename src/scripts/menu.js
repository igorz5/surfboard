const menuItems = $(".menu__item");
const menuBtns = $(".menu__btn");

menuBtns.on("click", function (e) {
  const elem = $(this).closest(".menu__item");
  elem.toggleClass("menu__item--active");

  menuItems.each(function () {
    if (!$(this).is(elem)) {
      $(this).removeClass("menu__item--active");
    }
  });
});
