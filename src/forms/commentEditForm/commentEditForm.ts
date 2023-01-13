import { createElement } from '../../constructors/elemConstrustor';
import { lockWindowForm } from '../../constructors/createWindowLock';
import { rejectChange } from '../../changeFunctions/rejectChange/rejectChange';
import { isValidInput } from '../../checks/validation';
import { createInputsValueObject, checkUserObject } from '../../checks/userObject';
import { drawComment } from '../../comments/appendComments';
import { models } from '../../models/objectModel';
import {editComment} from '../../changeFunctions/edit/editComment'

import { editObject, find } from '../../database/database';
import { deleteElem } from '../../changeFunctions/delete/delete';

export const editCommentForm = (values, elem) => {
	const lock_window = lockWindowForm();
	const Log_in_window = document.createElement('div');
	Log_in_window.classList.add('authorization-window');

	const submit = createElement(models.edit_comment.submit_button);
	const reject = rejectChange(models.edit_comment, lock_window);
	const comment = document.createElement('form');
	comment.classList.add(models.edit_comment.css);
	const { fields } = models.edit_comment;
	comment.insertAdjacentElement('afterbegin', submit);
	comment.insertAdjacentElement('afterbegin', reject);
	for (const field in fields) {
		const elem = document.createElement('div');
		fields[field].css.split(' ').forEach((style) => {
			elem.classList.add(style);
		});
		const input = createElement(fields[field]);
		comment.insertAdjacentElement('beforeend', input);
	}
	comment.onchange = () => {
		isValidInput(values);
	};
	submit.onclick = () => {
		const value = createInputsValueObject(values);
		value.userId = localStorage.getItem('current_user');
		value.id = elem.id;
		const comment = drawComment({
			text:value.text
		});
		comment.id = elem.id;
		checkUserObject(models.comments, value);
		editObject('comments', value);
		lock_window.remove();

		const right_bar = document.createElement('div');
		right_bar.classList.add('comment-right-bar');

		const edit = editComment(comment, models.edit_comment);
		const remove = deleteElem(models.edit_comment, comment);
		right_bar.insertAdjacentElement('beforeend',edit);
		right_bar.insertAdjacentElement('beforeend',remove);

		const com = find({id:comment.id},'comments')[0];
		const author = document.createElement('div');
		author.classList.add(models.comments.fields.userId.css);
		right_bar.insertAdjacentElement('beforeend',author);
		const user = find({id:com.userId},'users')[0];
		author.innerText = 'By : ' + user.nickname;
		comment.insertAdjacentElement('beforeend',right_bar);
		elem.replaceWith(comment);
	};
	Log_in_window.insertAdjacentElement('afterbegin', comment);
	lock_window.insertAdjacentElement('beforeend', Log_in_window);
	return lock_window;
};
