//see if i can make displayMonth() function more efficient and less code

import {format, parseISO, add, startOfWeek, isSameDay, getDaysInMonth, startOfMonth, getMonth, addMonths, subMonths, addDays} from 'date-fns'
import { dateAndTask, tasksData } from './tasks-data';
import { changeHeader } from './sidebar';
import {isTaskScheduledForDate} from './my-day.js'

import arrowForwards from './images/forward-arrow-minimalistic.svg'
import arrowBack from './images/back-arrow-minimalistic.svg'
import monthCalender from './images/month-calender.svg'
import calenderLayout from './images/calender-layout.svg'

export { displayMonthTasks, setPlusMinusMonthsToZero }

// Global variables
let plusMinusMonths = 0;
let compactLayout = false;

// Resets the month offset
function setPlusMinusMonthsToZero() {
  plusMinusMonths = 0;
}

// displayMonthTasks: builds the grid and then assigns tasks to every cell where they repeat.
function displayMonthTasks(currentDate) {
  // Build the calendar grid (each day gets a data-date attribute)
  displayMonth(currentDate);
  
  // Get all calendar cells with a data-date attribute
  const calendarCells = document.querySelectorAll('.calender-day[data-date]');
  
  // For each task in tasksData, loop over every cell and check if it should appear there.
  tasksData.forEach(task => {
    if (task.date !== undefined) {
      calendarCells.forEach(cell => {
        const cellDate = parseISO(cell.getAttribute('data-date'));
        if (isTaskScheduledForDate(task, cellDate)) {
          const calendarTextContent = cell.querySelector('.calender-text-content');
          const monthTask = document.createElement('p');
          monthTask.textContent = task.task;
          calendarTextContent.appendChild(monthTask);
        }
      });
    }
  });
}

// Helper: Remove any leading zero from a day string (e.g., "01" becomes "1")
function determineDate(taskDate) {
  switch (taskDate) {
    case '01': return '1';
    case '02': return '2';
    case '03': return '3';
    case '04': return '4';
    case '05': return '5';
    case '06': return '6';
    case '07': return '7';
    case '08': return '8';
    case '09': return '9';
    default: return taskDate;
  }
}

// Helper: Convert a numeric month (as string) to a full month name
function determineMonth(taskMonth) {
  if (taskMonth.length === 1) {
    taskMonth = '0' + taskMonth;
  }
  switch (taskMonth) {
    case '01': return 'January';
    case '02': return 'February';
    case '03': return 'March';
    case '04': return 'April';
    case '05': return 'May';
    case '06': return 'June';
    case '07': return 'July';
    case '08': return 'August';
    case '09': return 'September';
    case '10': return 'October';
    case '11': return 'November';
    case '12': return 'December';
    default: return '';
  }
}

