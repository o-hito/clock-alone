const formName = document.querySelector(".js-formName"),
  formToDO = document.querySelector(".js-toDoForm"),
  input = formName.querySelector("input"),
  displayName = document.querySelector(".displayName");

const SHOWING_CN = "showing",
  USER_CN = "currentUser";

function paintingHi(name) {
  displayName.innerText = `안녕! ${name} 친구야`;
  displayName.classList.add(SHOWING_CN);
  formToDO.classList.add(SHOWING_CN);
  formName.classList.remove(SHOWING_CN);
}

function saveName(name) {
  localStorage.setItem("currentUser", name);
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = input.value;
  saveName(currentValue);
  paintingHi(currentValue);
}

function askForName() {
  formName.classList.add(SHOWING_CN);
  formName.addEventListener("submit", handleSubmit);
}

function loadName() {
  const currentUser = localStorage.getItem("currentUser");
  if (localStorage.getItem(USER_CN) === null) {
    askForName();
  } else {
    paintingHi(currentUser);
  }
}

function init() {
  loadName();
}

init();
