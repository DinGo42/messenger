import { acount_model, checks } from "./objectModel.js";

let l_database = {};

const saveToLocalStorage = () => {
  localStorage.setItem("database", JSON.stringify(l_database));
};

const uploadFromLocalStorage = () => {
  if (localStorage.getItem("database")) {
    l_database = JSON.parse(localStorage.getItem("database")) ?? {};
  }
};
const addCollection = (name, value = []) => {
  if (name in l_database) return;
  l_database[name] = value;
  saveToLocalStorage();
};

const addObject = (obj, collection) => {
  let is_valid = true;
  console.log(obj);

  for (const field in acount_model[collection]) {
    for (const check in acount_model[collection][field]) {
      if (acount_model[collection][field][check] === true) {
        if (!checks[check](obj, field, collection)) {
          is_valid = false;
        }
      }
    }
  }

  if (!is_valid) return;
  l_database[collection].push(obj);
  saveToLocalStorage();
};

const getCollection = (name) => {
  if (name in l_database) return l_database[name];
  throw `field ${name} no in m_database`;
};

const getObject = (obj, collection) => {
  if (obj in collection) return collection[obj];
};

const find = (condition_obj, collection) => {
  return l_database[collection].filter((item) => {
    for (const field in condition_obj) {
      if (item[field] !== condition_obj[field]) {
        return false;
      }
    }
    return true;
  });
};

export {
  l_database,
  addCollection,
  addObject,
  getCollection,
  getObject,
  uploadFromLocalStorage,
  find,
};
