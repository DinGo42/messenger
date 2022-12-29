import { find } from '../../database/database';

export const logIn = (inputs_value) => {
	const lock = document.getElementById('lock');
	const user = find(inputs_value, 'users');
	if (!lock) return;
	if (!(user.length !== 0)) return alert('password or email incorect');
	localStorage.setItem('current_user', user[0].id), lock.remove();
};
