function loadComponent(id, filePath, callback) {
    fetch(filePath)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to load component");
            }
            return response.text();
        })
        .then((data) => {
            document.getElementById(id).innerHTML = data;
            callback();
        })
        .catch((error) => console.error(error));
}

function initThemes() {
    const themeButtons = document.querySelectorAll("[data-theme]");

    themeButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const theme = button.dataset.theme;
            document.body.className = theme;
            localStorage.setItem("theme", theme);
        });
    });

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
        document.body.className = savedTheme;
    }
}

function initPopup() {
    const registerBtn = document.querySelector("#register-button");
    const popupContainer = document.querySelector(".popup-container");
    const popupUser = document.getElementById("popup");
    const logoutBtn = document.getElementById("logout");
    const user = JSON.parse(localStorage.getItem("currentUser"));

    if (registerBtn) {
        if (!user) {
            registerBtn.addEventListener("click", () => {
                window.location.href = "index.html";
            });
        } else {
            registerBtn.removeAttribute("href");
        }
    }

    if (registerBtn && popupUser && popupContainer && user) {
        popupContainer.addEventListener("mouseenter", () => {
            popupUser.classList.add("active");
        });

        popupContainer.addEventListener("mouseleave", () => {
            popupUser.classList.remove("active");
        });
    }

    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            localStorage.removeItem("currentUser");
            window.location.href = "../register.html";
        });
    }
}

function displayName() {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const registerBtn = document.querySelector("#register-button");
    const userImage = document.createElement("img");
    userImage.setAttribute("src", "../assets/images/user.png");

    if (!user) {
        registerBtn.append(userImage);
    } else {
        const userBox = document.createElement("div");
        userBox.classList.add("user-box");

        const userName = document.createElement("p");
        userName.textContent = user.username;

        userBox.append(userImage, userName);
        registerBtn.append(userBox);
    }
}

loadComponent("header", "../components/header.html", initThemes);
loadComponent("header", "../components/header.html", initPopup);
loadComponent("header", "../components/header.html", displayName);
