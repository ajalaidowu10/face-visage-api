 const validator = (form) => {
  let errors = {};
  let formIsValid = true;

  //imgUrl
  if (typeof form["imgUrl"] === "undefined") {
    formIsValid = false;
    errors["imgUrl"] = "Image URL is required";
  }

  return {formIsValid, errors};
}

module.exports = validator