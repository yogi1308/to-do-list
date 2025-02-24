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
import repeatSVG from './images/repeat.svg'
import notesSVG from './images/notes.svg'

import {listsData, tasksData, updateLocalStorage} from './tasks-data.js'
import {displayLists, groupSort} from './sidebar.js';
import {execCmd, handleListCreation, handleFileUpload} from './homepage.js';

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

    updateLocalStorage()

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
    } 
    else {
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
        editCompletion.style.width = '1.35em'
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
        const editDate = document.createElement('input');
        editDate.classList.add('edit-completed')
        editDate.type = 'date'
        editDate.style.width = '3em'
        editDate.style.color = 'white'
        editDate.style.backgroundColor = '#363636'
        editDate.style.border = 'none'
        editDate.style.padding = '0px'
        taskAttributeContainer.appendChild(taskItemDateValue);
        taskItemDateValue.appendChild(editDate);
        taskItemDateValue.style.display = 'flex'
        taskItemDateValue.style.justifyContent = 'space-between'
        taskItemDateValue.style.minGap = '5px'
        editDate.addEventListener('change', editDateInQuickView)
        editDate.style.position = 'relative'
        editDate.style.left = '18px'

        const taskItemRepeat = document.createElement('p');
        taskItemRepeat.textContent = "Repeat";
        taskItemRepeat.style.color = '#788cde'
        taskAttributeContainer.appendChild(taskItemRepeat);

        const taskItemRepeatValue = document.createElement('p');
        if (taskObject.repeat == undefined || taskObject.repeat == "") {taskItemRepeatValue.textContent = "None"} 
        else {taskItemRepeatValue.textContent = taskObject.repeat}
        taskItemRepeatValue.style.borderLeft = '2px solid #1c1c1c'
        taskItemRepeatValue.style.paddingLeft = '10px'
        const editRepeat = document.createElement('img');
        editRepeat.classList.add('edit-repeat')
        editRepeat.src = repeatSVG
        editRepeat.style.width = '1.35em'
        taskAttributeContainer.appendChild(taskItemRepeatValue);
        taskItemRepeatValue.appendChild(editRepeat);
        taskItemRepeatValue.style.display = 'flex'
        taskItemRepeatValue.style.justifyContent = 'space-between'
        taskItemRepeatValue.style.minGap = '5px'
        editRepeat.addEventListener('click', changeRepeatInQuickView)

        const taskItemNote = document.createElement('p');
        taskItemNote.textContent = "Notes";
        taskItemNote.style.color = '#788cde'
        taskAttributeContainer.appendChild(taskItemNote);

        const taskItemNotesValue = document.createElement('div');
        const taskItemNOtesValueTextContent = document.createElement('p')
        if (taskObject.notes == undefined || taskObject.notes == "") {taskItemNOtesValueTextContent.textContent = "None"} 
        else {taskItemNOtesValueTextContent.innerHTML = taskObject.notes}
        taskItemNotesValue.style.borderLeft = '2px solid #1c1c1c'
        taskItemNotesValue.style.paddingLeft = '10px'
        const editNotes = document.createElement('img');
        editNotes.classList.add('edit-notes')
        editNotes.src = notesSVG;
        taskAttributeContainer.appendChild(taskItemNotesValue);
        taskItemNotesValue.appendChild(taskItemNOtesValueTextContent);
        taskItemNotesValue.appendChild(editNotes);
        taskItemNotesValue.style.display = 'flex'
        taskItemNotesValue.style.justifyContent = 'space-between'
        taskItemNotesValue.style.gap = '5px'
        editNotes.addEventListener('click', changeNotesInQuickView)

        item.appendChild(taskAttributeContainer);

    }
    else {
        const taskItem = displayTask(taskObject)
        item.replaceWith(taskItem)
    }
    updateLocalStorage()
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

    updateLocalStorage()
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

    updateLocalStorage()
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

    updateLocalStorage()
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

    updateLocalStorage()
}

function changeCompletionInQuickView() {
    const currCompletionElement = event.target.closest('p');
    const currCompletion = currCompletionElement.textContent;
    const editCompletionElement = currCompletionElement.querySelector('.edit-completed');

    if (currCompletion === "" || currCompletion === "false") {taskObject.completed = true; currCompletionElement.textContent = 'true';editCompletionElement.src = completedFilled; editCompletionElement.style.width = '1.35em'} 
    else if (currCompletion === 'true') {taskObject.completed = false;currCompletionElement.textContent = 'false';editCompletionElement.src = completed; editCompletionElement.style.width = '1.35em'}

    currCompletionElement.appendChild(editCompletionElement);

    updateLocalStorage()
}

