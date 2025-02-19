// delete, note, label, local save, edit tasks from quick view

import { tasks, tasksData, listsData, listsAndLabelsData } from './tasks-data.js';
import {displayTodayTasks} from './my-day.js'
import {format} from 'date-fns'
import sidebarIcon from './images/sidebar.svg'
import flag from './images/flag.svg';
import blueFlag from './images/blue-flag.svg';
import redFlag from './images/red-flag.svg';
import orangeFlag from './images/orange-flag.svg';
import star from './images/star.svg'
import filledStar from './images/filled-star.svg'
import listIcon from './images/group.svg'
import repeatSVG from './images/repeat.svg'
import {chooseDisplay, displayLists, dispalyAddListsAndLabels, groupSort} from './sidebar.js'

let currentDate = new Date()
console.log(currentDate)
let currentDay = format(currentDate, 'eeee')
export {homePage, header, currentDate, currentDay}
let priority = ""
let important = undefined
let list = listsData.find(item => item.name === 'Tasks');
let date = undefined
let repeat = undefined

console.log(listsData)

function homePage() {
    console.log('home page');
    taskBar();
    header();
    displayTaskList()
    displayTodayTasks()
    window.addEventListener('resize', adjustAddTaskDivWidth);
    sidebarDisplayOption()
}

function taskBar() {
    const main = document.querySelector('#main');
    const addtaskDiv = document.createElement('div');
    addtaskDiv.classList.add('add-task-div');
    const addTask = document.createElement('input');
    addTask.type = 'text';
    addTask.id = 'add-task';
    addTask.placeholder = 'Add a task';
    addtaskDiv.style.width = (main.clientWidth * 0.9) + 'px';
    addTask.style.width = '100%';
    addtaskDiv.appendChild(addTask);

    const taskbarListIcon = document.createElement('img')
    const taskbarListName = document.createElement('p')
    taskbarListIcon.src = listIcon
    taskbarListIcon.classList.add('input-list')
    taskbarListName.classList.add('input-list-name')
    taskbarListIcon.addEventListener('click', inputlistClicked)
    addtaskDiv.appendChild(taskbarListName)
    addtaskDiv.appendChild(taskbarListIcon)

    const inputCalender = document.createElement('input')
    inputCalender.type = 'date'
    inputCalender.style.backgroundColor = '#3b3b3b'
    inputCalender.style.color = 'white'
    inputCalender.style.border = 'none'
    inputCalender.addEventListener('change', (event) => {date = event.target.value;console.log(date); inputCalenderClicked(inputCalender)});
    addtaskDiv.appendChild(inputCalender)

    const repeatIcon = document.createElement('img')
    repeatIcon.src = repeatSVG
    repeatIcon.classList.add('input-repeat')
    repeatIcon.addEventListener('click', inputRepeatClicked)
    addtaskDiv.appendChild(repeatIcon)

    const starIcon = document.createElement('img')
    starIcon.src = star
    starIcon.classList.add('input-star')
    starIcon.addEventListener('click', inputStarClicked)
    addtaskDiv.appendChild(starIcon)

    const flagIcon = document.createElement('img')
    flagIcon.src = flag
    flagIcon.classList.add('input-flag')
    flagIcon.addEventListener('click', inputFlagClicked)
    addtaskDiv.appendChild(flagIcon)
    main.appendChild(addtaskDiv);
    addTask.addEventListener('keyup', (e) => {if (e.key === 'Enter') {addTaskFunction(addTask.textContent);}});
}

function adjustAddTaskDivWidth() {
    const main = document.querySelector('#main');
    const addtaskDiv = document.querySelector('.add-task-div');
    const addTask = document.querySelector('#add-task');
    addtaskDiv.style.width = (main.clientWidth * 0.9) + 'px';
    addTask.style.width = '100%';
}

function displayTaskList() {
    const main = document.querySelector('#main');
    const taskList = document.createElement('div');
    taskList.classList.add('task-list');
    main.appendChild(taskList);
}

function header() {
    const main = document.querySelector('#main');
    const header = document.createElement('div');
    header.classList.add('header');
    header.innerHTML = `<h2>My Day</h2><p>${currentDay}, ${format(currentDate, 'dd MMMM')}<p>`;
    main.appendChild(header);
}

