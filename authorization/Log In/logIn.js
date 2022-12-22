import { find } from "/database/database.js";

export const logIn = (inputs_value) => {
  const lock = document.getElementById("lock");
  const user = find(inputs_value, "users");
  console.log(lock);
  if (user.length !== 0)
    localStorage.setItem("current_user", user[0].id), lock.remove();
  else {
    alert(`password or email incorect`);
  }
};
