//need to add notes to each tasks
// enable users to view previous and next week in this week, change the display for this week

import myDay from './images/my-day.svg';
import star from './images/star.svg';
import completed from './images/completed.svg';
import all from './images/all.svg'
import { tasksData, lists, listsData } from './tasks-data.js';
import listIcon from './images/group.svg'
import {header} from './homepage.js';
import flag from './images/flag.svg';
import blueFlag from './images/blue-flag.svg';
import redFlag from './images/red-flag.svg';
import orangeFlag from './images/orange-flag.svg';
import down from './images/down.svg';
import up from './images/up.svg';
import calender from './images/calender.svg'
import monthCalender from './images/month-calender.svg'
import addIcon from './images/add.svg'
import newLabel from './images/new-label.svg'
import homeIcon from './images/home.svg'

import { currentDate } from './homepage.js';
import {displayWeekTasks} from './this-week.js'
import {displayMonthTasks, setPlusMinusMonthsToZero} from './this-month.js'
import {displayTodayTasks} from './my-day.js'
import {displayTask} from './display-tasks.js'

export { sidebar, displayTask, view, changeHeader, chooseDisplay, displayLists, dispalyAddListsAndLabels};

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
    const sidebarItems = [{name: 'My Day',svg: myDay,},{name: 'This Week', svg: calender}, {name: 'This Month', svg: monthCalender}, {name: 'Important', svg: star}, {name: 'Completed', svg: completed}, {name: 'All', svg: all}, {name: 'Priority', svg: flag}];
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
    dispalyAddListsAndLabels()
}

function displayLists() {
    const sidebar = document.querySelector('#sidebar')
    const groupDiv = document.createElement('div')
    groupDiv.classList.add('groupDiv')
    groupDiv.style.height = `calc(100vh - 2.5em - ${document.querySelector('.sidebar-list').clientHeight}px)`;
    const groupArray = []
    listsData.forEach(list => {
        if (!groupArray.includes(list)) {groupArray.push(list);}
    });
    
    groupArray.forEach(list => {
        const taskGroup = document.createElement('div');
        taskGroup.classList.add('taskGroup');
        const groupIcon = document.createElement('img');
        groupIcon.src = listIcon;
        const groupName = document.createElement('p');
        groupName.textContent = list.name;
        taskGroup.appendChild(groupIcon);
        taskGroup.appendChild(groupName);
        groupDiv.appendChild(taskGroup);
        taskGroup.addEventListener('click', groupSort)
    })
    sidebar.appendChild(groupDiv);
    groupDiv.style.height = `calc(100vh - 2.5em ${document.querySelector('.sidebar-list').clientHeight}px)`;
    document.querySelector('.groupDiv').firstChild.querySelector('img').src = homeIcon
    return groupDiv
}

export function groupSort(event) {
    let list = '';
    if (event == document.querySelector('.header > h2').textContent) {list = event}
    else {list = event.target.closest('.taskGroup').querySelector('p').textContent;}
    document.querySelector('.task-list').textContent = ''
    tasksData.forEach(task => {
        if (task.list.name == list) {displayTask(task);}
    });
    if (list == 'Tasks') {changeHeader(list, homeIcon)}
    else {changeHeader(list, listIcon)}
}

function chooseDisplay(item) {
    if (item == 'My Day') {document.querySelector('.task-list').textContent = ''; document.querySelector('#main').removeChild(document.querySelector('.header')); header();displayTodayTasks()}
    else if (item == 'Important') {document.querySelector('.task-list').textContent = ''; tasksData.forEach(task => {if (task.important) {displayTask(task);}});changeHeader(item, star); view = 'Important'}
    else if (item == 'Completed') {document.querySelector('.task-list').textContent = ''; tasksData.forEach(task => {if (task.completed) {displayTask(task);}});changeHeader(item, completed); view = 'Completed'}
    else if (item == 'All') {document.querySelector('.task-list').textContent = ''; tasksData.forEach(task => {displayTask(task);}); changeHeader(item, all); view = 'All'}
    else if (item == 'Priority') {if (!priorityDisplayListView) {choosePriorityDisplayList(); priorityDisplayListView = true;} else {document.querySelector('.priority-types-list').remove(); priorityDisplayListView = false; document.querySelector('.dropdown-icon').src = down;const groupDiv = document.querySelector('.groupDiv');groupDiv.style.height = `calc(100vh - 2.5em${document.querySelector('.sidebar-list').clientHeight}px)`;}}
    else if (item == 'This Week') {document.querySelector('.task-list').textContent = ''; changeHeader(item, calender); displayWeekTasks(currentDate);view = 'This Week'}
    else if (item == 'This Month') {document.querySelector('.task-list').textContent = ''; changeHeader(item, monthCalender); view = 'This Month'; setPlusMinusMonthsToZero(); displayMonthTasks(currentDate);}
}

