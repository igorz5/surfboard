const reviews = $(".reviews__item");
const paginationItems = $(".reviews__pagination-item");

paginationItems.click(function (e) {
  if ($(e.target).has(".reviews__pagination-btn")) {
    const id = $(this).attr("data-review-id");
    let review;
    reviews.each(function () {
      const rid = $(this).attr("data-review-id");
      if (id === rid) {
        review = $(this);
        return false;
      }
    });

    if (review) {
      reviews.removeClass("reviews__item--active");
      review.addClass("reviews__item--active");

      paginationItems.removeClass("reviews__pagination-item--active");
      $(this).addClass("reviews__pagination-item--active");
    }
  }
});
