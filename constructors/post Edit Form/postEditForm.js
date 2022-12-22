import { createElement } from "../elemConstrustor.js";
import { lockWindowForm } from "../createWindowLock.js";
import { rejectChange } from "../../change functions/reject change/rejectChange.js";
import { isValidInput } from "../../checks/validation.js";
import { createInputsValueObject } from "../../checks/userObject.js";
import { drawPost } from "../../posts/createPosts.js";
import { models } from "../../models/objectModel.js";
import { checkUserObject } from "../../checks/userObject.js";
import { editObject } from "../../database/database.js";
import { editPost } from "../../posts/editPost.js";
import { deleteElem } from "../../change functions/delete/delete.js";

export const editPostForm = (obj, elem) => {
  const log_in_lock = lockWindowForm();
  const Log_in_window = document.createElement("div");
  Log_in_window.classList.add("reg-window");

  const submit = createElement(obj.submit_button);
  const reject = rejectChange(obj, log_in_lock);
  const post = document.createElement("form");
  post.classList.add(obj.css);
  const fields = obj.fields;
  post.insertAdjacentElement("afterbegin", submit);
  post.insertAdjacentElement("afterbegin", reject);
  for (const field in fields) {
    const elem = document.createElement("div");
    fields[field].css.split(" ").forEach((style) => {
      elem.classList.add(style);
    });
    const input = createElement(fields[field]);
    post.insertAdjacentElement("beforeend", input);
  }
  post.onchange = () => {
    isValidInput(obj);
  };
  submit.onclick = () => {
    const value = createInputsValueObject(obj);
    value.userId = localStorage.getItem("current_user");
    value.id = elem.id;
    const post = drawPost(models.posts, {
      title: value.title,
      text: value.text,
    });
    post.id = elem.id;
    checkUserObject(models.posts, value);
    editObject("posts", value);
    log_in_lock.remove();
    editPost(models.posts, post);
    deleteElem(models.posts, post);
    elem.parentNode.replaceChild(post, elem);
  };
  Log_in_window.insertAdjacentElement("afterbegin", post);
  log_in_lock.insertAdjacentElement("beforeend", Log_in_window);
  return log_in_lock;
};
