import {
  addCollection,
  addObject,
  getCollection,
  getObject,
  uploadFromLocalStorage,
  find
} from './database.js'

import { 
  login_obj,
  sign_obj,
  user_model,
  checks
 } from './objectModel.js';


export const createUserObject = (user_values) => {
  for (const key in user_values) {
    if (!user_model[key]) {
      console.error("wrong object");
      return;
    }
  }

  for (const key in user_model){
    for (const check in user_model[key]) {
      if (
        !checks[user_model[key].type][check](
          user_values[key],
          user_model[key][check]
        )
      ) {
        console.error("wrong validation");
        return;
      }
    }
  }
  addCollection('users');
  addCollection('posts')
  addObject(user_values,'users')
  addObject({title:'hello',text:'test of new object model',email:'test123@ukr.net'},'posts')
  find({nickname:'asda',email:'test3@ukr.net'},'users')

};