function addTaskFunction(taskName) {
    const addTask = document.querySelector('#add-task');
    console.log(repeat)
    tasksData.push(tasks(addTask.value, priority, list, date, repeat, important));
    addTask.value = taskName;
    const taskList = document.querySelector('.task-list');
    const main = document.querySelector('#main');
    main.removeChild(taskList);
    displayTaskList();
    console.log(tasksData);
    document.querySelector('img.input-flag').src = flag
    document.querySelector('img.input-star').src = star
    let view = document.querySelector('.header > h2').textContent
    if (listsData.find(list => list.name === view)) {groupSort(view);}
    chooseDisplay(view);
    priority = ""
    important = undefined
    list = listsData.find(item => item.name === 'Tasks');
    date = undefined
    repeat = undefined
    document.querySelector('#sidebar').removeChild(document.querySelector('.groupDiv'))
    document.querySelector('#sidebar').removeChild(document.querySelector('.sidebar-footer'))
    displayLists()
    dispalyAddListsAndLabels()
    removeDateFromTaskabar()
    if (document.querySelector('.list-name')) {document.querySelector('div.add-task-div').removeChild(document.querySelector('.list-name'))}
}

function sidebarDisplayOption() {
    const sidebarDiv = document.querySelector('#sidebar');
    const sidebarDisplay = document.createElement('img');
    sidebarDisplay.src = sidebarIcon;
    sidebarDisplay.classList.add('sidebar-display-option');
    sidebarDisplay.addEventListener('click', retractSidebar);
    sidebarDiv.appendChild(sidebarDisplay);
}

function retractSidebar(event) {
    const sidebar = document.querySelector('#sidebar');
    const main = document.querySelector('#main');
    const clickedIcon = event.target;

    if (!sidebar.classList.contains('disable-sidebar')) {
        // Retract sidebar and move icon to main
        sidebar.classList.add('disable-sidebar');
        document.querySelector('#content').style.display = 'block';
        document.querySelector('#main').style.height = '100%';
        document.querySelector('#main').style.overflowY = 'auto';
        
        // Move icon to main and add special class
        main.appendChild(clickedIcon);
        clickedIcon.classList.add('sidebar-remove-icon-when-sidebar-is-removed');
    } else {
        // Restore sidebar and move icon back
        sidebar.classList.remove('disable-sidebar');
        document.querySelector('#content').style.display = 'grid';
        
        // Move icon back to sidebar and remove special class
        sidebar.appendChild(clickedIcon);
        clickedIcon.classList.remove('sidebar-remove-icon-when-sidebar-is-removed');
    }
    adjustAddTaskDivWidth();
}

function inputFlagClicked() {
    event.stopPropagation();
    const dropdown = document.getElementById('priority-dropdown');
    const list = document.querySelector('#priority-dropdown>ul')
    if (dropdown.classList.contains('hidden')) {
        // Temporarily display the dropdown to measure its height
        dropdown.classList.remove('hidden');
        const bottomPosition = document.querySelector('div.add-task-div').clientHeight + 'px'
        dropdown.style.position = 'absolute'
        dropdown.style.bottom = bottomPosition
        dropdown.style.right = '5%'
        list.style.padding = '0px'
        list.style.width = 'fit-content'
        document.querySelectorAll('.dropdown>ul>li').forEach(option => option.addEventListener('click', prioritySelected))
        if (!dropdown.classList.contains('hidden')) {
            document.addEventListener('click', (event)=> {
                dropdown.classList.add('hidden');
                document.querySelector('#add-task').focus()
                document.removeEventListener('click', (event=> {document.removeEventListener()}));
            });
        }
    } else {
        dropdown.classList.add('hidden');
        document.querySelector('#add-task').focus()
    }
}

function prioritySelected(event) {
    const chosenPriority = event.currentTarget.querySelector('span').textContent
    const flagIcon = document.querySelector('img.input-flag')
    if (chosenPriority == 'None') {flagIcon.src = flag;}
    priority = chosenPriority.split(' ')[0]
    if (priority == 'Low') {
        flagIcon.src = blueFlag
    }
    else if (priority == 'Medium') {
        flagIcon.src = orangeFlag
    }
    else if (priority == 'High') {
        flagIcon.src = redFlag
    }
    console.log(priority)
    document.getElementById('priority-dropdown').classList.add('hidden')
}

function inputStarClicked() {
    const starIcon = document.querySelector('.input-star')
    if (!starIcon.classList.contains('filled')) {
        starIcon.src = filledStar
        important = true
        starIcon.classList.add('filled')
    }
    else if(starIcon.classList.contains('filled')) {
        starIcon.src = star
        important = false
        starIcon.classList.remove('filled')
    }
}

