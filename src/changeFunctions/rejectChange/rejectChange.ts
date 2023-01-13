import { createElement } from '../../constructors/elemConstrustor';
export const rejectChange = ({ reject_edit }, elem) => {
	const button = createElement(reject_edit);
	button.onclick = () => {
		elem.remove();
	};
	return button;
};
