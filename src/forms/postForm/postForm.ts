import { models } from '../../models/objectModel';
import { isValidInput } from '../../checks/validation';
import { createInputsValueObject, appendAndCheckObject } from '../../checks/userObject';
import { create_id } from '../../database/database';
import { createPost } from '../../posts/createPosts';
import { lockWindowForm } from '../../constructors/createWindowLock';
import { createElement } from '../../constructors/elemConstrustor';

export const postForm = () => {
  const post_obj = models.post_form
	const lock_window = lockWindowForm();
	const submit = createElement(post_obj.submit_button);
	const exit = createElement(post_obj.reject_button);
	exit.onclick = () => {
		lock_window.remove();
	};
	const post = document.createElement('form');
	post.classList.add(post_obj.css);
	const { fields } = post_obj;
	post.insertAdjacentElement('afterbegin', submit);
	for (const field in fields) {
		const elem = document.createElement('div');
		fields[field].css.split(' ').forEach((style) => {
			elem.classList.add(style);
		});
		const input = createElement(fields[field]);
		input.value = null;
		post.insertAdjacentElement('beforeend', input);
	}
	post.onchange = () => isValidInput(post_obj);
	submit.onclick = () => {
		const user_posts = document.getElementById('user-posts');
		if (!user_posts) return;
		const window_lock = document.getElementById('lock');
		const value = createInputsValueObject(post_obj);
		value.userId = localStorage.getItem('current_user');
		value.id = create_id(post_obj);
		appendAndCheckObject(models.posts, value);
		if (window_lock) {
			window_lock.remove();
		}
		createPost(models.posts, value, user_posts);
	};
  post.insertAdjacentElement('afterbegin', exit);
	document.body.append(lock_window);
	lock_window.insertAdjacentElement('beforeend', post);
};
