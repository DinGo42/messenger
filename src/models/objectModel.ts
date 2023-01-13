import { user_model } from './userModel/userModel';
import { post_model } from './postModel/postModel';
import { checks } from './checks/checks';
import { edit_post_form } from './posts/editPostFrom/editPostForm';
import { post_form } from './posts/postForm/postForm';
import { login_obj } from './authorization/logInModel/logInModel';
import { sign_obj } from './authorization/signUpModel/signUpModel';
import {comment_form_model} from './comments/commentFormModel';
import{comment_model } from './comments/commentModel';
import { changeNickNameModel } from './changeUserInfo/changeNickNameModel';
import {changePasswordModel }from './changeUserInfo/changePasswordModel';
import { changeEmailModel } from './changeUserInfo/changeEmailModel';
import { edit_comment_form } from './comments/editCommentForm/editCommentform';

export const models = {
	users: user_model,
	posts: post_model,
	comments: comment_model,
	comment_form: comment_form_model,
	checks,
	edit_post: edit_post_form,
	post_form,
	edit_comment: edit_comment_form,
	log_in: login_obj,
	sign_up: sign_obj,
	change_nickname: changeNickNameModel,
	change_password: changePasswordModel,
	change_email: changeEmailModel,
};
