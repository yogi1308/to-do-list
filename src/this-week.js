// add previous and next week buttons on the top and bottom
export {displayWeekTasks}
import { format, isToday, isTomorrow, isYesterday, isSameDay, startOfWeek, add, parseISO, addDays } from 'date-fns';
import { tasksData, dateAndTask } from './tasks-data.js';
import {displayTask} from './display-tasks.js'
import {changeHeader} from './sidebar.js'

import arrowUpSVG from './images/arrow-up.svg'
import arrowDownSVG from './images/arrow-down.svg'
import calender from './images/calender.svg'

let plusMinusDays = 0


function getThisWeekDates(today) {
    const thisWeek = []
    const weekStart = startOfWeek(today, {weekStartsOn: 1});
    for (let i = 0; i < 7; i++) {
        const date = add(weekStart, { days: i }); // Add 'i' days to the start of the week
        thisWeek.push(date);
    }
    return thisWeek;
}

function sortTasksForWeekDates(today) {
    const thisWeek = getThisWeekDates(today);
    let weekTasks = []
    weekTasks = thisWeek.map(date => new dateAndTask(date));
    tasksData.forEach(task => {
        const taskDate = parseISO(task.date); // Convert task date string to a Date object (if task.date is a string)
        weekTasks.forEach(dateTask => {
            if (isSameDay(dateTask.date, taskDate)) { // Use date-fns `isSameDay` to compare dates
                dateTask.addTask(task); // Add the task name (or the entire task object) to the respective date
            }
        });
    });
    return weekTasks
}

function displayWeekTasks(today) {
    const weekTasks = sortTasksForWeekDates(today);
    console.log(weekTasks);
    weekTasks.forEach(dateTask => {
        const day = document.createElement('div');
        day.classList.add('day');
        day.textContent = format(dateTask.date, 'EEEE • MMMM dd');
        if (isToday(dateTask.date)) {
            day.textContent += ' • Today';
        }
        else if (isTomorrow(dateTask.date)) {
            day.textContent += ' • Tomorrow';
        }

        else if (isYesterday(dateTask.date)) {
            day.textContent += ' • Yesterday';
        }

        dateTask.task.forEach(task => {
            day.appendChild(displayTask(task));
        });

        document.querySelector('.task-list').appendChild(day);
    });
    addArrows()
}

function addArrows() {
    const header = document.querySelector('.header')
    const arrowUp = document.createElement('img')
    arrowUp.classList.add('up-arrow')
    arrowUp.src = arrowUpSVG
    arrowUp.addEventListener('click', weekUpClicked)
    header.appendChild(arrowUp)
    const taskList = document.querySelector('.task-list')
    const arrowDown = document.createElement('img')
    arrowDown.src = arrowDownSVG;
    arrowDown.classList.add('down-arrow')
    arrowDown.style.height = arrowUp.clientHeight +'px'
    arrowDown.addEventListener('click', weekUpClicked)
    taskList.appendChild(arrowDown)
}

function weekUpClicked() {
    if (event.target.closest('.up-arrow')) {plusMinusDays -= 7}
    else if (event.target.closest('.down-arrow')) {plusMinusDays += 7}
    document.querySelector('.task-list').textContent = ''; changeHeader('Entire Week\'s Task List', calender);
    if (plusMinusDays == 0) {changeHeader('This Week', calender)}
    else if (plusMinusDays == 7) {changeHeader('Next Week', calender)}
    else if (plusMinusDays == -7) {changeHeader('Previous Week', calender)}
    const nextWeek = addDays(new Date(), plusMinusDays)
    console.log(nextWeek)
    displayWeekTasks(nextWeek)
}
