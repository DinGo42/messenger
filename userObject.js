import {
  addCollection,
  addObject,
  getCollection,
  getObject,
  uploadFromLocalStorage,
  find,
} from "./database.js";

import { login_obj, sign_obj, checks,models} from "./objectModel.js";

export const createUserObject = (user_values) => {
  for (const key in user_values) {
    if (!models.users[key]) {
      console.error("wrong object");
      return;
    }
  }

  for (const key in models.user) {
    for (const check in models.users[key]) {
      if (
        !checks[models.users[key].type][check](
          user_values[key],
          models.users[key][check]
        )
      ) {
        console.error("wrong validation");
        return;
      }
    }
  }
  addCollection("users");
  addObject(user_values, "users");
};
