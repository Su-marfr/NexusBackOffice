// const popup = document.querySelector("#popup");
// const openButton = document.querySelector("#open_popup");
// const closeButton = document.querySelector("#close_popup");
// const cancelButton = document.querySelector("#cancel_popup");
// const creationForm = document.querySelector("#create_workshop_form");
// const errorMessage = document.querySelector("#errorMessage")

// openButton.addEventListener("click", () => {
//   popup.classList.add("ouvert");
// });

// closeButton.addEventListener("click", () => {
//   popup.classList.remove("ouvert");
// });

// cancelButton.addEventListener("click", () => {
//   popup.classList.remove("ouvert");
// });

// creationForm.addEventListener("submit", async (e) => {
//   e.preventDefault();

//   const name = document.querySelector("#name").value;
//   const category = document.querySelector("#category").value;
//   const capacity = document.querySelector("#capacity").value;
//   const workshopDate = document.querySelector("#date").value;
//   const start = document.querySelector("#start").value;
//   const end = document.querySelector("#end").value;
//   const description = document.querySelector("#description").value;
//   const successMessage = document.querySelector("#successMessage");

//   const startISO = new Date(`${workshopDate}T${start}`).toISOString();
//   const endISO = new Date(`${workshopDate}T${end}`).toISOString();

//   try {
//     const token = localStorage.getItem("authToken");
//     const response = await fetch("http://localhost:8080/workshops", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization": `Bearer ${token}`
//       },
//       body: JSON.stringify({
//         name: name,
//         categoryID: category, 
//         capacityMax: Number(capacity),
//         date:  new Date(workshopDate).toISOString(),
//         startTime: startISO,
//         endTime: endISO,
//         description: description
//       })
//     });

//     if(!response.ok) {
//       throw new Error(`Erreur HTTP : ${response.status}`);
//     }

//     successMessage.textContent = "Atelier créé !";
//     popup.classList.remove("ouvert");
//     creationForm.reset();

//     const data = await response.json();

//     if (data.token) {
//       localStorage.setItem("authToken", data.token);
//     }
   
//   } catch (error) {
//       if(error.message.includes("NetworkError") || error.name === "TypeError") {
//         errorMessage.textContent = "Impossible de contacter le serveur";
//         console.log("jsp")
//       } else {
//         errorMessage.textContent = error.message;
//       }
//     }

// });
