const submitButton = document.querySelector("button");
const taskInput = document.querySelector("#task");

const taskList = document.querySelector("#taskList"); //To Do - listen i HTML
const doneTaskList = document.querySelector("#doneTaskList"); //Done - listen i HTML

const taskListFromLS = localStorage.getItem("taskList"); //To Do - listen i localStorage
const doneTaskListFromLS = localStorage.getItem("doneTaskList"); //Done - listen i localStorage

let toDoModel; //To Do - model
let doneModel; //Done - model

// udfyld modellerne med array fra localStorage
toDoModel = JSON.parse(taskListFromLS);
doneModel = JSON.parse(doneTaskListFromLS);

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
  if (task) {
    toDoModel.push(task);
    taskInput.value = "";
  } else {
    alert("Please enter a task");
  }

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

// function addTaskToFavoritesList(task) {
//   favoriteModel.push(task);
//   updateLocalStorage();
//   updateList();
// }

// function removeTaskFromFavoritesList() {
//   favoriteModel.splice(id, 1);
//   updateLocalStorage();
// }

function updateLocalStorage() {
  localStorage.setItem("taskList", JSON.stringify(toDoModel));
  localStorage.setItem("doneTaskList", JSON.stringify(doneModel));
}

function updateList() {
  taskList.innerHTML = "";
  doneTaskList.innerHTML = "";

  toDoModel.forEach((each, i) => {
    taskList.innerHTML += `<div class="flex">
        <div class="clickTask">
          <input data-filter="toDo" type="checkbox" data-id="${i}" />
          <label for="${i}" class="submittedTask">${each}</label>
        </div>
        <div class="flex">
          <div class="trash" data-filter="toDo" id="${i}">🗑</div>
        </div>
      </div>`;
  });

  doneModel.forEach((each, i) => {
    doneTaskList.innerHTML += `<div class="flex">
        <div class="clickTask">
          <input data-filter="done" type="checkbox" data-id="${i}" />
          <label for="${i}" class="submittedTask">${each}</label>
        </div>
        <div class="flex">
        <div class="trash" data-filter="done" id="${i}">🗑</div>
        </div>
      </div>`;
  });

  document.querySelectorAll(".clickTask").forEach((each) => {
    each.addEventListener("click", clickTask);
  });
  document.querySelectorAll(".trash").forEach((each) => {
    each.addEventListener("click", clickTrash);
  });
}

function clickTask(evt) {
  const action = evt.target.dataset.filter; // konstant for den taskens datafilter
  let text = evt.currentTarget.querySelector("label").textContent; // variabel for tekstindholdet af den trykkede task
  let checkBox = evt.currentTarget.querySelector("input"); //variabel for checkboxen

  if (action === "toDo") {
    //hvis task er i toDo list
    removeTaskFromList(evt.target.dataset.id); //så fjern tasken med tilsvarende id fra todo-listen,
    addTaskToDone(text); //tilføj task med tilsvarende tekstindhold til done-listen,
    checkBox.checked = true; //og sæt checkbox's værdi til checked
  } else if (action === "done") {
    //ellers, (hvis task er i done list)
    addTaskToList(text); //tilføj task med tilsvarende tekstindhold til todo-list,
    removeTaskFromDone(evt.target.dataset.id); //fjern task med tilsvarende id fra done-listen,
    checkBox.checked = false; //og sæt checkbox's værdi til unchecked
  }

  updateList(); //opdater listerne derefter
}

// function clickStar(evt) {
//   let filter = evt.target.dataset.filter; // konstant for den trykkede button's (evt target's) datafilter
//   let starColor = evt.currentTarget.textContent;
//   let taskName = document.querySelector(".submittedTask").textContent;

//   console.log("starColor", starColor);
//   console.log("filter", filter);
//   console.log("taskName", taskName);

//   if (filter === false) {
//     removeTaskFromList(evt.target.dataset.id);
//     removeTaskFromDone(evt.target.dataset.id);
//     addTaskToFavoritesList(taskName); //add med text input
//     filter = true;
//   } else if (filter === true) {
//     removeTaskFromFavoritesList(text);
//     filter = false;
//   }

//   updateList();
// }

// function clickStar(evt) {
//   let starFilter = evt.target.dataset.filter;
//   console.log("star is: ", starFilter);
//   let starColor = evt.currentTarget.textContent;
//   console.log("star color: ", starColor);

//   addTaskToFavoritesList(starFilter);
//   removeTaskFromList(evt.target.id);
//   removeTaskFromDone(evt.target.id);

//   updateList();
// }

function clickTrash(evt) {
  const action = evt.currentTarget.dataset.filter;

  if (action === "toDo") {
    removeTaskFromList(evt.target.id);
  } else if (action === "done") {
    removeTaskFromDone(evt.target.id);
  }
  updateList();
}
