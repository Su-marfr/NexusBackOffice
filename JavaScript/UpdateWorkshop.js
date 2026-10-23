const popupEdit = document.querySelector("#popup_edit");
const openEditButton = document.querySelector("#open_popup_edit");
const closeEditButton = document.querySelector("#close_popup_edit");
const cancelEditButton = document.querySelector("#cancel_popup_edit");

openEditButton.addEventListener("click", () => {
  popupEdit.classList.add("ouvert");
});

closeEditButton.addEventListener("click", () => {
  popupEdit.classList.remove("ouvert");
});

cancelEditButton.addEventListener("click", () => {
  popupEdit.classList.remove("ouvert");
});