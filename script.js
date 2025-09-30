// Clock
function updateClock(){
  const clock=document.getElementById('clock');
  const now=new Date();
  clock.textContent=now.toLocaleTimeString('hi-IN',{hour12:false});
}
setInterval(updateClock,1000);
updateClock();

// Generate Numbers
function generateNumbers(containerId,maxNumber,digit){
  const container=document.getElementById(containerId);
  container.innerHTML='';
  for(let cycle=0;cycle<10;cycle++){
    for(let i=0;i<=maxNumber;i++){
      const div=document.createElement('div');
      div.className='number-item';
      div.textContent=i.toString().padStart(digit,'0');
      container.appendChild(div);
    }
  }
}

// Scroll
function startScroll(containerId,duration){
  const container=document.getElementById(containerId);
  container.style.transition=`transform ${duration}s linear`;
  container.style.transform=`translateY(-${container.scrollHeight/10}px)`;
}

// Stop & Highlight
function stopScroll(containerId,finalNumber,digit){
  const container=document.getElementById(containerId);
  container.style.transition='transform 0.5s ease-out';
  const itemHeight=container.querySelector('.number-item').offsetHeight || 80;
  container.style.transform=`translateY(-${finalNumber*itemHeight}px)`;

  const items=container.getElementsByClassName('number-item');
  for(let item of items) item.classList.remove('highlight');
  if(items[finalNumber]) items[finalNumber].classList.add('highlight');

  // Result History
  const now=new Date();
  const li=document.createElement('li');
  li.textContent=`${now.toLocaleTimeString([], {hour12:false})} - ${digit}D: ${finalNumber.toString().padStart(digit,'0')}`;
  document.getElementById('resultHistory').prepend(li);

  return finalNumber;
}

// Auto Lottery Controller
setInterval(()=>{
  const now=new Date();
  const hhmmss=now.toTimeString().slice(0,8);

  schedules.forEach(sch=>{
    const containerId = sch.digit===1?'scroll-1digit':sch.digit===2?'scroll-2digit':'scroll-3digit';
    const maxNum = sch.digit===1?9:sch.digit===2?99:999;

    // Start
    if(hhmmss===sch.startTime){
      generateNumbers(containerId,maxNum,sch.digit);
      startScroll(containerId,5);
      console.log(`${sch.digit}D Lottery Started at ${hhmmss}`);
    }

    // Stop
    if(hhmmss===sch.stopTime){
      stopScroll(containerId,sch.winningNumber,sch.digit);
      console.log(`${sch.digit}D Lottery Stopped at ${hhmmss} Winning:${sch.winningNumber}`);
    }
  });
},1000);
