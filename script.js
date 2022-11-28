//todos
const todos = [];

//Choosing DOM elements
const toDoInput = document.querySelector(".to-do-input");
const addBtn = document.querySelector(".add");
const tasksContainer = document.querySelector(".tasks-container");
const finishedTasksContainer = document.querySelector(
  ".finished-tasks-container"
);

//Render todo container
const renderToDo = function () {
  tasksContainer.innerHTML = "";
  finishedTasksContainer.innerHTML = "";
  tasksContainer.innerHTML += `<h1 class="tasks">Tasks</h1>`;
  finishedTasksContainer.innerHTML += `<h1 class="finished-tasks">Finished Tasks</h1>`;

  todos.map((todo) => {
    if (todo.isDeleted !== true && todo.isFinished !== true) {
      tasksContainer.innerHTML += `<div>
                                    <p class="to-do-text" style="display:inline-block">${todo.text}</p>
                                    <i class="fa-regular fa-circle-check done" data-id="${todo.id}"></i>
                                    <i class="fa-solid fa-trash remove" data-id=${todo.id}></i>
                                </div>`;
    } else if (todo.isFinished === true) {
      finishedTasksContainer.innerHTML += `<div>
                                    <p class="to-do-text" style="display:inline-block">${todo.text}</p>
                                </div>`;
    }
  });

  //Remove item
  const doneBtns = document.querySelectorAll(".done");
  const removeBtns = document.querySelectorAll(".remove");

  removeBtns.forEach((removeBtn) => {
    removeBtn.addEventListener("click", (e) => {
      const id = Number(e.target.getAttribute("data-id"));
      const todo = todos.find((todo) => todo.id === id);
      todo.isDeleted = true;
      renderToDo();
    });
  });
  doneBtns.forEach((doneBtn) => {
    doneBtn.addEventListener("click", (e) => {
      const id = Number(e.target.getAttribute("data-id"));
      const todo = todos.find((todo) => todo.id === id);
      todo.isFinished = true;
      renderToDo();
    });
  });
};

//Add item
addBtn.addEventListener("click", () => {
  if (toDoInput.value.trim() !== "") {
    todos.push({
      id: Math.floor(Math.random() * 1000),
      text: toDoInput.value,
      isDeleted: false,
      isFinished: false,
    });
  }
  toDoInput.value = "";
  renderToDo();
});
