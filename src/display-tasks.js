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
import editSVG from './images/edit.svg';

import {listsData, tasksData} from './tasks-data.js'
import {displayLists, groupSort} from './sidebar.js';

import {completionStatusChanged, importanceChanged, priorityChanged, deleteTask} from './status-change.js';

let taskObject = null;


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
    console.log(tasksData)
    const item = event.target.closest('.task-item');
    const taskNameText = item.querySelector('.task-item-name')?.textContent || "";
    const starIconSrc = item.querySelector('.task-star-icon')?.src || "";
    const flagIconSrc = item.querySelector('.flag-icon')?.src || "";
    const completeIconSrc = item.querySelector('.task-complete-icon')?.src || "";
    const listText = item.querySelector('.task-item-group')?.textContent || "";

    for (const tasks of tasksData) {
    // First check: if none of the icons and list-group exist
    if (
        tasks.task === taskNameText &&
        !item.querySelector('.task-star-icon') &&
        !item.querySelector('.flag-icon') &&
        !item.querySelector('.task-complete-icon') &&
        !item.querySelector('.task-item-group')
        ) {
        taskObject = tasks;
        break;
    } else {
        const taskNameMatch = tasks.task === taskNameText;
        const importantMatch =
        (starIconSrc === filledStar && tasks.important === true) ||
        (starIconSrc === star && (!tasks.important || tasks.important === undefined));
        const priorityMatch =
        (flagIconSrc === flag && (tasks.priority === "" || tasks.priority === "None")) ||
        (flagIconSrc === blueFlag && tasks.priority === "Low") ||
        (flagIconSrc === orangeFlag && tasks.priority === "Medium") ||
        (flagIconSrc === redFlag && tasks.priority === "High");
        const completedMatch =
        (completeIconSrc === completedFilled && tasks.completed === true) ||
        (completeIconSrc === completed && tasks.completed === false);
        let listMatch = false;
        if (tasks.list === undefined) {
        listMatch = listText === "";
        } else {
        listMatch = listText === tasks.list.name;
        }
        
        if (taskNameMatch && importantMatch && priorityMatch && completedMatch && listMatch) {
        taskObject = tasks;
        break;
        }
    }
    }

    if (item.querySelector('div.task-item-right > img.arrow').src == down) {
        item.querySelector('div.task-item-left > div > p.task-item-group').remove()
        item.querySelector('div.task-item-right > img.delete-icon').remove()
        item.querySelector('div.task-item-right > img.task-star-icon').remove()
        item.querySelector('div.task-item-right > img.flag-icon').remove()
        item.querySelector('div.task-item-left > img.task-complete-icon').remove()
        item.querySelector('div.task-item-right > img.arrow').src = up

        const taskItemLeftRighContainer = document.createElement('div')
        taskItemLeftRighContainer.style.display = 'flex'
        taskItemLeftRighContainer.style.justifyContent = 'space-between'
        taskItemLeftRighContainer.appendChild(item.querySelector('div > div.task-item-left'))
        taskItemLeftRighContainer.appendChild(item.querySelector('div > div.task-item-right'))
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
        if (taskObject.list == undefined) {taskItemListValue.textContent = "None"} 
        else {taskItemListValue.textContent = taskObject.list.name}
        taskItemListValue.style.borderLeft = '2px solid #1c1c1c'
        taskItemListValue.style.paddingLeft = '10px'
        const editList = document.createElement('img');
        editList.classList.add('edit-icon')
        editList.src = editSVG;
        taskAttributeContainer.appendChild(taskItemListValue);
        taskItemListValue.appendChild(editList);
        taskItemListValue.style.display = 'flex'
        taskItemListValue.style.justifyContent = 'space-between'
        taskItemListValue.style.minGap = '5px'
        editList.addEventListener('click', changeListNameInQuickView)

        const taskItemPriority = document.createElement('p');
        taskItemPriority.textContent = "Priority";
        taskItemPriority.style.color = '#788cde'
        taskAttributeContainer.appendChild(taskItemPriority);

        const taskItemPriorityValue = document.createElement('p');
        if (taskObject.priority == "") {taskItemPriorityValue.textContent = "None"} 
        else {taskItemPriorityValue.textContent = taskObject.priority}
        taskItemPriorityValue.style.borderLeft = '2px solid #1c1c1c'
        taskItemPriorityValue.style.paddingLeft = '10px'
        const editPriority = document.createElement('img');
        editPriority.classList.add('edit-priority')
        if (taskObject.priority == "" || taskObject.priority == undefined || taskObject.priority == "None") {editPriority.src = flag}
        else if (taskObject.priority == "Low") {editPriority.src = blueFlag} else if (taskObject.priority == "Medium") {editPriority.src = orangeFlag} else if (taskObject.priority == "High") {editPriority.src = redFlag} 
        taskAttributeContainer.appendChild(taskItemPriorityValue);
        taskItemPriorityValue.appendChild(editPriority);
        taskItemPriorityValue.style.display = 'flex'
        taskItemPriorityValue.style.justifyContent = 'space-between'
        taskItemPriorityValue.style.minGap = '5px'
        editPriority.addEventListener('click', changePriorityInQuickview)

        const taskItemImportant = document.createElement('p');
        taskItemImportant.textContent = "Importance";
        taskItemImportant.style.color = '#788cde'
        taskAttributeContainer.appendChild(taskItemImportant);

        const taskItemImportanceValue = document.createElement('p');
        if (taskObject.important == undefined) {taskItemImportanceValue.textContent = "false"} 
        else {taskItemImportanceValue.textContent = taskObject.important}
        taskItemImportanceValue.style.borderLeft = '2px solid #1c1c1c'
        taskItemImportanceValue.style.paddingLeft = '10px'
        const editImportance = document.createElement('img');
        editImportance.classList.add('edit-completed')
        if (taskObject.important == '' || taskObject.important == false || taskObject.important == undefined) {editImportance.src = star}
        else if (taskObject.important == true) {editImportance.src = filledStar}
        console.log(tasksData)
        taskAttributeContainer.appendChild(taskItemImportanceValue);
        taskItemImportanceValue.appendChild(editImportance);
        taskItemImportanceValue.style.display = 'flex'
        taskItemImportanceValue.style.justifyContent = 'space-between'
        taskItemImportanceValue.style.minGap = '5px'
        editImportance.addEventListener('click', changeImportanceInQuickview)

        const taskItemCompleted = document.createElement('p');
        taskItemCompleted.textContent = "Completed";
        taskItemCompleted.style.color = '#788cde'
        taskAttributeContainer.appendChild(taskItemCompleted);

        const taskItemCompletedValue = document.createElement('p');
        if (taskObject.completed == undefined) {taskItemCompletedValue.textContent = "false"} 
        else {taskItemCompletedValue.textContent = taskObject.completed}
        taskItemCompletedValue.style.borderLeft = '2px solid #1c1c1c'
        taskItemCompletedValue.style.paddingLeft = '10px'
        const editCompletion = document.createElement('img');
        editCompletion.classList.add('edit-completed')
        if (taskObject.completed == '' || taskObject.completed == false || taskObject.completed == undefined) {editCompletion.src = completed}
        else if (taskObject.completed == true) {editCompletion.src = completedFilled}
        taskAttributeContainer.appendChild(taskItemCompletedValue);
        taskItemCompletedValue.appendChild(editCompletion);
        taskItemCompletedValue.style.display = 'flex'
        taskItemCompletedValue.style.justifyContent = 'space-between'
        taskItemCompletedValue.style.minGap = '5px'
        editCompletion.addEventListener('click', changeCompletionInQuickView)

        const taskItemDate = document.createElement('p');
        taskItemDate.textContent = "Due Date";
        taskItemDate.style.color = '#788cde'
        taskAttributeContainer.appendChild(taskItemDate);

        const taskItemDateValue = document.createElement('p');
        if (taskObject.date == undefined || taskObject.date == "") {taskItemDateValue.textContent = "None"} 
        else {taskItemDateValue.textContent = taskObject.date}
        taskItemDateValue.style.borderLeft = '2px solid #1c1c1c'
        taskItemDateValue.style.paddingLeft = '10px'
        taskAttributeContainer.appendChild(taskItemDateValue);

        const taskItemRepeat = document.createElement('p');
        taskItemRepeat.textContent = "Repeat";
        taskItemRepeat.style.color = '#788cde'
        taskAttributeContainer.appendChild(taskItemRepeat);

        const taskItemRepeatValue = document.createElement('p');
        if (taskObject.repeat == undefined || taskObject.repeat == "") {taskItemRepeatValue.textContent = "None"} 
        else {taskItemRepeatValue.textContent = taskObject.repeat}
        taskItemRepeatValue.style.borderLeft = '2px solid #1c1c1c'
        taskItemRepeatValue.style.paddingLeft = '10px'
        taskAttributeContainer.appendChild(taskItemRepeatValue);

        const taskItemNote = document.createElement('p');
        taskItemNote.textContent = "Notes";
        taskItemNote.style.color = '#788cde'
        taskAttributeContainer.appendChild(taskItemNote);

        const taskItemNotesValue = document.createElement('p');
        if (taskObject.notes == undefined || taskObject.notes == "") {taskItemNotesValue.textContent = "None"} 
        else {taskItemNotesValue.innerHTML = taskObject.notes}
        taskItemNotesValue.style.borderLeft = '2px solid #1c1c1c'
        taskItemNotesValue.style.paddingLeft = '10px'
        taskAttributeContainer.appendChild(taskItemNotesValue);

        item.appendChild(taskAttributeContainer);

    }
    else {
        const taskItem = displayTask(taskObject)
        item.replaceWith(taskItem)
    }
}


