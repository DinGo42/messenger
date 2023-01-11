import { createElement } from '../constructors/elemConstrustor';
import { find } from '../database/database';
import { editPostForm } from '../forms/postEditForm/postEditForm';
import { models } from '../models/objectModel';

const editPost = ({ submit_button }, elem, form) => {
	const edit_form = form;
	//  models.edit_post;
	const edit = createElement(submit_button);
	edit.onclick = () => {
		const current_value = find({ id: elem.id }, edit_form.collection)[0];
    console.log(edit_form.collection)
		Object.keys(current_value).forEach((a) => {
			if (edit_form.fields[a]) {
				edit_form.fields[a].value = current_value[a];
			}
		});
		const log_in_lock = editPostForm(edit_form, elem);
		document.body.append(log_in_lock);
	};
	// elem.firstChild.append(edit);
	return edit;
};
export { editPost };
