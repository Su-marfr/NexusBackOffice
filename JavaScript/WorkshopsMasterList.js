const addButton = document.querySelector("#add-workshop-button");
const tableBody = document.querySelector("#workshops-body");
const listErrorMessage = document.querySelector("#listErrorMessage");

const popupEdit = document.querySelector("#popup_edit");
const closeEditButton = document.querySelector("#close_popup_edit");
const cancelEditButton = document.querySelector("#cancel_popup_edit");
const editForm = document.querySelector("#edit_workshop_form");
const editErrorMessage = document.querySelector("#editErrorMessage");
const editCategorySelect = document.querySelector("#edit_category");

const popupCreate = document.querySelector("#popup_create");
const closeCreateButton = document.querySelector("#close_popup_create");
const cancelCreateButton = document.querySelector("#cancel_popup_create");
const createForm = document.querySelector("#create_workshop_form");
const createErrorMessage = document.querySelector("#createErrorMessage");
const createCategorySelect = document.querySelector("#create_category");

const popupDelete = document.querySelector("#popup_delete");
const cancelDeleteButton = document.querySelector("#cancel-button");
const deleteButton = document.querySelector("#delete-button");

let currentWorkshopId = null;

function formatTime(isoString) {
  const date = new Date(isoString);
  return date.toTimeString().slice(0, 5);
}

function displayWorkshops(workshops) {
  tableBody.innerHTML = "";

  for (const workshop of workshops) {
    const registered = workshop.capacityMax - workshop.remainingPlaces;

    let statusClass = "open";
    let statusText = "Open";
    if (workshop.remainingPlaces === 0) {
      statusClass = "full";
      statusText = "Full";
    }

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${workshop.name}</td>
      <td>${workshop.category}</td>
      <td>${formatTime(workshop.startTime)}</td>
      <td>${formatTime(workshop.endTime)}</td>
      <td>
        <div class="capacity-container">
          <div class="capacity-number">${registered}/${workshop.capacityMax}</div>
          <span class="status-badge ${statusClass}">${statusText}</span>
        </div>
      </td>
      <td>
        <div class="icon-button-container">
          <button class="icon-button edit-button" type="button">
            <img src="../Images/pencil.svg" alt="Pencil">
          </button>
          <button class="icon-button trash-icon-button" type="button">
            <img src="../Images/trash.svg" alt="Trash">
          </button>
        </div>
      </td>
    `;

    const editButton = row.querySelector(".edit-button");
    editButton.addEventListener("click", () => {
      openEditPopup(workshop.id);
    });

    const deleteWorkshopButton = row.querySelector(".trash-icon-button");
    deleteWorkshopButton.addEventListener("click", () => {
      currentWorkshopId = workshop.id;
      popupDelete.classList.add("ouvert");
    });

    tableBody.appendChild(row);
  }
}

async function loadWorkshops() {
  try {
    const token = localStorage.getItem("authToken");
    const response = await fetch("http://localhost:8080/workshops", {
      headers: { "Authorization": `Bearer ${token}` }
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP : ${response.status}`);
    }

    const workshops = await response.json();
    displayWorkshops(workshops);
  } catch (error) {
    if (error.name === "TypeError") {
      listErrorMessage.textContent = "Impossible de contacter le serveur";
    } else {
      listErrorMessage.textContent = error.message;
    }
  }
}

function fillSelect(select, categories) {
  select.innerHTML = "";
  for (const category of categories) {
    const option = document.createElement("option");
    option.value = category.id;
    option.textContent = category.name;
    select.appendChild(option);
  }
}

