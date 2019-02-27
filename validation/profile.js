const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = validateProfileInput = data => {
  let errors = {};

  data.handle = !isEmpty(data.handle) ? data.handle : "";
  data.subjectname = !isEmpty(data.subjectname) ? data.subjectname : "";
  data.coordinator = !isEmpty(data.coordinator) ? data.coordinator : "";
  data.tutor = !isEmpty(data.tutor) ? data.tutor : "";

  if (!Validator.isLength(data.handle, { min: 2, max: 30 })) {
    errors.handle = "Username needs to between 2 and 30 characters";
  }

  if (Validator.isEmpty(data.handle)) {
    errors.handle = "Username is required";
  }

  if (!isEmpty(data.facebook)) {
    if (!Validator.isURL(data.facebook)) {
      errors.facebook = "Not a valid URL";
    }
  }
  if (!isEmpty(data.linkedin)) {
    if (!Validator.isURL(data.linkedin)) {
      errors.linkedin = "Not a valid URL";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
