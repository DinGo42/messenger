import { growAnimation } from '../animations/grow';
import { deleteElem } from '../changeFunctions/delete/delete';
import { postForm } from '../forms/postForm/postForm';
import { models } from '../models/objectModel';
import { editPost } from './editPost';



const createAppendPostForm = (place) => {
	const div = document.createElement('div');
	div.id = 'add_post';
	div.classList.add('post');
	div.onclick = () => postForm();
	place.insertAdjacentElement('afterbegin', div);
};

const createPost = (obj_model, { title, text, id }, div) => {
	const post = drawPost(obj_model, { title, text });
	post.id = id;
	editPost(obj_model, post);
	deleteElem(obj_model, post);
	if (!div) return;
	post.addEventListener('click', () => growAnimation(post, div));
	div.insertAdjacentElement('beforeend', post);
};

const drawPost = ({ fields, css }, obj) => {
	const buttons_bar = document.createElement('div');
	buttons_bar.classList.add('buttons-bar');
	const post = document.createElement('div');
	css.split(' ').forEach((style) => post.classList.add(style));
	for (const value in obj) {
		const elem = document.createElement('div');
		fields[value].css.split(' ').forEach((style) => elem.classList.add(style));
		elem.innerText = obj[value];
		post.insertAdjacentElement('beforeend', elem);
	}
	post.insertAdjacentElement('afterbegin', buttons_bar);

	return post;
};

export { createPost, createAppendPostForm, drawPost };
