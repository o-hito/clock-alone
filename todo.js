const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector(".toDoInput"),
  toDoList = document.querySelector(".toDoList");

let toDos = [];

const TODOS_N = "toDos";

function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  //toDoList.removeChild(li);
  const cleanToDos = toDos.filter(function(toDo) {
    return toDo.id !== li.id;
  });
  toDos = cleanToDos;
  saveToDo();
  while (toDoList.hasChildNodes) {
    toDoList.removeChild(toDoList.firstChild);
  }
  loadToDos();
  console.log(toDoList.hasChildNodes());
}

function saveToDo() {
  localStorage.setItem(TODOS_N, JSON.stringify(toDos));
}

function paintToDo(text) {
  const li = document.createElement("li");
  const btn = document.createElement("button");
  const span = document.createElement("span");
  const newId = toDos.length + 1;
  span.innerText = text;
  btn.innerText = "❌";
  btn.addEventListener("click", deleteToDo);
  li.appendChild(btn);
  li.appendChild(span);
  toDoList.appendChild(li);
  li.id = newId;
  const toDosObj = {
    text: text,
    id: li.id
  };
  toDos.push(toDosObj);
  saveToDo();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  toDoInput.value = "";
  paintToDo(currentValue);
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_N);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function(toDo) {
      paintToDo(toDo.text);
    });
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
