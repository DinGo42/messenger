export const edit_post_form = {
	css: 'edit-post',
	error_style: 'invalid',

	submit_button: {
		elem_type: 'button',
		id: 'save-edit',
		classList: 'edit',
		text: 'Save',
		type: 'button',
	},
	reject_edit: {
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
			id: 'title_post_form_edit_input',
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
			id: 'text_post_form_edit_input',
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
