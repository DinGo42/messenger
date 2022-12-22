const createElement = ({ text, elem_type, classList, ...params }) => {
  const elem = document.createElement(elem_type);
  classList.split(" ").forEach((style) => {
    elem.classList.add(style);
  });
  elem.innerText = text;
  for (const param in params) {
    elem[param] = params[param];
  }
  return elem;
};
export { createElement };
