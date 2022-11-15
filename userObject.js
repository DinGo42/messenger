import {
  addCollection,
  addObject,
  getCollection,
  getObject,
  uploadFromLocalStorage,
  find,
} from "./database.js";

import { login_obj, sign_obj, models, checks } from "./objectModel.js";

export const createUserObject = (user_values,type) => {
  for (const key in user_values) {
    if (!models.users[key]) {
      console.error("wrong object");
      return;
    }
  }
  const user_model = models.user;
  for (const key in user_model) {
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
  addCollection("users");
  const user = find(user_values,'users')
  if(type == 'login'){
    if(user.length === 1)localStorage.setItem('current_user',user[0].id)
  }
  else if(type == 'sign'){
    if(user.length === 0)localStorage.setItem('current_user',user[0].id)
    addObject(user_values, "users");
  }
};