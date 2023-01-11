import { createPost, createAppendPostForm } from './posts/createPosts';
import { createMainHtml } from './main/main';
import { loginBar } from './main/footer';
import {
	l_database,
	uploadFromLocalStorage,
	find,
} from './database/database';
import { models } from './models/objectModel';
import './css/mainStyleMassager.css';

uploadFromLocalStorage();
if (!document.getElementById('full')) {
	createMainHtml();
}
const current_user = localStorage.getItem('current_user');

if (current_user == 'null' || current_user == null) {
	loginBar();
}
console.log(l_database);

// const user_posts = document.getElementById('user-posts');
// createAppendPostForm(user_posts);
// find({ userId: current_user }, 'posts').forEach((post) => {
// 	createPost(models.posts, post, user_posts);
// });
