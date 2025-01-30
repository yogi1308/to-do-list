import { tasks, tasksData } from './tasks-data.js';
export default function homePage() {
    console.log('home page');
    taskBar();
    header();
    displayTaskList();
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
    tasksData.forEach(task => {
        const taskItem = document.createElement('div');
        const taskItemName = document.createElement('p');
        const taskItemGroup = document.createElement('p');
        taskItemGroup.classList.add('task-item-group');
        taskItemName.classList.add('task-item-name')
        taskItem.classList.add('task-item');
        taskItemName.textContent = task.task;
        taskItemGroup.textContent = task.group;
        taskItem.appendChild(taskItemName);
        taskItem.appendChild(taskItemGroup);
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