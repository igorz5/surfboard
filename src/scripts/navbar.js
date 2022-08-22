const navbarLinks = $(".navbar__link");

navbarLinks.on("click", function () {
  scrollToPage(getSectionIndexByName($(this).attr("data-section")));
});
