import { tasksData } from './tasks-data.js';
import {isToday, parseISO} from 'date-fns'
import {displayTask} from './display-tasks.js'

export { displayTodayTasks }

function displayTodayTasks() {
    tasksData.forEach(task => {
        if (isToday(parseISO(task.date))) {displayTask(task);}
    });
}