let schedules = []; // Admin schedules store

const setBtn = document.getElementById('setSchedule');
const scheduleList = document.getElementById('scheduleList');

setBtn.addEventListener('click', () => {
  const digit = parseInt(document.getElementById('adminDigit').value);
  const startTime = document.getElementById('startTime').value;
  const stopTime = document.getElementById('stopTime').value;
  let winningNumber = parseInt(document.getElementById('winningNumber').value);

  if(!startTime || !stopTime || isNaN(winningNumber)) {
    alert("सभी fields भरें!");
    return;
  }

  // Max number check
  const maxNum = digit===1?9:digit===2?99:999;
  if(winningNumber<0 || winningNumber>maxNum) {
    alert(`Winning Number should be 0-${maxNum}`);
    return;
  }

  const schedule = { digit, startTime, stopTime, winningNumber };
  schedules.push(schedule);
  updateScheduleList();
  alert("Schedule Set हो गया!");
});

function updateScheduleList() {
  scheduleList.innerHTML = '';
  schedules.forEach((sch,index)=>{
    const li = document.createElement('li');
    li.textContent=`${index+1}. ${sch.digit}D - Start:${sch.startTime}, Stop:${sch.stopTime}, Winning:${sch.winningNumber}`;
    scheduleList.appendChild(li);
  });
}
