import { tasksData } from './tasks-data.js';
import {isToday, parseISO, isSameDay, isAfter, isWeekend, differenceInDays, differenceInMonths, differenceInYears, differenceInCalendarWeeks, differenceInCalendarMonths, differenceInCalendarYears} from 'date-fns'
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
      case 'Daily':
        // Repeats every day from the task date onward
        return isAfter(dateToCheck, taskDate) || isSameDay(dateToCheck, taskDate);
        
      case 'Weekdays':
        // Only repeat on weekdays (skip weekends)
        if (isWeekend(dateToCheck)) return false;
        return isAfter(dateToCheck, taskDate) || isSameDay(dateToCheck, taskDate);
        
      case 'Weekly':
        // Show if it's the same day of the week and a multiple of 7 days has passed
        return dateToCheck.getDay() === taskDate.getDay() &&
               differenceInDays(dateToCheck, taskDate) >= 0 &&
               differenceInDays(dateToCheck, taskDate) % 7 === 0;
        
      case 'Monthly':
        // Repeat on the same day-of-month (consider edge cases separately)
        return dateToCheck.getDate() === taskDate.getDate() &&
               differenceInMonths(dateToCheck, taskDate) >= 0;
        
      case 'Yearly':
        // Repeat if both month and day match
        return dateToCheck.getDate() === taskDate.getDate() &&
               dateToCheck.getMonth() === taskDate.getMonth() &&
               differenceInYears(dateToCheck, taskDate) >= 0;
        
      default:
        // For custom intervals, assume the string is formatted like "custom:3"
        if (task.repeat.startsWith("Every")) {
            const parts = task.repeat.split(" ");
            if (parts.length < 3) return false;
            const interval = parseInt(parts[1], 10);
            const unit = parts[2].toLowerCase();
            if (isNaN(interval)) return false;
          
            switch (unit) {
              case "day":
              case "days": {
                const diffDays = differenceInDays(dateToCheck, taskDate);
                return diffDays >= 0 && diffDays % interval === 0;
              }
              case "week":
              case "weeks": {
                // Only repeat on the same day-of-week as taskDate.
                if (dateToCheck.getDay() !== taskDate.getDay()) return false;
                const diffWeeks = differenceInCalendarWeeks(dateToCheck, taskDate);
                return diffWeeks >= 0 && diffWeeks % interval === 0;
              }
              case "month":
              case "months": {
                // Only repeat on the same day-of-month.
                if (dateToCheck.getDate() !== taskDate.getDate()) return false;
                const diffMonths = differenceInCalendarMonths(dateToCheck, taskDate);
                return diffMonths >= 0 && diffMonths % interval === 0;
              }
              case "year":
              case "years": {
                // Only repeat on the same month and day.
                if (
                  dateToCheck.getDate() !== taskDate.getDate() ||
                  dateToCheck.getMonth() !== taskDate.getMonth()
                )
                  return false;
                const diffYears = differenceInCalendarYears(dateToCheck, taskDate);
                return diffYears >= 0 && diffYears % interval === 0;
              }
              default:
                return false;
            }
          }
          return false;          
    }
  }
  