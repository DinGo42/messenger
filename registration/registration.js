import { checkUserObject,createInputsValueObject, appendAndCheckObject} from "/checks/userObject.js";
import { sign_obj,login_obj,buttons, models } from "/models/objectModel.js";
import { find } from "/database/database.js";
const logIn = (inputs_value) => {
  const lock = document.getElementById('lock')
  const user = find(inputs_value,'users')
  if(user.length !==0)localStorage.setItem('current_user',user[0].id),lock.remove()
  else{
    alert(`password or email incorect`)
  }
}

const signUp = (inputs_value) => {
  appendAndCheckObject(models.users,inputs_value)
  logIn(inputs_value)
}

export {
  logIn,
  signUp,
}