function changeImportanceInQuickview() {
    const currImportanceElement = event.target.closest('p');
    const currImportance = currImportanceElement.textContent;
    const editImportanceElement = currImportanceElement.querySelector('.edit-completed');

    if (currImportance === "" || currImportance === "false") {taskObject.important = true; currImportanceElement.textContent = 'true'; editImportanceElement.src = filledStar} 
    else if (currImportance === 'true') {taskObject.important = false; currImportanceElement.textContent = 'false'; editImportanceElement.src = star}

    currImportanceElement.appendChild(editImportanceElement);

    updateLocalStorage()
}

function editDateInQuickView() {
    const currDateElement = event.target.closest('p');
    const currDate = currDateElement.textContent;
    const editDateElement = currDateElement.querySelector('input');

    taskObject.date = editDateElement.value;
    currDateElement.textContent = editDateElement.value;
    currDateElement.appendChild(editDateElement);
    console.log(tasksData)

    updateLocalStorage()
}

function changeRepeatInQuickView() {
    document.addEventListener('click', handleClickOutsideForRepeat, true);
    if (!document.querySelector('ul.repetetion-list')) {
        const repetitionList = document.createElement('ul');
        repetitionList.className = 'repetetion-list-quickview';
        repetitionList.innerHTML = 
            `<li>Daily</li>
            <li>Weekdays</li>
            <li>Weekly</li>
            <li>Monthly</li>
            <li>Yearly</li>
            <li>Custom</li>
            <li>Never</li>`
        event.target.closest('p').replaceWith(repetitionList);
        repetitionList.style.border = '2px solid #1c1c1c';
        repetitionList.style.borderRadius = '8px';  
        repetitionList.style.backgroundColor = '#3b3b3b'
        repetitionList.style.listStyle = 'none'
        repetitionList.style.width = 'min-content'
        repetitionList.style.padding = '0px 0.5em'
        repetitionList.querySelectorAll('li').forEach(option => {option.style.cursor = 'pointer'; option.addEventListener('click', changeRepeatValueInQuickView);});
    }
    updateLocalStorage()
}

function handleClickOutsideForRepeat() {
    const repetitionList = document.querySelector('.repetetion-list-quickview');
    const customList = document.querySelector('.custom-repetition-list');

    if (!repetitionList?.contains(event.target)) {
        const taskItemRepeatValue = document.createElement('p');
        if (taskObject.repeat == undefined || taskObject.repeat == "") {taskItemRepeatValue.textContent = "None"} 
        else {taskItemRepeatValue.textContent = taskObject.repeat}
        taskItemRepeatValue.style.borderLeft = '2px solid #1c1c1c'
        taskItemRepeatValue.style.paddingLeft = '10px'
        const editRepeat = document.createElement('img');
        editRepeat.classList.add('edit-repeat')
        editRepeat.src = repeatSVG
        editRepeat.style.width = '1.35em'
        taskItemRepeatValue.appendChild(editRepeat);
        taskItemRepeatValue.style.display = 'flex'
        taskItemRepeatValue.style.justifyContent = 'space-between'
        taskItemRepeatValue.style.minGap = '5px'
        editRepeat.addEventListener('click', changeRepeatInQuickView)
        repetitionList?.replaceWith(taskItemRepeatValue)
        customList?.remove();
        document.removeEventListener('click', handleClickOutsideForRepeat, true);
    }
    updateLocalStorage()
}

