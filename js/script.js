const targetDate = new Date("2025-07-04T15:30:00");

function updateCountdown() {
  const now = new Date();
  const timeDiff = targetDate - now;

  if (timeDiff <= 0) {
    document.getElementById("countdown").textContent = "Sommerferien er her! 🌞";
    document.getElementById("workdays").textContent = "";
    return;
  }

  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);
  const seconds = Math.floor((timeDiff / 1000) % 60);

  document.getElementById("countdown").textContent =
    `${days} dager, ${hours} timer, ${minutes} minutter, ${seconds} sekunder`;

  document.getElementById("workdays").textContent =
    `Arbeidsdager igjen: ${getWorkdaysLeft(now, targetDate)}`;
}

function countWorkingDays(startDate, endDate) {
  let workdays = 0;
  let current = new Date(startDate);
  current.setHours(0, 0, 0, 0);

  while (current <= endDate) {
    const day = current.getDay();
    if (day !== 0 && day !== 6) {
      workdays++;
    }
    current.setDate(current.getDate() + 1);
  }

  return workdays;
}

function getWorkdaysLeft(now, endDate) {
  const cutoffHour = 15;
  const cutoffMin = 30;

  let startDate = new Date(now);

  if (
    now.getHours() > cutoffHour ||
    (now.getHours() === cutoffHour && now.getMinutes() >= cutoffMin)
  ) {
    startDate.setDate(startDate.getDate() + 1);
  }

  startDate.setHours(0, 0, 0, 0);

  return countWorkingDays(startDate, endDate);
}

updateCountdown();
setInterval(updateCountdown, 1000);

function highlightToday() {
  const today = new Date().getDay(); // 1=man, ..., 5=fre
  const days = document.querySelectorAll('.day');

  days.forEach(dayEl => {
    if (parseInt(dayEl.dataset.day) === today) {
      dayEl.classList.add('active');
    } else {
      dayEl.classList.remove('active');
    }
  });
}

highlightToday();

function updateWorkdayProgress() {
  const startHour = 8;
  const endHour = 15;
  const endMin = 30;

  const now = new Date();

  // Sett start og slutt tidspunkt for arbeidsdag
  const startTime = new Date(now);
  startTime.setHours(startHour, 0, 0, 0);

  const endTime = new Date(now);
  endTime.setHours(endHour, endMin, 0, 0);

  let progressPercent = 0;

  if (now < startTime) {
    progressPercent = 0;
  } else if (now > endTime) {
    progressPercent = 100;
  } else {
    const elapsed = now - startTime;
    const total = endTime - startTime;
    progressPercent = (elapsed / total) * 100;
  }

  const circle = document.getElementById("progress-circle");
  const radius = circle.r.baseVal.value;
  const circumference = 2 * Math.PI * radius;

  // Juster stroke dashoffset for å fylle sirkelen
  const offset = circumference - (progressPercent / 100) * circumference;
  circle.style.strokeDashoffset = offset;

  // Oppdater prosenttekst
  document.getElementById("progress-text").textContent = `${Math.floor(progressPercent)}%`;
}

// Kjør oppdatering hvert sekund
updateWorkdayProgress();
setInterval(updateWorkdayProgress, 1000);
