export const comment_model = {
	id: 3,
	type:'COM',
	collection:'comments',
	classList:'comment',
	edit_button: {
		elem_type: 'button',
		id: 'edit-text',
		classList: 'comment-model',
		input_class: 'model',
		text: 'Edit',
		type: 'button',
	},
	delete_button: {
		elem_type: 'button',
		id: 'delete-comment',
		classList: 'comment-model',
		input_class: 'model',
		text: 'X',
		type: 'button',
	},
	fields:{
		text:{
			required: true,
			type: 'string',
			min_length: 3,
			css: 'text-comment',
		},
		userId: {
			required: true,
			type: 'string',
			min_length: 3,
			css: 'user-id',
		},
		postId:{
			required: true,
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
	}
};