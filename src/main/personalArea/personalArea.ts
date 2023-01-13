import { find } from '../../database/database';
import {createMainHtml} from '../main';
import { createElement } from '../../constructors/elemConstrustor';
import {changeUserNickName} from '../../forms/changeUserInfo/changeNickName';
import { models } from '../../models/objectModel';
import {changeUserPassword} from '../../forms/changeUserInfo/changePassword';
import {changeUserEmail} from '../../forms/changeUserInfo/changeEmail';
import {createSignUpForm} from '../../forms/signUpForm/signUpForm';

export const personalArea = () =>{
	const current_user =  localStorage.getItem('current_user');
	if(current_user=='null' || current_user== null){
		return createSignUpForm ();
	}
	const user = find({id:current_user},'users');
	const comments =  find({userId:current_user},'comments');
	const posts =  find({userId:current_user},'posts');

	document.getElementById('full').remove();
	createMainHtml();
	const user_personal_area = document.createElement('div');
	user_personal_area.classList.add('user_personal_area');

	const info_bar = document.createElement('div');
	info_bar.classList.add('user-info-bar');

	const user_block = document.createElement('div');
	user_block.classList.add('user-block');

	const userNickName = document.createElement('div');
	userNickName.innerText = 'nickname - ' + user[0].nickname;
	userNickName.classList.add('user-info-block');
	const changeNickName = createElement(
		{
			elem_type:'button',
			text:'change',
			classList:'change-button',
			type:'button'
		});
	changeNickName.onclick = () =>{
		changeUserNickName(models.change_nickname);
	};
	userNickName.insertAdjacentElement('beforeend',changeNickName);
	user_block.insertAdjacentElement('beforeend',userNickName);
  
	const userEmail = document.createElement('div');
	userEmail.innerText = 'email - ' + user[0].email;
	userEmail.classList.add('user-info-block');
	const changeEmail = createElement(
		{
			elem_type:'button',
			text:'change',
			classList:'change-button',
			type:'button'
		});
	changeEmail.onclick = () =>{
		changeUserEmail(models.change_email);
	};
	userEmail.insertAdjacentElement('beforeend',changeEmail);
	user_block.insertAdjacentElement('beforeend',userEmail);
  
	const userPassword = document.createElement('div');
	userPassword.innerText = 'password - ' + user[0].password;
	userPassword.classList.add('user-info-block');
	const changePassword = createElement(
		{
			elem_type:'button',
			text:'change',
			classList:'change-button',
			type:'button'
		});
	changePassword.onclick = () =>{
		changeUserPassword(models.change_password);
	};
	userPassword.insertAdjacentElement('beforeend',changePassword);
	user_block.insertAdjacentElement('beforeend',userPassword);


	const log_out = document.createElement('div');
	log_out.id = 'log-out';
	log_out.innerText = 'log out';
	log_out.classList.add('user-info-block');
	log_out.onclick = () => {
		if(confirm('log out?')){
			localStorage.setItem('current_user',null);
		}
		document.getElementById('full').remove();
		createMainHtml();
	};

	const userPosts = document.createElement('div');
	userPosts.id = 'userPosts';
	userPosts.insertAdjacentHTML('afterbegin',`<h1>${posts.length}</h1>`);
	userPosts.insertAdjacentHTML('beforeend','<h3>total posts</h3>');
	userPosts.classList.add('user-info-block');

	const userComments = document.createElement('div');
	userComments.id = 'userComments';
	userComments.insertAdjacentHTML('afterbegin',`<h1>${comments.length}</h1>`);
	userComments.insertAdjacentHTML('beforeend','<h3>total comments</h3>');
	userComments.classList.add('user-info-block');

	info_bar.insertAdjacentElement('beforeend',userPosts);
	info_bar.insertAdjacentElement('beforeend',userComments);

	user_personal_area.insertAdjacentElement('beforeend',info_bar);
	user_personal_area.insertAdjacentElement('beforeend',user_block);
	user_personal_area.insertAdjacentElement('beforeend',log_out);
	document.getElementById('main').insertAdjacentElement('beforeend',user_personal_area);
};