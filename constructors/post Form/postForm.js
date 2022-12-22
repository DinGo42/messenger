import { createElement } from "../elemConstrustor.js";
import { lockWindowForm } from "../createWindowLock.js";
import { models } from "../../models/objectModel.js";
import { isValidInput } from "../../checks/validation.js";
import { createInputsValueObject } from "../../checks/userObject.js";
import { create_id } from "../../database/database.js";
import { appendAndCheckObject } from "../../checks/userObject.js";
import { createPost } from "../../posts/createPosts.js";

export const postForm = (obj) => {
  const sign_up_lock = lockWindowForm();
  const submit = createElement(obj.submit_button);
  const post = document.createElement("form");
  post.classList.add(obj.css);
  const fields = obj.fields;
  post.insertAdjacentElement("afterbegin", submit);
  for (const field in fields) {
    const elem = document.createElement("div");
    fields[field].css.split(" ").forEach((style) => {
      elem.classList.add(style);
    });
    const input = createElement(fields[field]);
    input.value = null;
    post.insertAdjacentElement("beforeend", input);
  }
  post.onchange = () => isValidInput(obj);
  submit.onclick = () => {
    const user_posts = document.getElementById("user-posts");
    if (!user_posts) return;
    const window_lock = document.getElementById("lock");
    const value = createInputsValueObject(obj);
    value.userId = localStorage.getItem("current_user");
    value.id = create_id(obj);
    appendAndCheckObject(models.posts, value);
    if (window_lock) {
      window_lock.remove();
    }
    createPost(models.posts, value, user_posts);
  };
  document.body.append(sign_up_lock);
  sign_up_lock.insertAdjacentElement("beforeend", post);
};
