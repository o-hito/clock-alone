const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector(".toDoInput"),
  toDoList = document.querySelector(".toDoList");

let toDos = [];

const TODOS_N = "toDos";

function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  //toDoList.removeChild(li);
  const parseLi = JSON.parse(li.id);
  const cleanToDos = toDos.filter(function(toDo) {
    return toDo.id !== parseLi;
    //todo.id는 정수형, li.id는 문자형이라 parse해줌
  });
  console.log(cleanToDos, "클린배열");
  toDos = cleanToDos;
  resetId();
  saveToDo();
  while (toDoList.firstChild) {
    toDoList.removeChild(toDoList.firstChild);
  }
  delloadToDos();
}

function resetId() {
  toDos.forEach((value, index) => {
    value.id = index + 1;
    console.log(value);
  });
}

function delloadToDos() {
  const large = localStorage.getItem(TODOS_N);
  if (large !== null) {
    const parsedToDos = JSON.parse(large);
    console.log(parsedToDos);
    parsedToDos.forEach((thing, index) => delPaintToDo(thing.text, index));
  }
}

function delPaintToDo(text, index) {
  const li = document.createElement("li");
  const btn = document.createElement("button");
  const span = document.createElement("span");
  span.innerText = text;
  btn.innerText = "❌";
  btn.addEventListener("click", deleteToDo);
  li.appendChild(btn);
  li.appendChild(span);
  toDoList.appendChild(li);
  li.id = index + 1;
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
    id: newId // li.id 를 쓰면 string 으로 저장되고 newId로 치면 정수형으로 저장됨.. 이유가 뭘까
  };
  toDos.push(toDosObj);
  saveToDo();
  console.log("입력배열", toDos, "렝스", newId);
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
