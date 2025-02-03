export {displayWeekTasks}
import { format, isToday, isTomorrow, isYesterday, isSameDay, startOfWeek, add, parseISO } from 'date-fns';
import { tasksData, dateAndTask } from './tasks-data.js';
import {displayTask} from './display-tasks.js'

function getThisWeekDates() {
    const thisWeek = []
    const weekStart = startOfWeek(new Date(), {weekStartsOn: 1});
    for (let i = 0; i < 7; i++) {
        const date = add(weekStart, { days: i }); // Add 'i' days to the start of the week
        thisWeek.push(date);
    }
    return thisWeek;
}

function sortTasksForWeekDates() {
    const thisWeek = getThisWeekDates();
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

function displayWeekTasks() {
    const weekTasks = sortTasksForWeekDates();
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
}
