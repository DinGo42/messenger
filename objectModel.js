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
const standard_checks = {
  unique: (obj, field, collection) =>
    ![...new Set(getCollection(collection).map((a) => a[field]))].includes(
      obj[field]
    ),
    required: (obj, field) => obj[field],
    check: (str, regExp) => regExp.test(str),
}

const checks = {
  string: {
    type: (str) => typeof str === "string",
    min_length: (str, num) => str.length > num,
    max_length: (str, num) => str.length < num,
    ...standard_checks,
  },
  number: {
    type: (num) => typeof num === "string",
    ...standard_checks,
  },
};

const user_model = {
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
  }
const post_model = {
    title: {
      type:'string',
      unique: false,
      required: true,
    },
    text: {
      type:'string',
      unique: false,
      required: false,
    },
    email: {
      type:'string',
      unique: false,
      required: true,
    },
  }


  const models = {
    users:user_model,
    posts:post_model,
  }


export { login_obj, sign_obj,checks,models };
