import { createElement } from '../../constructors/elemConstrustor';
import { lockWindowForm } from '../../constructors/createWindowLock';
import { rejectChange } from '../../changeFunctions/rejectChange/rejectChange';
import { isValidInput } from '../../checks/validation';
import { createInputsValueObject, checkUserObject } from '../../checks/userObject';
import { drawPost } from '../../posts/createPosts';
import { models } from '../../models/objectModel';

import { editObject } from '../../database/database';
import { editPost } from '../../posts/editPost';
import { deleteElem } from '../../changeFunctions/delete/delete';

export const editPostForm = (obj, elem) => {
	const lock_window = lockWindowForm();
	const Log_in_window = document.createElement('div');
	Log_in_window.classList.add('authorization-window');

	const submit = createElement(obj.submit_button);
	const reject = rejectChange(obj, lock_window);
	const post = document.createElement('form');
	post.classList.add(obj.css);
	const { fields } = obj;
	post.insertAdjacentElement('afterbegin', submit);
	post.insertAdjacentElement('afterbegin', reject);
	for (const field in fields) {
		const elem = document.createElement('div');
		fields[field].css.split(' ').forEach((style) => {
			elem.classList.add(style);
		});
		const input = createElement(fields[field]);
		post.insertAdjacentElement('beforeend', input);
	}
	post.onchange = () => {
		isValidInput(obj);
	};
	submit.onclick = () => {
		const value = createInputsValueObject(obj);
		value.userId = localStorage.getItem('current_user');
		value.id = elem.id;
		const post = drawPost(models.posts, {
			title: value.title,
			text: value.text,
		});
		post.id = elem.id;
		checkUserObject(models.posts, value);
		editObject('posts', value);
		lock_window.remove();
		editPost(models.posts, post);
		deleteElem(models.posts, post);
		elem.parentNode.replaceChild(post, elem);
	};
	Log_in_window.insertAdjacentElement('afterbegin', post);
	lock_window.insertAdjacentElement('beforeend', Log_in_window);
	return lock_window;
};
