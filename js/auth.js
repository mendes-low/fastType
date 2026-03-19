

const registerButton = document.querySelector("#register-button");
const registerForm = document.querySelector("#registration-form");

const API_URL = "https://69b26ccae06ef68ddd950db6.mockapi.io/fasttypeApi";

if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const error = document.querySelector("#error");
    error.textContent = "";

    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("verify-password").value;

    if (password !== confirmPassword) {
      error.textContent = "Passwords do not match.";
      return;
    }

    const response = await fetch(API_URL);
    const users = await response.json();

    const emailExists = users.some((user) => user.email === email);

    if (emailExists) {
      error.textContent = "Email already registered.";
      return;
    }

    const newUser = {
      username,
      email,
      password,
      createdAt: new Date().toISOString(),
    };

    await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });

    localStorage.setItem("currentUser", JSON.stringify(newUser));

    window.location.href = "../index.html";
  });
}

// == LOGIN ==
const loginForm = document.getElementById("login-form");

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const error = document.querySelector("#err");
    error.textContent = "";

    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value;

    const response = await fetch(`${API_URL}?email=${email}`);

    const users = await response.json();

    if (users.length === 0) {
      error.textContent = "User not found.";
      return;
    }
    if (users[0].password !== password) {
      error.textContent = "Invalid password.";
      return;
    }

    localStorage.setItem("currentUser", JSON.stringify(users[0]));

    window.location.href = "index.html";
  });
}
