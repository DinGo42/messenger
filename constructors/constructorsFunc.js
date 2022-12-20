const createElement = ({elem_type, id, type, placeholder, value, text, name, classList, disabled}) => {
  const elem = document.createElement(elem_type);
        elem.id = id;
        classList.split(' ').forEach(style => {
          elem.classList.add(style)
        });
        elem.innerText = text
        elem.value = value
        elem.name = name;
        elem.type = type;
        elem.placeholder = placeholder;
        elem.disabled = disabled;
        return elem;
}
//
export {createElement}