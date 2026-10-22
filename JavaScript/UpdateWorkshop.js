const popupEdit = document.getElementById("popup_edit");
const openEditButton = document.getElementById("open_popup_edit");
const closeEditButton = document.getElementById("close_popup_edit");
const cancelEditButton = document.getElementById("cancel_popup_edit");

function openPopupEdit() {
  popupEdit.style.display = "flex";
}

function closePopupEdit() {
  popupEdit.style.display = "none";
}

openEditButton.addEventListener("click", openPopupEdit);
closeEditButton.addEventListener("click", closePopupEdit);
cancelEditButton.addEventListener("click", closePopupEdit);

