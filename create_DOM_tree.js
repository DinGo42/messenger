export const create_DOM = () => {
  const full = document.createElement('div')
  full.id='full'


  const header  = document.createElement('header')

  const search = document.createElement('input')
  search.id = 'search'
  search.placeholder = 'Search'
  search.src = 'search.png'

  const logo = document.createElement('div')
  logo.classList.add('logo')
  
  const logo_img = document.createElement('img')
  logo_img.classList.add('logo')
  logo_img.src = 'logo.png'
  logo.insertAdjacentElement('beforeend',logo_img)

  const user = document.createElement('div')
  user.classList.add('user')

  header.insertAdjacentElement('beforeend',logo)
  header.insertAdjacentElement('beforeend',search)
  header.insertAdjacentElement('beforeend',user)


  const main  = document.createElement('main')

  const left_bar = document.createElement('div')
  left_bar.id='left-control-bar'

  const main_bar = document.createElement('div')
  main_bar.id='main'
  main.insertAdjacentElement('beforeend',left_bar)
  main.insertAdjacentElement('beforeend',main_bar)


  full.insertAdjacentElement('beforeend',header)
  full.insertAdjacentElement('beforeend',main)
  document.body.append(full)
}