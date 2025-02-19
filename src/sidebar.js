//need to add notes to each tasks
// enable users to view previous and next week in this week, change the display for this week

import myDay from './images/my-day.svg';
import star from './images/star.svg';
import completed from './images/completed.svg';
import all from './images/all.svg'
import { tasksData, lists, listsData, Label, labelsData, listsAndLabelsData} from './tasks-data.js';
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
import labelIcon from './images/label.svg'
import verticalDotsIcon from './images/three-vertical-dots.svg'

import { currentDate } from './homepage.js';
import {displayWeekTasks} from './this-week.js'
import {displayMonthTasks, setPlusMinusMonthsToZero} from './this-month.js'
import {displayTodayTasks} from './my-day.js'
import {displayTask} from './display-tasks.js'

export { sidebar, displayTask, view, changeHeader, chooseDisplay, displayLists, dispalyAddListsAndLabels};

let view = ''
let priorityDisplayListView = false;

console.log(listsAndLabelsData)


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
    document.querySelector('#sidebar > div.groupDiv > div:nth-child(1) ').removeChild(document.querySelector('#sidebar > div.groupDiv > div:nth-child(1) > img.vertical-dots'))
    dispalyAddListsAndLabels()
}

function displayLists() {
    const sidebar = document.querySelector('#sidebar')
    const groupDiv = document.createElement('div')
    groupDiv.classList.add('groupDiv')
    groupDiv.style.height = `calc(100vh - 2.5em - ${document.querySelector('.sidebar-list').clientHeight}px)`;
    const groupArray = []
    listsAndLabelsData.forEach(list => {
        if (!groupArray.includes(list)) {groupArray.push(list);}
    });
    
    groupArray.forEach(list => {
        const taskGroup = document.createElement('div');
        taskGroup.classList.add('taskGroup');
        const groupIcon = document.createElement('img');
        if (listsData.includes(list)) {groupIcon.src = listIcon;}
        if (labelsData.includes(list)) {groupIcon.src = labelIcon;}
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
    document.querySelector('.groupDiv').firstChild.querySelector('img').src = homeIcon
    return groupDiv
}

export function groupSort(event) {
    if (document.querySelector('textarea')) return
    let list = '';
    if (event == document.querySelector('.header > h2').textContent) {list = event}
    else {list = event.target.closest('.taskGroup').querySelector('p').textContent;}
    document.querySelector('.task-list').textContent = ''
    tasksData.forEach(task => {
        if (task.list.name == list) {displayTask(task);}
    });
    if (list == 'Tasks') {tasksData.forEach(task => {
            if (task.list.label == list) {displayTask(task);}
        });}
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
    document.querySelector('#sidebar > div.groupDiv > div:nth-child(1) ').removeChild(document.querySelector('#sidebar > div.groupDiv > div:nth-child(1) > img.vertical-dots'))
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
            setLatestListName();
        }
    };
    textarea.addEventListener("keypress", textarea.keypressHandler);    
    textarea.addEventListener("blur", setLatestListName)
}
    

