import { tasks, tasksData } from './tasks-data.js';
export default function homePage() {
    console.log('home page');
    taskBar();
    header();
    taskList();
    window.addEventListener('resize', adjustAddTaskDivWidth);
}

function taskBar() {
    const main = document.querySelector('#main');
    const addtaskDiv = document.createElement('div');
    addtaskDiv.classList.add('add-task-div');
    const addTask = document.createElement('input');
    addTask.type = 'text';
    addTask.id = 'add-task';
    addTask.placeholder = 'Add a task';
    addtaskDiv.style.width = (main.clientWidth * 0.885) + 'px';
    addTask.style.width = '100%';
    addtaskDiv.appendChild(addTask);
    main.appendChild(addtaskDiv);
}

function adjustAddTaskDivWidth() {
    const main = document.querySelector('#main');
    const addtaskDiv = document.querySelector('.add-task-div');
    const addTask = document.querySelector('#add-task');
    addtaskDiv.style.width = (main.clientWidth * 0.9) + 'px';
    addTask.style.width = '100%';
}

function taskList() {
    const main = document.querySelector('#main');
    const taskList = document.createElement('div');
    taskList.classList.add('task-list');
    tasksData.forEach(task => {
        const taskItem = document.createElement('div');
        taskItem.classList.add('task-item');
        taskItem.textContent = task.task;
        taskList.appendChild(taskItem);
    });
    main.appendChild(taskList);
}

function header() {
    const main = document.querySelector('#main');
    const header = document.createElement('div');
    header.classList.add('header');
    header.innerHTML = '<h2>My Day</h2><p>Wedneseday, 29 January<p>';
    main.appendChild(header);
}