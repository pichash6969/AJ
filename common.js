// common.js

// ======= Clock (user system time) =======
function updateClock() {
  const clock = document.getElementById("clock");
  if (!clock) return;

  const now = new Date();
  const timeString = now.toLocaleTimeString("en-GB", { hour12: false });
  clock.textContent = timeString;
}

// हर सेकंड update करें
setInterval(updateClock, 1000);
updateClock();

// ======= Balance Example =======
function updateBalance(amount = 0) {
  const balance = document.getElementById("userBalance");
  if (!balance) return;

  balance.textContent = amount;
}

// Initialize example balance
updateBalance(500); // Start with 500 coins
