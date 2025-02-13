//see if i can make displayMonth() function more efficient and less code

import {format, parseISO, add, startOfWeek, isSameDay, getDaysInMonth, startOfMonth, getMonth, addMonths, subMonths, addDays} from 'date-fns'
import { dateAndTask, tasksData } from './tasks-data';
import { changeHeader } from './sidebar';

import arrowForwards from './images/forward-arrow-minimalistic.svg'
import arrowBack from './images/back-arrow-minimalistic.svg'
import monthCalender from './images/month-calender.svg'
import calenderLayout from './images/calender-layout.svg'

export { displayMonthTasks, setPlusMinusMonthsToZero }

let plusMinusMonths = 0;
let compactLayout = false

function setPlusMinusMonthsToZero() {
    plusMinusMonths = 0;
}

function displayMonthTasks(currentDate) {
    // First, display the calendar grid
    displayMonth(currentDate);

    tasksData.forEach((task) => {
        // Split the date string
        let year, taskMonth, taskDate;
        if (task.date != undefined) {
            if (task.date) {[year, taskMonth, taskDate] = task.date.trim().split("-");} // Split by space
            taskMonth = determineMonth(taskMonth)
            taskDate = determineDate(taskDate)
            if (taskMonth == format(currentDate, 'MMMM') || taskMonth == format(subMonths(currentDate, 1), 'MMMM') || taskMonth == format(addMonths(currentDate, 1), 'MMMM')) {
                const calendarCell = document.querySelector(`.${taskMonth}-${year}-${taskDate}`);
                // If the div exists, assign the task text to it
                if (calendarCell) {
                    const calendarTextContent = calendarCell.querySelector('.calender-text-content');
                    const monthTask = document.createElement('p')
                    monthTask.textContent = task.task
                    calendarTextContent.appendChild(monthTask)
                }
            }   
        }
    });

}

function determineDate(taskDate) {
    switch (taskDate) {
        case '01': return '1'
        case '02': return '2'
        case '03': return '3'
        case '04': return '4'
        case '05': return '5'
        case '06': return '6'
        case '07': return '7'
        case '08': return '8'
        case '09': return '9'
        default: return taskDate
    }
}

