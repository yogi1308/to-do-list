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
      true
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
    // Additional tasks
    tasks(
      "Submit project report",
      "High",
      "Academics",
      "2025-01-30",
      "No",
      true,
      false
    ),
    tasks(
      "Meditate for 15 minutes",
      "Low",
      "Health",
      "2025-01-29",
      "Yes (Daily)",
      false,
      false
    ),
    tasks(
      "Water the plants",
      "Low",
      "Personal",
      "2025-01-30",
      "Yes (Weekly)",
      false,
      false
    ),
    tasks(
      "Attend yoga class",
      "Medium",
      "Health",
      "2025-01-29",
      "Yes (Weekly)",
      false,
      false
    ),
    tasks(
      "Fix broken chair",
      "Medium",
      "Chores",
      "2025-02-01",
      "No",
      false,
      false
    ),
    tasks(
      "Plan weekend trip",
      "Low",
      "Personal",
      "2025-01-31",
      "No",
      false,
      false
    ),
    tasks(
      "Respond to emails",
      "High",
      "Work",
      "2025-01-29",
      "No",
      true,
      false
    ),
    tasks(
      "Organize bookshelf",
      "Low",
      "Chores",
      "2025-01-30",
      "No",
      false,
      false
    ),
    tasks(
      "Take car for servicing",
      "Medium",
      "Errands",
      "2025-02-03",
      "No",
      true,
      false
    ),
    tasks(
      "Create budget plan",
      "High",
      "Finance",
      "2025-01-31",
      "No",
      true,
      false
    ),
    tasks(
      "Prepare for interview",
      "High",
      "Work",
      "2025-02-05",
      "No",
      true,
      false
    ),
    tasks(
      "Bake a cake",
      "Low",
      "Personal",
      "2025-01-30",
      "No",
      false,
      false
    ),
    tasks(
      "Update resume",
      "High",
      "Career",
      "2025-01-29",
      "No",
      true,
      false
    ),
    tasks(
      "Research travel destinations",
      "Medium",
      "Personal",
      "2025-02-02",
      "No",
      false,
      false
    ),
    tasks(
      "Volunteer at local shelter",
      "High",
      "Community",
      "2025-02-01",
      "No",
      true,
      false
    ),
  ];
  
  