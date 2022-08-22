const fixedMenuItems = $(".fixed-menu__item");
const fixedMenuLinks = $(".fixed-menu__link");

fixedMenuLinks.on("click", function () {
  scrollToPage(getSectionIndexByName($(this).attr("data-section")));
});

function updateFixedMenu() {
  fixedMenuItems.each(function () {
    $(this).removeClass("fixed-menu__item--active");

    const link = $(this).find(".fixed-menu__link");
    const idx = getSectionIndexByName(link.attr("data-section"));
    if (getCurrentPage() === idx) {
      $(this).addClass("fixed-menu__item--active");
    }
  });
}
