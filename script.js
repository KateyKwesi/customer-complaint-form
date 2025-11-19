const form = document.getElementById("form");
const fullName = document.getElementById("full-name");
const Email = document.getElementById("email");
const OrderNo = document.getElementById("order-no");
const ProductCode = document.getElementById("product-code");
const quantity = document.getElementById("quantity");
const complaintGroup = document.getElementById(`complaints-group`);
const complaintDescription = document.getElementById("complaint-description");
const solutionGroup = document.getElementById(`solutions-group`);
const solutionDescription = document.getElementById("solution-description");

function validateForm() {
  const regEmail = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim;
  const regOder = /^(2024)\d{6}$/gm;
  const regProductCode = /^[a-z]{2}\d{2}-[a-z]\d{3}-[a-z]{2}\d$/gim;
  const regDesc = /.{20,}/gims;

  const fullNameValue = fullName.value;
  const validateName = fullNameValue.length > 0 ? true : false;

  const emailValue = Email.value;
  const validateEmail = regEmail.test(emailValue);

  const orderValue = OrderNo.value;
  const validateOder = regOder.test(orderValue);

  const productCodeValue = ProductCode.value;
  const validateProductCode = regProductCode.test(productCodeValue);

  const quantityValue = quantity.value;
  const validateQuantity = quantityValue >= 1 ? true : false;

  const getComplaintGroup = [
    ...document.querySelectorAll('input[type="checkbox"]:checked'),
  ].map((el) => el.value);

  const complaintDescriptionValue = complaintDescription.value;

  const solutionsGroupValue = [
    ...document.querySelectorAll('input[type="radio"]:checked'),
  ].map((el) => el.value);

  const solutionDescriptionValue = solutionDescription.value;

  const details = {
    [fullName.id]: validateName,
    [Email.id]: validateEmail,
    [OrderNo.id]: validateOder,
    [ProductCode.id]: validateProductCode,
    [quantity.id]: validateQuantity,
    [complaintGroup.id]: getComplaintGroup.length > 0 ? true : false,
    [complaintDescription.id]: getComplaintGroup.some((item) =>
      item.includes(`other`) ? regDesc.test(complaintDescriptionValue) : true
    ),
    [solutionGroup.id]: solutionsGroupValue.length > 0 ? true : false,
    [solutionDescription.id]: solutionsGroupValue.some((item) =>
      item.includes(`other`) ? regDesc.test(solutionDescriptionValue) : true
    ),
  };

  return details;
}

function isValid(obj) {
  const validateObj = Object.values(obj).every(Boolean);
  return validateObj;
}

form.addEventListener(`submit`, (event) => {
  event.preventDefault();
  console.log(isValid(validateForm()));
});

form.addEventListener(`change`, (event) => {
  event.preventDefault();
  const obj = validateForm();

  const getComplaintGroup = [
    ...document.querySelectorAll('input[type="checkbox"]:checked'),
  ].map((el) => el.value);

  const solutionsGroupValue = [
    ...document.querySelectorAll('input[type="radio"]:checked'),
  ].map((el) => el.value);
  if (getComplaintGroup.length > 0) {
    complaintGroup.style.borderColor = `green`;
  } else {
    complaintGroup.style.borderColor = `red`;
  }

  if (solutionsGroupValue.length > 0) {
    solutionGroup.style.borderColor = `green`;
  } else {
    solutionGroup.style.borderColor = `red`;
  }
  //console.log(obj[event.target.id]);
  obj[event.target.id]
    ? (event.target.style.borderColor = "green")
    : (event.target.style.borderColor = "red");

  // console.log(event.target.parentElement.parentElement);
});