function changeListNameInQuickView() {
    const currName = event.target.closest('p')
    document.addEventListener('click', handleClickOutside, true);
    const listDropdownMenu = document.createElement('ul');
    listDropdownMenu.classList.add('list-selector')
    const chooseList = displayLists();
    chooseList.style.height = 'auto';
    chooseList.style.border = '2px solid #1c1c1c';
    chooseList.style.borderRadius = '8px';  
    chooseList.style.backgroundColor = '#3b3b3b'
    chooseList.querySelectorAll('*').forEach(child => {child.removeEventListener('click', groupSort);});
    chooseList.querySelectorAll('*').forEach(child => {const paragraph = child.querySelector('p');if (paragraph) {paragraph.addEventListener('click', listSelected);}});
      
    currName.replaceWith(chooseList);
    document.querySelector('#main').appendChild(listDropdownMenu);
    chooseList.querySelectorAll('img.vertical-dots').forEach(dot => {dot.remove();});
    chooseList.querySelectorAll('*').forEach(child => {const paragraph = child.querySelector('p');if (paragraph) {paragraph.addEventListener('click', listSelected);}});
}

function handleClickOutside(e) {
    if (!document.querySelector('#main > div.task-list > div > div:nth-child(2) > div').contains(e.target)) {
        const taskItemListValue = document.createElement('p');
        if (taskObject.list == undefined) {taskItemListValue.textContent = "None"} 
        else {taskItemListValue.textContent = taskObject.list.name}
        taskItemListValue.style.borderLeft = '2px solid #1c1c1c'
        taskItemListValue.style.paddingLeft = '10px'
        const editList = document.createElement('img');
        editList.classList.add('edit-icon')
        editList.src = editSVG;
        taskItemListValue.appendChild(editList);
        taskItemListValue.style.display = 'flex'
        taskItemListValue.style.justifyContent = 'space-between'
        taskItemListValue.style.minGap = '5px'
        editList.addEventListener('click', changeListNameInQuickView)
        document.querySelector('#main > div.task-list > div > div:nth-child(2) > div').replaceWith(taskItemListValue)
        document.removeEventListener('click', handleClickOutside, true);
    }
    else {document.removeEventListener('click', handleClickOutside, true);}
}

