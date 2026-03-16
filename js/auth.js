const registerButton = document.querySelector("#register-button");
const registerForm = document.getElementById("registerForm");

const API_URL = "https://69b60ba5583f543fbd9cd75c.mockapi.io/user";

registerButton.addEventListener("click", () => {
  setUsers();
});

function setUsers() {







    
}









if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const error = document.getElementById("error");
    error.textContent = "";

    const usernameInput = document.getElementById("username");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirmPassword");

    const username = usernameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    if (password !== confirmPassword) {
      error.textContent = "Passwords do not match.";
      return;
    }

    const checkResponse = await fetch(`${API_URL}?type=user`);
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
        type: "user",
        username,
        email,
        password,
        createdAt: new Date().toISOString(),
      }),
    });

    window.location.href = "login.html";
  });
}

// == LOGIN ==
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const error = document.getElementById("error");
    error.textContent = "";

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;

    const response = await fetch(`${API_URL}?type=user&email=${email}`);

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

// == MAIN PAGE ==
const welcome = document.getElementById("welcome");
const logoutBtn = document.getElementById("logoutBtn");
const avatar = document.querySelector(".avatar");

if (welcome) {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (!currentUser) {
    window.location.href = "login.html";
  } else {
    welcome.textContent = `Welcome, ${currentUser.username}`;
    avatar.src = currentUser.avatar;
  }
}

if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
  });
}
