const months = document.querySelectorAll(".calendar__monthContainer");

const englishMonthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const currentDay = new Date();
const day = new Date();
// currentDay.setDate(73); // For testing
// day.setDate(73); // For testing
day.setDate(1);
const isDayFirstOfMonth = () => day.getDate() === 1;
const isDayWeekend = () => day.getDay() === 0 || day.getDay() === 6;
const isDayCurrentDay = () => currentDay.valueOf() === day.valueOf();
const incrementDay = () => day.setDate(day.getDate() + 1);

months.forEach((month) => {
  const fragment = document.createDocumentFragment();
  const monthIndex = day.getMonth();

  const h1 = document.createElement("h1");
  h1.textContent = englishMonthNames[monthIndex];
  h1.classList.add("calendar__monthLabel");
  fragment.appendChild(h1);

  const ol = document.createElement("ol");
  ol.classList.add("calendar__daysContainer");
  fragment.appendChild(ol);

  const fragmentDays = document.createDocumentFragment();
  while (day.getMonth() === monthIndex) {
    const li = document.createElement("li");
    li.classList.add("calendar__day");
    if (isDayFirstOfMonth()) {
      li.setAttribute("style", `grid-column-start: ${day.getDay() + 1};`);
    }
    if (isDayWeekend()) {
      li.classList.add("calendar__day--weekend");
    }
    if (isDayCurrentDay()) {
      li.classList.add("calendar__day--active");
    }
    li.textContent = day.getDate();
    fragmentDays.appendChild(li);
    incrementDay();
  }
  fragment.querySelector("ol").appendChild(fragmentDays);

  month.appendChild(fragment);
});