function determineMonth(taskMonth) {
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

function displayMonth(currentDate) { // displays the calendar grid
    // Get the container and clear any previous content.
    const taskList = document.querySelector('.task-list');
    taskList.innerHTML = '';

    // Create and append the header.
    const calenderGrid = document.createElement('div');
    calenderGrid.classList.add('calender-grid');
    const header = document.createElement('div');
    header.classList.add('calender-header');
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    days.forEach(day => {
        const calenderDay = document.createElement('div');
        calenderDay.textContent = day;
        header.appendChild(calenderDay);
    });
    taskList.appendChild(header);

    // Calculate month-related values.
    const daysInMonth = getDaysInMonth(currentDate); // e.g., from date-fns
    const startDayOfMonth = startOfMonth(currentDate); // Date representing the 1st of current month
    const startDayIndex = startDayOfMonth.getDay(); // Day of the week the month starts on (0 = Sun, 1 = Mon, etc.)

    // Calculate number of rows needed (each row has 7 days)
    const totalDaysIncludingPadding = startDayIndex + daysInMonth;
    const numberOfRows = Math.ceil(totalDaysIncludingPadding / 7);

    let currentDay = 1; // day counter for the current month

    // Get the last day of the previous month.
    const prevMonthEnd = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
    const prevMonthDays = prevMonthEnd.getDate();

    // Build the calendar grid rows.
    for (let row = 0; row < numberOfRows; ++row) {
        for (let i = 0; i < 7; ++i) {
            const calenderDay = document.createElement('div');
            calenderDay.classList.add('calender-day');

            // Case 1: Days from the previous month (first row only)
            if (row === 0 && i < startDayIndex) {
                const calenderDate = document.createElement('div');
                const calenderTextContent = document.createElement('div');
                calenderTextContent.classList.add('calender-text-content');
                calenderTextContent.style.height = '100%';
                calenderDate.classList.add('calender-date');
                calenderDay.classList.add('notInCurrMonth');
                const prevDate = prevMonthDays - startDayIndex + i + 1;
                calenderDate.textContent = prevDate;
                calenderDate.style.color = '#4a547d';
                calenderDay.classList.add(`${format(subMonths(currentDate, 1), 'MMMM-yyyy')}-${prevDate}`);
                calenderDay.appendChild(calenderDate);
                calenderDay.appendChild(calenderTextContent);
            }
            // Case 2: Days in the current month
            else if (currentDay <= daysInMonth) {
                const calenderDate = document.createElement('div');
                const calenderTextContent = document.createElement('div');
                calenderTextContent.classList.add('calender-text-content');
                calenderDate.classList.add('calender-date');
                calenderDay.classList.add(`${format(currentDate, 'MMMM-yyyy')}-${currentDay}`);
                calenderDate.textContent = currentDay;
                calenderDay.appendChild(calenderDate);
                calenderDay.appendChild(calenderTextContent);
                currentDay++; // move to next day
            }
            // Case 3: Days from the next month (after current month ends)
            else {
                const calenderDate = document.createElement('div');
                const calenderTextContent = document.createElement('div');
                calenderTextContent.classList.add('calender-text-content');
                calenderDate.classList.add('calender-date');
                calenderDay.classList.add('notInCurrMonth');
                calenderTextContent.style.height = '100%';
                const nextDate = currentDay - daysInMonth; // next month day number
                calenderDate.textContent = nextDate;
                calenderDate.style.color = '#4a547d';
                calenderDay.classList.add(`${format(addMonths(currentDate, 1), 'MMMM-yyyy')}-${nextDate}`);
                calenderDay.appendChild(calenderDate);
                calenderDay.appendChild(calenderTextContent);
                currentDay++;
            }
            calenderGrid.appendChild(calenderDay);
        }
    }

    taskList.appendChild(calenderGrid);
    addArrows();
    if (compactLayout) {document.querySelector('.calender-grid').classList.add('compact-layout');}
}



function addArrows() {
    const taskList = document.querySelector('.header')
    const existingArrows = taskList.querySelectorAll('.forward-arrow, .backward-arrow');
    existingArrows.forEach(arrow => arrow.remove());

    const arrowUp = document.createElement('img')
    arrowUp.classList.add('forward-arrow')
    arrowUp.src = arrowForwards
    arrowUp.addEventListener('click', nextMonthClicked)
    taskList.appendChild(arrowUp)
    const arrowDown = document.createElement('img')
    arrowDown.src = arrowBack;
    arrowDown.classList.add('backward-arrow')
    arrowDown.addEventListener('click', nextMonthClicked)
    taskList.appendChild(arrowDown)

    const layout = document.createElement('img')
    layout.src = calenderLayout;
    layout.classList.add('calender-layout')
    layout.addEventListener('click', changeCalenderLayout)
    taskList.appendChild(layout)

}

function nextMonthClicked() {
    if (event.target.closest('.forward-arrow')) {plusMinusMonths++;} 
    else if (event.target.closest('.backward-arrow')) {plusMinusMonths--;}
    const nextMonth = addMonths(new Date(), plusMinusMonths);
    const currentYear = format(new Date(), 'yyyy');
    const targetYear = format(nextMonth, 'yyyy');
    document.querySelector('.task-list').textContent = ''; 
    if (currentYear !== targetYear) {changeHeader(format(nextMonth, 'MMMM yyyy') + '\'s Task List', monthCalender);}
    else if ( plusMinusMonths != 0 && plusMinusMonths != 1 && plusMinusMonths != -1) {changeHeader(format(nextMonth, 'MMMM') + '\'s Task List', monthCalender);}
    else if (plusMinusMonths === 0) {changeHeader('This Month', monthCalender);} 
    else if (plusMinusMonths === 1) {changeHeader('Next Month', monthCalender);} 
    else if (plusMinusMonths === -1) {changeHeader('Previous Month', monthCalender);}
    displayMonthTasks(nextMonth);
}

function changeCalenderLayout() {
    if (compactLayout) {document.querySelector('.calender-grid').classList.remove('compact-layout'); compactLayout = false}
    else {document.querySelector('.calender-grid').classList.add('compact-layout'); compactLayout = true}
}