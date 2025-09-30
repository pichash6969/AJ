// User Balance
let userBalance = 1000;

function changeBalance(amount) {
  userBalance += amount;
  document.getElementById('userBalance').textContent = userBalance;
}

// Clock
function updateClock() {
  const clock = document.getElementById('clock');
  const now = new Date();
  clock.textContent = now.toLocaleTimeString('hi-IN', { hour12:false });
}
setInterval(updateClock, 1000);
updateClock();

// Generate numbers
function generateNumbers(containerId, maxNumber, digit) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';
  for(let cycle=0; cycle<10; cycle++){
    for(let i=0;i<=maxNumber;i++){
      const div = document.createElement('div');
      div.className='number-item';
      div.textContent=i.toString().padStart(digit,'0');
      container.appendChild(div);
    }
  }
}

// Scroll
function startScroll(containerId, duration){
  const container = document.getElementById(containerId);
  container.style.transition = `transform ${duration}s linear`;
  container.style.transform = `translateY(-${container.scrollHeight/10}px)`;
}

// Stop & highlight
function stopScroll(containerId, finalNumber, digit){
  const container = document.getElementById(containerId);
  container.style.transition = 'transform 0.5s ease-out';
  const itemHeight = container.querySelector('.number-item').offsetHeight || 80;
  const position = finalNumber * itemHeight;
  container.style.transform = `translateY(-${position}px)`;

  const items = container.getElementsByClassName('number-item');
  for(let item of items) item.classList.remove('highlight');
  if(items[finalNumber]) items[finalNumber].classList.add('highlight');

  // History
  const now = new Date();
  const li = document.createElement('li');
  li.textContent=`${now.toLocaleTimeString([],{hour12:false})} - ${digit}-Digit: ${finalNumber.toString().padStart(digit,'0')}`;
  document.getElementById('resultHistory').prepend(li);

  return finalNumber;
}

// Schedules (fetched from admin, example)
let schedules = [
  // {digit:1, startTime:"00:00:05", stopTime:"00:00:10"} Example
];

// Auto check every second
setInterval(()=>{
  const now = new Date();
  const hhmmss = now.toTimeString().slice(0,8);
  schedules.forEach(sch=>{
    const containerId = sch.digit===1?'scroll-1digit':sch.digit===2?'scroll-2digit':'scroll-3digit';
    const maxNumber = sch.digit===1?9:sch.digit===2?99:999;

    if(hhmmss===sch.startTime){
      generateNumbers(containerId,maxNumber,sch.digit);
      startScroll(containerId,5);
      console.log(`${sch.digit}D Lottery Started at ${hhmmss}`);
    }

    if(hhmmss===sch.stopTime){
      const result = stopScroll(containerId,Math.floor(Math.random()*(maxNumber+1)),sch.digit);
      console.log(`${sch.digit}D Lottery Stopped at ${hhmmss} Result:${result}`);
    }
  });
},1000);
