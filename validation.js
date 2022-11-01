import { login_obj, sign_obj, checks } from "./objectModel.js";
let is_valid;
export function isValidInput(type_obj) {
  is_valid = true;
  for (const field in type_obj.fields) {
    const field_obj = type_obj.fields[field];
    const input = document.getElementById(field_obj.id);
    const input_validation = field_obj.validation;
    if (!input.value) return;

    if (field_obj.required && !input.value) {
      is_valid = false;
    }

    field_obj.value = input.value;

    if (
      !input.value ||
      !input_validation ||
      !Object.keys(checks).includes(input_validation.type)
    )
      continue;

    for (const method in checks[input_validation.type]) {
      if (input_validation[method]) {
        if (
          !checks[input_validation.type][method](
            input.value,
            input_validation[method]
          )
        ) {
          setInvalidInput(input, type_obj);
          is_valid = false;
          field_obj.value = null;
        }
      }
    }
  }
  if (is_valid) {
    const submit = document.getElementById("submit_reg");
    if (!submit) return;
    submit.disabled = false;
    submit.classList.remove("disabled-button");
  }
}

function setInvalidInput(input, obj) {
  const submit = document.getElementById("submit_reg");
  if (!submit) return console.error("submit is null");
  is_valid = false;
  input.classList.add(obj.error_style);
  submit.disabled = true;
  submit.classList.add("disabled-button");
  setTimeout(() => input.classList.remove(obj.error_style), 820);
}
