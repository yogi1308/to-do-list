//need to find a way so that calenderDay also has a year class and need to figure out if i want to make the users view tasks in the next or the previous month how should i go about it
//see if i can make displayMonth() function more efficient and less code

import {format, parseISO, add, startOfWeek, isSameDay, getDaysInMonth, startOfMonth, getMonth, addMonths, subMonths} from 'date-fns'
import { dateAndTask, tasksData } from './tasks-data';

export { displayMonthTasks }

const currentDate = new Date();

function displayMonthTasks() {
    // First, display the calendar grid
    displayMonth();

    tasksData.forEach((task) => {
        // Split the date string
        let [year, taskMonth, taskDate] = task.date.split("-"); // Split by space
        taskMonth = determineMonth(taskMonth)
        taskDate = determineDate(taskDate)
        if (taskMonth == format(currentDate, 'MMMM') || taskMonth == format(subMonths(currentDate, 1), 'MMMM') || taskMonth == format(addMonths(currentDate, 1), 'MMMM')) {
            const calendarCell = document.querySelector(`.${taskMonth}-${taskDate}`);
            // If the div exists, assign the task text to it
            if (calendarCell) {
                const calendarTextContent = calendarCell.querySelector('.calender-text-content');
                const monthTask = document.createElement('p')
                monthTask.textContent = task.task
                calendarTextContent.appendChild(monthTask)
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

function displayMonth() { //displays the calender grid
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
    document.querySelector('.task-list').appendChild(header);

    const daysInMonth = getDaysInMonth(currentDate); // Number of days in the current month
    const startDayOfMonth = startOfMonth(currentDate); // Start date of the month
    const startDayIndex = startDayOfMonth.getDay(); // Day of the week the month starts on (0 = Sun, 1 = Mon, etc.)

    // Calculate the number of rows needed (each row has 7 days)
    const totalDaysIncludingPadding = startDayIndex + daysInMonth;
    const numberOfRows = Math.ceil(totalDaysIncludingPadding / 7); // Round up to ensure all days fit

    let currentDay = 1; // Start with the 1st day of the month

    // Get the previous month's last day to fill the empty spaces before the 1st
    const prevMonthEnd = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0); 
    const prevMonthDays = prevMonthEnd.getDate(); // Number of days in the previous month

    // Loop through each row in the calendar grid
    for (let row = 0; row < numberOfRows; ++row) {
        for (let i = 0; i < 7; ++i) {
            const calenderDay = document.createElement('div');
            calenderDay.classList.add('calender-day');
            
            // Fill in empty days with previous month's or next month's dates
            if (row === 0 && i < startDayIndex) { // First row and before the start of the month
                const calenderDate = document.createElement('div');
                const calenderTextContent = document.createElement('div')
                calenderTextContent.classList.add('calender-text-content')
                calenderTextContent.style.height = '100%'
                calenderDate.classList.add('calender-date');
                calenderDate.textContent = prevMonthDays - startDayIndex + i + 1; // Get the last days of previous month
                calenderDate.style.color = '#4a547d';
                calenderDay.classList.add(`${format(subMonths(currentDate, 1), 'MMMM')}-${prevMonthDays - startDayIndex + i + 1}`)
                calenderDay.appendChild(calenderDate);
                calenderDay.appendChild(calenderTextContent)
            } else if (currentDay <= daysInMonth) { // Current month days
                const calenderDate = document.createElement('div');
                const calenderTextContent = document.createElement('div')
                calenderTextContent.classList.add('calender-text-content')
                calenderDate.classList.add('calender-date');
                calenderDay.classList.add(`${format(currentDate, 'MMMM')}-${currentDay}`)
                calenderDate.textContent = currentDay; // Set the current month's date
                calenderDay.appendChild(calenderDate);
                calenderDay.appendChild(calenderTextContent)
                currentDay++; // Increment the day
            } else { // Next month days (after the last day of the current month)
                const calenderDate = document.createElement('div');
                const calenderTextContent = document.createElement('div')
                calenderTextContent.classList.add('calender-text-content')
                calenderDate.classList.add('calender-date');
                calenderTextContent.style.height = '100%'
                calenderDate.textContent = currentDay - daysInMonth; // Get the first days of next month
                calenderDay.classList.add(`${format(addMonths(currentDate, 1), 'MMMM')}-${currentDay - daysInMonth}`)
                calenderDate.style.color = '#4a547d';
                calenderDay.appendChild(calenderDate);
                calenderDay.appendChild(calenderTextContent)
                currentDay++; // Increment for next month
            }
            calenderGrid.appendChild(calenderDay);
        }
    }

    document.querySelector('.task-list').appendChild(calenderGrid);
}