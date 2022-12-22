import { user_model } from "./user Model/userModel.js";
import { post_model } from "./post Model/postModel.js";
import { checks } from "./checks/checks.js";
import { edit_post_form } from "./posts/edit Post From/editPostForm.js";
import { post_form } from "./posts/post Form/postForm.js";
import { login_obj } from "./authorization/log In Model/logInModel.js";
import { sign_obj } from "./authorization/sign Up Model/signUpModel.js";

export const models = {
  users: user_model,
  posts: post_model,
  checks: checks,
  edit_post: edit_post_form,
  post_form: post_form,
  log_in: login_obj,
  sign_up: sign_obj,
};
