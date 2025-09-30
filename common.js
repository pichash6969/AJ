
// ======= Clock =======
function updateClock() {
  const clock = document.getElementById('clock');
  const now = new Date();
  // Automatically use user's system timezone
  const timeString = now.toLocaleTimeString([], { hour12: false });
  clock.textContent = timeString;
}
setInterval(updateClock, 1000);
updateClock();

// ======= User Balance =======
let userBalance = 1000; // starting balance
const userBalanceSpan = document.getElementById('userBalance');
function updateBalance() {
  userBalanceSpan.textContent = userBalance;
}
updateBalance();

// Function to add/subtract balance (example)
function changeBalance(amount) {
  userBalance += amount;
  if (userBalance < 0) userBalance = 0;
  updateBalance();
}
