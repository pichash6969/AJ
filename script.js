// --- Clock Function ---
function updateClock() {
  const now = new Date();
  const timeString = now.toLocaleTimeString("en-GB", { hour12: false });
  document.getElementById("clock").textContent = timeString;
}
setInterval(updateClock, 1000);
updateClock();

// --- Balance System ---
function loadBalance() {
  let balance = localStorage.getItem("userBalance");
  if (!balance) {
    balance = 1000; // default balance
    localStorage.setItem("userBalance", balance);
  }
  document.getElementById("userBalance").textContent = balance;
}
function updateBalance(amount) {
  let balance = parseInt(localStorage.getItem("userBalance")) || 0;
  balance += amount;
  localStorage.setItem("userBalance", balance);
  document.getElementById("userBalance").textContent = balance;
}
loadBalance();

// --- Lottery Number Generator ---
function getRandomNumber(digits) {
  let max = Math.pow(10, digits) - 1;
  let number = Math.floor(Math.random() * (max + 1));
  return number.toString().padStart(digits, "0"); // leading zeros
}

function showRandomNumbers() {
  const n1 = getRandomNumber(1);
  const n2 = getRandomNumber(2);
  const n3 = getRandomNumber(3);

  document.getElementById("scroll-1digit").textContent = n1;
  document.getElementById("scroll-2digit").textContent = n2;
  document.getElementById("scroll-3digit").textContent = n3;

  saveResult(`${n1} | ${n2} | ${n3}`);
}

// --- Result History ---
function saveResult(result) {
  let history = JSON.parse(localStorage.getItem("resultHistory")) || [];
  history.unshift({ result, time: new Date().toLocaleTimeString() });
  if (history.length > 20) history.pop(); // केवल 20 result तक
  localStorage.setItem("resultHistory", JSON.stringify(history));
  renderHistory();
}

function renderHistory() {
  let history = JSON.parse(localStorage.getItem("resultHistory")) || [];
  const list = document.getElementById("resultHistory");
  list.innerHTML = "";
  history.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.time} → ${item.result}`;
    list.appendChild(li);
  });
}
renderHistory();

// --- Auto Generate Result हर 10 सेकंड में ---
setInterval(showRandomNumbers, 10000);
showRandomNumbers();
