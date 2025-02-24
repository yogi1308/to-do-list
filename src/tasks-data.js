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
export const tasksData = storedTasksData ? JSON.parse(storedTasksData) : [
  tasks("Complete JavaScript homework", "High", new lists('Academics'), "2025-01-14", "none", true, false, "Complete the exercises at the end of the chapter."),
  tasks("Buy groceries", "Medium", new lists('Personal'), "2025-02-14", "none", false, false, "Milk, eggs, bread, and cereal."),
  tasks("Pick up laundry", "Low", undefined , "2025-03-14", "none", false, false, "Dry cleaning is ready."),
  tasks("Call mom", "High", undefined , "2025-04-14", "none", false, false, "Wish her a happy birthday."),
  tasks("Complete the project", "High", new lists('Work'), "2025-05-14", "none", false, false, "Finish the project before the deadline."),
  tasks("Submit the report", "High", undefined, "2025-06-14", "none", false, false, "Submit the report before the deadline."),
  tasks("Prepare for the meeting", "High", undefined, "2025-07-14", "none", false, false, "Prepare the presentation for the meeting.")
];

updateLocalStorage();

localStorage.setItem('tasksData', JSON.stringify(tasksData));
localStorage.setItem('listsData', JSON.stringify(listsData));

export function updateLocalStorage() {
  localStorage.setItem('tasksData', JSON.stringify(tasksData));
  localStorage.setItem('listsData', JSON.stringify(listsData));
}

