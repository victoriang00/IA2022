/* add click effect*/
const menu = document.querySelector("#mobile-menu");
const menuLinks = document.querySelector(".navbar__menu");

/* listen to click event */
menu.addEventListener("click", function () {
  menu.classList.toggle("is-active");
  menuLinks.classList.toggle("active");
});