function setLatestListName() {
    const textarea = document.querySelector('textarea');
    const baseTitle = textarea.value.trim();
    const keypressHandler = (event) => {
        if (event.key === 'Enter') {
            setLatestListName();
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
    } else {
      // If the new title is empty, revert to the original title (assuming titleElement exists)
        textarea.replaceWith(titleElement);
    }

}
  

function addLabel() {
    let newList = new Label()
    console.log(labelsData)
    document.querySelector('#sidebar').removeChild(document.querySelector('.groupDiv'))
    document.querySelector('#sidebar').removeChild(document.querySelector('.sidebar-footer'))
    displayLists()
    document.querySelector('#sidebar > div.groupDiv > div:nth-child(1) ').removeChild(document.querySelector('#sidebar > div.groupDiv > div:nth-child(1) > img.vertical-dots'))
    dispalyAddListsAndLabels()
    let lastLabel = document.querySelector('div.groupDiv').lastChild.querySelector('p')
    const textarea = document.createElement("textarea");
    textarea.value = 'Untitled Label';
    textarea.style.width = "100%";
    textarea.style.height = "auto";
    lastLabel.replaceWith(textarea)
    textarea.focus();
    textarea.select();
    textarea.style.backgroundColor = '#3b3b3b'
    textarea.style.color = 'white'
    textarea.keypressHandler = (event) => {
        if (event.key === 'Enter') {
            setLatestLabelName();
        }
    };
    textarea.addEventListener("keypress", textarea.keypressHandler);    
    textarea.addEventListener("blur", setLatestLabelName)
}

function setLatestLabelName() {
    const textarea = document.querySelector('textarea');
    const baseTitle = textarea.value.trim();
    const keypressHandler = (event) => {
        if (event.key === 'Enter') {
            setLatestLabelName();
        }
    };
    textarea.removeEventListener('keypress', textarea.keypressHandler);
    textarea.removeEventListener('blur', setLatestLabelName);

    if (baseTitle) {
        // Start with the base title
        let newTitle = baseTitle;
        let suffix = 1;
        // Check other lists (all except the new one at the end)
        while (labelsData.slice(0, labelsData.length - 1).some(label => label.name === newTitle)) {newTitle = `${baseTitle} (${suffix})`;suffix++;}
        labelsData[labelsData.length - 1].name = newTitle;
        const newTitleElement = document.createElement("p");
        newTitleElement.textContent = newTitle;
        newTitleElement.style.wordBreak = "break-word";
        textarea.replaceWith(newTitleElement);
    } else {
      // If the new title is empty, revert to the original title (assuming titleElement exists)
        textarea.replaceWith(titleElement);
    }
}

function verticalDotsClicked() {
    const listSlashLabelName = event.target.parentElement.querySelector('p').textContent.trim();
    if (listsData.find(item => item.name === listSlashLabelName)) { 
        console.log('Match found'); 
        listDotsClicked(listSlashLabelName)
    }

    else if (labelsData.find(item => item.name === listSlashLabelName)) {
        console.log('Match found'); 
        labelDotsClicked(listSlashLabelName)
    }
}

function listDotsClicked(listSlashLabelName) {
    const listOptionsUl = document.createElement('ul');
    listOptionsUl.classList.add('list-options-ul');
    listOptionsUl.innerHTML = `<li class="delete-list">Delete List</li>
                                <li class="delete-list-with-tasks">Delete with Tasks</li>
        <li class="change-label">Change Label</li>`
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
    document.querySelector('.delete-list').addEventListener('click', () => deleteList(listSlashLabelName))
    document.querySelector('.change-label').addEventListener('click', (event) => changeLabel(listSlashLabelName, event))
    document.querySelector('.delete-list-with-tasks').addEventListener('click', () => deleteListsWithTasks(listSlashLabelName))
    document.addEventListener('click', clickedOutsidelistOptionsUl, true)
}

function labelDotsClicked(listSlashLabelName) {
    const listOptionsUl = document.createElement('ul');
    listOptionsUl.classList.add('list-options-ul');
    listOptionsUl.innerHTML = `<li class="delete-label">Delete Label</li> <li class="delete-label-with-lists">Delete with Lists</li>`
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
    document.querySelector('.delete-label').addEventListener('click', () => deleteLabel(listSlashLabelName))
    document.querySelector('.delete-label-with-lists').addEventListener('click', () => deleteLabelsWithLists(listSlashLabelName))
    document.addEventListener('click', clickedOutsidelistOptionsUl, true)
}

function deleteLabel(listSlashLabelName) {
    const existingTasksObject = listsData.find(item => item.name === 'Tasks');
    tasksData.forEach(task => {
        if (task.list.name == listSlashLabelName) {task.list = existingTasksObject;}
    })
    const indexList = labelsData.findIndex(list => list.name === listSlashLabelName);

    // If found, remove it using splice()
    if (indexList !== -1) {
        labelsData.splice(indexList, 1);
    }

    const index = listsAndLabelsData.findIndex(list => list.name === listSlashLabelName);
    if (index !== -1) {
        listsAndLabelsData.splice(index, 1);
    }


    console.log('Updated listsData:', labelsData, listsAndLabelsData);
    // listsAndLabelsData = listsAndLabelsData.filter(list => list.name !== listSlashLabelName)
    const groupDiv = document.querySelector('div.groupDiv');
    while (groupDiv.children.length > 1) {
        groupDiv.removeChild(groupDiv.lastChild);
    }
    displayLists()
    document.querySelector('#sidebar > div:nth-child(3)').replaceWith(document.querySelector('#sidebar > div:nth-child(5)'))
    document.querySelector('#sidebar > div.groupDiv > div:nth-child(1) > img:nth-child(1)').src = homeIcon;
    document.querySelector('#sidebar > div.groupDiv > div:nth-child(1) ').removeChild(document.querySelector('#sidebar > div.groupDiv > div:nth-child(1) > img.vertical-dots'))
}

function deleteLabelsWithLists(listSlashLabelName) {
    // 1. Remove all tasks whose list label matches
    for (let i = tasksData.length - 1; i >= 0; i--) {
      if (tasksData[i].list.label === listSlashLabelName) {
        tasksData.splice(i, 1);
      }
    }
  
    // 2. Remove the label from labelsData
    for (let i = labelsData.length - 1; i >= 0; i--) {
      if (labelsData[i].name === listSlashLabelName) {
        labelsData.splice(i, 1);
      }
    }
  
    // 3. Remove all lists from listsData whose label matches
    for (let i = listsData.length - 1; i >= 0; i--) {
      if (listsData[i].label === listSlashLabelName) {
        listsData.splice(i, 1);
      }
    }
  
    // 4. Remove all items from listsAndLabelsData that are either:
    //    - a label with the given name, or
    //    - a list whose label matches the given label name.
    for (let i = listsAndLabelsData.length - 1; i >= 0; i--) {
      const item = listsAndLabelsData[i];
      if ((item.name === listSlashLabelName) || (item.label === listSlashLabelName)) {
        listsAndLabelsData.splice(i, 1);
      }
    }
  
    console.log('Updated tasksData:', tasksData);
    console.log('Updated listsData:', listsData);
    console.log('Updated labelsData:', labelsData);
    console.log('Updated listsAndLabelsData:', listsAndLabelsData);
  
    // 5. Update the UI:
    // Clear the groupDiv (keeping only the first child)
    const groupDiv = document.querySelector('div.groupDiv');
    while (groupDiv.children.length > 1) {
      groupDiv.removeChild(groupDiv.lastChild);
    }
  
    // Re-display the lists (this function should re-render your sidebar lists, etc.)
    displayLists();
  
    // Replace the 3rd sidebar div with the 5th (if this is part of your UI refresh)
    const thirdDiv = document.querySelector('#sidebar > div:nth-child(3)');
    const fifthDiv = document.querySelector('#sidebar > div:nth-child(5)');
    if (thirdDiv && fifthDiv) {
      thirdDiv.replaceWith(fifthDiv);
    }
  
    // Update the home icon
    const homeIconImg = document.querySelector('#sidebar > div.groupDiv > div:nth-child(1) > img:nth-child(1)');
    if (homeIconImg) {
      homeIconImg.src = homeIcon;
    }
  
    // Remove the vertical dots image from the first taskGroup in the sidebar
    const groupDivFirst = document.querySelector('#sidebar > div.groupDiv > div:nth-child(1)');
    if (groupDivFirst) {
      const verticalDotsImg = groupDivFirst.querySelector('img.vertical-dots');
      if (verticalDotsImg) {
        groupDivFirst.removeChild(verticalDotsImg);
      }
    }
  
    // Remove the label options list from #content if it exists
    document.querySelector('#content > ul.label-options-list')?.remove();
  }
  

function deleteList(listSlashLabelName) {
    const existingTasksObject = listsData.find(item => item.name === 'Tasks');
    tasksData.forEach(task => {
        if (task.list.name == listSlashLabelName) {task.list = existingTasksObject;}
    })
    const indexList = listsData.findIndex(list => list.name === listSlashLabelName);

    // If found, remove it using splice()
    if (indexList !== -1) {
        listsData.splice(indexList, 1);
    }

    const index = listsAndLabelsData.findIndex(list => list.name === listSlashLabelName);
    if (index !== -1) {
        listsAndLabelsData.splice(index, 1);
    }


    console.log('Updated listsData:', listsData, listsAndLabelsData);
    // listsAndLabelsData = listsAndLabelsData.filter(list => list.name !== listSlashLabelName)
    const groupDiv = document.querySelector('div.groupDiv');
    while (groupDiv.children.length > 1) {
        groupDiv.removeChild(groupDiv.lastChild);
    }
    displayLists()
    document.querySelector('#sidebar > div:nth-child(3)').replaceWith(document.querySelector('#sidebar > div:nth-child(5)'))
    document.querySelector('#sidebar > div.groupDiv > div:nth-child(1) > img:nth-child(1)').src = homeIcon;
    document.querySelector('#sidebar > div.groupDiv > div:nth-child(1) ').removeChild(document.querySelector('#sidebar > div.groupDiv > div:nth-child(1) > img.vertical-dots'))
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

    const index = listsAndLabelsData.findIndex(list => list.name === listSlashLabelName);
    if (index !== -1) {
        listsAndLabelsData.splice(index, 1);
    }


    console.log('Updated listsData:', listsData, listsAndLabelsData);
    // listsAndLabelsData = listsAndLabelsData.filter(list => list.name !== listSlashLabelName)
    const groupDiv = document.querySelector('div.groupDiv');
    while (groupDiv.children.length > 1) {
        groupDiv.removeChild(groupDiv.lastChild);
    }
    displayLists()
    document.querySelector('#sidebar > div:nth-child(3)').replaceWith(document.querySelector('#sidebar > div:nth-child(5)'))
    document.querySelector('#sidebar > div.groupDiv > div:nth-child(1) > img:nth-child(1)').src = homeIcon;
    document.querySelector('#sidebar > div.groupDiv > div:nth-child(1) ').removeChild(document.querySelector('#sidebar > div.groupDiv > div:nth-child(1) > img.vertical-dots'))
}

function changeLabel(listSlashLabelName, event) {
    event.stopPropagation();
    const labelsList = document.createElement('ul');
    // Add a class for easier styling (optional)
    labelsList.classList.add('label-options-list');
    
    // Create a default "Tasks" option
    let labelNameItem = document.createElement('li');
    labelNameItem.textContent = 'Tasks';
    labelsList.appendChild(labelNameItem);
    
    // Create list items for each label in labelsData
    labelsData.forEach(label => {
        let li = document.createElement('li');
        li.textContent = label.name;
        labelsList.appendChild(li);
    });
    
    // Append the list to the #content container
    document.querySelector('#content').appendChild(labelsList);
    
    // Set fixed positioning and the top/left coordinates
    labelsList.style.position = 'fixed';
    // Use event.pageY for the vertical position of the click
    const yPos = event.pageY;
    labelsList.style.top = yPos + 'px';
    labelsList.style.left = `calc(10px + ${document.querySelector('#sidebar').clientWidth}px)`;
    labelsList.style.zIndex = '10000';
    labelsList.style.border = '2px solid #3b3b3b';
    labelsList.style.padding = '5px';
    labelsList.style.borderRadius = '8px';
    labelsList.style.listStyle = 'none';
    labelsList.style.backgroundColor = '#1c1c1c';
    labelsList.style.color = '#788cde';
    labelsList.style.cursor = 'pointer';
    labelsList.style.maxHeight = '12.5vh';
    labelsList.style.overflowY = 'auto';
    labelsList.querySelectorAll('*').forEach(item => {item.addEventListener('click', () => changeLabelName(item.textContent, listSlashLabelName));})
    
    console.log(labelsData, listsData, listsAndLabelsData);
    clickedOutsidelistOptionsUl();
    document.addEventListener('click', (event) => {
        const labelOptionsList = document.querySelector('.label-options-list');
        if (labelOptionsList && !labelOptionsList.contains(event.target)) {
            labelOptionsList.remove();
        }
    });
}

function changeLabelName(newLabel, listSlashLabelName) {
    // Update tasks whose list name matches listSlashLabelName.
    tasksData.forEach(task => {
        if (task.list.name === listSlashLabelName) {
            task.list.label = newLabel;
        }
    });

    // Update the actual list object in listsData.
    const listObj = listsData.find(list => list.name === listSlashLabelName);
    if (listObj) {
        listObj.label = newLabel;
    }
    
    console.log(tasksData);
    
    // Refresh the UI (this function should re-render your lists, etc.)
    displayLists();

    // Update sidebar elements.
    // Replace the 3rd div with the 5th div (if that’s part of your UI refresh).
    const thirdDiv = document.querySelector('#sidebar > div:nth-child(3)');
    const fifthDiv = document.querySelector('#sidebar > div:nth-child(5)');
    if (thirdDiv && fifthDiv) {
        thirdDiv.replaceWith(fifthDiv);
    }

    // Set the home icon image source.
    const homeIconImg = document.querySelector('#sidebar > div.groupDiv > div:nth-child(1) > img:nth-child(1)');
    if (homeIconImg) {
        homeIconImg.src = homeIcon;
    }

    // Remove the vertical-dots image from the first taskGroup in the sidebar.
    const groupDivFirst = document.querySelector('#sidebar > div.groupDiv > div:nth-child(1)');
    if (groupDivFirst) {
        const verticalDotsImg = groupDivFirst.querySelector('img.vertical-dots');
        if (verticalDotsImg) {
            groupDivFirst.removeChild(verticalDotsImg);
        }
    }

    // Remove the label options list from #content.
    const labelOptionsList = document.querySelector('#content > ul.label-options-list');
    if (labelOptionsList) {
        labelOptionsList.remove();
    }
}



function clickedOutsidelistOptionsUl() {
    document.querySelector('#content > ul.list-options-ul')?.remove();
    document.removeEventListener('click', clickedOutsidelistOptionsUl, true)
}