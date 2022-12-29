import { createElement } from '../constructors/elemConstrustor';
import { find } from '../database/database';
import { editPostForm } from '../forms/postEditForm/postEditForm';
import { models } from '../models/objectModel';

const editPost = ({ submit_button }, elem) => {
	const edit_post_form = models.edit_post;
	const edit = createElement(submit_button);
	edit.onclick = () => {
		const current_post_value = find({ id: elem.id }, 'posts')[0];
		Object.keys(current_post_value).forEach((a) => {
			if (edit_post_form.fields[a]) {
				edit_post_form.fields[a].value = current_post_value[a];
			}
		});
		const log_in_lock = editPostForm(edit_post_form, elem);
		document.body.append(log_in_lock);
	};
	elem.firstChild.append(edit);
};
export { editPost };
