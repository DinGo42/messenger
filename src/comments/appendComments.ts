import { createCommentForm } from '../forms/commentForm/commentForm';
import { l_database, create_id, find } from '../database/database';
import { models } from '../models/objectModel';
import { deleteElem } from '../changeFunctions/delete/delete';
import { editPost } from '../posts/editPost';

const drawComment = (value) => {
	const comment_model = models.comments;
	console.log(value);
	const comment = document.createElement('div');
	comment.classList.add(comment_model.classList);

	const text = document.createElement('div');
	text.classList.add(comment_model.fields.text.css);
	text.innerText =value.text;

	const author = document.createElement('div');
	author.classList.add(comment_model.fields.userId.css);

	const author_nickname = find({id:value.userId},'users');
	author.innerText = 'By : ' + author_nickname[0].nickname;
	comment.insertAdjacentElement('beforeend',text);
	comment.insertAdjacentElement('beforeend',author);
	return comment;
};


const appendComment = (post) => {
  // editPost(obj_model, post, models.ed);
	// deleteElem(obj_model, post);
	console.log(post);
	const comments_bar = document.getElementById('comments');
	const form = createCommentForm(post);
	comments_bar.insertAdjacentElement('beforeend',form);
	find({postId:post.id},'comments').forEach((com)=>
	{
    const comment = drawComment(com)
		comments_bar.insertAdjacentElement('beforeend',comment);
	});
};
export {drawComment , appendComment};



