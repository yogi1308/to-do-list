import flag from './images/flag.svg';
import blueFlag from './images/blue-flag.svg';
import redFlag from './images/red-flag.svg';
import orangeFlag from './images/orange-flag.svg';
import star from './images/star.svg';
import filledStar from './images/filled-star.svg';
import completed from './images/completed.svg';
import completedFilled from './images/completed-filled.svg';
import { tasksData } from './tasks-data.js';
import { view } from './sidebar.js';

export { completionStatusChanged, importanceChanged, priorityChanged }

function completionStatusChanged() {
    const taskName = this.closest('.task-item').querySelector('.task-item-name').textContent;
    tasksData.forEach(task => {
        if (task.task == taskName) {
            if (task.completed) {task.completed = false; this.src = completed; this.style.paddingLeft = '0px'; this.style.width = '1.5em'; if (view == 'Completed'){this.closest('.task-item').remove();}}
            else {task.completed = true; this.src = completedFilled; ;this.style.width = '1.35em'; this.style.paddingLeft = '2px'}
        }
    });
}

function importanceChanged() {
    const taskName = this.closest('.task-item').querySelector('.task-item-name').textContent;
    tasksData.forEach(task => {
        if (task.task == taskName) {
            if (task.important) {task.important = false; this.src = star; if (view == 'Important') {this.closest('.task-item').remove();}}
            else {task.important = true; this.src = filledStar;}
        }
    });

}

function priorityChanged(){
    const taskName = this.closest('.task-item').querySelector('.task-item-name').textContent;
    tasksData.forEach(task => {
        if (task.task == taskName) {
            if (task.priority == "") {task.priority = 'Low'; this.src = blueFlag;}
            else if (task.priority == 'Low') {task.priority = 'Medium'; this.src = orangeFlag;}
            else if (task.priority == 'Medium') {task.priority = 'High'; this.src = redFlag;}
            else if (task.priority == 'High') {task.priority = ""; this.src = flag;}
        }
    });
}