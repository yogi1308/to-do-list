import myDay from './images/my-day.svg';
import star from './images/star.svg';
import filledStar from './images/filled-star.svg';
import completed from './images/completed.svg';
import completedFilled from './images/completed-filled.svg';
import all from './images/all.svg'
import { tasks, tasksData } from './tasks-data.js';
import listIcon from './images/group.svg'
import {header} from './homepage.js';
import flag from './images/flag.svg';
import blueFlag from './images/blue-flag.svg';
import redFlag from './images/red-flag.svg';
import orangeFlag from './images/orange-flag.svg';
import down from './images/down.svg';
import up from './images/up.svg';

export { sidebar, displayTask };

let view = ''
let priorityDisplayListView = false;

function sidebar() {
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
    const sidebarItems = [{name: 'My Day',svg: myDay,}, {name: 'Important', svg: star}, {name: 'Completed', svg: completed}, {name: 'All', svg: all}, {name: 'Priority', svg: flag}];
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
            chooseDisplay(item.name);
        });
        if (item.name == 'Priority') {
            const dropdownIcon = document.createElement('img');
            dropdownIcon.src = down;
            dropdownIcon.classList.add('dropdown-icon');
            sidebarItemDiv.appendChild(dropdownIcon)
        }
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
    changeHeader(group, listIcon)
}

function chooseDisplay(item) {
    if (item == 'My Day') {document.querySelector('.task-list').textContent = ''; document.querySelector('#main').removeChild(document.querySelector('.header')); header()}
    else if (item == 'Important') {document.querySelector('.task-list').textContent = ''; tasksData.forEach(task => {if (task.important) {displayTask(task);}});changeHeader(item, star); view = 'Important'}
    else if (item == 'Completed') {document.querySelector('.task-list').textContent = ''; tasksData.forEach(task => {if (task.completed) {displayTask(task);}});changeHeader(item, completed); view = 'Completed'}
    else if (item == 'All') {document.querySelector('.task-list').textContent = ''; tasksData.forEach(task => {displayTask(task);}); changeHeader(item, all)}
    else if (item == 'Priority') {if (!priorityDisplayListView) {choosePriorityDisplayList(); priorityDisplayListView = true;} else {document.querySelector('.priority-types-list').remove(); priorityDisplayListView = false; document.querySelector('.dropdown-icon').src = down;const groupDiv = document.querySelector('.groupDiv');groupDiv.style.height = `calc(100vh - ${document.querySelector('.sidebar-list').clientHeight}px)`;}}
}

function changeHeader(item, icon) {
    const header = document.querySelector('.header');
    header.innerHTML = `<img src=${icon} class='headerIcon'></img><h2>${item}</h2>`;
    header.style.display = 'flex'
    header.style.gap = '20px'
    header.style.marginBottom = '10px'
    document.querySelector('.headerIcon').style.width = '1.9rem'
}


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
    taskItemGroup.textContent = task.group;
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
    if (task.priority == "") {flagIcon.src = flag;} else if (task.priority == 'Low') {flagIcon.src = blueFlag;} else if (task.priority == 'High') {flagIcon.src = redFlag} else if (task.priority == 'Medium') {flagIcon.src = orangeFlag}
    flagIcon.classList.add('flag-icon');
    flagIcon.addEventListener('click', priorityChanged)

    taskItemRight.appendChild(flagIcon);
    taskItemRight.appendChild(taskStarIcon);
    taskItem.appendChild(taskItemLeft);
    taskItem.appendChild(taskItemRight);
    taskList.appendChild(taskItem);
    main.appendChild(taskList);
}

function completionStatusChanged() {
    const taskName = this.closest('.task-item').querySelector('.task-item-name').textContent;
    tasksData.forEach(task => {
        if (task.task == taskName) {
            if (task.completed) {task.completed = false; this.src = completed; this.style.paddingLeft = '0px'; this.style.width = '1.5em'; if (view == 'Completed'){this.closest('.task-item').remove();}}
            else {task.completed = true; this.src = completedFilled; ;this.style.width = '1.35em'; this.style.paddingLeft = '2px'}
        }
    });
}

function importanceChanged() {
    const taskName = this.closest('.task-item').querySelector('.task-item-name').textContent;
    tasksData.forEach(task => {
        if (task.task == taskName) {
            if (task.important) {task.important = false; this.src = star; if (view == 'Important') {this.closest('.task-item').remove();}}
            else {task.important = true; this.src = filledStar;}
        }
    });

}

function priorityChanged(){
    const taskName = this.closest('.task-item').querySelector('.task-item-name').textContent;
    tasksData.forEach(task => {
        if (task.task == taskName) {
            if (task.priority == "") {task.priority = 'Low'; this.src = blueFlag;}
            else if (task.priority == 'Low') {task.priority = 'Medium'; this.src = orangeFlag;}
            else if (task.priority == 'Medium') {task.priority = 'High'; this.src = redFlag;}
            else if (task.priority == 'High') {task.priority = ""; this.src = flag;}
        }
    });
}

function choosePriorityDisplayList() {
    const sidebarList = document.querySelector('.sidebar-list');
    const priorityTypesList = document.createElement('div');
    priorityTypesList.classList.add('priority-types-list');
    priorityTypesList.style.paddingLeft = '10px'
    const priorityTypes = [{name:'Low', icon: blueFlag}, {name: 'Medium', icon: orangeFlag}, {name: 'High', icon: redFlag}];
    priorityTypes.forEach(priority => {
        const priorityType = document.createElement('div');
        priorityType.classList.add('priority-type');
        priorityType.style.display = 'flex';
        priorityType.style.gap = '10px'
        const priorityIcon = document.createElement('img');
        priorityIcon.src = priority.icon;
        const priorityName = document.createElement('p');
        priorityName.textContent = priority.name;
        priorityType.appendChild(priorityIcon);
        priorityType.appendChild(priorityName);
        priorityTypesList.appendChild(priorityType);
        priorityType.addEventListener('click', displayPriorityTasks)
        priorityType.style.cursor = 'pointer';
    });
    sidebarList.appendChild(priorityTypesList);
    const dropdownIcon = document.querySelector('.dropdown-icon');
    dropdownIcon.src = up;

    const groupDiv = document.querySelector('.groupDiv');
    groupDiv.style.height = `calc(100vh - ${document.querySelector('.sidebar-list').clientHeight}px)`;
}

function displayPriorityTasks(event){
    let priorityType = event.target.closest('.priority-type').textContent
    document.querySelector('.task-list').textContent = '';
    tasksData.forEach(task => {
        if (task.priority == priorityType) {
            displayTask(task) ;changeHeader(priorityType + ' Priority', flag); view = 'Priority';
        }
    }
    )
}