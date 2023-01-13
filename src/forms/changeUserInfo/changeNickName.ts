import { createElement } from '../../constructors/elemConstrustor';
import { lockWindowForm } from '../../constructors/createWindowLock';
import { isValidInput } from '../../checks/validation';
import { editObject } from '../../database/database';
import { createInputsValueObject } from '../../checks/userObject';
import { personalArea } from '../../main/personalArea/personalArea';
export const changeUserNickName = (model) => {
	const lock = lockWindowForm();
	const submit = createElement(model.submit_button);
	submit.onclick = () => {
		const user = createInputsValueObject(model);
		user.id = localStorage.getItem('current_user');
		editObject('users',user);
		lock.remove();
		personalArea();
	};

	const buttons_bar = document.createElement('div');
	buttons_bar.id = 'buttons-bar';

	const form = document.createElement('form');
	form.id = 'change-user-nickname-form';
	form.name = 'change nickname';
	form.addEventListener('change', () => {
		isValidInput(model);
	});
	const exit = createElement(model.reject_button);
	exit.onclick = () => {
		lock.remove();
	};

	buttons_bar.insertAdjacentElement('beforeend',submit);
	buttons_bar.insertAdjacentElement('beforeend',exit);
	for(const field in model.fields){
		const input = createElement(model.fields[field]);
		form.insertAdjacentElement('beforeend',input);
	}

	form.insertAdjacentElement('beforeend',buttons_bar);
	lock.insertAdjacentElement('beforeend',form);
	document.body.append(lock);
};