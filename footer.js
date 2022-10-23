import { loginLock } from "./lockScreen&Inputs.js";
import {
  login_obj,
  sign_obj,
  user_model,
  checks
} from './objectModel.js'
export function loginBar(status) {
  const loginBar = document.createElement("footer");

  const buttons_div = document.createElement("div");
  buttons_div.classList = "buttons-div";

  const sign = document.createElement("button");
  sign.classList = "buttons-reg";
  sign.innerText = "sign up";

  const login = document.createElement("button");
  login.classList = "buttons-reg";
  login.innerText = "log in";

  buttons_div.insertAdjacentElement("beforeend", sign);
  buttons_div.insertAdjacentElement("beforeend", login);

  const text_info = document.createElement("h1");
  text_info.innerText = "Register to create your own posts";

  loginBar.insertAdjacentElement("afterbegin", text_info);
  loginBar.insertAdjacentElement("beforeend", buttons_div);
  full.insertAdjacentElement("beforeend", loginBar);

  sign.onclick = () => {
    console.log("sign");
    loginLock("Sign up", sign_obj);
    //loginBar.remove();
    //localStorage.setItem("login_status", true);
  };

  login.onclick = () => {
    loginLock("Log in", login_obj);
    loginBar.remove();
  };
}
