const registerButton = document.querySelector("#register-button");
const registerForm = document.querySelector("#registration-form");

const API_URL = "https://69b26ccae06ef68ddd950db6.mockapi.io/fasttypeApi";

if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const error = document.querySelector("#error");
    error.textContent = "";

    const usernameInput = document.getElementById("username");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("verify-password");

    const username = usernameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    if (password !== confirmPassword) {
      error.textContent = "Passwords do not match.";
      return;
    }

    const checkResponse = await fetch(`${API_URL}`);
    const allUsers = await checkResponse.json();

    const emailExists = allUsers.some((user) => user.email === email);

    if (emailExists) {
      error.textContent = "Email already registered.";
      return;
    }

    await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
        createdAt: new Date().toISOString(),
      }),
    });
    localStorage.setItem("currentUser", JSON.stringify(allUsers[0]));

    window.location.href="../index.html"
    
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

  
     const allResponse = await fetch(`${API_URL}`);

    const allUsers = await allResponse.json();

    const emailExists = allUsers.some((user) => user.email === email);

    if (!emailExists) {
      error.textContent = "you need to register";
      return;
    }

    if (users.length === 0) {
      error.textContent = "User not found.";
      return;
    }

    if (users[0].password !== password) {
      error.textContent = "Invalid password.";
      return;
    }

    localStorage.setItem("currentUser", JSON.stringify(users[0]));

    window.location.href="../index.html"

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    
    if (!currentUser) {
      error.textContent="You need to register"
    } else {
      
    }
  });
}

// == MAIN PAGE ==
const welcome = document.getElementById("welcome");
const logoutBtn = document.getElementById("logoutBtn");
const avatar = document.querySelector(".avatar");

// if (welcome) {
// }
// welcome.textContent = `Welcome, ${currentUser.username}`;
// avatar.src = currentUser.avatar;

if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
  });
}