function inputCalenderClicked(inputCalender) {
    // Remove any previously injected style (if present)
    const existingStyle = document.getElementById('date-valid-styles');
    if (existingStyle) {
        existingStyle.remove();
    }
    
    // Check if a valid date has been selected
    if (event.target.value) {
        // Create a new style element with your desired CSS rules
        const styleEl = document.createElement('style');
        styleEl.id = 'date-valid-styles';
        styleEl.textContent = `
        input[type="date"]:valid::-webkit-datetime-edit,
        input[type="date"]:valid::-webkit-datetime-edit-year-field,
        input[type="date"]:valid::-webkit-datetime-edit-month-field,
        input[type="date"]:valid::-webkit-datetime-edit-day-field {
            color: #fff;
            display: contents;
        }
        `;
        // Append the style element to the document head
        document.head.appendChild(styleEl);
        document.querySelector('.input-list').style.paddingRight = '0.5em'
    }
}

function removeDateFromTaskabar() {
    const existingStyle = document.getElementById('date-valid-styles');
    if (existingStyle) {
        existingStyle.remove();
    }
    document.querySelector('.input-list').style.paddingRight = '0px'
}

function inputlistClicked(event) {
    document.addEventListener('click', handleClickOutside, true);
    const listDropdownMenu = document.createElement('ul');
    listDropdownMenu.classList.add('list-selector')
    const chooseList = displayLists();
    chooseList.style.position = 'fixed';
    chooseList.style.bottom = `calc(${document.querySelector('div.add-task-div').clientHeight}px + 3px)`;
    chooseList.style.right = `calc(5% + 4 * 0.5em + 20px)`;
    chooseList.style.height = 'auto';
    chooseList.style.border = '2px solid #3b3b3b';
    chooseList.style.borderRadius = '8px';  
    chooseList.style.backgroundColor = '#1c1c1c'
    chooseList.querySelectorAll('*').forEach(child => {child.removeEventListener('click', groupSort);});
    chooseList.querySelectorAll('*').forEach(child => {const paragraph = child.querySelector('p');if (paragraph) {paragraph.addEventListener('click', listSelected);}});
      
    listDropdownMenu.appendChild(chooseList);
    document.querySelector('#main').appendChild(listDropdownMenu);
    document.querySelectorAll('#main > ul.list-selector > div.groupDiv > div.taskGroup > img.vertical-dots').forEach(dot => {dot.remove();});
}

function handleClickOutside(e) {
    if (!document.querySelector('#main > ul > div.groupDiv').contains(e.target)) {
        document.querySelector('#main').removeChild(document.querySelector('#main>ul>div.groupDiv').parentNode);
        document.removeEventListener('click', handleClickOutside, true);
    }
    else {document.removeEventListener('click', handleClickOutside, true);}
}

function listSelected() {
    if (document.querySelector('.list-name')) {document.querySelector('div.add-task-div').removeChild(document.querySelector('.list-name'));}
    list = listsData.find(item => item.name === event.target.closest('p').textContent)
    const listDropdownMenu = document.querySelector('#main>ul>div.groupDiv').parentNode;
    document.querySelector('#main').removeChild(listDropdownMenu);
    const listName = document.createElement('p')
    listName.textContent = list.name
    listName.style.padding = '5px'
    listName.style.backgroundColor = '#3b3b3b'
    listName.style.color = 'white'
    listName.classList.add('list-name')
    document.querySelector('div.add-task-div').insertBefore(listName, document.querySelector('div.add-task-div').children[1])
    document.querySelector('#add-task').focus()
    document.removeEventListener('click', handleClickOutside, true)
}

function inputRepeatClicked() {
    console.log('clicked')
    document.addEventListener('click', handleClickOutsideForRepeat, true);
    if (!document.querySelector('ul.repetetion-list')) {
        const repetitionList = document.createElement('ul');
        repetitionList.className = 'repetetion-list';
        repetitionList.innerHTML = 
            `<li>Daily</li>
            <li>Weekdays</li>
            <li>Weekly</li>
            <li>Monthly</li>
            <li>Yearly</li>
            <li>Custom</li>
            <li>Never</li>`
        document.getElementById('main').appendChild(repetitionList);
        repetitionList.style.position = 'fixed'
        repetitionList.style.bottom = document.querySelector('div.add-task-div').clientHeight + 'px'
        repetitionList.style.right = `calc(5% + 0.5em + 20px)`;
        repetitionList.style.zIndex = '1000'
        repetitionList.style.backdropFilter = 'opaque'
        repetitionList.style.backfaceVisibility = 'hidden'
        repetitionList.addEventListener('click', repeatSelected)
    }
}

