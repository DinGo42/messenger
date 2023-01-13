import { createElement } from "../../constructors/elemConstrustor";
import { find } from "../../database/database";
import { editCommentForm } from "../../forms/commentEditForm/commentEditForm";


const editComment = (elem, form) => {
	const { edit_button } = form;
	const edit = createElement(edit_button);
	edit.onclick = () => {
		const current_value = find({ id: elem.id }, form.collection)[0];
		Object.keys(current_value).forEach((a) => {
			if (form.fields[a]) {
				form.fields[a].value = current_value[a];
			}
		});
		const log_in_lock = editCommentForm(form, elem);
		document.body.append(log_in_lock);
	};
	return edit;
};
export { editComment };
