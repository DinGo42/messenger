import { createElement } from "/constructors/constructorsFunc.js";
import { isValidInput } from "/checks/validation.js";
import { createInputsValueObject,appendAndCheckObject, checkUserObject } from "/checks/userObject.js";
import { create_id,editObject } from "/database/database.js";
import { models, sign_obj, login_obj} from "/models/objectModel.js";
import { createPost, drawPost} from "/posts/createPosts.js";
import { canseledEdit, deleteElem} from "/editingFunc.js";
import { editPost } from "/posts/editPost.js";
import { signUp, logIn } from "/registration/registration.js";
import { lockWindowForm } from "./createWindowLock.js";
//
const postForm = (obj) => {
  const sign_up_lock = lockWindowForm()
  const submit = createElement(obj.submit_button)
  const post = document.createElement('form')
  post.classList.add(obj.css)
  const fields = obj.fields
  post.insertAdjacentElement('afterbegin',submit)
  for(const field in fields){
    const elem = document.createElement('div')
    fields[field].css.split(' ').forEach(style => {
      elem.classList.add(style)
    });
    const input = createElement(fields[field])
    input.value = null
    post.insertAdjacentElement('beforeend',input)
  }
  post.onchange = () => {
    isValidInput(obj)
    }
    submit.onclick = () => {
      const user_posts = document.getElementById('user-posts')
      if(!user_posts)return
      const window_lock = document.getElementById('lock')
      const value = createInputsValueObject(obj)
      value.userId = localStorage.getItem('current_user')
      value.id = create_id(obj)
      appendAndCheckObject(models.posts,value)
      if(window_lock){
        window_lock.remove()
      }
      createPost(models.posts,value,user_posts)

    }
    document.body.append(sign_up_lock)
    sign_up_lock.insertAdjacentElement('beforeend',post)
}

const createingSignUpForm = () => {
  const sign_up_lock = lockWindowForm()

  const exit = createElement(sign_obj.reject_button)
  exit.onclick = () => {
    sign_up_lock.remove()
  }

  const sign_up_window = document.createElement("div");
  sign_up_window.classList.add("reg-window");

  const form = document.createElement('form')
  form.id = 'sign-up-form'
  form.name = 'sign_up'
  form.addEventListener("change", () => {
    isValidInput(sign_obj);
  });

  for(const field in sign_obj.fields){
    console.log(sign_obj.fields[field])
    form.insertAdjacentElement('beforeend',
    createElement(sign_obj.fields[field]))
  }
  
  const submit = createElement(sign_obj.submit_button)
  submit.onclick = () => signUp(createInputsValueObject(sign_obj))

  sign_up_window.insertAdjacentHTML("afterbegin", `<h1>${sign_obj.window_text}</h1>`);
  sign_up_window.insertAdjacentElement("afterbegin",exit)
  form.insertAdjacentElement("beforeend", submit);
  sign_up_window.insertAdjacentElement("beforeend", form);
  sign_up_lock.insertAdjacentElement("beforeend", sign_up_window);
  document.body.append(sign_up_lock)
}

const createLogInForm = () => {
  const Log_in_lock = lockWindowForm()

  const exit = createElement(login_obj.reject_button)
  exit.onclick = () => {
    Log_in_lock.remove()
  }
  

  const Log_in_window = document.createElement('div')
  Log_in_window.classList.add('reg-window')
  Log_in_window.id = 'lock'
  const form = document.createElement('form')
  form.id = 'log-in-form'
  form.name = 'log_in'
  form.addEventListener("change", () => {
    isValidInput(login_obj);
  });


  for(const field in login_obj.fields){
    form.insertAdjacentElement('beforeend',
    createElement(login_obj.fields[field]))
  }

  const submit = createElement(login_obj.submit_button)
  submit.onclick = () => logIn(createInputsValueObject(login_obj));

  Log_in_window.insertAdjacentHTML("afterbegin", `<h1>${login_obj.window_text}</h1>`);
  Log_in_window.insertAdjacentElement("afterbegin",exit)
  form.insertAdjacentElement("beforeend", submit);
  Log_in_window.insertAdjacentElement("beforeend", form);
  Log_in_lock.insertAdjacentElement("beforeend", Log_in_window);
  document.body.append(Log_in_lock)
}


const editPostForm = (obj,elem) => {
  const Log_in_lock = lockWindowForm()
  const Log_in_window = document.createElement('div')
  Log_in_window.classList.add('reg-window')

  const submit = createElement(obj.submit_button)
  const reject = canseledEdit(obj,Log_in_lock)
  const post = document.createElement('form')
  post.classList.add(obj.css)
  const fields = obj.fields
  post.insertAdjacentElement('afterbegin',submit)
  post.insertAdjacentElement('afterbegin',reject)
  for(const field in fields){
    const elem = document.createElement('div')
    fields[field].css.split(' ').forEach(style => {
      elem.classList.add(style)
    });
    const input = createElement(fields[field])
    post.insertAdjacentElement('beforeend',input)
  }
  post.onchange = () => {
    isValidInput(obj)
    }
    submit.onclick = () => {
      const value = createInputsValueObject(obj)
      value.userId = localStorage.getItem('current_user')
      value.id = elem.id
      const post = drawPost(models.posts,{title:value.title,text:value.text})
      post.id = elem.id
      checkUserObject(models.posts,value)
      editObject('posts',value)
      Log_in_lock.remove()
      editPost(models.posts,post)
      deleteElem(models.posts,post)
      elem.parentNode.replaceChild(post,elem)
    }
    Log_in_window.insertAdjacentElement('afterbegin',post)
    Log_in_lock.insertAdjacentElement("beforeend", Log_in_window);
    return Log_in_lock
  }
  
  export {postForm, createingSignUpForm, createLogInForm, editPostForm, lockWindowForm}
