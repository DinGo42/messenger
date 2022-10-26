import { user_model,collection_type ,checks} from "./objectModel.js"

let l_database = {}

const saveToLocalStorage = () => {
  localStorage.setItem('database',JSON.stringify(l_database))
}

const uploadFromLocalStorage = () => {
  l_database = JSON.parse(localStorage.getItem('database')) ?? {}
}
const addCollection = (name,value=[]) => {
  if(name in l_database)return
  l_database[name] = value
  saveToLocalStorage()
}

const addObject = (obj,collection) => {
  let is_valid = true
  for(const field in collection_type[collection]){
      if(collection_type[collection][field].unique){
        is_valid = checks.unique(obj,collection,field)
      }
  }
if(is_valid){
  l_database[collection].push(obj)
}
  saveToLocalStorage()
}

const getCollection = (name) => {
  if(name in l_database)return l_database[name]
  throw `field ${name} no in m_database`
}

const getObject = (obj,collection) => {
  if(obj in collection)return collection[obj]
  return
}

const find = (condition_obj,collection) =>{
  for(const field in condition_obj){
    l_database[collection].find((item)=>item[field] === condition_obj[field])
  }
  }

export {
  l_database,
  addCollection,
  addObject,
  getCollection,
  getObject,
  uploadFromLocalStorage,
  find
}
