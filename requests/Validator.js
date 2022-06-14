 const Validator = (form) => {
  let errors = {};
  let formIsValid = true;

  //UserName
  if ('useranme' in form && !form["username"]) {
    formIsValid = false;
    errors["username"] = "Username is required";
  }

  if (typeof form["username"] !== "undefined") {
    if (!form["username"].match(/^[a-zA-Z0-9.-]+$/)) {
      formIsValid = false;
      errors["username"] = "Invalid characters";
    }
  }

  //Email
  if ('email' in form &&  !form["email"]) {
    formIsValid = false;
    errors["email"] = "Email is required";
  }

  if (typeof form["email"] !== "undefined") {
    let lastAtPos = form["email"].lastIndexOf("@");
    let lastDotPos = form["email"].lastIndexOf(".");

    if (
      !(
        lastAtPos < lastDotPos &&
        lastAtPos > 0 &&
        form["email"].indexOf("@@") === -1 &&
        lastDotPos > 2 &&
        form["email"].length - lastDotPos > 2
      )
    ) {
      formIsValid = false;
      errors["email"] = "Email is not valid";
    }
  }

  //Password
  if ('password' in form && !form["password"]) {
    formIsValid = false;
    errors["password"] = "Password is required";
  }

  if (form["password"] && form["password"].length < 8) {
    formIsValid = false;
    errors["password"] = "Minimum of 8 characters";
  }


  return {formIsValid, errors};
}

module.exports = Validator