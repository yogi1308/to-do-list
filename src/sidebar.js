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
    const sidebarItems = ['My Day', 'Important', 'Planned', 'Tasks', 'Completed', 'All'];
    sidebarItems.forEach(item => {
        const sidebarItem = document.createElement('div');
        sidebarItem.classList.add('sidebar-item');
        sidebarItem.textContent = item;
        sidebarList.appendChild(sidebarItem);
    });
    sidebarList.appendChild(addTaskButton());
}