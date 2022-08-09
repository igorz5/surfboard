const modal = $(".modal");
const modalText = $(".modal__text");
const modalBtn = $(".modal__btn");

let closeCallback = null;

function openModal(text, isError = false, callback) {
  modal.addClass("modal--active");
  modalText.text(text);

  if (isError) {
    modalText.css("color", "#fd3f44");
  } else {
    modalText.css("color", "inherit");
  }

  closeCallback = callback;
}

function closeModal() {
  modal.removeClass("modal--active");
  modalText.text("");

  if (closeCallback) {
    closeCallback();
    closeCallback = null;
  }
}

modalBtn.click(function () {
  closeModal();
});
