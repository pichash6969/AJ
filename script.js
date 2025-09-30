// ======= Clock =======
function updateClock() {
  const clock = document.getElementById("clock");
  const now = new Date();
  const timeString = now.toLocaleTimeString("hi-IN", { hour12: false });
  clock.textContent = timeString;
}
setInterval(updateClock, 1000);
updateClock();

// ======= Generate Numbers =======
function generateNumbers(containerId, digit) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";

  let max = Math.pow(10, digit) - 1; // max value (e.g. 9, 99, 999)

  // Repeat numbers multiple times for smooth scrolling effect
  for (let cycle = 0; cycle < 5; cycle++) {
    for (let i = 0; i <= max; i++) {
      const div = document.createElement("div");
      div.className = "number-item";
      div.textContent = i.toString().padStart(digit, "0");
      container.appendChild(div);
    }
  }
}

// ======= Scroll Animation =======
function startScroll(containerId, duration) {
  const container = document.getElementById(containerId);
  container.style.transition = `transform ${duration}s linear`;
  container.style.transform = `translateY(-${container.scrollHeight / 2}px)`; // scroll half cycle for effect
}

// ======= Stop & Highlight =======
function stopScroll(containerId, fixedNumber, digit) {
  const container = document.getElementById(containerId);
  container.style.transition = "transform 0.5s ease-out";

  // हर item की dynamic height निकालें
  const items = container.getElementsByClassName("number-item");
  if (items.length === 0) return;

  const itemHeight = items[0].offsetHeight; // auto detect height
  const position = fixedNumber * itemHeight;

  container.style.transform = `translateY(-${position}px)`;

  // Highlight current number
  for (let item of items) item.classList.remove("highlight");
  const index = fixedNumber % items.length;
  if (items[index]) items[index].classList.add("highlight");

  // Save in history (max 15 entries)
  const now = new Date();
  const resultList = document.getElementById("resultHistory");
  const li = document.createElement("li");
  li.textContent = `${now.toLocaleTimeString("hi-IN", { hour12: false })} → ${digit}-Digit: ${fixedNumber
    .toString()
    .padStart(digit, "0")}`;
  resultList.prepend(li);
  while (resultList.children.length > 15) {
    resultList.removeChild(resultList.lastChild);
  }
}

// ======= Initialize =======
window.addEventListener("load", () => {
  generateNumbers("scroll-1digit", 1);
  generateNumbers("scroll-2digit", 2);
  generateNumbers("scroll-3digit", 3);

  // Example auto-scroll
  startScroll("scroll-1digit", 6);
  startScroll("scroll-2digit", 10);
  startScroll("scroll-3digit", 14);

  // Stop automatically with random results
  setTimeout(() => {
    stopScroll("scroll-1digit", Math.floor(Math.random() * 10), 1);
  }, 7000);

  setTimeout(() => {
    stopScroll("scroll-2digit", Math.floor(Math.random() * 100), 2);
  }, 12000);

  setTimeout(() => {
    stopScroll("scroll-3digit", Math.floor(Math.random() * 1000), 3);
  }, 18000);
});
