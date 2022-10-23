import { isValidInput } from "./validation.js";
import { createUserObject } from "./userObject.js";
import {
  l_database,
  addCollection,
  addObject,
  getCollection,
  getObject,
  uploadFromLocalStorage
} from './database.js'

export function loginLock(text, obj_type) {
  const lock_div = document.createElement("div");
  lock_div.classList = "login-lock";

  const login_window = document.createElement("div");
  login_window.classList = "login-window";

  const login_form = document.createElement("form");
  login_form.id = "login-form";
  login_form.name = "login";
  login_form.addEventListener("change", () => {
    isValidInput(obj_type);
  });

  for (const field in obj_type.fields) {
    login_form.insertAdjacentElement(
      "beforeend",
      createInputs(obj_type, obj_type.fields[field])
    );
  }

  const submit = document.createElement("button");
  submit.id = "submit";
  submit.innerText = "Submit";
  submit.classList = "buttons-reg";
  submit.type = "submit";
  submit.disabled = true;
  submit.classList.add("disabled-button");
  submit.onclick = () => {
    const user_object = {};
    for (const field in obj_type.fields) {
      user_object[field] = obj_type.fields[field].value;
    }
    createUserObject(user_object);
    return false;
  };

  login_window.insertAdjacentHTML("afterbegin", `<h1>${text}</h1>`);
  login_form.insertAdjacentElement("beforeend", submit);
  login_window.insertAdjacentElement("beforeend", login_form);
  lock_div.insertAdjacentElement("beforeend", login_window);
  document.body.append(lock_div);
}



function createInputs(
  obj,
  {
    id,
    input_type,
    placeholder,
    //initial_value
  }
) {
  const input = document.createElement("input");
  input.id = id;
  input.name = id;
  input.type = input_type;
  input.placeholder = placeholder;
  //input.value = initial_value;
  input.classList = obj.input_class;
  return input;
}