function listSelected() {
    const selectedListName = event.target.closest('p').textContent;
    const selectedList = listsData.find(list => list.name === selectedListName);
    taskObject.list = selectedList;
    const taskItemListValue = document.createElement('p');
    if (taskObject.list == undefined) {taskItemListValue.textContent = "None"} 
    else {taskItemListValue.textContent = taskObject.list.name}
    taskItemListValue.style.borderLeft = '2px solid #1c1c1c'
    taskItemListValue.style.paddingLeft = '10px'
    const editList = document.createElement('img');
    editList.classList.add('edit-icon')
    editList.src = editSVG;
    taskItemListValue.appendChild(editList);
    taskItemListValue.style.display = 'flex'
    taskItemListValue.style.justifyContent = 'space-between'
    taskItemListValue.style.minGap = '5px'
    editList.addEventListener('click', changeListNameInQuickView)
    document.querySelector('#main > div.task-list > div > div:nth-child(2) > div').replaceWith(taskItemListValue)
    document.removeEventListener('click', handleClickOutside, true);
}

function changePriorityInQuickview() {
    const currPriorityElement = event.target.closest('p');
    const currPriority = currPriorityElement.textContent;
    const editPriorityElement = currPriorityElement.querySelector('.edit-priority');

    if (currPriority === "" || currPriority === "None") {taskObject.priority = 'Low'; currPriorityElement.textContent = 'Low';editPriorityElement.src = blueFlag;} 
    else if (currPriority === 'Low') {taskObject.priority = 'Medium';currPriorityElement.textContent = 'Medium';editPriorityElement.src = orangeFlag;} 
    else if (currPriority === 'Medium') {taskObject.priority = 'High';currPriorityElement.textContent = 'High';editPriorityElement.src = redFlag;} 
    else if (currPriority === 'High') {taskObject.priority = '';currPriorityElement.textContent = "None";editPriorityElement.src = flag;}

    currPriorityElement.appendChild(editPriorityElement);
}

function changeCompletionInQuickView() {
    const currCompletionElement = event.target.closest('p');
    const currCompletion = currCompletionElement.textContent;
    const editCompletionElement = currCompletionElement.querySelector('.edit-completed');

    if (currCompletion === "" || currCompletion === "false") {taskObject.completed = true; currCompletionElement.textContent = 'true';editCompletionElement.src = completedFilled; editCompletionElement.style.width = '1.35em'} 
    else if (currCompletion === 'true') {taskObject.completed = false;currCompletionElement.textContent = 'false';editCompletionElement.src = completed; editCompletionElement.style.width = '1.35em'}

    currCompletionElement.appendChild(editCompletionElement);
}

function changeImportanceInQuickview() {
    const currImportanceElement = event.target.closest('p');
    const currImportance = currImportanceElement.textContent;
    const editImportanceElement = currImportanceElement.querySelector('.edit-completed');

    if (currImportance === "" || currImportance === "false") {taskObject.important = true; currImportanceElement.textContent = 'true'; editImportanceElement.src = filledStar} 
    else if (currImportance === 'true') {taskObject.important = false; currImportanceElement.textContent = 'false'; editImportanceElement.src = star}

    currImportanceElement.appendChild(editImportanceElement);
}