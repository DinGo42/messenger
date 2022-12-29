import { createElement } from '../../constructors/elemConstrustor';
import { deleteObj } from '../../database/database';

export const deleteElem = ({ delete_button, collection }, elem) => {
	const button = createElement(delete_button);
	elem.firstChild.append(button);
	button.onclick = () => {
		deleteObj({ id: elem.id }, collection);
		elem.remove();
	};
};
