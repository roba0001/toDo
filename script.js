const submitButton = document.querySelector("button");
const taskInput = document.querySelector("#task");
const taskList = document.querySelector("#taskList");

const taskListFromLS = localStorage.getItem("taskList");

let toDoModel;
let doneModel;

if (taskListFromLS === null) {
  toDoModel = ["Task 1", "Task 2", "Task 3"];
} else {
  toDoModel = JSON.parse(taskListFromLS);
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
  toDoModel.push(task);
  updateLocalStorage();
}

function removeTaskFromList(id) {
  toDoModel.splice(id, 1);
  updateLocalStorage();
}

function updateLocalStorage() {
  const inputFelt = document.querySelector("input");
  console.log("updateLocalStorage", toDoModel);
  localStorage.setItem("taskList", JSON.stringify(toDoModel));
}

function updateList() {
  taskList.innerHTML = "";
  toDoModel.forEach((each, i) => {
    taskList.innerHTML += `<div><input type="checkbox" class="clickTask" data-id="${i}"> 
    <label for="${i}">${each}</label></div>`;
  });

  document.querySelectorAll(".clickTask").forEach((each) => {
    each.addEventListener("click", clickTask);
  });
}

function clickTask(evt) {
  removeTaskFromList(evt.target.dataset.id);
  updateList();
}
