/* eslint-disable no-mixed-spaces-and-tabs */
import { growAnimation } from '../animations/grow';
import { deleteElem } from '../changeFunctions/delete/delete';
import { postForm } from '../forms/postForm/postForm';
import { models } from '../models/objectModel';
import { editPost } from './editPost';
import {postAnimation} from '../animations/postAnimation';
import { appendComment } from '../comments/appendComments';
import { find } from '../database/database';


let isOpenPost = false;  
let isOpenComments = false;

const createAppendPostForm = (place) => {
	const div = document.createElement('div');
	div.id = 'add_post';
	div.classList.add('post');
	
	div.onclick = () => postForm();
	place.insertAdjacentElement('afterbegin', div);

};

const createPost = (obj_model, { title, text, id }, div) => {
	if (!div) return;

	const post = drawPost(obj_model, { title, text });
	post.id = id;

	const top_bar = document.createElement('div');
	top_bar.classList.add('top-bar');
	
  
	const buttons = document.createElement('div');
	buttons.classList.add('buttons');
	top_bar.insertAdjacentElement('afterbegin', buttons);
	post.insertAdjacentElement('afterbegin', top_bar);

	const userId = find({id:post.id},'posts')[0].userId;
	const user_nickname = find({id:userId},'users')[0].nickname;
	const current_user = localStorage.getItem('current_user');


	const nickname_div = document.createElement('div');
	nickname_div.classList.add('user-nickname-bar');
	nickname_div.innerText = 'By : ' + user_nickname;

	if(userId == current_user ){
		const edit = editPost(obj_model, post, models.edit_post);
		buttons.insertAdjacentElement('beforeend',edit);
	  // eslint-disable-next-line no-mixed-spaces-and-tabs
		const remove = deleteElem(obj_model, post);
		buttons.insertAdjacentElement('beforeend',remove);


	}
	top_bar.insertAdjacentElement('beforeend',nickname_div);



	const buttom_bar = document.createElement('div');
	buttom_bar.id = 'buttom_bar'; 



	const comments_button = document.createElement('div');
	comments_button.innerText = 'comments';
	comments_button.classList.add('comments-button');

	buttom_bar.insertAdjacentElement('beforeend',comments_button);

	const comments = document.createElement('div');
	comments.id = 'comments';
	comments.classList.add('comments');


	const openPost = (t) => {
		if(!isOpenPost){

			if(t.target.closest('.post')){
				post.classList.add('growing');
				post.insertAdjacentElement('beforeend',buttom_bar);
				isOpenPost=true;
			}
		}
	};

	const closePost = (t) => {
		if(!t.target.closest('.post')){
			post.classList.remove('growing');
			comments.remove();
			buttom_bar.remove();
			isOpenPost = false;
		}
	};

	const openComments = () => {
		if(!isOpenComments){
			comments.classList.add('growing');
			buttom_bar.insertAdjacentElement('beforeend',comments);
			appendComment(post);
			isOpenComments = true;
		}
		else{
			closeComments();
		}
	};
  
	const closeComments = () => {
		isOpenComments = false;
		comments.replaceChildren('');
		comments.remove();
	};
	comments_button.addEventListener('click',openComments);
	
 

	post.addEventListener('click',openPost);
	document.body.addEventListener('click',closePost);
	div.insertAdjacentElement('beforeend', post);
};

const drawPost = ({ fields, css }, obj) => {
	const post = document.createElement('div');
	css.split(' ').forEach((style) => post.classList.add(style));
	for (const value in obj) {
		const elem = document.createElement('div');
		fields[value].css.split(' ').forEach((style) => elem.classList.add(style));
		elem.innerText = obj[value];
		post.insertAdjacentElement('beforeend', elem);
	}

	return post;
};

export { createPost, createAppendPostForm, drawPost };
