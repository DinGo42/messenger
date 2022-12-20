import { createElement } from "/constructors/constructorsFunc.js"
import { edit_post_form,models} from "/models/objectModel.js"
import {editObject,find} from "/database/database.js"
import {editPostForm} from '/constructors/formConstructors.js'
const editPost = (obj_model,elem) => {
const edit = createElement(obj_model.submit_button)
edit.onclick = () => { 
  const current_post_value = find({id:elem.id},'posts')[0]
  Object.keys(current_post_value).forEach((a) =>{
    if(edit_post_form.fields[a]){
      edit_post_form.fields[a].value = current_post_value[a]
    }
  })
  const Log_in_lock = editPostForm(edit_post_form,elem)
  document.body.append(Log_in_lock)
}
elem.firstChild.append(edit)
}
export {editPost}

