const lockWindowForm = () => {
  const lock = document.createElement('div')
  lock.id = 'lock'
  lock.classList.add('window-lock')
  return lock
}
//
export {lockWindowForm}