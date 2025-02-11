import { tasks, tasksData } from './tasks-data.js';
import {displayTodayTasks} from './my-day.js'
import {format} from 'date-fns'
import sidebar from './images/sidebar.svg'

let currentDate = new Date()
console.log(currentDate)
let currentDay = format(currentDate, 'eeee')
export {homePage, header, currentDate, currentDay}

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
    tasksData.push(tasks(addTask.value));
    addTask.value = taskName;
    const taskList = document.querySelector('.task-list');
    const main = document.querySelector('#main');
    main.removeChild(taskList);
    displayTaskList();
    console.log(tasksData);
}

function sidebarDisplayOption() {
    const sidebarDiv = document.querySelector('#sidebar');
    const sidebarDisplay = document.createElement('img');
    sidebarDisplay.src = sidebar;
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