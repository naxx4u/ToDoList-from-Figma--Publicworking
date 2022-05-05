const addTaskBtn = document.querySelector(".enter-btn");
const deskTaskInput = document.getElementById("description-task");
const activeTask = document.querySelector(".active-task");
let tasks;
!localStorage.tasks
  ? (tasks = [])
  : (tasks = JSON.parse(localStorage.getItem("tasks")));

let todoItemElems = [];
function Task(description) {
  this.description = description;
  this.completed = false;
}
const createTemplate = (task, index) => {
  return `
    <div class="do-task ${task.completed ? "checked" : ""}">
    <input  class="do-task-input" type="checkbox" id="checkbox" ${
      task.completed ? "checked" : ""
    }/>
    <label onclick="completeTask(${index}) "  class="do-task-label" for="checkbox">
      ${task.description} 
    </label>
    <button onclick="deleteTask(${index})"  class="del-btn" type="submit">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
          clip-rule="evenodd"
        />
      </svg>
    </button>
  </div>
    `;
};
const filterTasks = () => {
  const activeTasks =
    tasks.length && tasks.filter((item) => item.completed == false);
  const completedTasks =
    tasks.length && tasks.filter((item) => item.completed == true);
  tasks = [...activeTasks, ...completedTasks];
};
const fillHtmlList = () => {
  activeTask.innerHTML = "";
  if (tasks.length > 0) {
    filterTasks();
    tasks.forEach((item, index) => {
      activeTask.innerHTML += createTemplate(item, index);
    });
    todoItemElems = document.querySelectorAll(".do-task"); // 51:58
  }
};
fillHtmlList();
const updateLocal = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};
const completeTask = (index) => {
  tasks[index].completed = !tasks[index].completed;
  if (tasks[index].completed) {
    todoItemElems[index].classList.add("checked");
  } else {
    todoItemElems[index].classList.remove("checked");
  }
  updateLocal();
  fillHtmlList();
};
addTaskBtn.addEventListener("click", () => {
  tasks.push(new Task(deskTaskInput.value));
  updateLocal();
  fillHtmlList();
  deskTaskInput.value = "";
});
const deleteTask = (index) => {
  todoItemElems[index].classList.add("delition");
  setTimeout(() => {
    tasks.splice(index, 1);
    updateLocal();
    fillHtmlList();
  }, 1000);
};
