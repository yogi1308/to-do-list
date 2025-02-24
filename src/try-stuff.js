// class label {
//     constructor(name = "Untitled Label", lists = []) {
//         this.name = name;
//         this.lists = lists; // Array of List objects.
//     }
// }

// class List {
//     constructor(name = "Untitled List", tasks = [], label = "Tasks") {
//         this.name = name;
//         this.label = label; // Reference to a Label object.
//         this.tasks = tasks; // This will hold references to Task objects.
//     }
// }

// export let tasksArray = []
// export let listArray = []
// export let labelData = [
//     new label('Academics', []),
//     new label('Personal', []),
//     new label('Fitness', [])
// ]

// export class task {
//     constructor(task, priority, list, date, repeat, important, completed) {
//         this.task = task;
//         this.priority = priority;
//         this.list = this.getList(list);
//         this.date = date;
//         this.repeat = repeat;
//         this.important = important;
//         this.completed = completed;
//         tasksArray.push(this); // Push the new Task instance into tasksArray
//     }

//     getList(listName) {
//         // Find or create list
//         let list = listArray.find(l => l.name === listName);
//         if (!list) {
//             // If not, create a new List
//             list = new List(listName, [this], );
//             listArray.push(list);
//         }
//         else {list.tasks.push(this)}
//         return list;
//     }
// }  

// export function addListToLabel(labelName, listName) {
//     // Find the label by name
//     let labelObj = labelData.find(l => l.name === labelName);

//     if (labelObj) {
//         // Create a new List
//         let newList = new List(listName);
        
//         // Add the new List to the label's lists array
//         labelObj.lists.push(newList);
//     } else {
//         console.log(`Label "${labelName}" not found.`);
//     }
// }

// addListToLabel('Academics', 'Academics')
// addListToLabel('Academics', 'Work')
// addListToLabel('Personal', 'Chores')
// addListToLabel('Personal', 'Errands')
// addListToLabel('Personal', 'Health')

