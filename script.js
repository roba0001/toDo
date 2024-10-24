const submitButton = document.querySelector("button");
const taskInput = document.querySelector("#task");

const taskList = document.querySelector("#taskList");
const doneTaskList = document.querySelector("#doneTaskList");
// const favoritesList = document.querySelector("#favoritesList");

const taskListFromLS = localStorage.getItem("taskList");
const doneTaskListFromLS = localStorage.getItem("doneTaskList");
// const favoritesListfromLS = localStorage.getItem("favoritesList");

let toDoModel;
let doneModel;
// let favoriteModel;

if (taskListFromLS === null) {
  toDoModel = ["Isert your first task"];
} else {
  toDoModel = JSON.parse(taskListFromLS);
}
if (doneTaskListFromLS === null) {
  doneModel = [];
} else {
  doneModel = JSON.parse(doneTaskListFromLS);
}
// if (favoritesListfromLS === null) {
//   favoriteModel = [];
// } else {
//   favoriteModel = JSON.parse(favoritesListfromLS);
// }

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
  taskInput.value = "";

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
  const inputFelt = document.querySelector("input");
  console.log("toDoModel:", toDoModel);
  console.log("doneModel:", doneModel);
  // console.log("favoriteModel:", favoriteModel);
  localStorage.setItem("taskList", JSON.stringify(toDoModel));
  localStorage.setItem("doneTaskList", JSON.stringify(doneModel));
  // localStorage.setItem("favoritesList", JSON.stringify(favoriteModel));
}

function updateList() {
  taskList.innerHTML = "";
  doneTaskList.innerHTML = "";
  // favoritesList.innerHTML = "";

  toDoModel.forEach((each, i) => {
    taskList.innerHTML += `<div class="flex"><div class="clickTask"><input data-filter="toDo" type="checkbox" data-id="${i}"> 
    <label for="${i}" class="submittedTask">${each}</label></div><div class="flex"><div class="trash" data-filter="toDo" id="${i}">🗑</div></div></div>`;
  });

  doneModel.forEach((each, i) => {
    doneTaskList.innerHTML += `<div class="flex"><div class="clickTask"><input data-filter="done" type="checkbox" data-id="${i}">
          <label for="${i}" class="submittedTask">${each}</label></div><div class="flex"><div class="trash" data-filter="done" id="${i}">🗑</div></div></div>`;
  });
  // favoriteModel.forEach((each, i) => {
  //   doneTaskList.innerHTML += `<div class="flex"><div class="clickTask"><input data-filter="done" type="checkbox" data-id="${i}">
  //         <label for="${i} class="submittedTask"">${each}</label></div><div class="flex"><div class="trash" id="${i}">🗑</div><p class="star" data-filter="true">★</p></div></div>`;
  // });

  document.querySelectorAll(".clickTask").forEach((each) => {
    each.addEventListener("click", clickTask);
  });
  // document.querySelectorAll(".star").forEach((each) => {
  //   each.addEventListener("click", clickStar);
  // });
  document.querySelectorAll(".trash").forEach((each) => {
    each.addEventListener("click", clickTrash);
  });
}

function clickTask(evt) {
  const action = evt.target.dataset.filter; // konstant for den trykkede button's (evt target's) datafilter
  let text = evt.currentTarget.querySelector("label").textContent;
  let checkBox = (evt.currentTarget.querySelector("input").checked = true);

  console.log("text", text);

  if (action === "toDo") {
    removeTaskFromList(evt.target.dataset.id);
    addTaskToDone(text);
  } else if (action === "done") {
    addTaskToList(text);
    removeTaskFromDone(evt.target.dataset.id);
  }

  updateList();
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
  console.log(action);
  console.log("index", evt.target.id);

  if (action === "toDo") {
    removeTaskFromList(evt.target.id);
  } else if (action === "done") {
    removeTaskFromDone(evt.target.id);
  }

  // removeTaskFromList(evt.target.id);
  // removeTaskFromDone(evt.target.id);
  // removeTaskFromFavoritesList(evt.target.id);
  updateList();
}
