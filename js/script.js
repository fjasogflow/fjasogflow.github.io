const vacationDate = new Date("2026-07-02T15:30:00");
const flightDate = new Date("2026-07-07T15:00:00");

function daysLeft(target) {
  const today = new Date();

  const start = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  const end = new Date(
    target.getFullYear(),
    target.getMonth(),
    target.getDate()
  );

  const msPerDay = 1000 * 60 * 60 * 24;
  return Math.max(0, Math.round((end - start) / msPerDay));
}

document.getElementById("vacationText").textContent =
  `${daysLeft(vacationDate)} dager igjen til sommerferie`;

document.getElementById("flightText").textContent =
  `${daysLeft(flightDate)} dager igjen til flyet går`;