// export let tasksData = [
//     new task("Complete JavaScript homework", "High", "Academics", "2025-01-30", "No", true, false),
//     new task("Workout at the gym", "", "Health", "2025-01-29", "Yes (Daily)", false, false),
//     new task("Call Mom", "Low", "Personal", "2025-01-31", "No", true, true),
//     new task("Team meeting", "High", "Work", "2025-02-01", "No", true, false),
//     new task("Buy groceries", "", "Errands", "2025-01-29", "No", false, false),
//     new task("Prepare presentation", "High", "Work", "2025-02-02", "No", true, false),
//     new task("Read a book", "", "Personal", "2025-01-30", "No", false, false),
//     new task("Doctor’s appointment", "High", "Health", "2025-01-30", "No", true, false),
//     new task("Pay electricity bill", "Medium", "Finance", "2025-01-31", "No", true, true),
//     new task("Clean desk", "", "Chores", "2025-01-29", "No", false, false),
//     // Additional new task
//     new task("Submit project report", "High", "Academics", "2025-01-30", "No", true, false),
//     new task("Meditate for 15 minutes", "", "Health", "2025-01-29", "Yes (Daily)", false, false),
//     new task("Water the plants", "", "Personal", "2025-01-30", "Yes (Weekly)", false, false),
//     new task("Attend yoga class", "Medium", "Health", "2025-01-29", "Yes (Weekly)", false, false),
//     new task("Fix broken chair", "Medium", "Chores", "2025-02-01", "No", false, false),
//     new task("Plan weekend trip", "", "Personal", "2025-01-31", "No", false, false),
//     new task("Respond to emails", "High", "Work", "2025-01-29", "No", true, false),
//     new task("Organize bookshelf", "", "Chores", "2025-01-30", "No", false, false),
//     new task("Take car for servicing", "Medium", "Errands", "2025-02-03", "No", true, false),
//     new task("Create budget plan", "High", "Finance", "2025-01-31", "No", true, false),
//     new task("Prepare for interview", "High", "Work", "2025-02-05", "No", true, false),
//     new task("Bake a cake", "", "Personal", "2025-01-30", "No", false, false),
//     new task("Update resume", "High", "Career", "2025-01-29", "No", true, false),
//     new task("Research travel destinations", "Medium", "Personal", "2025-02-02", "No", false, false),
//     new task("Volunteer at local shelter", "High", "Community", "2025-02-01", "No", true, false),
//     new task("Attend virtual seminar", "High", "Academics", "2025-02-04", "No", true, false),
//     new task("Go for a run", "", "Health", "2025-02-05", "Yes (Daily)", false, false),
//     new task("Attend workshop on resume writing", "Medium", "Career", "2025-02-06", "No", true, false),
//     new task("Go to dentist appointment", "High", "Health", "2025-02-07", "No", true, false),
//     new task("Attend team brainstorming session", "High", "Work", "2025-02-08", "No", true, false),
//     new task("Attend birthday party", "", "Personal", "2025-02-09", "No", false, false),
//     new task("Attend birthday party", "", "Personal", "2025-02-09", "No", false, false),
//     new task("Attend birthday party", "", "Personal", "2025-02-09", "No", false, false),
//     new task("Prepare lunch for the week", "Medium", "Health", "2025-02-10", "Yes (Weekly)", false, false),
//     new task("Do laundry", "", "Chores", "2025-02-11", "No", false, false),
//     new task("Submit taxes", "High", "Finance", "2025-02-12", "No", true, false),
//     new task("Complete work proposal", "High", "Work", "2025-02-13", "No", true, false),
//     new task("Family movie night", "", "Personal", "2025-02-14", "No", false, false),
//     new task("Attend marketing webinar", "Medium", "Career", "2025-02-15", "No", true, false),
//     new task("Visit a museum", "", "Personal", "2025-02-16", "No", false, false),
//     new task("Donate to charity", "High", "Community", "2025-02-17", "No", true, false),
//     new task("Meal prep for the week", "Medium", "Health", "2025-02-18", "Yes (Weekly)", false, false),
//     new task("Write blog post", "High", "Work", "2025-02-19", "No", true, false),
//     new task("Organize closet", "", "Chores", "2025-02-20", "No", false, false),
//     new task("Read an article about sustainability", "Low", "Personal", "2025-02-21", "No", false, false),
//     new task("Sign up for online course", "High", "Career", "2025-02-22", "No", true, false),
//     new task("Grocery shopping", "", "Errands", "2025-02-23", "No", false, false),
//     new task("Catch up with old friends", "Low", "Personal", "2025-02-24", "No", false, false),
//     new task("Clean kitchen", "", "Chores", "2025-02-25", "No", false, false),
//     new task("Prepare a report for work", "High", "Work", "2025-02-26", "No", true, false),
//     new task("Complete research paper", "High", "Academics", "2025-02-27", "No", true, false),
//     new task("Meet with mentor", "Medium", "Career", "2025-02-28", "No", true, false),
//     new task("Declutter the garage", "Medium", "Chores", "2025-02-28", "No", false, false),
//     new task("Plan February goals", "High", "Personal", "2025-02-01", "No", false, false),
//     new task("Research new coding techniques", "High", "Academics", "2025-02-02", "No", false, false),
//     new task("Plan New Year resolutions", "High", "Personal", "2025-01-01", "No", true, false),
//     new task("Organize workspace", "Medium", "Chores", "2025-01-02", "No", false, false),
//     new task("Start new book", "", "Personal", "2025-01-03", "No", false, false),
//     new task("Attend gym session", "", "Health", "2025-01-04", "Yes (Daily)", false, false),
//     new task("Review annual budget", "High", "Finance", "2025-01-05", "No", true, false),
//     new task("Schedule doctor's checkup", "Medium", "Health", "2025-01-06", "No", true, false),
//     new task("Plan family dinner", "", "Personal", "2025-01-07", "No", false, false),
//     new task("Update project timeline", "High", "Work", "2025-01-08", "No", true, false),
//     new task("Clean out email inbox", "Medium", "Work", "2025-01-09", "No", false, false),
//     new task("Go for a walk", "", "Health", "2025-01-10", "Yes (Daily)", false, false),
//     // Additional new task for March
//     new task("Plan spring cleaning", "Medium", "Chores", "2025-03-01", "No", false, false),
//     new task("Start gardening", "", "Personal", "2025-03-02", "No", false, false),
//     new task("Attend team meeting", "High", "Work", "2025-03-03", "No", true, false),
//     new task("Prepare for quarterly review", "High", "Work", "2025-03-04", "No", true, false),
//     new task("Go for a run", "", "Health", "2025-03-05", "Yes (Daily)", false, false),
//     new task("Plan vacation", "Medium", "Personal", "2025-03-06", "No", false, false),
//     new task("Organize digital files", "Medium", "Work", "2025-03-07", "No", false, false),
//     new task("Attend yoga class", "", "Health", "2025-03-08", "Yes (Weekly)", false, false),
//     new task("Review investment portfolio", "High", "Finance", "2025-03-09", "No", true, false),
//     new task("Plan March goals", "High", "Personal", "2025-03-10", "No", true, false),
//     // Additional new task for the middle of February
//     new task("Attend team lunch", "", "Work", "2025-02-12", "No", false, false),
//     new task("Plan Valentine's Day", "Medium", "Personal", "2025-02-13", "No", false, false),
//     new task("Review project progress", "High", "Work", "2025-02-14", "No", true, false),
//     new task("Go for a hike", "", "Health", "2025-02-15", "No", false, false),
//     new task("Organize pantry", "Medium", "Chores", "2025-02-16", "No", false, false),
//     new task("Update LinkedIn profile", "High", "Career", "2025-02-17", "No", true, false),
//     new task("Plan weekend getaway", "", "Personal", "2025-02-18", "No", false, false),
//     new task("Review monthly expenses", "High", "Finance", "2025-02-19", "No", true, false),
//     new task("Attend book club meeting", "", "Personal", "2025-02-20", "No", false, false),
//     new task("Clean out garage", "Medium", "Chores", "2025-02-21", "No", false, false)
// ];






















































  // tasks("Workout at the gym", "", "Health", "2025-01-29", "Yes (Daily)", false, false),
  // tasks("Call Mom", "Low", "Personal", "2025-01-31", "No", true, true),
  // tasks("Team meeting", "High", "Work", "2025-02-01", "No", true, false),
  // tasks("Buy groceries", "", "Errands", "2025-01-29", "No", false, false),
  // tasks("Prepare presentation", "High", "Work", "2025-02-02", "No", true, false),
  // tasks("Read a book", "", "Personal", "2025-01-30", "No", false, false),
  // tasks("Doctor’s appointment", "High", "Health", "2025-01-30", "No", true, false),
  // tasks("Pay electricity bill", "Medium", "Finance", "2025-01-31", "No", true, true),
  // tasks("Clean desk", "", "Chores", "2025-01-29", "No", false, false),
  // // Additional tasks
  // tasks("Submit project report", "High", "Academics", "2025-01-30", "No", true, false),
  // tasks("Meditate for 15 minutes", "", "Health", "2025-01-29", "Yes (Daily)", false, false),
  // tasks("Water the plants", "", "Personal", "2025-01-30", "Yes (Weekly)", false, false),
  // tasks("Attend yoga class", "Medium", "Health", "2025-01-29", "Yes (Weekly)", false, false),
  // tasks("Fix broken chair", "Medium", "Chores", "2025-02-01", "No", false, false),
  // tasks("Plan weekend trip", "", "Personal", "2025-01-31", "No", false, false),
  // tasks("Respond to emails", "High", "Work", "2025-01-29", "No", true, false),
  // tasks("Organize bookshelf", "", "Chores", "2025-01-30", "No", false, false),
  // tasks("Take car for servicing", "Medium", "Errands", "2025-02-03", "No", true, false),
  // tasks("Create budget plan", "High", "Finance", "2025-01-31", "No", true, false),
  // tasks("Prepare for interview", "High", "Work", "2025-02-05", "No", true, false),
  // tasks("Bake a cake", "", "Personal", "2025-01-30", "No", false, false),
  // tasks("Update resume", "High", "Career", "2025-01-29", "No", true, false),
  // tasks("Research travel destinations", "Medium", "Personal", "2025-02-02", "No", false, false),
  // tasks("Volunteer at local shelter", "High", "Community", "2025-02-01", "No", true, false),
  // tasks("Attend virtual seminar", "High", "Academics", "2025-02-04", "No", true, false),
  // tasks("Go for a run", "", "Health", "2025-02-05", "Yes (Daily)", false, false),
  // tasks("Attend workshop on resume writing", "Medium", "Career", "2025-02-06", "No", true, false),
  // tasks("Go to dentist appointment", "High", "Health", "2025-02-07", "No", true, false),
  // tasks("Attend team brainstorming session", "High", "Work", "2025-02-08", "No", true, false),
  // tasks("Attend birthday party", "", "Personal", "2025-02-09", "No", false, false),
  // tasks("Attend birthday party", "", "Personal", "2025-02-09", "No", false, false),
  // tasks("Attend birthday party", "", "Personal", "2025-02-09", "No", false, false),
  // tasks("Prepare lunch for the week", "Medium", "Health", "2025-02-10", "Yes (Weekly)", false, false),
  // tasks("Do laundry", "", "Chores", "2025-02-11", "No", false, false),
  // tasks("Submit taxes", "High", "Finance", "2025-02-12", "No", true, false),
  // tasks("Complete work proposal", "High", "Work", "2025-02-13", "No", true, false),
  // tasks("Family movie night", "", "Personal", "2025-02-14", "No", false, false),
  // tasks("Attend marketing webinar", "Medium", "Career", "2025-02-15", "No", true, false),
  // tasks("Visit a museum", "", "Personal", "2025-02-16", "No", false, false),
  // tasks("Donate to charity", "High", "Community", "2025-02-17", "No", true, false),
  // tasks("Meal prep for the week", "Medium", "Health", "2025-02-18", "Yes (Weekly)", false, false),
  // tasks("Write blog post", "High", "Work", "2025-02-19", "No", true, false),
  // tasks("Organize closet", "", "Chores", "2025-02-20", "No", false, false),
  // tasks("Read an article about sustainability", "Low", "Personal", "2025-02-21", "No", false, false),
  // tasks("Sign up for online course", "High", "Career", "2025-02-22", "No", true, false),
  // tasks("Grocery shopping", "", "Errands", "2025-02-23", "No", false, false),
  // tasks("Catch up with old friends", "Low", "Personal", "2025-02-24", "No", false, false),
  // tasks("Clean kitchen", "", "Chores", "2025-02-25", "No", false, false),
  // tasks("Prepare a report for work", "High", "Work", "2025-02-26", "No", true, false),
  // tasks("Complete research paper", "High", "Academics", "2025-02-27", "No", true, false),
  // tasks("Meet with mentor", "Medium", "Career", "2025-02-28", "No", true, false),
  // tasks("Declutter the garage", "Medium", "Chores", "2025-02-28", "No", false, false),
  // tasks("Plan February goals", "High", "Personal", "2025-02-01", "No", false, false),
  // tasks("Research new coding techniques", "High", "Academics", "2025-02-02", "No", false, false),
  // tasks("Plan New Year resolutions", "High", "Personal", "2025-01-01", "No", true, false),
  // tasks("Organize workspace", "Medium", "Chores", "2025-01-02", "No", false, false),
  // tasks("Start new book", "", "Personal", "2025-01-03", "No", false, false),
  // tasks("Attend gym session", "", "Health", "2025-01-04", "Yes (Daily)", false, false),
  // tasks("Review annual budget", "High", "Finance", "2025-01-05", "No", true, false),
  // tasks("Schedule doctor's checkup", "Medium", "Health", "2025-01-06", "No", true, false),
  // tasks("Plan family dinner", "", "Personal", "2025-01-07", "No", false, false),
  // tasks("Update project timeline", "High", "Work", "2025-01-08", "No", true, false),
  // tasks("Clean out email inbox", "Medium", "Work", "2025-01-09", "No", false, false),
  // tasks("Go for a walk", "", "Health", "2025-01-10", "Yes (Daily)", false, false),
  // // Additional tasks for March
  // tasks("Plan spring cleaning", "Medium", "Chores", "2025-03-01", "No", false, false),
  // tasks("Start gardening", "", "Personal", "2025-03-02", "No", false, false),
  // tasks("Attend team meeting", "High", "Work", "2025-03-03", "No", true, false),
  // tasks("Prepare for quarterly review", "High", "Work", "2025-03-04", "No", true, false),
  // tasks("Go for a run", "", "Health", "2025-03-05", "Yes (Daily)", false, false),
  // tasks("Plan vacation", "Medium", "Personal", "2025-03-06", "No", false, false),
  // tasks("Organize digital files", "Medium", "Work", "2025-03-07", "No", false, false),
  // tasks("Attend yoga class", "", "Health", "2025-03-08", "Yes (Weekly)", false, false),
  // tasks("Review investment portfolio", "High", "Finance", "2025-03-09", "No", true, false),
  // tasks("Plan March goals", "High", "Personal", "2025-03-10", "No", true, false),
  // // Additional tasks for the middle of February
  // tasks("Attend team lunch", "", "Work", "2025-02-12", "No", false, false),
  // tasks("Plan Valentine's Day", "Medium", "Personal", "2025-02-13", "No", false, false),
  // tasks("Review project progress", "High", "Work", "2025-02-14", "No", true, false),
  // tasks("Go for a hike", "", "Health", "2025-02-15", "No", false, false),
  // tasks("Organize pantry", "Medium", "Chores", "2025-02-16", "No", false, false),
  // tasks("Update LinkedIn profile", "High", "Career", "2025-02-17", "No", true, false),
  // tasks("Plan weekend getaway", "", "Personal", "2025-02-18", "No", false, false),
  // tasks("Review monthly expenses", "High", "Finance", "2025-02-19", "No", true, false),
  // tasks("Attend book club meeting", "", "Personal", "2025-02-20", "No", false, false),
  // tasks("Clean out garage", "Medium", "Chores", "2025-02-21", "No", false, false)