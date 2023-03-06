"use strict";

(function () {
  let tasks = [];
  const taskList = document.getElementById("list");
  const addTaskInput = document.getElementById("add");
  const tasksCounter = document.getElementById("tasks-counter");

  function addTaskToDom(task) {
    const li = document.createElement("li");

    li.innerHTML = `<div class="check-label-div">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 checkbox" id="${
    task.id - 1000
  }">
  <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" class="checkbox" id="${
    task.id
  }"/>
</svg>

            
            <label for="${task.id}" id="${task.id + 5000}">${task.text}</label>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="delete w-6 h-6" data-id="${
              task.id
            }">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
</svg>

  
  `;

    taskList.append(li);
  }

  function renderList(tasks) {
    taskList.innerHTML = "";

    for (let i = 0; i < tasks.length; i++) {
      addTaskToDom(tasks[i]);

      if (tasks[i].done) {
        document.getElementById(`${tasks[i].id - 1000}`).style.color =
          "#009fff";
        document.getElementById(`${tasks[i].id + 5000}`).style.textDecoration =
          "line-through";
        document.getElementById(`${tasks[i].id}`).style.color = "#009fff";
      }
    }
    document.querySelector(".completed").classList.remove("active-column");
    document.querySelector(".all").classList.add("active-column");
    document.querySelector(".active").classList.remove("active-column");

    tasksCounter.innerHTML = tasks.length;
  }

  function markTaskAsComplete(taskId) {
    const task = tasks.filter(function (task) {
      return task.id === taskId;
    });

    if (task.length > 0) {
      const currentTask = task[0];

      currentTask.done = !currentTask.done;

      renderList(tasks);
      // showNotification("Task marked as completed");
      return;
    }

    // showNotification("Could not perform the action");
  }

  function deleteTask(taskId) {
    const newTasks = tasks.filter(function (task) {
      return task.id !== taskId;
    }); //filter will return all the tasks items which satisfy the boolean to the new Array

    tasks = newTasks;
    renderList(tasks);
    // showNotification("Task deleted successfully");
  }

  function addTask(task) {
    if (task) {
      tasks.push(task);
      renderList(tasks);
      // showNotification("Task added successfully");
      return;
    }

    showNotification("Task cannot be added");
  }

  function showNotification(text) {
    alert(text);
  }

  function handleInputKeypress(e) {
    if (e.key === "Enter") {
      const text = e.target.value;

      if (!text) {
        showNotification("Empty task cannot be created");
        return;
      }

      const task = {
        text,
        id: Date.now().toString(),
        done: false,
      };

      e.target.value = "";
      addTask(task);
    }
  }

  function handleClickListener(e) {
    const target = e.target;

    if (target.className.animVal === "delete w-6 h-6") {
      const taskId = target.dataset.id;
      deleteTask(taskId);
      return;
    } else if (
      target.className.animVal === "checkbox" ||
      target.className.animVal === "w-6 h-6 checkbox"
    ) {
      const taskId = target.id;
      markTaskAsComplete(taskId);
      return;
    } else if (
      target.className === "active pointer" ||
      target.className === "active pointer active-column"
    ) {
      let activeTasks = tasks.filter(function (arr) {
        return arr.done === false;
      });
      renderList(activeTasks);
      document.querySelector(".completed").classList.remove("active-column");
      document.querySelector(".all").classList.remove("active-column");
      document.querySelector(".active").classList.add("active-column");
    } else if (
      target.className === "completed pointer" ||
      target.className === "completed pointer active-column"
    ) {
      let activeTasks = tasks.filter(function (arr) {
        return arr.done === true;
      });
      renderList(activeTasks);
      document.querySelector(".completed").classList.add("active-column");
      document.querySelector(".all").classList.remove("active-column");
      document.querySelector(".active").classList.remove("active-column");
    } else if (
      target.className === "all pointer" ||
      target.className === "all pointer active-column"
    ) {
      document.querySelector(".completed").classList.remove("active-column");
      document.querySelector(".all").classList.add("active-column");
      document.querySelector(".active").classList.remove("active-column");
      renderList(tasks);
    } else if (target.className === "clear-completed pointer") {
      let activeTasks = tasks.filter(function (arr) {
        return arr.done === false;
      });
      tasks = activeTasks;
      renderList(tasks);
    }
  }

  addTaskInput.addEventListener("keyup", handleInputKeypress);
  document.addEventListener("click", handleClickListener);
})();
