const submitButton = document.querySelector("button");
const taskInput = document.querySelector("#task");
const taskList = document.querySelector("#taskList");
const doneTaskList = document.querySelector("#doneTaskList");

const taskListFromLS = localStorage.getItem("taskList");

let toDoModel;
let doneModel = [];

if (taskListFromLS === null) {
  toDoModel = ["Isert your first task"];
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
  toDoModel.push(task);
  updateLocalStorage();
}

function removeTaskFromList(id) {
  toDoModel.splice(id, 1);
  updateLocalStorage();
}

function addTaskToDone(task) {
  doneModel.push(task);
  updateLocalStorage();
  updateList();
}

function removeTaskFromDone(id) {
  doneModel.splice(id, 1);
  updateLocalStorage();
}

function updateLocalStorage() {
  const inputFelt = document.querySelector("input");
  console.log("toDoModel:", toDoModel);
  console.log("doneModel:", doneModel);
  localStorage.setItem("taskList", JSON.stringify(toDoModel));
}

function updateList() {
  taskList.innerHTML = "";
  doneTaskList.innerHTML = "";

  toDoModel.forEach((each, i) => {
    taskList.innerHTML += `<div class="clickTask"><input data-filter="toDo" type="checkbox" data-id="${i}"> 
    <label for="${i}">${each}</label></div>`;
  });

  doneModel.forEach((each, i) => {
    doneTaskList.innerHTML += `<div class="clickTask"><input data-filter="done" type="checkbox" data-id="${i}">
          <label for="${i}">${each}</label></div>`;
  });

  document.querySelectorAll(".clickTask").forEach((each) => {
    each.addEventListener("click", clickTask);
  });
}

function clickTask(evt) {
  const action = evt.target.dataset.filter; // konstant for den trykkede button's (evt target's) datafilter
  let text = evt.currentTarget.querySelector("label").textContent;

  console.log("text", text);

  if (action === "toDo") {
    removeTaskFromList(evt.target.dataset.id);
    addTaskToDone(text);
  } else if (action === "done") {
    addTaskToList(text);
    removeTaskFromDone(evt.target.dataset.id);
  }

  console.log(action);

  updateList();
}
