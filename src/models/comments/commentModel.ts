export const comment_model = {
	id: 3,
	type:'COM',
	collection:'comments',
  classList:'comment',
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
		}
	}
};