function repeatSelected() {
    const selected = event.target.closest('li').textContent
    if (selected != 'Custom') {
        document.removeEventListener('click', handleClickOutsideForRepeat, true);
        repeat = selected
        document.querySelector('#main').removeChild(document.querySelector('.repetetion-list'))
        document.querySelector('#add-task').focus()
        if(document.querySelector('.selected-repetition')) {document.querySelector('#main > div.add-task-div').removeChild(document.querySelector('.selected-repetition'))}
        const selectedRepetition = document.createElement('p')
        selectedRepetition.textContent = repeat;
        selectedRepetition.classList.add('selected-repetition')
        selectedRepetition.style.backgroundColor = '#3b3b3b'
        selectedRepetition.style.alignContent = 'center'
        selectedRepetition.style.color = 'white'
        document.querySelector('div.add-task-div').insertBefore(selectedRepetition, document.querySelector('img.input-repeat'))
    }
    if (selected == 'Custom') {
        document.removeEventListener('click', handleClickOutsideForRepeat, true);
        document.querySelector('#main').removeChild(document.querySelector('.repetetion-list'))
        const customRepetitionList = document.createElement('ul');
        customRepetitionList.className = 'custom-repetetion-list';
        customRepetitionList.innerHTML = `
        <div style="border: 1px solid #3b3b3b; padding: 5px; border-radius: 8px">
        <p>Repeat Every...</p>
        <div>
            <input type="number" id="quantity" name="quantity" min="1">
            <select name="repeat" id="repeat">
                <option value="Days">Days</option>
                <option value="Weeks">Weeks</option>
                <option value="Months">Months</option>
                <option value="Years">Years</option>
            </select>
        </div>
        <div style="margin-top: 8px; display: flex; gap: 8px;"><button class="cancel" style="cursor:pointer;">Cancel</button><button class="submit" style="cursor: pointer;">Submit</button></div>
        </div>`
        document.getElementById('main').appendChild(customRepetitionList);
        customRepetitionList.style.position = 'fixed'
        customRepetitionList.style.bottom = document.querySelector('div.add-task-div').clientHeight + 'px'
        customRepetitionList.style.right = `calc(5% + 0.5em + 20px)`;
        document.querySelector('.submit').addEventListener('click', customRepeatSelected)
        document.querySelector('.cancel').addEventListener('click', customRepeatSelected)
    }
}

function customRepeatSelected() {
    if (event.target.closest('button').textContent == 'Submit') {
        repeat = 'Every ' + document.getElementById('quantity').value + ' ' + document.getElementById('repeat').value
    }
    if (event.target.closest('button').textContent == 'Cancel') {
        document.querySelector('.custom-repetetion-list')?.remove();
        document.querySelector('.repetetion-list')?.remove();
        document.removeEventListener('click', handleClickOutsideForRepeat, true)
        document.querySelector('.custom-repetetion-list')?.remove();
        document.querySelector('.repetetion-list')?.remove();
        return
    }
    document.querySelector('#main').removeChild(document.querySelector('ul.custom-repetetion-list'))
    if(document.querySelector('.selected-repetition')) {document.querySelector('#main > div.add-task-div').removeChild(document.querySelector('.selected-repetition'))}
    const selectedRepetition = document.createElement('p')
    selectedRepetition.textContent = repeat.substring(6);
    selectedRepetition.classList.add('selected-repetition')
    selectedRepetition.style.backgroundColor = '#3b3b3b'
    selectedRepetition.style.alignContent  = 'center'
    selectedRepetition.style.color = 'white'
    selectedRepetition.style.whiteSpace = 'nowrap'
    document.querySelector('div.add-task-div').insertBefore(selectedRepetition, document.querySelector('img.input-repeat'))
    document.removeEventListener('click', handleClickOutsideForRepeat, true)

    document.querySelector('.custom-repetetion-list')?.remove();
    document.querySelector('.repetetion-list')?.remove();
}

function handleClickOutsideForRepeat(e) {
    const repetitionList = document.querySelector('.repetetion-list');
    const customList = document.querySelector('.custom-repetition-list');

    if (!repetitionList?.contains(e.target)) {
        repetitionList?.remove()
        customList?.remove();
        document.removeEventListener('click', handleClickOutsideForRepeat, true);
    }
}