const popup = document.querySelector("#popup");
const openButton = document.querySelector("#open_popup");
const closeButton = document.querySelector("#close_popup");
const cancelButton = document.querySelector("#cancel_popup");

openButton.addEventListener("click", () => {
  popup.classList.add("ouvert");
});

closeButton.addEventListener("click", () => {
  popup.classList.remove("ouvert");
});

cancelButton.addEventListener("click", () => {
  popup.classList.remove("ouvert");
});