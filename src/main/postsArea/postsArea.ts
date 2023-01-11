import { find, l_database } from '../../database/database';
import { models } from '../../models/objectModel';
import { createAppendPostForm, createPost } from '../../posts/createPosts';
import { createMainHtml } from '../main';

export const postsArea = () => {
	const current_user = localStorage.getItem('current_user');
	document.getElementById('full').remove();
	createMainHtml();
	const main = document.getElementById('main');
	const user_posts_block = document.createElement('div');
	user_posts_block.classList.add('posts-block');
	user_posts_block.id = 'user-posts';
	createAppendPostForm(user_posts_block);

	const user_posts = document.createElement('h1');
	user_posts.innerText = 'Your posts';
	main.insertAdjacentElement('afterbegin',user_posts);

	find({ userId: current_user }, 'posts').forEach((post) => {
		createPost(models.posts, post, user_posts_block);
	});
	main.insertAdjacentElement('beforeend',user_posts_block);

	const other_posts = document.createElement('h1');
	other_posts.innerText = 'Other posts';
	main.insertAdjacentElement('beforeend',other_posts);

	const other_posts_block = document.createElement('div');
	other_posts_block.classList.add('posts-block');
	other_posts_block.id = 'other-posts';

	l_database.posts.forEach((post) => {
		createPost(models.posts, post, other_posts_block);
	});
	main.insertAdjacentElement('beforeend',other_posts_block);
 
};