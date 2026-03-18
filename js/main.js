async function loadLeaderboard() {
    const container = document.querySelector("#leaderboard-data");

    try {
        const response = await fetch(
            "https://69b26ccae06ef68ddd950db6.mockapi.io/fasttypeApi",
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
        container.textContent = "Error not data";
        console.error(error);
    }
}

loadLeaderboard()


