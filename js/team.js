const teamList = $(".team__list");
const teamCards = $(".team-card");

teamCards.click("click", function (e) {
  if ($(e.target).hasClass("team-card__name")) {
    $(this).toggleClass("team-card--active");

    const elem = $(this);
    teamCards.each(function () {
      if (!$(this).is(elem)) {
        $(this).removeClass("team-card--active");
      }
    });
  }
});
