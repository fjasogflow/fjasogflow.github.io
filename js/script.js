// datoer
const vacationDate = new Date("2026-07-03T15:30:00");
const flightDate = new Date("2026-07-07T15:00:00");

// funksjon som regner dager
function daysLeft(target){

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

    return Math.max(
        0,
        Math.round((end - start) / msPerDay)
    );
}

// sett tallene
document.getElementById("vacationDays").textContent =
    daysLeft(vacationDate);

document.getElementById("flightDays").textContent =
    daysLeft(flightDate);
