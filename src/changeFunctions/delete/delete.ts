import { createElement } from '../../constructors/elemConstrustor';
import { deleteObj } from '../../database/database';

export const deleteElem = ({ delete_button, collection }, elem) => {
	const button = createElement(delete_button);
	button.onclick = () => {
		deleteObj({ id: elem.id }, collection);
		elem.remove();
	};
	return button;
};
