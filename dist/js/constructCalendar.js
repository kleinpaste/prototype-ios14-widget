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

// Set the calendar containers min-height if the calendar is being rendered at one of the five widget viewport widths. This is to fix (hack) vertical alignment because the widget is getting rendered in a viewport with a larger height then the widgets height.

const calendarContainer = document.querySelector(".calendar");
const mediumWidgetSizes = [
  { width: 360, height: 169 },
  { width: 329, height: 155 },
  { width: 348, height: 159 },
  { width: 322, height: 148 },
  { width: 291, height: 141 },
];
const viewportWidth = Math.max(
  document.documentElement.clientWidth || 0,
  window.innerWidth || 0
);
const isViewportWidgetWidth = () =>
  mediumWidgetSizes.some((element) => element.width === viewportWidth);

if (isViewportWidgetWidth()) {
  const widgetSize = mediumWidgetSizes.find(
    (element) => element.width === viewportWidth
  );
  calendarContainer.setAttribute("style", `min-height: ${widgetSize.height}px`);
} else {
  window.onresize = function () {
    calendarContainer.setAttribute(
      "style",
      `min-height: ${window.innerHeight}px`
    );
  };
  window.onresize();
}
