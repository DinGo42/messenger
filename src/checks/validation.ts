import { models } from '../models/objectModel';

export function isValidInput(type_obj) {
	let is_valid = true;
	const { checks } = models;
	for (const field in type_obj.fields) {
		const field_obj = type_obj.fields[field];
		const input = document.getElementById(field_obj.id);
		const input_validation = field_obj.validation;
		if (!input || !input.value) return;
		if (field_obj.required && !input.value) {
			is_valid = false;
		}
		field_obj.value = input.value;
		if (
			!input_validation
      || !Object.keys(checks).includes(input_validation.type)
		) { continue; }
		for (const method in checks[input_validation.type]) {
			if (input_validation[method]) {
				const value = {
					value: input.value,
					check_value: input_validation[method],
				};
				if (!checks[input_validation.type][method](value)) {
					setInvalidInput(input, type_obj);
					is_valid = false;
					field_obj.value = null;
				}
			}
		}
	}

	if (is_valid) {
		const submit = document.getElementById(type_obj.submit_button.id);
		if (!submit) return;
		submit.disabled = false;
		submit.classList.remove('disabled-button');
	}
	function setInvalidInput(input, { submit_button, error_style }) {
		const submit = document.getElementById(submit_button.id);
		if (!submit) return console.error('submit is null');
		is_valid = false;
		input.classList.add(error_style);
		submit.disabled = true;
		submit.classList.add('disabled-button');
		setTimeout(() => input.classList.remove(error_style), 820);
	}
}
