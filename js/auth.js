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

    window.location.href = "../index.html";
  });
}

const registerBtn = document.querySelector("#register-button");
const popup = document.getElementById("popup");
const logoutBtn = document.getElementById("logout");

// Загруженный пользователь
const user = JSON.parse(localStorage.getItem("currentUser"));

// --- ПОКАЗ popup ТОЛЬКО ЕСЛИ ПОЛЬЗОВАТЕЛЬ ЕСТЬ ---
if (user) {
  // Показать иконку пользователя и включить возможность открыть popup
  registerBtn.addEventListener("click", (e) => {
    e.preventDefault();
    popup.classList.toggle("active");
  });
} else {
  // Если пользователь не залогинен — перенаправить на регистрацию
  registerBtn.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "../register.html";
  });
}

// --- ЛОГАУТ ---
if (logoutBtn) {
  logoutBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    if (!user) return;

    try {
      // Удаляем пользователя из MockAPI
      await fetch(`${API_URL}/${user.id}`, { method: "DELETE" });

      // Очищаем localStorage
      localStorage.removeItem("currentUser");

      // Перенаправляем на страницу регистрации
      window.location.href = "../register.html";
    } catch (err) {
      console.error("Ошибка при удалении пользователя:", err);
    }
  });
}



// const registerBtn = document.querySelector("#register-button");
// const popupUser = document.getElementById("popup");
// const logoutBtn = document.getElementById("logout");

// const popup = document.getElementById("popup");
// const user = JSON.parse(localStorage.getItem("currentUser"));

// // logoutBtn.addEventListener("click", (e) => {
// //   e.preventDefault();
// //   if (!user) {
// //     // popup.classList.toggle("active");
// //     window.location.href = "../register.html";
// //     return;
// //   }
// // });

// //  logout
// if (logoutBtn) {
//   logoutBtn.addEventListener("click", () => {
//     localStorage.removeItem("currentUser");
//     window.location.href = "../register.html";
//   });
// }

// == MAIN PAGE ==
// const welcome = document.getElementById("welcome");
// const logoutBtn = document.getElementById("logout");
// const avatar = document.querySelector(".avatar");

// if (welcome) {
// }
// welcome.textContent = `Welcome, ${currentUser.username}`;
// avatar.src = currentUser.avatar;

// if (logoutBtn) {
//   logoutBtn.addEventListener("click", () => {
//     localStorage.removeItem("currentUser");
//     window.location.href = "login.html";
//     if(popupUser.classList())
//   });
// }
