export const createMainHtml = () => {
	const full = document.createElement('div');
	full.id = 'full';

	const header = document.createElement('header');

	const search = document.createElement('input');
	search.id = 'search';
	search.placeholder = 'Search';
	search.src = '../icons/search.png';

	const logo = document.createElement('div');
	logo.classList.add('logo');

	const logo_img = document.createElement('img');
	logo_img.classList.add('logo');
	// logo_img.src = '../icons/superLogo.png';
	logo.insertAdjacentElement('beforeend', logo_img);

	const user = document.createElement('div');
	user.classList.add('user');

	header.insertAdjacentElement('beforeend', logo);
	header.insertAdjacentElement('beforeend', search);
	header.insertAdjacentElement('beforeend', user);

	const main = document.createElement('main');

	const left_bar = document.createElement('div');
	left_bar.id = 'left-control-bar';
	left_bar.style.height = `${document.documentElement.clientHeight - 70}px`;
	const main_bar = document.createElement('div');
	main_bar.id = 'main';
	main_bar.style.height = `${document.documentElement.clientHeight - 70}px`;
	main_bar.style.overflow = 'auto';
	main.insertAdjacentElement('beforeend', left_bar);
	main.insertAdjacentElement('beforeend', main_bar);

	const user_posts = document.createElement('div');
	user_posts.id = 'user-posts';

	const text = document.createElement('h1');
	text.innerText = 'your posts';
	main_bar.insertAdjacentElement('afterbegin', user_posts);
	main_bar.insertAdjacentElement('afterbegin', text);

	full.insertAdjacentElement('beforeend', header);
	full.insertAdjacentElement('beforeend', main);
	document.body.append(full);
};
