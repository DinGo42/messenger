export const post_model = {
	id: 3,
	type: 'POST',
	collection: 'posts',
	submit_button: {
		elem_type: 'button',
		id: 'edit-text',
		classList: 'post-model',
		input_class: 'model',
		text: 'Edit',
		type: 'button',
	},
	delete_button: {
		elem_type: 'button',
		id: 'delete-post',
		classList: 'post-model',
		input_class: 'model',
		text: 'X',
		type: 'button',
	},
	css: 'post',
	fields: {
		title: {
			required: true,
			type: 'string',
			min_length: 3,
			css: 'title-post',
		},
		text: {
			required: true,
			type: 'string',
			min_length: 3,
			css: 'text-post',
		},
		userId: {
			type: 'string',
			min_length: 3,
			css: 'user-id',
		},
		id: {
			required: true,
			type: 'string',
			min_length: 3,
			css: 's',
		},
	},
};
