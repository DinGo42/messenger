import { createElement } from "../elemConstrustor.js";
import { lockWindowForm } from "../createWindowLock.js";
import { models } from "../../models/objectModel.js";
import { isValidInput } from "../../checks/validation.js";
import { signUp } from "/authorization/Sign Up/signUp.js";
import { createInputsValueObject } from "/checks/userObject.js";
export const createingSignUpForm = () => {
  const sign_obj = models.sign_up;
  const sign_up_lock = lockWindowForm();

  const exit = createElement(sign_obj.reject_button);
  exit.onclick = () => {
    sign_up_lock.remove();
  };

  const sign_up_window = document.createElement("div");
  sign_up_window.classList.add("reg-window");

  const form = document.createElement("form");
  form.id = "sign-up-form";
  form.name = "sign_up";
  form.addEventListener("change", () => {
    isValidInput(sign_obj);
  });

  for (const field in sign_obj.fields) {
    console.log(sign_obj.fields[field]);
    form.insertAdjacentElement(
      "beforeend",
      createElement(sign_obj.fields[field])
    );
  }

  const submit = createElement(sign_obj.submit_button);
  submit.onclick = () => signUp(createInputsValueObject(sign_obj));

  sign_up_window.insertAdjacentHTML(
    "afterbegin",
    `<h1>${sign_obj.window_text}</h1>`
  );
  sign_up_window.insertAdjacentElement("afterbegin", exit);
  form.insertAdjacentElement("beforeend", submit);
  sign_up_window.insertAdjacentElement("beforeend", form);
  sign_up_lock.insertAdjacentElement("beforeend", sign_up_window);
  document.body.append(sign_up_lock);
};
