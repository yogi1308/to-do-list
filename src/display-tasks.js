import star from './images/star.svg';
import filledStar from './images/filled-star.svg';
import completed from './images/completed.svg';
import completedFilled from './images/completed-filled.svg';
import flag from './images/flag.svg';
import blueFlag from './images/blue-flag.svg';
import redFlag from './images/red-flag.svg';
import orangeFlag from './images/orange-flag.svg';

import {completionStatusChanged, importanceChanged, priorityChanged} from './status-change.js'

export { displayTask };

function displayTask(task) {
    const main = document.querySelector('#main');
    const taskList = document.querySelector('.task-list');
    const taskItem = document.createElement('div');
    const taskItemTextContentDiv = document.createElement('div');
    const taskItemLeft = document.createElement('div')
    const taskItemRight = document.createElement('div')
    const taskItemName = document.createElement('p');
    const taskItemGroup = document.createElement('p');
    taskItemLeft.classList.add('task-item-left');
    taskItemRight.classList.add('task-item-right');
    taskItemGroup.classList.add('task-item-group');
    taskItemName.classList.add('task-item-name')
    taskItem.classList.add('task-item');
    taskItemName.textContent = task.task;
    taskItemGroup.textContent = task.list.name;
    taskItemTextContentDiv.appendChild(taskItemName);
    taskItemTextContentDiv.appendChild(taskItemGroup);

    const taskCompleteIcon = document.createElement('img');
    taskCompleteIcon.classList.add('task-complete-icon');
    if (task.completed) {taskCompleteIcon.src = completedFilled;taskCompleteIcon.style.width = '1.35em'; taskCompleteIcon.style.paddingLeft = '2px'} else {taskCompleteIcon.src = completed;}
    taskCompleteIcon.addEventListener('click', completionStatusChanged);
    taskItemLeft.appendChild(taskCompleteIcon)
    taskItemLeft.appendChild(taskItemTextContentDiv);
    taskItem.appendChild(taskItemLeft);

    const taskStarIcon = document.createElement('img');
    taskStarIcon.classList.add('task-star-icon');
    if (task.important) {taskStarIcon.src = filledStar;} else {taskStarIcon.src = star;}
    taskStarIcon.addEventListener('click', importanceChanged);

    const flagIcon = document.createElement('img');
    if (task.priority == "") {flagIcon.src = flag;} else if (task.priority == 'Low') {flagIcon.src = blueFlag;} else if (task.priority == 'High') {flagIcon.src = redFlag} else if (task.priority == 'Medium') {flagIcon.src = orangeFlag}
    flagIcon.classList.add('flag-icon');
    flagIcon.addEventListener('click', priorityChanged)

    taskItemRight.appendChild(flagIcon);
    taskItemRight.appendChild(taskStarIcon);
    taskItem.appendChild(taskItemLeft);
    taskItem.appendChild(taskItemRight);
    taskList.appendChild(taskItem);
    main.appendChild(taskList);

    return taskItem
}
