export const changeNickNameModel = {
	error_style: 'invalid',
	input_class: 'authorization-input',
	submit_button: {
		elem_type: 'button',
		id: 'edit-nickname',
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
		nickname: {
			elem_type: 'input',
			name: 'nickname_input',
			classList: 'authorization-input',
			type: 'text',
			id: 'nickname',
			placeholder: 'your nick?',
			required: true,
			validation: {
				type: 'string',
				check: /[\d\w]{4,120}/,
			},
			value: null,
		},
	}
};