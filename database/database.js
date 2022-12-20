import { models, checks } from "/models/objectModel.js";
//
let l_database = {};

const saveToLocalStorage = () => {
  localStorage.setItem("database", JSON.stringify(l_database));
};

const uploadFromLocalStorage = () => {
  const database = localStorage.getItem("database")
  if (!database)return
    l_database = JSON.parse(database) ?? {};
};
const addCollection = (name, value = []) => {
  if (name in l_database) return;
  l_database[name] = value;
  saveToLocalStorage();
};

const addObject = (obj,collection) => {
  let is_valid = true;
  const current_collection = models[collection];
  for (const field in current_collection) {
    for (const check in current_collection[field]) {
      if (current_collection[field][check] === true) {
        if (
          !checks[current_collection[field].type][check](obj, field, collection)
        ) {
          is_valid = false;
        }
      }
    }
  }  
  if (!is_valid) return console.error('incorect user value');
  l_database[collection].push(obj);
  saveToLocalStorage();
  
};

const editObject = (collection,new_value) => {
  l_database[collection].forEach((obj)=>{
  Object.keys(new_value).forEach((field)=>{
      if(obj.id === new_value.id){
        obj[field] = new_value[field]
      }
    })
  })
  
  saveToLocalStorage()
}

const deleteObj = ({id},collection) => {
  l_database[collection].filter((elem,index,arr)=>{
      if(elem.id==id){
        arr.splice(index,1)
      }
  })
  saveToLocalStorage()
}

const getCollection = (name) => {
  if (name in l_database) return l_database[name];
  throw `field ${name} no in m_database`;
};

const getObject = (obj, collection) => {
  if (obj in collection) return collection[obj];
};

const create_id = (obj) => {
  let id = obj.id
  let result = [obj.type]
    for(let int = 0; int<id; int++){
      result.push((Math.random()).toString(36).substring(2,id+2))
  }
  return result.join('-')
}

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
  create_id,
  editObject,
  deleteObj,
};
