const orderForm = $(".order__form");

const url = "https://webdev-api.loftschool.com/sendmail";

orderForm.submit(function (e) {
  e.preventDefault();
  var rawData = $(this)
    .serializeArray()
    .reduce((acc, item) => {
      acc[item.name] = item.value;
      return acc;
    }, {});

  var data = {
    name: rawData.name,
    phone: rawData.phone,
    comment: rawData.comment,
    to: "test@gmail.com",
  };

  if (validateData(data)) {
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

function validateData(data) {
  let isValid = true;
  Object.values(data).forEach((item) => {
    if (item.length === 0) {
      isValid = false;
    }
  });

  return isValid;
}
