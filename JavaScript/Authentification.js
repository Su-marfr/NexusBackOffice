
const verificationForm = document.querySelector("#loginForm")
if (verificationForm.classList.contains("active")) {
    console.log("verification succes")
}

verificationForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // if (email !== "" && password !== "") {

        window.location.href = "WorkshopsMasterList.html";

    // } else {
    //     alert("Veuillez remplir tous les champs.");
    // }
});