function changeRepeatValueInQuickView() {
    const selected = event.target.closest('li').textContent
    if (selected != 'Custom') {
        document.removeEventListener('click', handleClickOutsideForRepeat, true);
        taskObject.repeat = selected
        const taskItemRepeatValue = document.createElement('p');
        if (taskObject.repeat == undefined || taskObject.repeat == "") {taskItemRepeatValue.textContent = "None"} 
        else {taskItemRepeatValue.textContent = taskObject.repeat}
        taskItemRepeatValue.style.borderLeft = '2px solid #1c1c1c'
        taskItemRepeatValue.style.paddingLeft = '10px'
        const editRepeat = document.createElement('img');
        editRepeat.classList.add('edit-repeat')
        editRepeat.src = repeatSVG
        editRepeat.style.width = '1.35em'
        taskItemRepeatValue.appendChild(editRepeat);
        taskItemRepeatValue.style.display = 'flex'
        taskItemRepeatValue.style.justifyContent = 'space-between'
        taskItemRepeatValue.style.minGap = '5px'
        editRepeat.addEventListener('click', changeRepeatInQuickView)
        document.querySelector('.repetetion-list-quickview')?.replaceWith(taskItemRepeatValue)
    }
    if (selected == 'Custom') {
        document.removeEventListener('click', handleClickOutsideForRepeat, true);
        const customRepetitionList = document.createElement('ul');
        customRepetitionList.className = 'custom-repetetion-list-quickview';
        customRepetitionList.innerHTML = `
        <div style="border: 2px solid #1c1c1c; padding: 5px; border-radius: 8px;">
        <p>Repeat Every...</p>
        <div>
            <input type="number" id="repeat-frequency-quickview" name="repeat-frequency-quickview" min="1" style"background-color: #3b3b3b;">
            <select name="repeat" id="repeat-quickview" style"background-color: #3b3b3b;">
                <option value="Days">Days</option>
                <option value="Weeks">Weeks</option>
                <option value="Months">Months</option>
                <option value="Years">Years</option>
            </select>
        </div>
        <div style="margin-top: 8px; display: flex; gap: 8px;"><button class="cancel-quickview" style="cursor:pointer">Cancel</button><button class="submit-quickview" style="cursor: pointer; background-color: #3b3b3b;">Submit</button></div>
        </div>`
        customRepetitionList.style.padding = '0px'
        document.querySelector('.repetetion-list-quickview').replaceWith(customRepetitionList);
        document.querySelector('.submit-quickview').addEventListener('click', customRepeatSelectedQuickview)
        document.querySelector('.cancel-quickview').addEventListener('click', customRepeatSelectedQuickview)

        updateLocalStorage()
    }
}

function customRepeatSelectedQuickview() {
    if (event.target.closest('button').textContent == 'Submit') {
        taskObject.repeat = 'Every ' + document.getElementById('repeat-frequency-quickview').value + ' ' + document.getElementById('repeat-quickview').value
    }
    if (event.target.closest('button').textContent == 'Cancel') {}
    const taskItemRepeatValue = document.createElement('p');
    if (taskObject.repeat == undefined || taskObject.repeat == "") {taskItemRepeatValue.textContent = "None"} 
    else {taskItemRepeatValue.textContent = taskObject.repeat}
    taskItemRepeatValue.style.borderLeft = '2px solid #1c1c1c'
    taskItemRepeatValue.style.paddingLeft = '10px'
    const editRepeat = document.createElement('img');
    editRepeat.classList.add('edit-repeat')
    editRepeat.src = repeatSVG
    editRepeat.style.width = '1.35em'
    taskItemRepeatValue.appendChild(editRepeat);
    taskItemRepeatValue.style.display = 'flex'
    taskItemRepeatValue.style.justifyContent = 'space-between'
    taskItemRepeatValue.style.minGap = '5px'
    editRepeat.addEventListener('click', changeRepeatInQuickView)
    document.querySelector('.custom-repetetion-list-quickview')?.replaceWith(taskItemRepeatValue)
    document.removeEventListener('click', handleClickOutsideForRepeat, true)

    updateLocalStorage()
}

