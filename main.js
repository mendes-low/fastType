// const words='apple, mirror, ocean, silent, candle, mountain, velvet, thunder, notebook, galaxy, pillow, sunrise, shadow, lantern, breeze, compass, melody, forest, crystal, whisper, horizon, puzzle, candlelight, blossom, storm, marble, feather, library, sparkle, emerald, journey, lantern, waterfall, meadow, ladder, echo, blanket, pebble, lantern, comet, galaxy, sunshine, drift, circle, lantern, rainbow, meadow, whisper, velvet, marble, window, candle, glacier, sunset, compass, dream, lantern, crystal, thunder, sparkle, cloud, lantern, notebook, pillow, forest, shadow, lantern, bridge, desert, waterfall, feather, comet, breeze, emerald, blossom, melody, whisper, horizon, sparkle, lantern, galaxy, meadow, marble, lantern, thunder, candle, ocean, dream, crystal, forest, pillow, lantern, sunshine, rainbow, whisper, shadow, marble, comet, lantern, breeze, mountain, notebook, ocean, sunset, echo, ladder, blanket, pebble, window, desert, bridge, glacier, candlelight, horizon, forest, sparkle, whisper, dream, marble, velvet, emerald, thunder, feather, cloud, blossom, melody, lantern, crystal, ocean, sunshine, waterfall, meadow, rainbow, comet, candle, breeze, shadow, forest, marble, lantern, galaxy, dream, echo, pillow, notebook, bridge, pebble, whisper, sparkle, mountain, velvet, blossom, thunder, crystal, horizon, lantern, rainbow, comet, breeze, ocean, forest, pillow, marble, cloud, dream, shadow, sunshine, meadow, waterfall, feather, notebook, candle, whisper, sparkle, emerald, bridge, glacier, desert, ladder, pebble, velvet, lantern, thunder, crystal, rainbow, dream, breeze, shadow, ocean, forest, pillow, marble, cloud, whisper, sparkle, meadow, waterfall, comet, candle, horizon'.split(' ')

// const wordsCount=words.length

// const gameTime1=30*1000
// const gameTime2=60*1000
// const gameTime3=120*1000

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

///////Лидер Борд////////////////////тиспе

const iconLiderboard = document.querySelector("#icon-liderboard");
const typingTest = document.querySelector("#typing-test");
const liderboard = document.querySelector("#liderboard");
const closeLiderboardBtn = document.querySelector("#close-liderboard");

iconLiderboard.addEventListener("click", (e) => {
    e.preventDefault();
    typingTest.style.display = "none";
    liderboard.style.display = "block";

    loadLeaderboard();
});

closeLiderboardBtn.addEventListener("click", () => {
    liderboard.style.display = "none";
    typingTest.style.display = "block";
});

async function loadLeaderboard() {
    const container = document.querySelector("#leaderboard-data");

    try {
        const response = await fetch(
            "https://69b60ba5583f543fbd9cd75c.mockapi.io/user",
        );
        const users = await response.json();

        container.innerHTML = "";

        users.sort((a, b) => b.wpm - a.wpm);
        users.forEach((user, index) => {
            const row = `
      <div class="user-row">
          <span>${index + 1}</span>
          <span>${user.name}</span>
          <span>${user.wpm}</span>
          <span>${user.accuracy}%</span>
        </div>
        `;
            container.innerHTML += row;
        });
    } catch (error) {
        container.innerHTML = "Erorr not data";
        console.error(error);
    }
}
