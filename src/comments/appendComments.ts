import { createCommentForm } from '../forms/commentForm/commentForm';
import { find } from '../database/database';
import { models } from '../models/objectModel';
import { deleteElem } from '../changeFunctions/delete/delete';
import { editComment } from '../changeFunctions/edit/editComment';

const current_user = localStorage.getItem('current_user');

const drawComment = (value) => {
	const comment_model = models.comments;
	const comment = document.createElement('div');
	comment.classList.add(comment_model.classList);

	const text = document.createElement('div');
	text.classList.add(comment_model.fields.text.css);
	text.innerText = value.text;
	comment.insertAdjacentElement('beforeend',text);
	return comment;
};


const appendComment = (post) => {

	const comments_bar = document.getElementById('comments');
	const form = createCommentForm(post);
	comments_bar.insertAdjacentElement('beforeend',form);
	const comId = find({postId:post.id},'comments');



	comId.forEach((com)=>
	{
		const author = document.createElement('div');
		author.classList.add(models.comments.fields.userId.css);
		const right_bar = document.createElement('div');
		right_bar.classList.add('comment-right-bar');
		right_bar.insertAdjacentElement('beforeend',author);
		const user = find({id:com.userId},'users')[0];
		author.innerText = 'By : ' + user.nickname;
		const comment = drawComment(com);
		comment.id = com.id;
		if(user.id == current_user ){
			const edit = editComment(comment,models.edit_comment);
			const remove = deleteElem(models.edit_comment, comment);
			right_bar.insertAdjacentElement('beforeend',edit);
			right_bar.insertAdjacentElement('beforeend',remove);
		}
		comment.insertAdjacentElement('beforeend',right_bar);
		comments_bar.insertAdjacentElement('beforeend',comment);
	});
};
export {drawComment , appendComment};



