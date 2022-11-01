import { getCollection } from "./database.js";
const reg_exp_email = /[a-f0-9]*@\w{3,5}\.[a-f]{0,3}/;

const login_obj = {
  error_style: "invalid",
  input_class: "login-input",
  fields: {
    email: {
      id: "email",
      input_type: "email",
      placeholder: "exzample@ukr.net",
      required: true,
      //initial_value:'test@ukr.net',
      validation: {
        type: "string",
        min_length: 4,
        max_length: 120,
        check: reg_exp_email,
      },
      value: null,
    },
    password: {
      id: "password",
      input_type: "password",
      placeholder: "Password",
      required: true,
      //initial_value:12345678,
      validation: {
        type: "string",
        check: /[\d\w]{4,120}/,
      },
      value: null,
    },
  },
};

const sign_obj = {
  error_style: "invalid",
  input_class: "login-input",
  fields: {
    nickname: {
      id: "nickname",
      input_type: "nickname",
      placeholder: "your nick?",
      required: true,
      //initial_value:'test',
      validation: {
        type: "string",
        check: /[\d\w]{4,120}/,
      },
      value: null,
    },
    email: {
      id: "email",
      input_type: "email",
      placeholder: "exzample@ukr.net",
      required: true,
      //initial_value:'test@ukr.net',
      validation: {
        type: "string",
        min_length: 4,
        max_length: 120,
        check: reg_exp_email,
      },
      value: null,
    },
    password: {
      id: "password",
      input_type: "password",
      placeholder: "Password",
      required: true,
      initial_value: 12345678,
      validation: {
        type: "string",
        check: /[\d\w]{4,120}/,
      },
      value: null,
    },
  },
};

const checks = {
  unique: (obj, field, collection) =>
    ![...new Set(getCollection(collection).map((a) => a[field]))].includes(
      obj[field]
    ), //true -- вільна каса
  required: (obj, field) => obj[field],
  string: {
    type: (str) => typeof str === "string",
    min_length: (str, num) => str.length > num,
    max_length: (str, num) => str.length < num,
    check: (str, regExp) => regExp.test(str),
    unique: (value) => value,
  },
  number: {
    type: (num) => typeof num === "number",
    ...standard_checks,
  },
};

const acount_model = {
  users: {
    nickname: {
      unique: false,
      required: true,
      type: "string",
      min_length: 3,
    },
    email: {
      unique: true,
      required: true,
      type: "string",
      check: reg_exp_email,
    },
    password: {
      unique: false,
      required: true,
      type: "string",
      min_length: 4,
    },
  },
  posts: {
    title: {
      unique: false,
      required: true,
    },
    text: {
      unique: false,
      required: false,
    },
    email: {
      unique: false,
      required: true,
    },
  },
};

export { login_obj, sign_obj, acount_model, checks };
