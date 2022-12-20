import {
  addCollection,
  addObject,
  getCollection,
  getObject,
  uploadFromLocalStorage,
  find,
  create_id,
  l_database,
} from "/database/database.js";

import { login_obj, sign_obj, models, checks } from "/models/objectModel.js";
const createInputsValueObject = (obj) => {
  const object = {};
  for (const field in obj.fields) {
      object[field] = obj.fields[field].value;
    }
  return object;
};

const checkUserObject = (model,user_values) => {
  addCollection(model.collection);
  const check_model = model.fields;
  for (const key in user_values) {
    if (!check_model[key]) {
      console.error("wrong object");
      return;
    }
  }

  for (const key in check_model) {
    for (const check in check_model[key]) {
      if(checks[check_model[key].type][check]){
        const value = {
          value:user_values[key],
          check_value:check_model[key][check],
          collection: model.collection,
          field:key,
        }
        if (
          !checks[check_model[key].type][check](
              value
          )
        ){
        alert(`${user_values[key]} - already using`);
        return;
        }
      }
    }
  }
  const lock = document.getElementById('lock')
  lock.remove()

};

 const appendAndCheckObject = (model,user_values) => {
  checkUserObject(model,user_values)
  let id = create_id(models[model.collection])
  if(!find({id:id},model.collection))id = create_id(models[model.collection])
  user_values.id = id
  addObject(user_values,model.collection)
 }

export {checkUserObject,createInputsValueObject,appendAndCheckObject}