const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = validateSubjectInput = data => {
  let errors = {};

  data.subjectname = !isEmpty(data.subjectname) ? data.subjectname : "";
  data.coordinator = !isEmpty(data.coordinator) ? data.coordinator : "";
  data.tutor = !isEmpty(data.tutor) ? data.tutor : "";
  data.description = !isEmpty(data.description) ? data.description : "";

  if (Validator.isEmpty(data.subjectname)) {
    errors.subjectname = "Subject name is required";
  }
  if (Validator.isEmpty(data.coordinator)) {
    errors.coordinator = "Coordinator's name is required";
  }
  if (Validator.isEmpty(data.tutor)) {
    errors.tutor = "Tutor's name is required";
  }

  if (!isEmpty(data.description)) {
    if (!Validator.isLength(data.description, { min: 10, max: 150 })) {
      errors.description = "Description needs to between 10 and 150 characters";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
