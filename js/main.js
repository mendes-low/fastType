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
        container.innerHTML = "Error not data";
        console.error(error);
    }
}

loadLeaderboard()


