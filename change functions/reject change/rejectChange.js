import { createElement } from "/constructors/elemConstrustor.js";
export const rejectChange = ({ canseled_edit }, elem) => {
  const button = createElement(canseled_edit);
  button.onclick = () => {
    elem.remove();
  };
  return button;
};
