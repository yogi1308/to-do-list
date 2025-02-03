import {parseISO, add, startOfWeek, isSameDay, getDaysInMonth, startOfMonth} from 'date-fns'
import { dateAndTask, tasksData } from './tasks-data';

export { displayMonthTasks }

function displayMonthTasks() {
    // First, display the calendar grid
    displayMonth();

    // Get the calendar grid container
    const calenderGrid = document.querySelector('.calender-grid');
    if (!calenderGrid) {
        console.error('Calendar grid not found.');
        return;
    }

    // Keep track of displayed tasks to prevent duplication
    const displayedTasks = new Set();

    // Iterate through tasks and map them to calendar days
    tasksData.forEach(task => {
        // Parse the task's date
        let taskDate = parseISO(task.date);

        // Get the first and last visible dates in the calendar grid
        const firstVisibleDate = getFirstVisibleDate();
        const lastVisibleDate = getLastVisibleDate();

        // Ensure the task's date is within the visible range
        if (taskDate >= firstVisibleDate && taskDate <= lastVisibleDate) {
            const taskDay = taskDate.getDate(); // Get the day of the month (1-31)

            // Construct a unique task key based on its date and content to avoid duplication
            const taskKey = `${task.date}-${task.task}`;
            if (displayedTasks.has(taskKey)) {
                return; // Skip if the task is already displayed
            }

            // Find the corresponding calendar day
            calenderGrid.childNodes.forEach(day => {
                const dayNumberElement = day.querySelector('.calender-date');

                // Check if this is the correct day
                if (dayNumberElement && parseInt(dayNumberElement.textContent) === taskDay) {
                    // Find the text content container
                    const textContentElement = day.querySelector('.calender-text-content');

                    if (textContentElement) {
                        // Append the task to the text content inside a styled <p> element
                        const taskElement = document.createElement('p');
                        taskElement.textContent = task.task;

                        // Style the task
                        taskElement.style.backgroundColor = 'lightgrey';
                        taskElement.style.margin = '2px 0';
                        taskElement.style.padding = '4px';
                        taskElement.style.borderRadius = '4px';

                        // If the task is in the previous or next month, make font color grey
                        if (taskDate < new Date().setDate(1) || taskDate > new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)) {
                            taskElement.style.color = 'grey';
                        } else {
                            taskElement.style.color = 'black';
                        }

                        textContentElement.appendChild(taskElement);

                        // Let the container's height adjust automatically to fit all tasks
                        textContentElement.style.height = 'auto';

                        // Mark this task as displayed
                        displayedTasks.add(taskKey);
                    }
                }
            });
        }
    });

    // Adjust row heights to match the tallest day
    adjustRowHeights();
}

/**
 * Adjusts the height of each calendar row to match the tallest calendar day in that row
 */
function adjustRowHeights() {
    const calendarGrid = document.querySelector('.calender-grid');
    if (!calendarGrid) return;

    const rows = [...calendarGrid.children].reduce((acc, day, index) => {
        const rowIndex = Math.floor(index / 7); // Assuming a 7-day week
        if (!acc[rowIndex]) acc[rowIndex] = [];
        acc[rowIndex].push(day);
        return acc;
    }, []);

    rows.forEach(row => {
        let tallestHeight = 0;

        // Find the tallest day in the row
        row.forEach(day => {
            const height = day.offsetHeight;
            if (height > tallestHeight) {
                tallestHeight = height;
            }
        });

        // Set all days in the row to the tallest height
        row.forEach(day => {
            day.style.height = `${tallestHeight}px`;
        });
    });
}

/**
 * Helper function to calculate the first visible date in the calendar grid
 */
function getFirstVisibleDate() {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const dayOfWeek = firstDayOfMonth.getDay();
    return new Date(firstDayOfMonth.setDate(firstDayOfMonth.getDate() - dayOfWeek));
}

/**
 * Helper function to calculate the last visible date in the calendar grid
 */
function getLastVisibleDate() {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
    const dayOfWeek = lastDayOfMonth.getDay();
    return new Date(lastDayOfMonth.setDate(lastDayOfMonth.getDate() + (6 - dayOfWeek)));
}



function displayMonth() {
    const monthTasks = sortTasksForMonthDates();
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

    const currentDate = new Date();
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
                calenderDay.classList.add('empty-day'); // Add lighter color class
                calenderDay.appendChild(calenderDate);
                calenderDay.appendChild(calenderTextContent)
            } else if (currentDay <= daysInMonth) { // Current month days
                const calenderDate = document.createElement('div');
                const calenderTextContent = document.createElement('div')
                calenderTextContent.classList.add('calender-text-content')
                calenderDate.classList.add('calender-date');
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
                calenderDay.classList.add('empty-day'); // Add lighter color class
                calenderDate.style.color = '#4a547d';
                calenderDay.appendChild(calenderDate);
                calenderDay.appendChild(calenderTextContent)
                currentDay++; // Increment for next month
            }
            calenderGrid.appendChild(calenderDay);
        }
    }

    calenderGrid.style.height = `calc(${numberOfRows} * calc(80vh/5))`;
    document.querySelector('.task-list').appendChild(calenderGrid);
    console.log(monthTasks);
}


function sortTasksForMonthDates() {
    const monthTasks = []
    const monthStart = startOfWeek(new Date(), {weekStartsOn: 1});
    for (let i = 0; i < 30; i++) {
        const date = add(monthStart, { days: i }); // Add 'i' days to the start of the week
        monthTasks.push(date);
    }
    let monthTasksArray = []
    monthTasksArray = monthTasks.map(date => new dateAndTask(date));
    tasksData.forEach(task => {
        const taskDate = parseISO(task.date); // Convert task date string to a Date object (if task.date is a string)
        monthTasksArray.forEach(dateTask => {
            if (isSameDay(dateTask.date, taskDate)) { // Use date-fns `isSameDay` to compare dates
                dateTask.addTask(task); // Add the task name (or the entire task object) to the respective date
            }
        });
    });
    return monthTasksArray
}