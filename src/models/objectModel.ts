import { user_model } from './userModel/userModel';
import { post_model } from './postModel/postModel';
import { checks } from './checks/checks';
import { edit_post_form } from './posts/editPostFrom/editPostForm';
import { post_form } from './posts/postForm/postForm';
import { login_obj } from './authorization/logInModel/logInModel';
import { sign_obj } from './authorization/signUpModel/signUpModel';

export const models = {
	users: user_model,
	posts: post_model,
	checks,
	edit_post: edit_post_form,
	post_form,
	log_in: login_obj,
	sign_up: sign_obj,
};
