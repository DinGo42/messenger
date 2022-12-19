import { getCollection } from "/database/database.js";
const reg_exp_email = /[a-f0-9]*@\w{3,5}\.[a-f]{0,3}/;

const login_obj = {
  type:'logIn',
  window_text:'Log in',
  error_style: "invalid",
  input_class: "reg-input",
  reject_button:{
    elem_type:'button',
    id:'reject_form',
    name:'reject',
    classList:'buttons-reg',
    text:'X',
    type:'button',
  },
  submit_button:{
    elem_type:'button',
    id:'submit_reg',
    name:'Submit',
    classList:'buttons-reg disabled-button',
    text:'Submit',
    type:'button',
    disabled:true,
  },
  fields: {
    email: {
      elem_type:'input',
      name:'email_input',
      classList: 'reg-input',
      type:'email',
      id: "email",
      placeholder: "exzample@ukr.net",
      required: true,
      validation: {
        type: "string",
        min_length: 4,
        max_length: 120,
        check: reg_exp_email,
      },
      value: null,
    },
    password: {
      elem_type:'input',
      name:'password_input',
      classList: 'reg-input',
      type:'password',
      id: "password",
      placeholder: "Password",
      required: true,
      validation: {
        type: "string",
        check: /[\d\w]{4,120}/,
      },
      value: null,
    },
  },
};

const sign_obj = {
  type:'signUp',
  window_text:'Sign up',
  error_style: "invalid",
  input_class: "reg-input",
  reject_button:{
    elem_type:'button',
    id:'reject_form',
    name:'reject',
    classList:'reg-input',
    text:'X',
    type:'button',
  },
  submit_button:{
    elem_type:'button',
    id:'submit_reg',
    name:'Submit',
    classList:'buttons-reg disabled-button',
    text:'Submit',
    type:'button',
    disabled:true,
  },
  fields: {
    nickname: {
      elem_type:'input',
      name:'nickname_input',
      classList: 'reg-input',
      type:'text',
      id: "nickname",
      placeholder: "your nick?",
      required: true,
      validation: {
        type: "string",
        check: /[\d\w]{4,120}/,
      },
      value: null,
    },
    email: {
      elem_type:'input',
      name:'email_input',
      type:'email',
      classList: 'reg-input',
      id: "email",
      placeholder: "exzample@ukr.net",
      required: true,
      validation: {
        type: "string",
        min_length: 4,
        max_length: 120,
        check: reg_exp_email,
      },
      value: null,
    },
    password: {
      elem_type:'input',
      name:'password_input',
      classList: 'reg-input',
      type:'password',
      id: "password",
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

const buttons = {
    reg_button:{
      disabled:true,
      id: 'submit_reg',
      text:'Submit',
      type:'submit',
      css:'buttons-reg disabled-button',
    }
  }

  const standard_checks = {
    unique: ({value,collection,field}) =>
    ![...new Set(getCollection(collection).map((a) => a[field]))].includes(
      value
      )
    ,

    required: ({value}) => !!value,
    check: ({value, check_value}) => check_value.test(value),
  };
  
            const checks = {
    string: {
      type: ({value}) =>typeof value === "string",
      min_length: ({value, check_value}) => value.length > check_value,
      max_length: ({value, check_value}) => value.length < check_value,
      ...standard_checks,
    },
    number: {
      type: ({value}) => typeof value === "number",
      ...standard_checks,
    },
  };

const user_model = {
  collection:'users',
  fields:{
    nickname: {
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
      required: true,
      type: "string",
      min_length: 4,
    },
  },
  id:3,
  type:'USR',
};

const post_model = {
  id:3,
  type:'POST',
  collection:'posts',
  submit_button:{
      elem_type:'button',
      id:'edit-text',
      classList:'post-model',
      input_class:'model',
      text:'Edit',
      type:'button'
  },
  delete_button:{
    elem_type:'button',
    id:'delete-post',
    classList:'post-model',
    input_class:'model',
    text:'X',
    type:'button'
  },
  css:'post',
  fields:{
    title : {
      required: true,
      type: "string",
      min_length: 3,
      css:'title-post'
    },
    text:{
      required: true,
      type: "string",
      min_length: 3,
      css:'text-post'
    },
    userId:{
      type: "string",
      min_length: 3,
      css:"user-id"
      },
    id:{
      required: true,
      type: "string",
      min_length: 3,
      css:'s'
    },
  },
}

const edit_post_form = {
  css:'edit-post',
  error_style: "invalid",

  submit_button:{
    elem_type:'button',
    id:'save-edit',
    classList:'edit',
    text:'Save',
    type:'button'
  },
  canseled_edit: {
    elem_type:'button',
    id:'reject-edit',
    classList:'reject',
    text:'Cansel',
    type:'button'
  },
  fields : {
    title : {
      elem_type:'input',
      value:null,
      id:'title_post_form_edit_input',
      classList:'reg-input',
      type:'text',
      placeholder:'title...',
      validation:{
        required:true,
        type: "string",
        max_length:50,
        min_length:5,
      },
      css:'title-post'
    },
    text : {
      elem_type:'input',
      value:null,
      id:'text_post_form_edit_input',
      classList:'reg-input',
      type:'text',
      placeholder:'text',
      validation:{
        required:true,
        type: "string",
        max_length:250,
        min_length:5,
      },
      css:'text-post'
    },
  }
}

const post_form = {
  // ниписати так щоб id кнопки була тут і замінити в валідації на динамічні ід кнопок
  css:'post',
  error_style: "invalid",
  id:3,
  type:'POST',
  submit_button:{
      elem_type:'button',
      id:'save-form',
      name:'saveButton',
      classList:'form',
      text:'Save',
      type:'button'
    },
    canseled_edit:{
      elem_type:'button',
      id:'reject-edit',
      classList:'reject',
      text:'Cansel',
      type:'button'
    },
    fields : {
      title : {
        elem_type:'input',
        value:null,
        id:'title_post_form_input',
        classList:'reg-input',
        type:'text',
        placeholder:'title...',
        validation:{
          required:true,
          type: "string",
          max_length:50,
          min_length:5,
        },
        css:'title-post'
      },
      text : {
        elem_type:'input',
        value:null,
        id:'text_post_form_input',
        classList:'reg-input',
        type:'text',
        placeholder:'text',
        validation:{
          required:true,
          type: "string",
          max_length:250,
          min_length:5,
        },
        css:'text-post'
      },
    }
  }


const models = {
  users: user_model,
  posts: post_model,
};

export { login_obj, sign_obj, models, checks, buttons, post_form, edit_post_form };
