export const changePasswordModel = {
	submit_button: {
		elem_type: 'button',
		id: 'edit-password',
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
		password: {
			elem_type: 'input',
			name: 'password_input',
			classList: 'authorization-input',
			type: 'password',
			id: 'password',
			placeholder: 'Password',
			required: true,
			initial_value: 12345678,
			validation: {
				type: 'string',
				check: /[\d\w]{4,120}/,
			},
			value: null,
		},
	}
};