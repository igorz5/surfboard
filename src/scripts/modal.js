const modal = $(".modal");
const modalText = $(".modal__text");
const modalBtn = $(".modal__btn");

let closeCallback = null;

function openModal(text, isError = false, callback) {
  if (isModalOpen()) return;

  modal.addClass("modal--active");
  modalText.text(text);
  lockScroll();

  if (isError) {
    modalText.css("color", "#fd3f44");
  } else {
    modalText.css("color", "inherit");
  }

  closeCallback = callback;
}

function closeModal() {
  if (!isModalOpen()) return;

  modal.removeClass("modal--active");
  modalText.text("");
  unlockScroll();

  if (closeCallback) {
    closeCallback();
    closeCallback = null;
  }
}

function isModalOpen() {
  return modal.hasClass("modal--active");
}

modalBtn.on("click", function () {
  closeModal();
});
