export const post_form = {
	css: 'post-form',
	error_style: 'invalid',
	id: 3,
	type: 'POST',
	submit_button: {
		elem_type: 'button',
		disabled:true,
		id: 'save-form',
		name: 'saveButton',
		classList: 'submit',
		text: 'Save',
		type: 'button',
	},
	reject_button: {
		elem_type: 'button',
		id: 'reject-edit',
		classList: 'reject',
		text: 'Cansel',
		type: 'button',
	},
	fields: {
		title: {
			elem_type: 'input',
			value: null,
			id: 'title_post_form_input',
			classList: 'authorization-input',
			type: 'text',
			placeholder: 'title...',
			validation: {
				required: true,
				type: 'string',
				max_length: 50,
				min_length: 5,
			},
			css: 'title-post',
		},
		text: {
			elem_type: 'input',
			value: null,
			id: 'text_post_form_input',
			classList: 'authorization-input',
			type: 'text',
			placeholder: 'text',
			validation: {
				required: true,
				type: 'string',
				max_length: 250,
				min_length: 5,
			},
			css: 'text-post',
		},
	},
};
