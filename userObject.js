import {
  addCollection,
  addObject,
  getCollection,
  getObject,
  uploadFromLocalStorage,
  find,
} from "./database.js";

import { login_obj, sign_obj, acount_model, checks } from "./objectModel.js";

export const createUserObject = (user_values) => {
  for (const key in user_values) {
    if (!acount_model.users[key]) {
      console.error("wrong object");
      return;
    }
  }

  for (const key in acount_model.user) {
    for (const check in acount_model.users[key]) {
      if (
        !checks[acount_model.users[key].type][check](
          user_values[key],
          acount_model.users[key][check]
        )
      ) {
        console.error("wrong validation");
        return;
      }
    }
  }
  addCollection("users");
  // addCollection('posts')
  addObject(user_values, "users");
  addObject(
    {
      title: "hello",
      text: "test of new object model",
      email: "test123@ukr.net",
    },
    "posts"
  );
  find({ nickname: "asdad", email: "asd@ukr.net" }, "users");
};
