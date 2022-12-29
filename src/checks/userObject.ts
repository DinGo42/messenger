import {
	addCollection,
	addObject,
	find,
	create_id,
} from '../database/database';

import { models } from '../models/objectModel';

const createInputsValueObject = (obj) => {
	const object = {};
	for (const field in obj.fields) {
		object[field] = obj.fields[field].value;
	}
	return object;
};

const checkUserObject = (model, user_values) => {
	const { checks } = models;
	addCollection(model.collection);
	const check_model = model.fields;
	for (const key in user_values) {
		if (!check_model[key]) {
			console.error('wrong object');
			return;
		}
	}

	for (const key in check_model) {
		for (const check in check_model[key]) {
			if (checks[check_model[key].type][check]) {
				const value = {
					value: user_values[key],
					check_value: check_model[key][check],
					collection: model.collection,
					field: key,
				};
				if (!checks[check_model[key].type][check](value)) {
					return false;
				}
			}
		}
	}
	return true;
};

const appendAndCheckObject = (model, user_values) => {
	if (!checkUserObject(model, user_values)) return alert('already using');
	let id = create_id(models[model.collection]);
	if (!find({ id }, model.collection)) {
		id = create_id(models[model.collection]);
	}
	user_values.id = id;
	addObject(user_values, model.collection);
};

export { checkUserObject, createInputsValueObject, appendAndCheckObject };