// displayMonth: builds the calendar grid and assigns a data-date attribute to each cell.
function displayMonth(currentDate) {
  const taskList = document.querySelector('.task-list');
  taskList.innerHTML = '';

  // Create and append the header with day names.
  const calenderGrid = document.createElement('div');
  calenderGrid.classList.add('calender-grid');
  const header = document.createElement('div');
  header.classList.add('calender-header');
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  days.forEach(day => {
    const dayHeader = document.createElement('div');
    dayHeader.textContent = day;
    header.appendChild(dayHeader);
  });
  taskList.appendChild(header);

  // Calculate month details.
  const daysInMonth = getDaysInMonth(currentDate);
  const startDayOfMonth = startOfMonth(currentDate);
  const startDayIndex = startDayOfMonth.getDay();
  const totalDaysIncludingPadding = startDayIndex + daysInMonth;
  const numberOfRows = Math.ceil(totalDaysIncludingPadding / 7);
  let currentDay = 1;

  // Get previous month days.
  const prevMonthEnd = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
  const prevMonthDays = prevMonthEnd.getDate();

  // Build the grid rows.
  for (let row = 0; row < numberOfRows; ++row) {
    for (let i = 0; i < 7; ++i) {
      const calenderDay = document.createElement('div');
      calenderDay.classList.add('calender-day');
      let cellDate; // This will hold the Date object for the cell.

      // Case 1: Days from the previous month (first row only)
      if (row === 0 && i < startDayIndex) {
        const prevDate = prevMonthDays - startDayIndex + i + 1;
        cellDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, prevDate);
        calenderDay.classList.add('notInCurrMonth');
        const calenderDate = document.createElement('div');
        calenderDate.textContent = prevDate;
        calenderDate.style.color = '#4a547d';
        calenderDate.classList.add('calender-date');
        const calenderTextContent = document.createElement('div');
        calenderTextContent.classList.add('calender-text-content');
        calenderTextContent.style.height = '100%';
        calenderDay.appendChild(calenderDate);
        calenderDay.appendChild(calenderTextContent);
      }
      // Case 2: Days in the current month
      else if (currentDay <= daysInMonth) {
        cellDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDay);
        const calenderDate = document.createElement('div');
        calenderDate.textContent = currentDay;
        calenderDate.classList.add('calender-date');
        const calenderTextContent = document.createElement('div');
        calenderTextContent.classList.add('calender-text-content');
        calenderDay.appendChild(calenderDate);
        calenderDay.appendChild(calenderTextContent);
        currentDay++;
      }
      // Case 3: Days from the next month (after current month ends)
      else {
        const nextDate = currentDay - daysInMonth;
        cellDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, nextDate);
        calenderDay.classList.add('notInCurrMonth');
        const calenderDate = document.createElement('div');
        calenderDate.textContent = nextDate;
        calenderDate.style.color = '#4a547d';
        calenderDate.classList.add('calender-date');
        const calenderTextContent = document.createElement('div');
        calenderTextContent.classList.add('calender-text-content');
        calenderTextContent.style.height = '100%';
        calenderDay.appendChild(calenderDate);
        calenderDay.appendChild(calenderTextContent);
        currentDay++;
      }
      
      // Set a data-date attribute so we can later check for repeated tasks.
      calenderDay.setAttribute('data-date', cellDate.toISOString());
      // Optionally add a class (with a prefix) for debugging or additional styling.
      const formattedCell = format(cellDate, 'MMMM-yyyy-d');
      calenderDay.classList.add(`date-${formattedCell}`);
      
      calenderGrid.appendChild(calenderDay);
    }
  }

  taskList.appendChild(calenderGrid);
  addArrows();
  if (compactLayout) {
    document.querySelector('.calender-grid').classList.add('compact-layout');
  }
}

function addArrows() {
  const header = document.querySelector('.header');
  const existingArrows = header.querySelectorAll('.forward-arrow, .backward-arrow');
  existingArrows.forEach(arrow => arrow.remove());

  const arrowUp = document.createElement('img');
  arrowUp.classList.add('forward-arrow');
  arrowUp.src = arrowForwards; // Assumed defined elsewhere.
  arrowUp.addEventListener('click', nextMonthClicked);
  header.appendChild(arrowUp);

  const arrowDown = document.createElement('img');
  arrowDown.src = arrowBack; // Assumed defined elsewhere.
  arrowDown.classList.add('backward-arrow');
  arrowDown.addEventListener('click', nextMonthClicked);
  header.appendChild(arrowDown);

  const layout = document.createElement('img');
  layout.src = calenderLayout; // Assumed defined elsewhere.
  layout.classList.add('calender-layout');
  layout.addEventListener('click', changeCalenderLayout);
  header.appendChild(layout);
}

function nextMonthClicked(event) {
  if (event.target.closest('.forward-arrow')) {
    plusMinusMonths++;
  } else if (event.target.closest('.backward-arrow')) {
    plusMinusMonths--;
  }
  const nextMonth = addMonths(new Date(), plusMinusMonths);
  const currentYear = format(new Date(), 'yyyy');
  const targetYear = format(nextMonth, 'yyyy');
  document.querySelector('.task-list').textContent = '';
  if (currentYear !== targetYear) {
    changeHeader(format(nextMonth, 'MMMM yyyy') + '\'s Task List', monthCalender);
  } else if (plusMinusMonths !== 0 && plusMinusMonths !== 1 && plusMinusMonths !== -1) {
    changeHeader(format(nextMonth, 'MMMM') + '\'s Task List', monthCalender);
  } else if (plusMinusMonths === 0) {
    changeHeader('This Month', monthCalender);
  } else if (plusMinusMonths === 1) {
    changeHeader('Next Month', monthCalender);
  } else if (plusMinusMonths === -1) {
    changeHeader('Previous Month', monthCalender);
  }
  displayMonthTasks(nextMonth);
}

function changeCalenderLayout() {
  const calendarGrid = document.querySelector('.calender-grid');
  if (compactLayout) {
    calendarGrid.classList.remove('compact-layout');
    compactLayout = false;
  } else {
    calendarGrid.classList.add('compact-layout');
    compactLayout = true;
  }
}