function changeNotesInQuickView(event) {
    if (document.querySelector('.notes-editor')) {
        document.querySelector('.notes-editor').remove();
        document.removeEventListener('click', handleClickOutsideForNotes, true)
        return;
    }
    const notesEditor = document.createElement('div');
    notesEditor.classList.add('notes-editor-quickview')
    notesEditor.innerHTML = `<div id="toolbar">
        <button type="button" id="boldBtn"><b>B</b></button>
        <button type="button" id="italicBtn"><i>I</i></button>
        <button type="button" id="underlineBtn"><u>U</u></button>
        <button type="button" id="listBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="fill:white; width:1.75em" type="button" id="listBtn"><title>format-list-bulleted</title><path d="M7,5H21V7H7V5M7,13V11H21V13H7M4,4.5A1.5,1.5 0 0,1 5.5,6A1.5,1.5 0 0,1 4,7.5A1.5,1.5 0 0,1 2.5,6A1.5,1.5 0 0,1 4,4.5M4,10.5A1.5,1.5 0 0,1 5.5,12A1.5,1.5 0 0,1 4,13.5A1.5,1.5 0 0,1 2.5,12A1.5,1.5 0 0,1 4,10.5M7,19V17H21V19H7M4,16.5A1.5,1.5 0 0,1 5.5,18A1.5,1.5 0 0,1 4,19.5A1.5,1.5 0 0,1 2.5,18A1.5,1.5 0 0,1 4,16.5Z" /></svg></button>
        <input type="file" id="fileInput" style="display:none;" />
        <button type="button" id="uploadFileBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="fill:white; width:1.5em"><title>paperclip</title><path d="M16.5,6V17.5A4,4 0 0,1 12.5,21.5A4,4 0 0,1 8.5,17.5V5A2.5,2.5 0 0,1 11,2.5A2.5,2.5 0 0,1 13.5,5V15.5A1,1 0 0,1 12.5,16.5A1,1 0 0,1 11.5,15.5V6H10V15.5A2.5,2.5 0 0,0 12.5,18A2.5,2.5 0 0,0 15,15.5V5A4,4 0 0,0 11,1A4,4 0 0,0 7,5V17.5A5.5,5.5 0 0,0 12.5,23A5.5,5.5 0 0,0 18,17.5V6H16.5Z" /></svg></button>
    </div>
    <div id="editor" contenteditable="true" style="border: 1px solid #ccc; padding: 10px; min-height: 200px; color: white;">
        Enter your Notes here...
    </div>`;

    event.target.closest('div').replaceWith(notesEditor);

    // Attach event listeners
    document.getElementById('boldBtn').addEventListener('click', () => execCmd('bold'));
    document.getElementById('italicBtn').addEventListener('click', () => execCmd('italic'));
    document.getElementById('underlineBtn').addEventListener('click', () => execCmd('underline'));
    document.getElementById('listBtn').addEventListener('click', handleListCreation);

    // Handle local file uploads
    document.getElementById('uploadFileBtn').addEventListener('click', () => {
        document.getElementById('fileInput').click();
    });

    document.getElementById('fileInput').addEventListener('change', handleFileUpload);

    notesEditor.style.marginTop = 'auto'
    notesEditor.style.zIndex = '1000'
    notesEditor.style.backfaceVisibility = 'hidden'
    notesEditor.style.padding = '10px'
    notesEditor.style.border = '1px solid white'
    notesEditor.style.opacity = '1';
    notesEditor.style.backgroundColor = '#3b3b3b';
    notesEditor.focus()

    if (taskObject.notes != '') { document.querySelector('#editor').innerHTML = taskObject.notes }

    document.addEventListener('click', handleClickOutsideForNotesInQuickview, true);

    updateLocalStorage()
}


function handleClickOutsideForNotesInQuickview(e) {
    if (!document.querySelector('.notes-editor-quickview').contains(e.target)) {
        if (document.querySelector('#editor').innerHTML.trim() != 'Enter your Notes here...') { taskObject.notes = document.querySelector('#editor').innerHTML.trim()}

        const taskItemNotesValue = document.createElement('p');
        const taskItemNOtesValueTextContent = document.createElement('p')
        if (taskObject.notes == undefined || taskObject.notes == "") {taskItemNOtesValueTextContent.textContent = "None"} 
        else {taskItemNOtesValueTextContent.innerHTML = taskObject.notes}
        taskItemNotesValue.style.borderLeft = '2px solid #1c1c1c'
        taskItemNotesValue.style.paddingLeft = '10px'
        const editNotes = document.createElement('img');
        editNotes.classList.add('edit-notes')
        editNotes.src = notesSVG;
        document.querySelector('.notes-editor-quickview').replaceWith(taskItemNotesValue);
        taskItemNotesValue.appendChild(taskItemNOtesValueTextContent);
        taskItemNotesValue.appendChild(editNotes);
        taskItemNotesValue.style.display = 'flex'
        taskItemNotesValue.style.justifyContent = 'space-between'
        taskItemNotesValue.style.gap = '5px'
        editNotes.addEventListener('click', changeNotesInQuickView)

        document.removeEventListener('click', handleClickOutsideForNotesInQuickview, true);
    }

    updateLocalStorage()
}