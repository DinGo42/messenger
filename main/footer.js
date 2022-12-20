import { createingSignUpForm,createLogInForm } from "/constructors/formConstructors.js";
export function loginBar(status) {
  const loginBar = document.createElement("footer");

  const buttons_div = document.createElement("div");
  buttons_div.classList.add("buttons-div");

  const sign = document.createElement("button");
  sign.classList.add("buttons-reg");
  sign.innerText = "sign up";

  const login = document.createElement("button");
  login.classList.add("buttons-reg");
  login.innerText = "log in";

  buttons_div.insertAdjacentElement("beforeend", sign);
  buttons_div.insertAdjacentElement("beforeend", login);

  const text_info = document.createElement("h1");
  text_info.innerText = "Register to create your own posts";

  const full = document.getElementById("full");
  if (!full) return;

  loginBar.insertAdjacentElement("beforeend", text_info);
  loginBar.insertAdjacentElement("beforeend", buttons_div);
  full.insertAdjacentElement("beforeend", loginBar);

  sign.onclick = () => {
    createingSignUpForm();
  };

  login.onclick = () => {
    createLogInForm();
  };
}
