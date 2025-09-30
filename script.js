// ======= Generate Numbers =======
function generateNumbers(containerId, digit) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = '';

  let max = digit === 2 ? 99 : 999;

  for (let cycle = 0; cycle < 10; cycle++) {
    for (let i = 0; i <= max; i++) {
      const div = document.createElement('div');
      div.className = 'number-item';
      div.textContent = i.toString().padStart(digit, '0');
      container.appendChild(div);
    }
  }
}

// ======= Scroll Animation =======
function startScroll(containerId, duration) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.style.transition = `transform ${duration}s linear`;
  container.style.transform = `translateY(-${container.scrollHeight / 10}px)`; // scroll one cycle
}

// ======= Stop & Highlight =======
function stopScroll(containerId, fixedNumber, digit) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.style.transition = 'transform 0.5s ease-out';
  const height = 80; // approximate item height
  const position = fixedNumber * height;
  container.style.transform = `translateY(-${position}px)`;

  // Highlight the stopped number
  const items = container.getElementsByClassName('number-item');
  for (let item of items) item.classList.remove('highlight');
  if (items[fixedNumber]) items[fixedNumber].classList.add('highlight');

  // Save in history
  const now = new Date();
  const resultList = document.getElementById('resultHistory');
  if (resultList) {
    const li = document.createElement('li');
    li.textContent = `${now.toLocaleTimeString('hi-IN', { hour12: false })} - ${digit}-Digit: ${fixedNumber.toString().padStart(digit, '0')}`;
    resultList.prepend(li);
  }
}

// ======= Initialize =======
window.addEventListener('load', () => {
  generateNumbers('scroll-2digit', 2);
  generateNumbers('scroll-3digit', 3);

  // Auto-scroll example
  startScroll('scroll-2digit', 10);
  startScroll('scroll-3digit', 15);

  // Stop after some seconds
  setTimeout(() => {
    stopScroll('scroll-2digit', Math.floor(Math.random() * 100), 2);
  }, 12000);

  setTimeout(() => {
    stopScroll('scroll-3digit', Math.floor(Math.random() * 1000), 3);
  }, 18000);
});
