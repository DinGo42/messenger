import { appendAndCheckObject } from '../../checks/userObject';
import { models } from '../../models/objectModel';
import { logIn } from '../logIn/logIn';

export const signUp = (inputs_value) => {
	appendAndCheckObject(models.users, inputs_value);
	logIn(inputs_value);
};
