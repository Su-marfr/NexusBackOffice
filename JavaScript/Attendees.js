// const attendeesList = document.querySelector("#attendees-list");
// const registeredTitle = document.querySelector("#registered-title");
// const progressFill = document.querySelector("#progress-fill");

// const deletePopup = document.querySelector("#delete-attendee-popup");
// const deleteQuestion = document.querySelector("#delete-attendee-question");

// const cancelButton = document.querySelector("#cancel-remove-attendee");
// const confirmButton = document.querySelector("#confirm-remove-attendee");

// const capacityMax = 20;

// let attendees = [
//   {
//     id: 1,
//     name: "Mona Lisa",
//     email: "mona.l@example.com"
//   },
//   {
//     id: 2,
//     name: "John Smith",
//     email: "john.s@example.com"
//   },
//   {
//     id: 3,
//     name: "Emma",
//     email: "emma@example.com"
//   }
// ];
// let currentAttendeeId = null;

// function displayAttendees() {
//     attendeesList.innerHTML ="";

//     const registered = attendees.length;

//     registeredTitle.textContent = `Registered attendees (${registered}/${capacityMax})`;
    
//     const percentage = (registered / capacityMax) * 100;

//     progressFill.style.width = percentage + "%";

//     for (const attendee of attendees) {
//         const row = document.createElement("tr");
//         const fullName = document.createElement("td");
        
//         fullName.textContent = [attendee.firstName, attendee.lastName]
//         .filter(Boolean)
//         .join(" ");

//         const email = document.createElement("td");
//         email.textContent = attendee.email;

//         const actions = document.createElement("td");
//         const deleteButton = document.createElement("button");

//         deleteButton.type = "button";
//         deleteButton.classList.add("remove-attendee-button")

//         const image = document.createElement("img");

//         image.src = "../Images/trash.svg";
//         image.alt = "Delete";

//         deleteButton.appendChild(image);

//         deleteButton.addEventListener("click", function() {
//             openDeletePopup(attendee);
//         });

//         actions.appendChild(deleteButton);

//         row.appendChild(fullName);
//         row.appendChild(email);
//         row.appendChild(actions);

//         attendeesList.appendChild(row);
//     }

// }


// function openDeletePopup(attendee) {

//     currentAttendeeId = attendee.id;

//     const fullName =
//         [attendee.firstName, attendee.lastName]
//         .filter(Boolean)
//         .join(" ");

//     deleteQuestion.textContent =
//         "Are you sure you want to remove " +
//         fullName + " (" + attendee.email +
//         ") from this workshop?";

//     deletePopup.classList.add("ouvert");
// }

// function closeDeletePopup() {

//     deletePopup.classList.remove("ouvert");

//     currentAttendeeId = null;
// }

// cancelButton.addEventListener("click", function () {

//     closeDeletePopup();

// });

// confirmButton.addEventListener("click", function () {

//     if (currentAttendeeId === null) {
//         return;
//     }

//     for (let i = 0; i < attendees.length; i++) {

//         if (attendees[i].id === currentAttendeeId) {

//             attendees.splice(i, 1);

//             break;
//         }
//     }

//     displayAttendees();

//     closeDeletePopup();

// });

// displayAttendees();