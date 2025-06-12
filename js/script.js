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

