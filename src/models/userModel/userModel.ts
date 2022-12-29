import { reg_exp_email } from '../checks/standartChecks';

export const user_model = {
	collection: 'users',
	fields: {
		nickname: {
			required: true,
			type: 'string',
			min_length: 3,
		},
		email: {
			unique: true,
			required: true,
			type: 'string',
			check: reg_exp_email,
		},
		password: {
			required: true,
			type: 'string',
			min_length: 4,
		},
	},
	id: 3,
	type: 'USR',
};
