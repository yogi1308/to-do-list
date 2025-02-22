import star from './images/star.svg';
import filledStar from './images/filled-star.svg';
import completed from './images/completed.svg';
import completedFilled from './images/completed-filled.svg';
import flag from './images/flag.svg';
import blueFlag from './images/blue-flag.svg';
import redFlag from './images/red-flag.svg';
import orangeFlag from './images/orange-flag.svg';
import deleteIcon from './images/delete.svg';
import down from './images/down.svg';
import up from './images/up.svg';

import {tasksData} from './tasks-data.js'

import {completionStatusChanged, importanceChanged, priorityChanged, deleteTask} from './status-change.js';


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
    if (task.list == undefined) {}
    else if(task.list != undefined) {taskItemGroup.textContent = task.list.name;}
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
    if (task.priority == "") {flagIcon.src = flag;} else if (task.priority == "None") {flagIcon.src = flag;} else if (task.priority == 'Low') {flagIcon.src = blueFlag;} else if (task.priority == 'High') {flagIcon.src = redFlag} else if (task.priority == 'Medium') {flagIcon.src = orangeFlag}
    flagIcon.classList.add('flag-icon');
    flagIcon.addEventListener('click', priorityChanged)

    const deleteImg = document.createElement('img');
    deleteImg.src = deleteIcon;
    deleteImg.classList.add('delete-icon');
    deleteImg.addEventListener('click', deleteTask)

    const arrow = document.createElement('img');
    arrow.src = down;
    arrow.classList.add('arrow');
    arrow.addEventListener('click', quickView)

    taskItemRight.appendChild(flagIcon);
    taskItemRight.appendChild(taskStarIcon);
    taskItemRight.appendChild(deleteImg);
    taskItemRight.appendChild(arrow);
    taskItem.appendChild(taskItemLeft);
    taskItem.appendChild(taskItemRight);
    taskList.appendChild(taskItem);
    main.appendChild(taskList);

    return taskItem
}

