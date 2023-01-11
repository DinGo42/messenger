import { models } from '../../models/objectModel';
import { isValidInput } from '../../checks/validation';
import { createInputsValueObject } from '../../checks/userObject';
import { logIn } from '../../authorization/logIn/logIn';
import { lockWindowForm } from '../../constructors/createWindowLock';
import { createElement } from '../../constructors/elemConstrustor';
import { createSignUpForm } from '../signUpForm/signUpForm';

export const createLogInForm = () => {
	const login_obj = models.log_in;
	const lock_window = lockWindowForm();
	const exit = createElement(login_obj.reject_button);
	exit.onclick = () => {
		lock_window.remove();
	};
	const Log_in_window = document.createElement('div');
	Log_in_window.classList.add('authorization-window');
	Log_in_window.id = 'lock';
	const form = document.createElement('form');
	form.id = 'log-in-form';
	form.name = 'log_in';
	form.addEventListener('change', () => {
		isValidInput(login_obj);
	});
	for (const field in login_obj.fields) {
		form.insertAdjacentElement(
			'beforeend',
			createElement(login_obj.fields[field]),
		);
	}
	const submit = createElement(login_obj.submit_button);
	const to_sign_up = document.createElement('h3');
	to_sign_up.innerText = 'Go to sign up';
	to_sign_up.classList.add('to-other-authorization');
	to_sign_up.onclick = () => {
		lock_window.remove();
		createSignUpForm();
	};
	submit.onclick = () => logIn(createInputsValueObject(login_obj));
	Log_in_window.insertAdjacentHTML(
		'afterbegin',
		`<h1>${login_obj.window_text}</h1>`,
	);
	Log_in_window.insertAdjacentElement('afterbegin', exit);
	form.insertAdjacentElement('beforeend', submit);
	Log_in_window.insertAdjacentElement('beforeend', form);
	Log_in_window.insertAdjacentElement('beforeend',to_sign_up);
	lock_window.insertAdjacentElement('beforeend', Log_in_window);
	document.body.append(lock_window);
};
