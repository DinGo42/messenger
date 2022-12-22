const growAnimation = (elem, save_zone) => {
  setTimeout(() => elem.classList.add("growing"), 0);
  setTimeout(
    () =>
      save_zone.addEventListener("click", () => {
        elem.classList.remove("growing");
      }),
    0
  );
};
export { growAnimation };
