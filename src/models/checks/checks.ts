import { standard_checks } from './standartChecks';

export const checks = {
	string: {
		type: ({ value }) => typeof value === 'string',
		min_length: ({ value, check_value }) => value.length > check_value,
		max_length: ({ value, check_value }) => value.length < check_value,
		...standard_checks,
	},
	number: {
		type: ({ value }) => typeof value === 'number',
		...standard_checks,
	},
};
