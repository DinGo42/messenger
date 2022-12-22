import { createElement } from "../elemConstrustor.js";
import { lockWindowForm } from "../createWindowLock.js";
import { models } from "../../models/objectModel.js";
import { isValidInput } from "../../checks/validation.js";
import { logIn } from "/authorization/log In/logIn.js";
import { createInputsValueObject } from "../../checks/userObject.js";
export const createLogInForm = () => {
  const login_obj = models.log_in;
  const log_in_lock = lockWindowForm();
  const exit = createElement(login_obj.reject_button);
  exit.onclick = () => {
    log_in_lock.remove();
  };
  const Log_in_window = document.createElement("div");
  Log_in_window.classList.add("reg-window");
  Log_in_window.id = "lock";
  const form = document.createElement("form");
  form.id = "log-in-form";
  form.name = "log_in";
  form.addEventListener("change", () => {
    isValidInput(login_obj);
  });
  for (const field in login_obj.fields) {
    form.insertAdjacentElement(
      "beforeend",
      createElement(login_obj.fields[field])
    );
  }
  const submit = createElement(login_obj.submit_button);
  submit.onclick = () => logIn(createInputsValueObject(login_obj));
  Log_in_window.insertAdjacentHTML(
    "afterbegin",
    `<h1>${login_obj.window_text}</h1>`
  );
  Log_in_window.insertAdjacentElement("afterbegin", exit);
  form.insertAdjacentElement("beforeend", submit);
  Log_in_window.insertAdjacentElement("beforeend", form);
  log_in_lock.insertAdjacentElement("beforeend", Log_in_window);
  document.body.append(log_in_lock);
};
