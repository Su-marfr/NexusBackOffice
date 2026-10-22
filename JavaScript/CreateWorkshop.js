const popup = document.getElementById("popup");
const openButton = document.getElementById("open_popup");
const closeButton = document.getElementById("close_popup");
const cancelButton = document.getElementById("cancel_popup");

function openPopup() {
  popup.style.display = "flex";
}

function closePopup() {
  popup.style.display = "none";
}

openButton.addEventListener("click", openPopup);
closeButton.addEventListener("click", closePopup);
cancelButton.addEventListener("click", closePopup);