async function loadCategories() {
  try {
    const token = localStorage.getItem("authToken");
    const response = await fetch("http://localhost:8080/categories", {
      headers: { "Authorization": `Bearer ${token}` }
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP : ${response.status}`);
    }

    const categories = await response.json();
    fillSelect(editCategorySelect, categories);
    fillSelect(createCategorySelect, categories);
  } catch (error) {
    listErrorMessage.textContent = "Impossible de charger les catégories";
  }
}

addButton.addEventListener("click", () => {
  createForm.reset();
  createErrorMessage.textContent = "";
  popupCreate.classList.add("ouvert");
});

closeCreateButton.addEventListener("click", () => {
  popupCreate.classList.remove("ouvert");
});

cancelCreateButton.addEventListener("click", () => {
  popupCreate.classList.remove("ouvert");
});

createForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.querySelector("#create_name").value;
  const category = document.querySelector("#create_category").value;
  const capacity = document.querySelector("#create_capacity").value;
  const workshopDate = document.querySelector("#create_date").value;
  const start = document.querySelector("#create_start").value;
  const end = document.querySelector("#create_end").value;
  const description = document.querySelector("#create_description").value;

  if (workshopDate === "") {
    createErrorMessage.textContent = "Choisis une date";
    return;
  }

  const startISO = new Date(`${workshopDate}T${start}`).toISOString();
  const endISO = new Date(`${workshopDate}T${end}`).toISOString();

  try {
    const token = localStorage.getItem("authToken");
    const response = await fetch("http://localhost:8080/workshops", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        name: name,
        categoryID: category,
        capacityMax: Number(capacity),
        startTime: startISO,
        endTime: endISO,
        description: description
      })
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.reason);
    }

    popupCreate.classList.remove("ouvert");
    loadWorkshops();
  } catch (error) {
    if (error.name === "TypeError") {
      createErrorMessage.textContent = "Impossible de contacter le serveur";
    } else {
      createErrorMessage.textContent = error.message;
    }
  }
});

async function openEditPopup(id) {
  listErrorMessage.textContent = "";
  editErrorMessage.textContent = "";

  try {
    const token = localStorage.getItem("authToken");
    const response = await fetch(`http://localhost:8080/workshops/${id}`, {
      headers: { "Authorization": `Bearer ${token}` }
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP : ${response.status}`);
    }

    const workshop = await response.json();
    currentWorkshopId = workshop.id;

    const start = new Date(workshop.startTime);
    const end = new Date(workshop.endTime);

    document.querySelector("#edit_name").value = workshop.name;
    document.querySelector("#edit_capacity").value = workshop.capacityMax;
    document.querySelector("#edit_description").value = workshop.description;
    document.querySelector("#edit_date").value = start.toLocaleDateString("fr-CA");
    document.querySelector("#edit_start").value = start.toTimeString().slice(0, 5);
    document.querySelector("#edit_end").value = end.toTimeString().slice(0, 5);

    for (const option of editCategorySelect.options) {
      if (option.textContent === workshop.category) {
        editCategorySelect.value = option.value;
      }
    }

    popupEdit.classList.add("ouvert");
  } catch (error) {
    if (error.name === "TypeError") {
      listErrorMessage.textContent = "Impossible de contacter le serveur";
    } else {
      listErrorMessage.textContent = error.message;
    }
  }
}

closeEditButton.addEventListener("click", () => {
  popupEdit.classList.remove("ouvert");
});

cancelEditButton.addEventListener("click", () => {
  popupEdit.classList.remove("ouvert");
});

editForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.querySelector("#edit_name").value;
  const category = document.querySelector("#edit_category").value;
  const capacity = document.querySelector("#edit_capacity").value;
  const workshopDate = document.querySelector("#edit_date").value;
  const start = document.querySelector("#edit_start").value;
  const end = document.querySelector("#edit_end").value;
  const description = document.querySelector("#edit_description").value;

  const startISO = new Date(`${workshopDate}T${start}`).toISOString();
  const endISO = new Date(`${workshopDate}T${end}`).toISOString();

  try {
    const token = localStorage.getItem("authToken");
    const response = await fetch(`http://localhost:8080/workshops/${currentWorkshopId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        name: name,
        categoryID: category,
        capacityMax: Number(capacity),
        startTime: startISO,
        endTime: endISO,
        description: description
      })
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.reason);
    }

    popupEdit.classList.remove("ouvert");
    loadWorkshops();
  } catch (error) {
    if (error.name === "TypeError") {
      editErrorMessage.textContent = "Impossible de contacter le serveur";
    } else {
      editErrorMessage.textContent = error.message;
    }
  }
});

cancelDeleteButton.addEventListener("click", () => {
    popupDelete.classList.remove("ouvert");
});

deleteButton.addEventListener("click", async () => {
  if (currentWorkshopId === null) {
    return;
  }

  try {
    const token = localStorage.getItem("authToken");
    const response = await fetch(`http://localhost:8080/workshops/${currentWorkshopId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
       }
      });

      if (!response.ok) {
        throw new Error (`Erreur HTTP : ${response.status}`);
      }

      popupDelete.classList.remove("ouvert");

      currentWorkshopId = null;

      loadWorkshops();

  } catch (error) {
      const deleteErrorMessage = document.querySelector("#deleteErrorMessage");

      if (error.name === "TypeError") {
        deleteErrorMessage.textContent = "Unable to connect to the server";
      } else {
        deleteErrorMessage.textContent = error.message;
      }
  }
});

loadCategories();
loadWorkshops();