export const comment_form_model = {

	error_style: 'invalid',
	input_class: 'authorization-input',
	submit_button: {
		elem_type: 'button',
		id: 'submit-comment',
		classList: 'comment-model',
		input_class: 'model',
		text: 'Submit',
		type: 'button',
	},
	fields: {
		text: {
			elem_type: 'input',
			value: null,
			id: 'text_comment_input',
			classList: 'authorization-input',
			type: 'text',
			placeholder: 'what`s on your mind?',
			validation: {
				required: true,
				type: 'string',
				max_length: 250,
				min_length: 5,
			},
			css: 'text-comment',
		},
	},
};