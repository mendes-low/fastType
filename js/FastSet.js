const timeButtons = document.querySelectorAll(".buttons-right button");
const timeDisplay = document.querySelector("#timer");
let initialTime = 30;

timeButtons.forEach(button => {
    button.addEventListener("click", () => {
        timeButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        initialTime = parentInt(button.textContent);
        timeDisplay.textContent = initialTime;


    })
})

document.body.addEventListener("keydown", (e) => {
    if(e.key === "Tab") {
        location.reload()
    }
})