function changeHeader(item, icon) {
    const header = document.querySelector('.header');
    header.innerHTML = `<img src=${icon} class='headerIcon'></img><h2>${item}</h2>`;
    header.style.display = 'flex'
    header.style.gap = '20px'
    header.style.marginBottom = '10px'
    document.querySelector('.headerIcon').style.width = '1.9rem'
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
    groupDiv.style.height = `calc(100vh - 2.5em ${document.querySelector('.sidebar-list').clientHeight}px)`;
}

function displayPriorityTasks(event){
    let priorityType = event.target.closest('.priority-type').textContent
    document.querySelector('.task-list').textContent = '';
    tasksData.forEach(task => {
        if (task.priority == priorityType) {
            displayTask(task) ;
        }
    }
    )
    if (priorityType == 'Low') {changeHeader(priorityType + ' Priority', blueFlag); view = 'Priority';}
    else if (priorityType == 'Medium') {changeHeader(priorityType + ' Priority', orangeFlag); view = 'Priority';}    
    else if (priorityType == 'High') {changeHeader(priorityType + ' Priority', redFlag); view = 'Priority';}
}

function dispalyAddListsAndLabels() {
    const sidebar = document.querySelector('#sidebar');
    const sidebarFooter = document.createElement('div');
    sidebarFooter.classList.add('sidebar-footer')
    const newList = document.createElement('img');
    newList.src = addIcon;
    newList.classList.add('new-list');
    newList.addEventListener('click', addList);
    sidebarFooter.appendChild(newList);
    const newLabelIcon = document.createElement('img');
    newLabelIcon.src = newLabel;
    newLabelIcon.classList.add('new-group');
    newLabelIcon.addEventListener('click', addLabel);
    sidebarFooter.appendChild(newLabelIcon);
    sidebar.appendChild(sidebarFooter)
}

function addList() {
    let newList = new lists()
    console.log(listsData)
    document.querySelector('#sidebar').removeChild(document.querySelector('.groupDiv'))
    document.querySelector('#sidebar').removeChild(document.querySelector('.sidebar-footer'))
    displayLists()
    dispalyAddListsAndLabels()
    let lastList = document.querySelector('div.groupDiv').lastChild.querySelector('p')
    const textarea = document.createElement("textarea");
    textarea.value = 'Untitled List';
    textarea.style.width = "100%";
    textarea.style.height = "auto";
    lastList.replaceWith(textarea)
    textarea.focus();
    textarea.select();
    textarea.style.backgroundColor = '#3b3b3b'
    textarea.style.color = 'white'
    textarea.addEventListener("keypress", (event) => {if (event.key === 'Enter') {setLatestListName()}});
}
    

function setLatestListName() {
    const textarea = document.querySelector('textarea')
    const newTitle = textarea.value.trim();
        if (newTitle) {
            listsData[listsData.length - 1].name = newTitle;
            const newTitleElement = document.createElement("p");
            newTitleElement.textContent = newTitle;
            newTitleElement.style.wordBreak = "break-word";
            if (textarea) {textarea.replaceWith(newTitleElement)}
        } 
        else {
            // If the new title is empty, revert to the original title
            textarea.replaceWith(titleElement)
        }
    textarea.removeEventListener('keypress', setLatestListName);
}

function addLabel() {

}

