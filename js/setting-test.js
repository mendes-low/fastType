const config = {
    mode: 'time',
    language: "ru",
    Wordcount: 25
}

const modeButtons = document.querySelectorAll('.mode-btn')

modeButtons.forEach(button => {
    button.addEventListener("click", ()=> {
        modeButtons.forEach(btn=> btn.classList.remove("active"));
        button.classList.add("active");

        const selectedMode = button.dataset.mode;

        if(selectedMode === 'language') {
            config.language = config.language ===  "en" ? 'ru' : "en";
            button.textContent= config.language
            newGame();
        } else {
            modeButtons.forEach(btn => {
                if (btn.dataset.mode !== 'language') btn.classList.remove('active');
            });
            button.classList.add('active');
            config.mode = selectedMode;
            newGame()
        }
    })
})



