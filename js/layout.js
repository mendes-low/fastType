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
            callback()
        })
        .catch((error) => console.error(error));
}



function initThemes(){
    
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
loadComponent("header", "../components/header.html",initThemes);