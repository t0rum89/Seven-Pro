const Module = function (selector) {
  const main = document.querySelector(selector);

  let lists;
  !localStorage.lists
    ? (lists = [])
    : (lists = JSON.parse(localStorage.getItem("lists")));

  let tasks;
  !localStorage.tasks
    ? (tasks = [])
    : (tasks = JSON.parse(localStorage.getItem("tasks")));

  const updateLocalLists = () => {
    localStorage.setItem("lists", JSON.stringify(lists));
  };

  const updateLocalTasks = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  let taskName;
  let addTaskBtn;
  let taskContainer;
  let clearAllButton;

  const createListTemplate = (list) => {
    return `
      <div class="todo-container">
        <div class="todo-header">
          <div class="todo-header__main">
            <h2 class="todo-header__title">${list.name}</h2>
            <button class="todo-header__remove-btn button">Clear all</button>
          </div>
          <input
            class="todo-header__input"
            id="add-task"
            type="text"
            placeholder="Task name"
          />
          <button class="todo-header__add-btn button" id="add-task-btn">
            Add task
          </button>
        </div>
        <div class="todo-body">
          <p class="todo-body__text">What must be done:</p>
          <div class="todo-body__main">
           <ul class="todo-list"></ul>
          </div>
        </div>
      </div>
  `;
  };

  const createTaskTemplate = (task, index) => {
    return `
        <li 
          class="todo-list__item
          ${task.pinned ? "pinned" : ""}
          ${task.completed ? "checked" : ""}
          "
        >
          <div class="element">
            <input
              class="element__checkbox"
              type="checkbox"
              name="check"
              key="${index}"
              ${task.completed ? "checked" : ""}
              id="check-complete${index}"
            />
            <label for="check-complete${index}"></label>
            <div class="element__name">
              <p class="element__name-text">${task.name}</p>
            </div>
            <div class="element__buttons">
              <button
                class="element__pin button"
                key="${index}"
                ${task.completed ? "disabled" : ""}>
                Pin
              </button>
              <button
                class="element__edit button"
                key="${index}"
                ${task.completed ? "disabled" : ""}>
                Edit
              </button>
              <button
                class="element__del button"
                key="${index}">
                Del
              </button>
            </div>
          </div>
        </li>
  `;
  };

  const fillLists = () => {
    main.innerHTML = "";
    if (lists.length > 0) {
      lists.forEach((item, index) => {
        main.innerHTML += createListTemplate(item, index);
      });
    }
  };

  const fillTasks = () => {
    taskContainer.innerHTML = "";
    const filterTasks = () => {
      const pinnedTasks = tasks?.filter((item) => item.pinned);
      const restTasks = tasks?.filter((item) => !item.pinned);
      tasks = [...pinnedTasks, ...restTasks];
    };
    filterTasks();
    if (tasks.length > 0) {
      tasks.forEach((item, index) => {
        taskContainer.innerHTML += createTaskTemplate(item, index);
      });
    }
  };

  function init(name) {
    !localStorage.lists
      ? (lists = [])
      : (lists = JSON.parse(localStorage.getItem("lists")));
    lists = [{ name }];
    updateLocalLists();
    fillLists();
    taskName = document.getElementById("add-task");
    addTaskBtn = document.getElementById("add-task-btn");
    taskContainer = document.querySelector(".todo-list");
    clearAllButton = document.querySelector(".todo-header__remove-btn");
    fillTasks();
    clearAllButton.addEventListener("click", () => {
      let ask = confirm("Clear all tasks?");
      if (ask === true) {
        tasks = [];
        updateLocalTasks();
        fillTasks();
      } else {
        return;
      }
    });
    addTaskBtn.addEventListener("click", () => {
      if (taskName.value.trim()) {
        tasks.push({ name: taskName.value, completed: false, pinned: false });
        taskName.value = "";
      } else {
        alert("Enter valid name!");
      }
      updateLocalTasks();
      fillTasks();
    });

    const completeTask = (index) => {
      tasks[index].completed = !tasks[index].completed;
      updateLocalTasks();
      fillTasks();
    };

    const pinnedTask = (e, index) => {
      tasks[index].pinned = !tasks[index].pinned;
      updateLocalTasks();
      fillTasks();
    };

    const editTask = (index) => {
      let newValue = prompt();
      if (newValue.trim()) {
        tasks[index].name = newValue;
      } else {
        return;
      }
      updateLocalTasks();
      fillTasks();
    };

    const deleteTask = (index) => {
      tasks.splice(index, 1);
      updateLocalTasks();
      fillTasks();
    };

    taskContainer.addEventListener("click", (e) => {
      const classes = e.target.classList;
      const key = e.target.getAttribute("key");
      if (classes.contains("element__del")) {
        deleteTask(parseInt(key));
      }
      if (classes.contains("element__pin")) {
        pinnedTask(e, parseInt(key));
      }
      if (classes.contains("element__edit")) {
        editTask(parseInt(key));
      }
      if (classes.contains("element__checkbox")) {
        completeTask(parseInt(key));
      }
    });
  }
  fillLists();

  return {
    init,
  };
};
