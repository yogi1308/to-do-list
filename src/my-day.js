import { tasksData } from './tasks-data.js';
import {isToday, parseISO, isSameDay, isAfter, isWeekend} from 'date-fns'
import {displayTask} from './display-tasks.js'

export { displayTodayTasks,  isTaskScheduledForDate }

function displayTodayTasks() {
    const today = new Date();
    tasksData.forEach(task => {
        if (task.date != undefined) {
            if (isTaskScheduledForDate(task, today)) {displayTask(task);}
        }
    });
}

function isTaskScheduledForDate(task, dateToCheck) {
    // Convert the task's date string to a Date object
    const taskDate = parseISO(task.date);
    
    // If the task's original date is the same as dateToCheck, show it
    if (isSameDay(taskDate, dateToCheck)) return true;
    
    // If there's no repeat setting, don’t display it on other days
    if (!task.repeat) return false;
    
    // Use task.repeat as a string
    switch(task.repeat) {
      case 'daily':
        // Repeats every day from the task date onward
        return isAfter(dateToCheck, taskDate) || isSameDay(dateToCheck, taskDate);
        
      case 'weekdays':
        // Only repeat on weekdays (skip weekends)
        if (isWeekend(dateToCheck)) return false;
        return isAfter(dateToCheck, taskDate) || isSameDay(dateToCheck, taskDate);
        
      case 'weekly':
        // Show if it's the same day of the week and a multiple of 7 days has passed
        return dateToCheck.getDay() === taskDate.getDay() &&
               differenceInDays(dateToCheck, taskDate) >= 0 &&
               differenceInDays(dateToCheck, taskDate) % 7 === 0;
        
      case 'monthly':
        // Repeat on the same day-of-month (consider edge cases separately)
        return dateToCheck.getDate() === taskDate.getDate() &&
               differenceInMonths(dateToCheck, taskDate) >= 0;
        
      case 'yearly':
        // Repeat if both month and day match
        return dateToCheck.getDate() === taskDate.getDate() &&
               dateToCheck.getMonth() === taskDate.getMonth() &&
               differenceInYears(dateToCheck, taskDate) >= 0;
        
      default:
        // For custom intervals, assume the string is formatted like "custom:3"
        if (task.repeat.startsWith("custom:")) {
           const customDays = parseInt(task.repeat.split(":")[1], 10);
           if (isNaN(customDays)) return false;
           const diffDays = differenceInDays(dateToCheck, taskDate);
           return diffDays >= 0 && diffDays % customDays === 0;
        }
        return false;
    }
  }
  