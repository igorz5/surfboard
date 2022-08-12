const orderForm = $(".order__form");
const orderSubmit = $(".order__btn-submit");
const orderFieldNames = ["name", "phone", "house", "flat", "comment"];
const orderFields = {};
orderFieldNames.forEach((name) => {
  const field = orderForm.find(
    `:input[name=${name}]`,
    `textarea[name=${name}]`
  );

  orderFields[name] = field;

  field.keyup(function () {
    if ($(this).hasClass("order__input--invalid")) {
      checkFieldValidity($(this));
    }
  });
});

const url = "https://webdev-api.loftschool.com/sendmail";

orderForm.trigger("reset");
orderForm.submit(function (e) {
  e.preventDefault();

  if (checkFormValidity()) {
    const data = {
      name: orderFields["name"].val(),
      phone: orderFields["phone"].val(),
      comment: orderFields["comment"].val(),
      to: "test@gmail.com",
    };

    const xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    xhr.setRequestHeader("content-type", "application/json");
    xhr.addEventListener("load", function () {
      const data = JSON.parse(xhr.response);
      const isError = data.status === 0;
      openModal(data.message, isError, () => {
        orderForm.trigger("reset");
      });
    });

    xhr.send(JSON.stringify(data));
  }
});

orderSubmit.click(function (e) {
  checkFormValidity();
});

function checkFieldValidity(field) {
  const elem = field[0];

  let isValid = elem && field[0].checkValidity();

  if (!isValid) {
    field.addClass("order__input--invalid");
  } else {
    field.removeClass("order__input--invalid");
  }

  return isValid;
}

function checkFormValidity() {
  let isValid = true;
  Object.values(orderFields).forEach((field) => {
    if (!checkFieldValidity(field)) {
      isValid = false;
      return false;
    }
  });

  return isValid;
}
