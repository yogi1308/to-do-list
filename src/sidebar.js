//need to add notes to each tasks
// enable users to view previous and next week in this week, change the display for this week

import myDay from './images/my-day.svg';
import star from './images/star.svg';
import completed from './images/completed.svg';
import all from './images/all.svg'
import { tasksData, lists, listsData, updateLocalStorage} from './tasks-data.js';
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
import verticalDotsIcon from './images/three-vertical-dots.svg'

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
    searchBar.addEventListener('input', searchTasks)
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
    updateLocalStorage()
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
        if (listsData.includes(list)) {groupIcon.src = listIcon;}
        const groupName = document.createElement('p');
        groupName.textContent = list.name;

        const vertDots = document.createElement('img')
        vertDots.src = verticalDotsIcon;
        vertDots.classList.add('vertical-dots')

        taskGroup.appendChild(groupIcon);
        taskGroup.appendChild(groupName);
        groupDiv.appendChild(taskGroup);
        taskGroup.appendChild(vertDots)
        groupName.addEventListener('click', groupSort)
        vertDots.addEventListener('click', verticalDotsClicked)
    })
    sidebar.appendChild(groupDiv);
    groupDiv.style.height = `calc(100vh - 2.5em ${document.querySelector('.sidebar-list').clientHeight}px)`;
    updateLocalStorage()
    return groupDiv
}

