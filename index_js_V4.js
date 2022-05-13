const arrayForTodos = [];

async function getJsondata() {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos");
  const JsonData = await response.json();
  return JsonData;
}
getJsondata().then((JsonData) => {
  let tempArrForJsonData = [];
  tempArrForJsonData = JsonData;
  tempArrForJsonData.forEach((item) => {
    arrayForTodos.push(item);
  });
  displayArray(arrayForTodos);
});

const searchLoupe = document.getElementById("search-loupe");
searchLoupe.addEventListener("click", eventListenerClickForLoupeSearch);

function getInput(inputField) {
  const userInput = inputField.value;
  return userInput;
}

function resetInput(inputField) {
  return (inputField.value = "");
}

function displayArray(array) {
  const todoList = document.getElementById("todo-list");
  let stringList = "";
  array.forEach((item) => {
    stringList += `<div class="li-div-position"><li><icon onclick={deleteTodos(${item.id})}><i class="fa-solid fa-trash-can li-div-icon"></i> 
        </icon>${item.title}</li></div>`;
  });
  todoList.innerHTML = stringList;
}

function eventListenerClickForLoupeSearch() {
  const inputSearchTodos = document.getElementById("input-search-todos");
  const userInput = getInput(inputSearchTodos);
  if (userInput.length > 0) {
    filterArray(arrayForTodos, userInput);
    resetInput(inputSearchTodos);
  }
}

function filterArray(array, input) {
  const filteredArray = array.filter((element) =>
    element.title.includes(input)
  );
  displayArray(filteredArray);
}

const addNewTodoBtn = document.getElementById("pink-btn-add-new-todo");
addNewTodoBtn.addEventListener("click", eventListenerClickForAddNewTodo);

function eventListenerClickForAddNewTodo() {
  const btnInputNewTodo = document.getElementById("input-new-todo");
  const newTodoInputValue = getInput(btnInputNewTodo);
  POSTtodo(newTodoInputValue, arrayForTodos);
  resetInput(btnInputNewTodo);
}

function POSTtodo(input, array) {
  fetch("https://jsonplaceholder.typicode.com/todos", {
    method: "POST",
    body: JSON.stringify({
      userId: 1,
      title: input,
      completed: false,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      array.push(json);
      displayArray(array);
    });
}

function deleteTodos(id) {
  const filteredArrayById = arrayForTodos.filter((element) => element.id != id);
  displayArray(filteredArrayById);
  DELETEtodo();
}

function DELETEtodo() {
  fetch("https://jsonplaceholder.typicode.com/todos/1", {
    method: "DELETE",
  }).then((response) => console.log(response));
}
