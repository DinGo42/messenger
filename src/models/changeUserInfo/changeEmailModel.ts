import { reg_exp_email } from '../checks/standartChecks';
export const changeEmailModel = {
	error_style: 'invalid',
	input_class: 'authorization-input',
	submit_button: {
		elem_type: 'button',
		id: 'edit-email',
		classList: 'change-model',
		input_class: 'model',
		text: 'submit',
		type: 'button',
	},
	reject_button: {
		elem_type: 'button',
		id: 'reject-change',
		classList: 'post-model',
		input_class: 'model',
		text: 'reject',
		type: 'button',
	},
	fields:{
		email: {
			elem_type: 'input',
			name: 'email_input',
			type: 'email',
			classList: 'authorization-input',
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
	}
};