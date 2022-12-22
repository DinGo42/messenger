import { appendAndCheckObject } from "/checks/userObject.js";
import { models } from "/models/objectModel.js";
import { logIn } from "../Log In/logIn.js";

export const signUp = (inputs_value) => {
  appendAndCheckObject(models.users, inputs_value);
  logIn(inputs_value);
};