function quickView() {
    const item = event.target.closest('.task-item');
    let taskObject = ''
    tasksData.forEach(tasks => {
        if ((tasks.task == item.querySelector('.task-item-name').textContent) && (!item.querySelector('#main > div.task-list > div > div.task-item-right > img.task-star-icon')) && (!item.querySelector('#main > div.task-list > div > div.task-item-right > img.flag-icon')) && (!item.querySelector('#main > div.task-list > div > div.task-item-left > img.task-complete-icon')) && (!item.querySelector('#main > div.task-list > div > div.task-item-left > div > p.task-item-group'))) {
            taskObject = tasks;
        }
        else {
            const taskNameMatch = tasks.task == item.querySelector('.task-item-name').textContent;
            const importantMatch = (item.querySelector('.task-star-icon').src == filledStar && tasks.important == true) || 
                                (item.querySelector('.task-star-icon').src == star && (tasks.important == false || tasks.important == undefined));
            const priorityMatch = (item.querySelector('.flag-icon').src == flag && (tasks.priority == "" || tasks.priority == "None")) || 
                                (item.querySelector('.flag-icon').src == blueFlag && tasks.priority == "Low") || 
                                (item.querySelector('.flag-icon').src == orangeFlag && tasks.priority == "Medium") || 
                                (item.querySelector('.flag-icon').src == redFlag && tasks.priority == "High");
            const completedMatch = (item.querySelector('.task-complete-icon').src == completedFilled && tasks.completed == true) || 
                                (item.querySelector('.task-complete-icon').src == completed && tasks.completed == false);
            const listMatch = (item.querySelector('.task-item-group').textContent == '' && tasks.list == undefined) || 
                            (item.querySelector('.task-item-group').textContent == tasks.list.name);

            if (taskNameMatch && importantMatch && priorityMatch && completedMatch && listMatch) {
                taskObject = tasks;
            }
        }
    })
    if (item.querySelector('div.task-item-right > img.arrow').src == down) {
        item.querySelector('#main > div.task-list > div > div.task-item-left > div > p.task-item-group').remove()
        item.querySelector('#main > div.task-list > div > div.task-item-right > img.delete-icon').remove()
        item.querySelector('#main > div.task-list > div > div.task-item-right > img.task-star-icon').remove()
        item.querySelector('#main > div.task-list > div > div.task-item-right > img.flag-icon').remove()
        item.querySelector('#main > div.task-list > div > div.task-item-left > img.task-complete-icon').remove()
        item.querySelector('#main > div.task-list > div > div.task-item-right > img.arrow').src = up

        const taskItemLeftRighContainer = document.createElement('div')
        taskItemLeftRighContainer.style.display = 'flex'
        taskItemLeftRighContainer.style.justifyContent = 'space-between'
        taskItemLeftRighContainer.appendChild(item.querySelector('#main > div.task-list > div > div.task-item-left'))
        taskItemLeftRighContainer.appendChild(item.querySelector('#main > div.task-list > div > div.task-item-right'))
        item.appendChild(taskItemLeftRighContainer)
        taskItemLeftRighContainer.style.width = '100%'
        item.style.flexDirection = 'column'

        const taskAttributeContainer = document.createElement('div');
        taskAttributeContainer.style.display = 'grid';
        taskAttributeContainer.style.gridTemplateColumns = 'auto auto'; 
        taskAttributeContainer.style.gridAutoRows = 'min-content';
        taskAttributeContainer.style.columnGap = '20px';
        taskAttributeContainer.style.rowGap = '3px';
        taskAttributeContainer.style.alignItems = 'start';
        taskAttributeContainer.style.justifyContent = 'start';
        taskAttributeContainer.style.margin = '0px';
        taskAttributeContainer.style.padding = '0.5em';
        taskAttributeContainer.style.maxWidth = '100%';
        taskAttributeContainer.style.overflowX = 'auto'
        taskAttributeContainer.style.whiteSpace = 'normal'
        taskAttributeContainer.style.border = '2px solid #1c1c1c'
        taskAttributeContainer.style.borderRadius = '8px'
        taskAttributeContainer.style.marginBottom = '5px'

        const taskItemList = document.createElement('p');
        taskItemList.textContent = "List";
        taskItemList.style.color = '#788cde'
        taskAttributeContainer.appendChild(taskItemList);

        const taskItemListValue = document.createElement('p');
        taskItemListValue.textContent = taskObject.list.name;
        taskItemListValue.style.borderLeft = '2px solid #1c1c1c'
        taskItemListValue.style.paddingLeft = '10px'
        taskAttributeContainer.appendChild(taskItemListValue);

        const taskItemPriority = document.createElement('p');
        taskItemPriority.textContent = "Priority";
        taskItemPriority.style.color = '#788cde'
        taskAttributeContainer.appendChild(taskItemPriority);

        const taskItemPriorityValue = document.createElement('p');
        taskItemPriorityValue.textContent = taskObject.priority;
        taskItemPriorityValue.style.borderLeft = '2px solid #1c1c1c'
        taskItemPriorityValue.style.paddingLeft = '10px'
        taskAttributeContainer.appendChild(taskItemPriorityValue);

        const taskItemImportant = document.createElement('p');
        taskItemImportant.textContent = "Importance";
        taskItemImportant.style.color = '#788cde'
        taskAttributeContainer.appendChild(taskItemImportant);

        const taskItemImportanceValue = document.createElement('p');
        taskItemImportanceValue.textContent = taskObject.important;
        taskItemImportanceValue.style.borderLeft = '2px solid #1c1c1c'
        taskItemImportanceValue.style.paddingLeft = '10px'
        taskAttributeContainer.appendChild(taskItemImportanceValue);

        const taskItemCompleted = document.createElement('p');
        taskItemCompleted.textContent = "Completed";
        taskItemCompleted.style.color = '#788cde'
        taskAttributeContainer.appendChild(taskItemCompleted);

        const taskItemCompletedValue = document.createElement('p');
        taskItemCompletedValue.textContent = taskObject.completed;
        taskItemCompletedValue.style.borderLeft = '2px solid #1c1c1c'
        taskItemCompletedValue.style.paddingLeft = '10px'
        taskAttributeContainer.appendChild(taskItemCompletedValue);

        const taskItemDate = document.createElement('p');
        taskItemDate.textContent = "Date";
        taskItemDate.style.color = '#788cde'
        taskAttributeContainer.appendChild(taskItemDate);

        const taskItemDateValue = document.createElement('p');
        taskItemDateValue.textContent = taskObject.date;
        taskItemDateValue.style.borderLeft = '2px solid #1c1c1c'
        taskItemDateValue.style.paddingLeft = '10px'
        taskAttributeContainer.appendChild(taskItemDateValue);

        const taskItemRepeat = document.createElement('p');
        taskItemRepeat.textContent = "Repeat";
        taskItemRepeat.style.color = '#788cde'
        taskAttributeContainer.appendChild(taskItemRepeat);

        const taskItemRepeatValue = document.createElement('p');
        taskItemRepeatValue.textContent = taskObject.repeat;
        taskItemRepeatValue.style.borderLeft = '2px solid #1c1c1c'
        taskItemRepeatValue.style.paddingLeft = '10px'
        taskAttributeContainer.appendChild(taskItemRepeatValue);

        const taskItemNote = document.createElement('p');
        taskItemNote.textContent = "Notes";
        taskItemNote.style.color = '#788cde'
        taskAttributeContainer.appendChild(taskItemNote);

        const taskItemNotesValue = document.createElement('p');
        taskItemNotesValue.textContent = taskObject.notes;
        taskItemNotesValue.style.borderLeft = '2px solid #1c1c1c'
        taskItemNotesValue.style.paddingLeft = '10px'
        taskAttributeContainer.appendChild(taskItemNotesValue);

        item.appendChild(taskAttributeContainer);
        
        const pElements = taskAttributeContainer.querySelectorAll('p');


    }
    else {
        const taskItem = displayTask(taskObject)
        item.replaceWith(taskItem)
    }
}

