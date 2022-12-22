import { getCollection } from "/database/database.js";
const reg_exp_email = /[a-f0-9]*@\w{3,5}\.[a-f]{0,3}/;
const standard_checks = {
  unique: ({ value, collection, field }) =>
    ![...new Set(getCollection(collection).map((a) => a[field]))].includes(
      value
    ),
  required: ({ value }) => !!value,
  check: ({ value, check_value }) => check_value.test(value),
};
export { reg_exp_email, standard_checks };
