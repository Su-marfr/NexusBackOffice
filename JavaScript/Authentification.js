const verificationForm = document.querySelector("#loginForm");
const errorMessage = document.getElementById("errorMessage");

verificationForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  errorMessage.textContent = "";

  try {
    const response = await fetch("http://localhost:8080/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));

      if (response.status === 400) {
        throw new Error(errorData.message || "Veuillez remplir correctement tous les champs.");
      } else if (response.status === 401) {
        throw new Error(errorData.message || "Email or password invalid.");
      } else if (response.status === 500) {
        throw new Error("Erreur serveur. Veuillez re-essayer plus tard.");
      } else {
        throw new Error(errorData.message || "Une erreur est survenue lors de la connexion.");
      }
    }

    const data = await response.json();
    
    if (data.token) {
      localStorage.setItem("authToken", data.token);
    }

    window.location.href = "WorkshopsMasterList.html";

  } catch (error) {
    if (error.message.includes("NetworkError") || error.name === "TypeError") {
      errorMessage.textContent = "Email or password invalid.";
    } else {
      errorMessage.textContent = error.message;
    }
  }
});