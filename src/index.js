const initialTasks = [
  { text: "Buy milk", priority: "high", date: "2023-02-28", description: "my First todo list task" },
  { text: "Do laundry", priority: "low", date: "2023-02-29", description: "my Second todo list task" },
  { text: "Call mom", priority: "medium", date: "2023-02-28", description: "my Last todo list task" },
  { text: "Buy milk", priority: "high", date: "2023-02-28", description: "my First todo list task" },
  { text: "Do laundry", priority: "low", date: "2023-02-29", description: "my Second todo list task" },
  { text: "Call mom", priority: "medium", date: "2023-02-28", description: "my Last todo list task" }
];
let tasks = initialTasks;
let sortedTasks = [];
document.addEventListener("DOMContentLoaded", () => {
  // your code here
  const addTaskButton = document.getElementById("submit");
  const closeButton = document.getElementById("close-btn");
  const newButton = document.getElementById("new-task");
  const deleteAllButton = document.getElementById("deleteAllBtn");
  const sortButton = document.getElementById("sortBtn");
  renderTodoList();
  addTaskButton.addEventListener("click", addTask, false);
  closeButton.addEventListener("click", hideForm, false);
  newButton.addEventListener("click", showForm, false);
  deleteAllButton.addEventListener("click", DeleteAll, false);
  sortButton.addEventListener("click", sort, false);

});


function renderTodoList() {
  const todoList = document.getElementById("tasks");
  const counter = document.getElementById("counter");
  todoList.innerHTML = "";
  counter.innerText = tasks.length;
  tasks.forEach((task, index) => {
    const listItem = document.createElement("li");
    const listTitle = document.createElement("h1");
    const listDate = document.createElement("p");
    const listDesc = document.createElement("span");
    listTitle.innerHTML = task.text;
    listDate.innerHTML = task.date;
    listDesc.innerHTML = task.description;
    listTitle.classList.add(`${task.priority}-priority`);

    // Add a delete button for each task
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Delete";
    deleteButton.classList.add("btnDelete");
    deleteButton.addEventListener("click", () => {
      tasks.splice(index, 1);
      renderTodoList();
    });


    // Add an edit button for each task
    const editButton = document.createElement("button");
    editButton.innerHTML = "Edit";
    editButton.classList.add("btnEdit");
    editButton.addEventListener("click", () => {
      const newText = prompt("Enter new task text:");
      if (newText) {
        tasks[index].text = newText;
        renderTodoList();
      }
    });
    listItem.appendChild(listTitle);
    listItem.appendChild(listDesc);
    listItem.appendChild(listDate);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    todoList.appendChild(listItem);
  });
}
//add new task
function addTask(evt) {
  evt.preventDefault();
  const newTaskTitle = document.getElementById("new-task-Title");
  const newTaskPriority = document.getElementById("priority-select");
  const newTaskDesc = document.getElementById("desc");
  const newTaskDate = document.getElementById("date-due");

  const newTaskTitleValue = newTaskTitle.value.trim();
  const newTaskPriorityValue = newTaskPriority.value.trim();
  const newTaskDescValue = newTaskDesc.value.trim();
  const newTaskDateValue = newTaskDate.value.trim();



  if (newTaskTitleValue && newTaskPriorityValue && newTaskDescValue && newTaskDateValue) {
    tasks.push({ text: newTaskTitleValue, priority: newTaskPriorityValue, date: newTaskDateValue, description: newTaskDescValue });
    newTaskTitle.value = "";
    newTaskPriority.value = "medium";
    newTaskDesc.value = "";
    newTaskDate.value = "";
    renderTodoList();
  }
}
//hide input Form  
function hideForm(evt) {
  evt.preventDefault();
  document.getElementById("form-container").style.display = 'none';
}
//show input Form  to add new tasks
function showForm(evt) {
  evt.preventDefault();
  document.getElementById("form-container").style.display = 'flex';
}

//delete all tasks  
function DeleteAll(evt) {
  evt.preventDefault();
  tasks = [];
  renderTodoList();
}

//sorting  function
function sort(evt) {
  evt.preventDefault();
  if (tasks == sortedTasks) {
    tasks.reverse();
  } else {
    sortedTasks = [...tasks].sort((a, b) => {
      if (a.priority === "high" && b.priority !== "high") {
        return -1;
      }
      if (b.priority === "high" && a.priority !== "high") {
        return 1;
      }
      if (a.priority === "medium" && b.priority === "low") {
        return -1;
      }
      if (b.priority === "medium" && a.priority === "low") {
        return 1;
      }
      return 0;
    });
    tasks = sortedTasks;
  }




  renderTodoList();
}