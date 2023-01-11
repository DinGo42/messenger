import { createElement } from '../../constructors/elemConstrustor';
import { lockWindowForm } from '../../constructors/createWindowLock';
import { models } from '../../models/objectModel';
import { isValidInput } from '../../checks/validation';
import { signUp } from '../../authorization/signUp/signUp';
import { createInputsValueObject } from '../../checks/userObject';
import {createLogInForm} from '../logInForm/logInForm';

export const createSignUpForm = () => {
	const sign_obj = models.sign_up;
	const lock_window = lockWindowForm();

	const exit = createElement(sign_obj.reject_button);
	exit.onclick = () => {
		lock_window.remove();
	};

	const sign_up_window = document.createElement('div');
	sign_up_window.classList.add('authorization-window');

	const form = document.createElement('form');
	form.id = 'sign-up-form';
	form.name = 'sign_up';
	form.addEventListener('change', () => {
		isValidInput(sign_obj);
	});

	for (const field in sign_obj.fields) {
		form.insertAdjacentElement(
			'beforeend',
			createElement(sign_obj.fields[field]),
		);
	}

	const submit = createElement(sign_obj.submit_button);
	submit.onclick = () => signUp(createInputsValueObject(sign_obj));
	const to_log_in = document.createElement('h3');
	to_log_in.innerText = 'Go to log in';
	to_log_in.classList.add('to-other-authorization');
	to_log_in.onclick = () => {
		lock_window.remove();
		createLogInForm();
	};
	sign_up_window.insertAdjacentHTML(
		'afterbegin',
		`<h1>${sign_obj.window_text}</h1>`,
	);
	sign_up_window.insertAdjacentElement('afterbegin', exit);
	form.insertAdjacentElement('beforeend', submit);
	sign_up_window.insertAdjacentElement('beforeend', form);
	sign_up_window.insertAdjacentElement('beforeend',to_log_in);
	lock_window.insertAdjacentElement('beforeend', sign_up_window);
	document.body.append(lock_window);
};
