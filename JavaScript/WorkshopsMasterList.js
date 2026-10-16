const addButton = document.querySelector("#add-workshop-button");

const editButton = document.querySelector(".edit-button");
const deleteButton = document.querySelector(".delete-button");

addButton.addEventListener("click", () => {
    console.log("Add New Workshop clicked!");
});

editButton.addEventListener("click", () => {
    console.log("Edit Workshop cliked!");
});

deleteButton.addEventListener("click", () => {
    console.log("Delete Workshop clicked!");
});