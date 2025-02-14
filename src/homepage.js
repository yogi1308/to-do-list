import { tasks, tasksData } from './tasks-data.js';
import {displayTodayTasks} from './my-day.js'
import {format} from 'date-fns'
import sidebarIcon from './images/sidebar.svg'
import flag from './images/flag.svg';
import blueFlag from './images/blue-flag.svg';
import redFlag from './images/red-flag.svg';
import orangeFlag from './images/orange-flag.svg';
import star from './images/star.svg'
import filledStar from './images/filled-star.svg'
import {chooseDisplay, displayLists, dispalyAddListsAndLabels} from './sidebar.js'

let currentDate = new Date()
console.log(currentDate)
let currentDay = format(currentDate, 'eeee')
export {homePage, header, currentDate, currentDay}
let priority = ''
let important = undefined
let list = 'Tasks'
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
    priority = ''
    important = undefined
    list = 'Tasks'
    date = undefined
    repeat = undefined
    let view = document.querySelector('.header > h2').textContent
    chooseDisplay(view);
    document.querySelector('#sidebar').removeChild(document.querySelector('.groupDiv'))
    document.querySelector('#sidebar').removeChild(document.querySelector('.sidebar-footer'))
    displayLists()
    dispalyAddListsAndLabels()
    removeDateFromTaskabar()
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
    if (dropdown.classList.contains('hidden')) {
        // Temporarily display the dropdown to measure its height
        dropdown.classList.remove('hidden');
        const bottomPosition = document.querySelector('div.add-task-div').clientHeight + 'px'
        dropdown.style.position = 'absolute'
        dropdown.style.bottom = bottomPosition
        dropdown.style.right = '5%'
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
    }
}

function removeDateFromTaskabar() {
    const existingStyle = document.getElementById('date-valid-styles');
    if (existingStyle) {
        existingStyle.remove();
    }
}

