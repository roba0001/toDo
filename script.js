const submitButton = document.querySelector("button");
const taskInput = document.querySelector("#task");
const taskList = document.querySelector("#taskList");

const taskListFromLS = localStorage.getItem("taskList");

let model;

if (taskListFromLS === null) {
  model = ["Task 1", "Task 2", "Task 3"];
} else {
  model = JSON.parse(taskListFromLS);
}

init();

function init() {
  submitButton.addEventListener("click", buttonClicked);
  updateList();
}

function buttonClicked() {
  addTaskToList(taskInput.value);
  updateList();
}

function addTaskToList(task) {
  console.log(task);
  model.push(task);
  updateLocalStorage();
}

function removeTaskFromList(id) {
  model.splice(id, 1);
  updateLocalStorage();
}

function updateLocalStorage() {
  const inputFelt = document.querySelector("input");
  console.log("updateLocalStorage", model);
  localStorage.setItem("taskList", JSON.stringify(model));
}

function updateList() {
  // her opdateres listen
  taskList.innerHTML = "";
  model.forEach((each, i) => {
    taskList.innerHTML += `<li class="clickTask" data-id="${i}">${each}</li> `;
  });

  document.querySelectorAll(".clickTask").forEach((each) => {
    each.addEventListener("click", clickTask);
  });
}

function clickTask(evt) {
  removeTaskFromList(evt.target.dataset.id);
  updateList();
}
