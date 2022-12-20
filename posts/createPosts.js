import {models,edit_post_form,post_form,}from '/models/objectModel.js'
import { deleteElem} from '/editingFunc.js'
import { editPost } from '/posts/editPost.js'
import {postForm} from '/constructors/formConstructors.js'
import {growAnimation} from '/animations/grow.js'
const createAppendPostForm = (place) => {
  const div = document.createElement('div')
  div.id = 'add_post'
  div.classList.add('post')
  div.onclick = () => {
    postForm(post_form,document.body)
  }
  place.insertAdjacentElement('afterbegin',div)
}
const createPost  = (obj_model,obj_value,div) => {
  const post = drawPost(obj_model,{title:obj_value.title,text:obj_value.text})
  post.id = obj_value.id
  editPost(obj_model,post)
  deleteElem(obj_model,post)
  if(!div)return
  post.addEventListener('click',()=>growAnimation(post,div))
  div.insertAdjacentElement('beforeend',post)
}

const drawPost = (model,obj)=> {
const buttons_bar = document.createElement('div')
buttons_bar.classList.add('buttons-bar')
const post = document.createElement('div')
model.css.split(' ').forEach((style)=>post.classList.add(style))
const model_fields = model.fields
for(const value in obj){
  const elem = document.createElement('div')
  model_fields[value].css.split(' ').forEach((style)=>elem.classList.add(style))
  elem.innerText = obj[value]
  post.insertAdjacentElement('beforeend',elem)
}
post.insertAdjacentElement('afterbegin',buttons_bar) 

return post
}



export {createPost,createAppendPostForm,drawPost}