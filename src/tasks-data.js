// Save tasksData and listsData to localStorage

export const tasks = function (task, priority, list, date, repeat, important, completed, notes) {
  return { task, priority, list, date, repeat, important, completed, notes };
};

export class dateAndTask {
  constructor(date) {
      this.date = date
      this.task = []
  }
  addTask(task) {
      this.task.push(task);
  }
}

export class lists {
  tasks = []
  constructor(name = 'Untitled List') {
    this.name = name
    listsData.push(this)
  }
}

// Retrieve any stored data from localStorage
const storedListsData = localStorage.getItem('listsData');
const storedTasksData = localStorage.getItem('tasksData');

// Fake tasks data with some tasks having no priority
export const listsData = storedListsData ? JSON.parse(storedListsData) : [];
export const tasksData = storedTasksData ? JSON.parse(storedTasksData) : [];

localStorage.setItem('tasksData', JSON.stringify(tasksData));
localStorage.setItem('listsData', JSON.stringify(listsData));

export function updateLocalStorage() {
  localStorage.setItem('tasksData', JSON.stringify(tasksData));
  localStorage.setItem('listsData', JSON.stringify(listsData));
}

