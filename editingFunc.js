import { createElement } from '/constructors/constructorsFunc.js'
import { deleteObj,find } from '/database/database.js'

const deleteElem = (obj,elem) => {
  const button = createElement(obj.delete_button)
  elem.firstChild.append(button)
  button.onclick = () => {
    const condition_obj = find({id:elem.id},obj.collection)[0]
    deleteObj({id:condition_obj.id},obj.collection)
    elem.remove()
  }
}

const canseledEdit = (obj,elem) => {
  const button  = createElement(obj.canseled_edit)
  button.onclick = () => {
    elem.remove()
  }
  return button
}
export {deleteElem,canseledEdit}