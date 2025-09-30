let schedules = []; // store schedule objects

const setBtn = document.getElementById('setSchedule');
const scheduleList = document.getElementById('scheduleList');

setBtn.addEventListener('click', () => {
  const digit = parseInt(document.getElementById('adminDigit').value);
  const startTime = document.getElementById('startTime').value;
  const stopTime = document.getElementById('stopTime').value;

  if(!startTime || !stopTime) {
    alert("Start और Stop Time दोनों डालें!");
    return;
  }

  const schedule = { digit, startTime, stopTime };
  schedules.push(schedule);
  updateScheduleList();
  alert("Schedule Set हो गया!");
});

function updateScheduleList() {
  scheduleList.innerHTML = '';
  schedules.forEach((sch, index) => {
    const li = document.createElement('li');
    li.textContent = `${index+1}. ${sch.digit}D - Start: ${sch.startTime}, Stop: ${sch.stopTime}`;
    scheduleList.appendChild(li);
  });
}
