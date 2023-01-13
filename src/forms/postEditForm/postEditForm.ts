import { createElement } from '../../constructors/elemConstrustor';
import { lockWindowForm } from '../../constructors/createWindowLock';
import { rejectChange } from '../../changeFunctions/rejectChange/rejectChange';
import { isValidInput } from '../../checks/validation';
import { createInputsValueObject, checkUserObject } from '../../checks/userObject';
import { drawPost } from '../../posts/createPosts';
import { models } from '../../models/objectModel';
import { editPost } from '../../changeFunctions/edit/editPost'
import { editObject, find } from '../../database/database';
import { deleteElem } from '../../changeFunctions/delete/delete';
import { appendComment } from '../../comments/appendComments';

let isOpenPost = false;  
let isOpenComments = false;

export const editPostForm = (values, elem) => {
	const lock_window = lockWindowForm();
	const Log_in_window = document.createElement('div');
	Log_in_window.classList.add('authorization-window');

	const submit = createElement(models.edit_post.submit_button);
	const reject = rejectChange(models.edit_post, lock_window);
	const post = document.createElement('form');
	post.classList.add(models.edit_post.css);
	const { fields } = models.edit_post;
	post.insertAdjacentElement('afterbegin', submit);
	post.insertAdjacentElement('afterbegin', reject);
	for (const field in fields) {
		const elem = document.createElement('div');
		fields[field].css.split(' ').forEach((style) => {
			elem.classList.add(style);
		});
		const input = createElement(fields[field]);
		post.insertAdjacentElement('beforeend', input);
	}
	post.onchange = () => {
		isValidInput(values);
	};
	submit.onclick = () => {
		const value = createInputsValueObject(values);
		value.userId = localStorage.getItem('current_user');
		value.id = elem.id;
		const post = drawPost(models.posts, {
			title: value.title,
			text: value.text,
		});
		post.id = elem.id;
		checkUserObject(models.posts, value);
		editObject('posts', value);
		lock_window.remove();


		const top_bar = document.createElement('div');
		top_bar.classList.add('top-bar');
	
  
		const buttons = document.createElement('div');
		buttons.classList.add('buttons');
		top_bar.insertAdjacentElement('afterbegin', buttons);
		post.insertAdjacentElement('afterbegin', top_bar);

		const edit = editPost(post, models.edit_post);
		buttons.insertAdjacentElement('beforeend',edit);
		const remove = 	deleteElem(models.posts, post);
		buttons.insertAdjacentElement('beforeend',remove);
		const userId = find({id:post.id},'posts')[0].userId;
		const user_nickname = find({id:userId},'users')[0].nickname;
		const nickname_div = document.createElement('div');
		nickname_div.classList.add('user-nickname-bar');
		nickname_div.innerText = 'By : ' + user_nickname;

		top_bar.insertAdjacentElement('beforeend',nickname_div);

		const buttom_bar = document.createElement('div');
		buttom_bar.id = 'buttom_bar'; 



		const comments_button = document.createElement('div');
		comments_button.innerText = 'comments';
		comments_button.classList.add('comments-button');
		comments_button.id = 'comments_button';

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



		elem.parentNode.replaceChild(post, elem);
	};
	Log_in_window.insertAdjacentElement('afterbegin', post);
	lock_window.insertAdjacentElement('beforeend', Log_in_window);
	return lock_window;
};
