import { reg_exp_email } from '../../checks/standartChecks';

export const login_obj = {
	type: 'logIn',
	window_text: 'Log in',
	error_style: 'invalid',
	input_class: 'authorization-input',
	reject_button: {
		elem_type: 'button',
		id: 'reject_form',
		name: 'reject',
		classList: 'buttons-reg',
		text: 'X',
		type: 'button',
	},
	submit_button: {
		elem_type: 'button',
		id: 'submit_reg',
		name: 'Submit',
		classList: 'buttons-reg disabled-button',
		text: 'Submit',
		type: 'button',
		disabled: true,
	},
	fields: {
		email: {
			elem_type: 'input',
			name: 'email_input',
			classList: 'authorization-input',
			type: 'email',
			id: 'email',
			placeholder: 'exzample@ukr.net',
			required: true,
			validation: {
				type: 'string',
				min_length: 4,
				max_length: 120,
				check: reg_exp_email,
			},
			value: null,
		},
		password: {
			elem_type: 'input',
			name: 'password_input',
			classList: 'authorization-input',
			type: 'password',
			id: 'password',
			placeholder: 'Password',
			required: true,
			validation: {
				type: 'string',
				check: /[\d\w]{4,120}/,
			},
			value: null,
		},
	},
};
