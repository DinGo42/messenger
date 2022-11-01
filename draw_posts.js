export const crate_post = (database,div) => {
  const crated_post = document.createElement('div')
  crated_post.classList.add('crated-post')
  for(const obj of database.posts){
    const post = document.createElement('div')
    post.classList.add('post')
    
    const title = document.createElement('div')
    title.classList.add('title-post')
    title.innerText = obj.title

    const text = document.createElement('div')
    text.classList.add('text-post')
    text.innerText = obj.text


    post.insertAdjacentElement('beforeend',title)
    post.insertAdjacentElement('beforeend',text)
    post.addEventListener('click',()=>{
      setTimeout(()=>post.classList.add('growing'),0)
      setTimeout(()=>document.getElementById('main').addEventListener('click',()=>{
        post.classList.remove('growing')
      }),0)
  })
    
    crated_post.insertAdjacentElement('beforeend',post)
  }
  div.insertAdjacentElement('beforeend',crated_post)
}