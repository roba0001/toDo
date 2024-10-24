const submitButton = document.querySelector("button");
const taskInput = document.querySelector("#task");

const favoritesList = document.querySelector("#favoritesList");
const taskList = document.querySelector("#taskList");
const doneTaskList = document.querySelector("#doneTaskList");

const taskListFromLS = localStorage.getItem("taskList");
const doneTaskListFromLS = localStorage.getItem("doneTaskList");
const favoritesListfromLS = localStorage.getItem("favoritesList");

let toDoModel;
let doneModel;
let favoriteModel;

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
if (favoritesListfromLS === null) {
  favoriteModel = [];
} else {
  favoriteModel = JSON.parse(favoritesListfromLS);
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

function addTaskToFavoritesList() {}
function removeTaskFromFavoritesList() {}

function updateLocalStorage() {
  const inputFelt = document.querySelector("input");
  console.log("toDoModel:", toDoModel);
  console.log("doneModel:", doneModel);
  localStorage.setItem("taskList", JSON.stringify(toDoModel));
  localStorage.setItem("doneTaskList", JSON.stringify(doneModel));
}

function updateList() {
  taskList.innerHTML = "";
  doneTaskList.innerHTML = "";

  toDoModel.forEach((each, i) => {
    taskList.innerHTML += `<div class="flex"><div class="clickTask"><input data-filter="toDo" type="checkbox" data-id="${i}"> 
    <label for="${i}">${each}</label></div><div class="flex"><div class="trash" id="${i}">🗑</div><p class="star" data-filter="false">☆</p></div></div>`;
  });

  doneModel.forEach((each, i) => {
    doneTaskList.innerHTML += `<div class="flex"><div class="clickTask"><input data-filter="done" type="checkbox" data-id="${i}">
          <label for="${i}">${each}</label></div><div class="flex"><div class="trash" id="${i}">🗑</div><p class="star" data-filter="true">★</p></div></div>`;
  });

  document.querySelectorAll(".clickTask").forEach((each) => {
    each.addEventListener("click", clickTask);
  });
  document.querySelectorAll(".star").forEach((each) => {
    each.addEventListener("click", clickStar);
  });
  document.querySelectorAll(".trash").forEach((each) => {
    each.addEventListener("click", clickTrash);
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

  updateList();
}

// function clickStar(evt) {

//   let starFilter = evt.target.dataset.filter;
//   console.log("star is: ", starFilter);
//   let starColor = evt.target.textcontent;
//   console.log(starColor);
// }

function clickStar(evt) {
  if (evt.target.dataset.filter === false) {
    evt.currentTarget.querySelector("p").textContent = "☆hej";
    console.log("now star is", evt.currentTarget.textContent);
  } else {
    evt.currentTarget.querySelector("p").textContent = "★";
    console.log("now star is", evt.currentTarget.textContent);
  }

  let star = evt.target.dataset.filter; // konstant for den trykkede button's (evt target's) datafilter
  let text = evt.currentTarget.textContent;
  console.log("textContent is", text);
  console.log("first check star is", star);

  if (evt.target.dataset.filter === false) {
    console.log("change star to true");
    evt.target.dataset.filter = true;
  } else if (evt.target.dataset.filter === true) {
    console.log("change star to false");
    evt.target.dataset.filter = false;
  }

  updateList();

  // if (star === "false") {
  //   console.log("we found star to be false");

  //   // text = "★";
  //   evt.currentTarget.textContent = "kliket";
  //   star === "true";
  //   updateList();

  //   // addStar(text);
  // } else if (star === "true") {
  //   console.log("we found star to be true");
  //   star === "false";
  //   text = "☆";

  //   // removeStar(text);
  // }
  // if (star === false) {
  // }
}

function clickTrash(evt) {
  const action = document.querySelector("input").dataset.filter;

  console.log("action", action);

  removeTaskFromList(evt.target.id);
  removeTaskFromDone(evt.target.id);
  updateList();
}