export function groupSort(event) {
    if (document.querySelector('textarea')) return
    let list = '';
    if (event == document.querySelector('.header > h2').textContent) {list = event}
    else {list = event.target.closest('p').textContent;}
    document.querySelector('.task-list').textContent = ''
    tasksData.forEach(task => {
        if (task.list == undefined) {}
        else if (task.list.name == list) {displayTask(task);}
    });
    changeHeader(list, listIcon);
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
    const storedTasksData = JSON.parse(localStorage.getItem('tasksData')) || [];
    storedTasksData.forEach(task => {
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
    sidebar.appendChild(sidebarFooter)
}

function addList() {
    let newList = new lists()
    console.log(listsData)
    document.querySelector('#sidebar').removeChild(document.querySelector('.groupDiv'))
    document.querySelector('#sidebar').removeChild(document.querySelector('.sidebar-footer'))
    updateLocalStorage()
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
    textarea.keypressHandler = (event) => {
        if (event.key === 'Enter') {

            setLatestListName(undefined);
        }
    };
    textarea.addEventListener("keypress", textarea.keypressHandler);    
    textarea.addEventListener("blur", setLatestListName)
    updateLocalStorage()
}
    

function setLatestListName(listSlashLabelName) {
    const textarea = document.querySelector('textarea');
    const baseTitle = textarea.value.trim();
    const keypressHandler = (event) => {
        if (event.key === 'Enter') {
            updateLocalStorage()
            setLatestListName(listSlashLabelName);
        }
    };
    textarea.removeEventListener('keypress', textarea.keypressHandler);
    textarea.removeEventListener('blur', setLatestListName);

    if (baseTitle) {
        // Start with the base title
        let newTitle = baseTitle;
        let suffix = 1;
        // Check other lists (all except the new one at the end)
        while (listsData.slice(0, listsData.length - 1).some(list => list.name === newTitle)) {newTitle = `${baseTitle} (${suffix})`;suffix++;}
        listsData[listsData.length - 1].name = newTitle;
        const newTitleElement = document.createElement("p");
        newTitleElement.textContent = newTitle;
        newTitleElement.style.wordBreak = "break-word";
        textarea.replaceWith(newTitleElement);
        newTitleElement.addEventListener('click', groupSort)
        updateLocalStorage()
    } else {
        // If the new title is empty, revert to the original title (assuming titleElement exists)
        const newTitleElement = document.createElement("p");
        if (listSlashLabelName == undefined) {listSlashLabelName = 'Untitled List'}
        let newTitle = listSlashLabelName;
        let suffix = 1;
        // Check other lists (all except the new one at the end)
        while (listsData.slice(0, listsData.length - 1).some(list => list.name === newTitle)) {newTitle = `${listSlashLabelName} (${suffix})`;suffix++;}
        newTitleElement.textContent = newTitle;
        newTitleElement.style.wordBreak = "break-word";
        textarea.replaceWith(newTitleElement);
        newTitleElement.addEventListener('click', groupSort)
        listsData[listsData.length - 1].name = newTitle;
        updateLocalStorage()
    }
    updateLocalStorage()

}
  
function verticalDotsClicked() {
    const listSlashLabelName = event.target.parentElement.querySelector('p').textContent.trim();
    if (listsData.find(item => item.name === listSlashLabelName)) { 
        console.log('Match found'); 
        listDotsClicked(listSlashLabelName)
    }
    updateLocalStorage()
}

function listDotsClicked(listSlashLabelName) {
    const listOptionsUl = document.createElement('ul');
    listOptionsUl.classList.add('list-options-ul');
    listOptionsUl.innerHTML = `<li class="delete-list">Delete List</li>
                                <li class="delete-list-with-tasks">Delete with Tasks</li>
                                <li class="change-list-name">Change List Name</li>`
    document.querySelector('#content').appendChild(listOptionsUl)
    listOptionsUl.style.position = 'fixed'
    const rect = event.target.getBoundingClientRect();
    const yPos = window.scrollY + rect.top - 60;
    listOptionsUl.style.top = yPos + 'px';
    listOptionsUl.style.left = `calc(10px + ${document.querySelector('#sidebar').clientWidth}px)`
    listOptionsUl.style.zIndex = '10000'
    listOptionsUl.style.border = '2px solid #3b3b3b'
    listOptionsUl.style.padding = '5px'
    listOptionsUl.style.borderRadius = '8px'
    listOptionsUl.style.listStyle = 'none'
    listOptionsUl.style.backgroundColor = '#1c1c1c'
    listOptionsUl.style.color = '#788cde'
    listOptionsUl.style.cursor = 'pointer'
    updateLocalStorage()
    document.querySelector('.delete-list').addEventListener('click', () => deleteList(listSlashLabelName))
    document.querySelector('.delete-list-with-tasks').addEventListener('click', () => deleteListsWithTasks(listSlashLabelName))
    document.querySelector('.change-list-name').addEventListener('click', (e) => changeListName(e, listSlashLabelName))
    document.addEventListener('click', clickedOutsidelistOptionsUl, true)
    updateLocalStorage()
}

function deleteList(listSlashLabelName) {
    const existingTasksObject = listsData.find(item => item.name === 'Tasks');
    tasksData.forEach(task => {
        if (task.list == undefined) {}
        else if (task.list.name == listSlashLabelName) {task.list = undefined; displayTask(task);}
    })
    const indexList = listsData.findIndex(list => list.name === listSlashLabelName);

    // If found, remove it using splice()
    if (indexList !== -1) {
        listsData.splice(indexList, 1);
    }

    console.log('Updated listsData:', listsData);
    // listsAndLabelsData = listsAndLabelsData.filter(list => list.name !== listSlashLabelName)
    const groupDiv = document.querySelector('div.groupDiv');
    while (groupDiv.children.length > 1) {
        groupDiv.removeChild(groupDiv.lastChild);
    }
    updateLocalStorage()
    displayLists()
    document.querySelector('#sidebar > div:nth-child(3)').replaceWith(document.querySelector('#sidebar > div:nth-child(5)'))
}

function deleteListsWithTasks(listSlashLabelName) {
    for (let i = tasksData.length - 1; i >= 0; i--) {
        if (tasksData[i].list.name === listSlashLabelName) {
            tasksData.splice(i, 1);
        }
    }
    
    const indexList = listsData.findIndex(list => list.name === listSlashLabelName);

    // If found, remove it using splice()
    if (indexList !== -1) {
        listsData.splice(indexList, 1);
    }

    console.log('Updated listsData:', listsData);
    // listsAndLabelsData = listsAndLabelsData.filter(list => list.name !== listSlashLabelName)
    const groupDiv = document.querySelector('div.groupDiv');
    while (groupDiv.children.length > 1) {
        groupDiv.removeChild(groupDiv.lastChild);
    }
    updateLocalStorage()
    displayLists()
    document.querySelector('#sidebar > div:nth-child(3)').replaceWith(document.querySelector('#sidebar > div:nth-child(5)'))
}

function clickedOutsidelistOptionsUl() {
    document.querySelector('#content > ul.list-options-ul')?.remove();
    document.removeEventListener('click', clickedOutsidelistOptionsUl, true)
}

function changeListName(event, originalName) {
    const groupDiv = document.querySelector('div.groupDiv');
    groupDiv.querySelectorAll('div.taskGroup').forEach((child, idx) => {
      const pElement = child.querySelector('p');
      if (pElement && pElement.textContent.trim() === originalName) {
        // Create a textarea for editing
        const textarea = document.createElement("textarea");
        textarea.value = originalName;
        textarea.style.width = "100%";
        textarea.style.height = "auto";
        textarea.style.backgroundColor = '#3b3b3b';
        textarea.style.color = 'white';
        // Replace the <p> with the textarea
        pElement.replaceWith(textarea);
        textarea.focus();
        textarea.select();
        
        // Define the event handlers
        function keypressHandler(e) {
          if (e.key === 'Enter') {
            e.preventDefault();
            // Remove the blur handler so it doesn’t fire next
            textarea.removeEventListener("blur", blurHandler);
            setLatestListNamefromDotsClicked(idx, originalName, textarea.value.trim());
          }
        }
        
        function blurHandler(e) {
          // Remove the keypress handler to prevent double execution
          textarea.removeEventListener("keypress", keypressHandler);
          setLatestListNamefromDotsClicked(idx, originalName, textarea.value.trim());
        }
        
        // Attach both event handlers
        textarea.addEventListener("keypress", keypressHandler);
        textarea.addEventListener("blur", blurHandler);
      }
    });
    updateLocalStorage();
  }
  
  function setLatestListNamefromDotsClicked(index, originalName, newName) {
    const baseTitle = newName || originalName || 'Untitled List';
    let newTitle = baseTitle;
    let suffix = 1;
    // Check for duplicate names among all lists except the one being renamed.
    while (listsData.some((list, i) => i !== index && list.name === newTitle)) {
      newTitle = `${baseTitle} (${suffix})`;
      suffix++;
    }
    // Update the list name in memory.
    listsData[index].name = newTitle;
    
    // Create a new <p> element for the updated name.
    const newTitleElement = document.createElement("p");
    newTitleElement.textContent = newTitle;
    newTitleElement.style.wordBreak = "break-word";
    newTitleElement.addEventListener('click', groupSort);
    
    // Replace the textarea with the new <p> element if it still exists.
    const textarea = document.querySelector('textarea');
    if (textarea && textarea.parentNode) {
      textarea.replaceWith(newTitleElement);
    }
    
    updateLocalStorage();
  }
  

function searchTasks() {
    const search = document.querySelector('#search-bar').value;
    document.querySelector('.task-list').textContent = '';
    const storedTasksData = JSON.parse(localStorage.getItem('tasksData')) || [];
    storedTasksData.forEach(task => {
        if (task.task.toLowerCase().includes(search.toLowerCase())) {
            displayTask(task);
        }
    });
}
