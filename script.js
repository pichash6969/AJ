// ======= Generate Numbers =======
function generateNumbers(containerId, maxNumber, digit) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';

  // Repeat numbers multiple times for scrolling effect
  for (let cycle = 0; cycle < 10; cycle++) {
    for (let i = 0; i <= maxNumber; i++) {
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
  container.style.transition = `transform ${duration}s linear`;
  container.style.transform = `translateY(-${container.scrollHeight / 10}px)`; // scroll one cycle
}

// ======= Stop & Highlight =======
function stopScroll(containerId, finalNumber, digit) {
  const container = document.getElementById(containerId);
  container.style.transition = 'transform 0.5s ease-out';
  const itemHeight = container.querySelector('.number-item').offsetHeight || 80;
  const position = finalNumber * itemHeight;
  container.style.transform = `translateY(-${position}px)`;

  // Highlight the stopped number
  const items = container.getElementsByClassName('number-item');
  for (let item of items) item.classList.remove('highlight');
  if (items[finalNumber]) items[finalNumber].classList.add('highlight');

  // Add to history
  const now = new Date();
  const resultList = document.getElementById('resultHistory');
  const li = document.createElement('li');
  li.textContent = `${now.toLocaleTimeString([], { hour12: false })} - ${digit}-Digit: ${finalNumber.toString().padStart(digit, '0')}`;
  resultList.prepend(li);
}

// ======= Initialize Lottery =======
window.addEventListener('load', () => {

  // Generate numbers
  generateNumbers('scroll-1digit', 9, 1);   // 1D
  generateNumbers('scroll-2digit', 99, 2);  // 2D
  generateNumbers('scroll-3digit', 999, 3); // 3D

  // Auto-scroll example
  startScroll('scroll-1digit', 8);  // 1D scroll
  startScroll('scroll-2digit', 12); // 2D scroll
  startScroll('scroll-3digit', 15); // 3D scroll

  // Stop numbers after some delay (example)
  setTimeout(() => {
    stopScroll('scroll-1digit', Math.floor(Math.random() * 10), 1);
  }, 9000);

  setTimeout(() => {
    stopScroll('scroll-2digit', Math.floor(Math.random() * 100), 2);
  }, 13000);

  setTimeout(() => {
    stopScroll('scroll-3digit', Math.floor(Math.random() * 1000), 3);
  }, 18000);

});
