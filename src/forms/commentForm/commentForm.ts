import { models } from '../../models/objectModel';
import { createElement } from '../../constructors/elemConstrustor';
import { isValidInput } from '../../checks/validation';
import {createInputsValueObject, appendAndCheckObject} from '../../checks/userObject';
import {drawComment} from '../../comments/appendComments';
import { createSignUpForm } from '../signUpForm/signUpForm';
export const createCommentForm = ({id}) => {
	const form = document.createElement('form');
	form.classList.add('comment-form');
	const model = models.comment_form;
	for(const field in model.fields){
		const input = createElement(model.fields[field]);
		input.value = null;
		form.insertAdjacentElement('beforeend',input);
	}
	const submit = createElement(model.submit_button);
	form.onchange = () => {
		isValidInput(model);
	};

	submit.onclick = () => {
		if(localStorage.getItem('current_user')=='null' || localStorage.getItem('current_user')== null){
			return createSignUpForm ();
		}
		const input_value = createInputsValueObject(model);
		input_value.userId = localStorage.getItem('current_user');
		input_value.postId = id;
		appendAndCheckObject(models.comments,input_value);
		document.getElementById('comments').insertAdjacentElement('beforeend',drawComment(input_value));
	};


	form.insertAdjacentElement('beforeend',submit);
	return form;
};