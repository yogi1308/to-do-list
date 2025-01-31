import myDay from './images/my-day.svg';
import star from './images/star.svg';
import completed from './images/completed.svg';
import all from './images/all.svg'
import { tasks, tasksData } from './tasks-data.js';
import listIcon from './images/group.svg'

export default function sidebar() {
    const sidebar = document.querySelector('#sidebar');
    const sidebarList = document.createElement('div');
    sidebarList.classList.add('sidebar-list');
    sidebar.appendChild(sidebarList)
    displaySearchBar();
    sidebarItems();
}

function displaySearchBar() {
    const sidebar = document.querySelector('#sidebar');
    const sidebarList = document.querySelector('.sidebar-list');
    const searchBar = document.createElement('input');
    searchBar.type = 'text';
    searchBar.id = 'search-bar';
    searchBar.placeholder = 'Search';
    sidebarList.appendChild(searchBar);
    sidebar.appendChild(sidebarList);
}

function sidebarItems() {
    const sidebarList = document.querySelector('.sidebar-list');
    const sidebarItems = [{name: 'My Day',svg: myDay,}, {name: 'Important', svg: star}, {name: 'Completed', svg: completed}, {name: 'All', svg: all},];
    sidebarItems.forEach(item => {
        const sidebarItemDiv = document.createElement('div');
        sidebarItemDiv.classList.add('sidebar-item-div');
        const sidebarItemIcon = document.createElement('div');
        sidebarItemIcon.classList.add('sidebar-item-icon');
        sidebarItemIcon.innerHTML = `<img src=${item.svg}>`;
        const sidebarItemName = document.createElement('p');
        sidebarItemName.textContent = item.name;
        sidebarItemDiv.appendChild(sidebarItemIcon);
        sidebarItemDiv.appendChild(sidebarItemName);
        sidebarList.appendChild(sidebarItemDiv);
        sidebarItemDiv.addEventListener('click', () => {
            const taskList = document.querySelector('.task-list');taskList.textContent = '';
            chooseDisplay(item.name);
        });
    });
    displayLists()
}

function displayLists() {
    const sidebar = document.querySelector('#sidebar')
    const groupDiv = document.createElement('div')
    groupDiv.classList.add('groupDiv')
    groupDiv.style.height = `calc(100vh - ${document.querySelector('.sidebar-list').clientHeight}px)`;
    const groupArray = []
    tasksData.forEach(task => {
        if (!groupArray.includes(task.group)) {groupArray.push(task.group);}
    });
    
    groupArray.forEach(group => {
        const taskGroup = document.createElement('div');
        taskGroup.classList.add('taskGroup');
        const groupIcon = document.createElement('img');
        groupIcon.src = listIcon;
        const groupName = document.createElement('p');
        groupName.textContent = group;
        taskGroup.appendChild(groupIcon);
        taskGroup.appendChild(groupName);
        groupDiv.appendChild(taskGroup);
        taskGroup.addEventListener('click', groupSort)
    })
    sidebar.appendChild(groupDiv);
}

function groupSort(event) {
    const group = event.target.closest('.taskGroup').querySelector('p').textContent;
    document.querySelector('.task-list').textContent = ''
    tasksData.forEach(task => {
        if (task.group == group) {displayTask(task);}
    });
}

function chooseDisplay(item) {
    if (item == 'My Day') {}
    else if (item == 'Important') {tasksData.forEach(task => {if (task.important) {displayTask(task);}});}
    else if (item == 'Completed') {tasksData.forEach(task => {if (task.completed) {displayTask(task);}});}
    else if (item == 'All') {tasksData.forEach(task => {displayTask(task);});}
}


function displayTask(task) {
    const main = document.querySelector('#main');
    const taskList = document.querySelector('.task-list');
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
    main.appendChild(taskList);
}

