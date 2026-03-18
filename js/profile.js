function loadStats() {
    return JSON.parse(localStorage.getItem("typingStats")) || {
        tests: 0,
        bestWPM: 0,
        averageWPM: 0,
        history: []
    };
}

function renderProfile() {
    const stats = loadStats();

    document.getElementById("tests-count").textContent = stats.tests;
    document.getElementById("best-wpm").textContent = stats.bestWPM;
    document.getElementById("avg-wpm").textContent = stats.averageWPM;

    let avgAcc = 0;
    if (stats.history.length > 0) {
        const totalAcc = stats.history.reduce((sum, item) => sum + item.accuracy, 0);
        avgAcc = Math.round(totalAcc / stats.history.length);
    }

    document.getElementById("avg-acc").textContent = avgAcc + "%";

    const historyList = document.getElementById("history-list");
    historyList.innerHTML = "";

    const recentHistory = [...stats.history].reverse().slice(0, 8);

    recentHistory.forEach((item) => {
        historyList.innerHTML += `
            <div class="history-row">
                <span>${item.date}</span>
                <span>${item.wpm}</span>
                <span>${item.accuracy}%</span>
            </div>
        `;
    });
}

renderProfile();