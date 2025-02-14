import { tasks, tasksData, listsData } from './tasks-data.js';
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
import {chooseDisplay, displayLists, dispalyAddListsAndLabels, groupSort} from './sidebar.js'

let currentDate = new Date()
console.log(currentDate)
let currentDay = format(currentDate, 'eeee')
export {homePage, header, currentDate, currentDay}
let priority = ''
let important = undefined
let list = listsData.find(item => item.name === 'Tasks');
let date = undefined
let repeat = undefined

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
    priority = ''
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
                document.removeEventListener('click', (event=> {document.removeEventListener()}));
            });
        }
    } else {
        dropdown.classList.add('hidden');
    }
}

function prioritySelected(event) {
    const chosenPriority = event.currentTarget.querySelector('span').textContent
    priority = chosenPriority.split(' ')[0]
    const flagIcon = document.querySelector('img.input-flag')
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
    console.log('clcicke')
    document.addEventListener('click', handleClickOutside, true);
    const listDropdownMenu = document.createElement('ul');
    listDropdownMenu.classList.add('list-selector')
    const chooseList = displayLists();
    chooseList.style.position = 'fixed';
    chooseList.style.bottom = `calc(${document.querySelector('div.add-task-div').clientHeight}px + 3px)`;
    chooseList.style.right = `calc(5% + 4 * 0.5em + 20px)`;
    chooseList.style.height = 'auto';
    chooseList.style.border = '1px solid #3b3b3b';
    chooseList.style.borderRadius = '8px';  
    chooseList.querySelectorAll('*').forEach(child => {child.removeEventListener('click', groupSort);});
    chooseList.querySelectorAll('*').forEach(child => {const paragraph = child.querySelector('p');if (paragraph) {paragraph.addEventListener('click', listSelected);}});
    listDropdownMenu.appendChild(chooseList);
    document.querySelector('#main').appendChild(listDropdownMenu);
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
    listName.classList.add('list-name')
    document.querySelector('div.add-task-div').insertBefore(listName, document.querySelector('div.add-task-div').children[1])
    document.querySelector('#add-task').focus()
    document.removeEventListener('click', handleClickOutside, true)
}

// function inputlistClicked(event) {
//     // Prevent the current click event from propagating further.
//     event.stopPropagation();
//     if (!document.querySelector('#main > ul > div.groupDiv')) {
//         const listDropdownMenu = document.createElement('ul');
//         const chooseList = displayLists();
//         chooseList.style.position = 'fixed';
//         chooseList.style.bottom = `calc(${document.querySelector('div.add-task-div').clientHeight}px + 3px)`;
//         chooseList.style.right = `calc(5% + 4 * 0.5em + 20px)`;
//         chooseList.style.height = 'auto';
//         chooseList.style.border = '1px solid #3b3b3b';
//         chooseList.style.borderRadius = '8px';  
//         chooseList.querySelectorAll('*').forEach(child => {child.removeEventListener('click', groupSort);});
//         chooseList.querySelectorAll('*').forEach(child => {const paragraph = child.querySelector('p');if (paragraph) {paragraph.addEventListener('click', listSelected);}});
//         listDropdownMenu.appendChild(chooseList);
//         document.querySelector('#main').appendChild(listDropdownMenu);
//         document.addEventListener('click', handleClickOutside, true);
//     }
//     else if (document.querySelector('#main > ul > div.groupDiv')) {
//         if (document.querySelector('#main > ul').classList.contains('hidden')) {
//             document.querySelector('#main > ul').classList.remove('hidden')
//             document.querySelector('#main > ul > div.groupDiv').style.display = 'block'
//             document.addEventListener('click', handleClickOutside, true);
//         }
//     }
//     // This listener uses capturing so it won't catch the event that opened the dropdown.
//     function handleClickOutside(e) {
//         if (!document.querySelector('#main > ul > div.groupDiv').contains(e.target)) {
//         document.querySelector('#main > ul').classList.add('hidden');
//         document.querySelector('#main > ul > div.groupDiv').querySelectorAll('*').forEach(child => {const paragraph = child.querySelector('p');if (paragraph) {paragraph.removeEventListener('click', listSelected);}});
//         document.removeEventListener('click', handleClickOutside, true);
//     }
//     }
// }
 
// function listSelected() {
//     if (document.querySelector('.list-name')) {document.querySelector('div.add-task-div').removeChild(document.querySelector('.list-name'));document.querySelector('#main > ul').classList.add('hidden'); document.querySelector('#add-task').focus(); document.querySelectorAll('#main > ul > div > p').forEach(element => {element.removeEventListener('click', listSelected)})}
//     list = listsData.find(item => item.name === event.target.closest('p').textContent)
//     const listDropdownMenu = document.querySelector('#main>ul>div.groupDiv').parentNode;
//     const chooseList = document.querySelector('#main>ul>div.groupDiv')
//     chooseList.style.display = 'none';
//     chooseList.querySelectorAll('*').forEach(child => {const paragraph = child.querySelector('p');if (paragraph) {paragraph.removeEventListener('click', listSelected);}});
//     const listName = document.createElement('p')
//     listName.textContent = list.name
//     listName.style.padding = '5px'
//     listName.style.backgroundColor = '#3b3b3b'
//     listName.classList.add('list-name')
//     document.querySelector('div.add-task-div').insertBefore(listName, document.querySelector('div.add-task-div').children[1])
//     document.querySelector('#add-task').focus()
// }

// // fix when list is selected list menu should disappear and if you are viewing a list it should get updated with the addedtask
