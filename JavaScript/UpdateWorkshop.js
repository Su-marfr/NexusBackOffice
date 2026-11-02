// // ---------- Éléments de la page ----------
// const popupEdit = document.querySelector("#popup_edit");
// const openEditButton = document.querySelector("#open_popup_edit");
// const closeEditButton = document.querySelector("#close_popup_edit");
// const cancelEditButton = document.querySelector("#cancel_popup_edit");
// const editForm = document.querySelector("#edit_workshop_form");
// const editErrorMessage = document.querySelector("#editErrorMessage");
// const categorySelect = document.querySelector("#edit_category");

// const params = new URLSearchParams(window.location.search);
// const workshopId = params.get("id");

// let currentWorkshop = null;

// async function loadCategories() {
//   const token = localStorage.getItem("authToken");
//   const response = await fetch("http://localhost:8080/categories", {
//     headers: { "Authorization": `Bearer ${token}` }
//   });

//   if (!response.ok) {
//     throw new Error(`Erreur HTTP : ${response.status}`);
//   }

//   const categories = await response.json();

//   categorySelect.innerHTML = "";
//   for (const category of categories) {
//     const option = document.createElement("option");
//     option.value = category.id;
//     option.textContent = category.name;
//     categorySelect.appendChild(option);
//   }
// }

// async function loadWorkshop() {
//   try {
//     await loadCategories();

//     const token = localStorage.getItem("authToken");
//     const response = await fetch(`http://localhost:8080/workshops/${workshopId}`, {
//       headers: { "Authorization": `Bearer ${token}` }
//     });

//     if (!response.ok) {
//       throw new Error(`Erreur HTTP : ${response.status}`);
//     }

//     currentWorkshop = await response.json();
//   } catch (error) {
//     if (error.name === "TypeError") {
//       editErrorMessage.textContent = "Impossible de contacter le serveur";
//     } else {
//       editErrorMessage.textContent = error.message;
//     }
//   }
// }

// loadWorkshop();

// openEditButton.addEventListener("click", () => {
//   if (currentWorkshop === null) {
//     return;
//   }

//   const start = new Date(currentWorkshop.startTime);
//   const end = new Date(currentWorkshop.endTime);

//   document.querySelector("#edit_name").value = currentWorkshop.name;
//   document.querySelector("#edit_capacity").value = currentWorkshop.capacityMax;
//   document.querySelector("#edit_description").value = currentWorkshop.description;
//   document.querySelector("#edit_date").value = currentWorkshop.startTime.slice(0, 10);
//   document.querySelector("#edit_start").value = start.toTimeString().slice(0, 5);
//   document.querySelector("#edit_end").value = end.toTimeString().slice(0, 5);

//   for (const option of categorySelect.options) {
//     if (option.textContent === currentWorkshop.category) {
//       categorySelect.value = option.value;
//     }
//   }

//   editErrorMessage.textContent = "";
//   popupEdit.classList.add("ouvert");
// });

// closeEditButton.addEventListener("click", () => {
//   popupEdit.classList.remove("ouvert");
// });

// cancelEditButton.addEventListener("click", () => {
//   popupEdit.classList.remove("ouvert");
// });

// editForm.addEventListener("submit", async (e) => {
//   e.preventDefault();

//   const name = document.querySelector("#edit_name").value;
//   const category = document.querySelector("#edit_category").value;
//   const capacity = document.querySelector("#edit_capacity").value;
//   const workshopDate = document.querySelector("#edit_date").value;
//   const start = document.querySelector("#edit_start").value;
//   const end = document.querySelector("#edit_end").value;
//   const description = document.querySelector("#edit_description").value;

//   const startISO = new Date(`${workshopDate}T${start}`).toISOString();
//   const endISO = new Date(`${workshopDate}T${end}`).toISOString();

//   try {
//     const token = localStorage.getItem("authToken");
//     const response = await fetch(`http://localhost:8080/workshops/${workshopId}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization": `Bearer ${token}`
//       },
//       body: JSON.stringify({
//         name: name,
//         categoryID: category,
//         capacityMax: Number(capacity),
//         startTime: startISO,
//         endTime: endISO,
//         description: description
//       })
//     });

//     if (!response.ok) {
//       const data = await response.json();
//       throw new Error(data.reason);
//     }

//     popupEdit.classList.remove("ouvert");
//     location.reload();
//   } catch (error) {
//     if (error.name === "TypeError") {
//       editErrorMessage.textContent = "Impossible de contacter le serveur";
//     } else {
//       editErrorMessage.textContent = error.message;
//     }
//   }
// });