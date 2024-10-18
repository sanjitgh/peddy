// button active event
document.addEventListener("click", () => {
    const buttons = document.querySelectorAll(".active-button");

    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            buttons.forEach((btn) => btn.classList.remove("active"));
            button.classList.add("active")
        })
    })
})
// adopt function
function showPopup() {
    const popup = document.getElementById('adopt-popup');
    const overlay = document.getElementById('adopt-overlay');
    const countdownElement = document.getElementById('adopt-countdown');
    let timeLeft = 3;
    countdownElement.innerText = `${timeLeft}`;
    popup.style.display = 'block';
    overlay.style.display = 'block';
    const countdown = setInterval(() => {
        timeLeft--;
        countdownElement.innerText = `${timeLeft}`;
        if (timeLeft <= 0) {
            clearInterval(countdown);
            popup.style.display = 'none';
            overlay.style.display = 'none';
        }
    }, 1000);
}