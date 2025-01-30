// Task factory function
export const tasks = function (task, priority, group, day, repeat, important, completed) {
    return { task, priority, group, day, repeat, important, completed };
  };
  
  // Fake tasks data
  export const tasksData = [
    tasks(
      "Complete JavaScript homework",
      "High",
      "Academics",
      "2025-01-30",
      "No",
      true,
      false
    ),
    tasks(
      "Workout at the gym",
      "Medium",
      "Health",
      "2025-01-29",
      "Yes (Daily)",
      false,
      false
    ),
    tasks(
      "Call Mom",
      "Low",
      "Personal",
      "2025-01-31",
      "No",
      true,
      false
    ),
    tasks(
      "Team meeting",
      "High",
      "Work",
      "2025-02-01",
      "No",
      true,
      false
    ),
    tasks(
      "Buy groceries",
      "Medium",
      "Errands",
      "2025-01-29",
      "No",
      false,
      false
    ),
    tasks(
      "Prepare presentation",
      "High",
      "Work",
      "2025-02-02",
      "No",
      true,
      false
    ),
    tasks(
      "Read a book",
      "Low",
      "Personal",
      "2025-01-30",
      "No",
      false,
      false
    ),
    tasks(
      "Doctor’s appointment",
      "High",
      "Health",
      "2025-01-30",
      "No",
      true,
      false
    ),
    tasks(
      "Pay electricity bill",
      "Medium",
      "Finance",
      "2025-01-31",
      "No",
      true,
      true
    ),
    tasks(
      "Clean desk",
      "Low",
      "Chores",
      "2025-01-29",
      "No",
      false,
      false
    ),
  ];
  