const greeting = document.querySelector(".greeting");
const form = document.getElementById("form");
const tasksList = document.getElementById("tasks-list");
const newTaskInput = document.getElementById("new-task");
const pendingTasks = document.getElementById("pending-tasks");

const html = String.raw;

greeting.insertAdjacentText("beforeend", localStorage.getItem("userName"));

let savedTasks = [];

//check if ther is tasks in local storage
if (localStorage.getItem("tasks")) {
  savedTasks = JSON.parse(localStorage.getItem("tasks"));
}

//function to get data from the form and save it
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  newTaskInput.value = ""; //empty newTaskInput

  const newTaskCreation = {
    id: savedTasks.length,
    value: formData.get("todo_task"),
    type: formData.get("task_type"),
    completed: false,
  };

  savedTasks.push(newTaskCreation);
  saveToLocalStorage(savedTasks);
  renderTasks(savedTasks);
  numberOfPendingTasks(savedTasks);
});

function Todo(task) {
  return html`<li>
    <div class="task_description">
      <label
        for="${task.id}"
        data-id="${task.id}"
        data-action="check"
        onclick="handleActionClick(this)"
        class="check"
      >
        <input
          type="checkbox"
          class="check_done check"
          ${task.completed ? "checked" : ""}
        />
        <span class="bubble ${task.type}"></span>
        <span>${task.value}</span>
      </label>
    </div>
    <div class="fuctional_icons">
      <button
        title="delete"
        data-id="${task.id}"
        data-action="delete"
        onclick="handleActionClick(this)"
      >
        <img src="delete.svg" alt="" role="presentation" />
      </button>
    </div>
  </li>`;
}

function numberOfPendingTasks(savedTasks) {
  let totalCounter = 0;
  let workCounter = 0;
  let personalCounter = 0;
  savedTasks.forEach((task) => {
    if (!task.completed) {
      totalCounter++;
      if (task.type === "work") {
        workCounter++;
      } else if (task.type === "personal") {
        personalCounter++;
      }
    }
  });
  const pending = html`
    <p>You have <strong>${totalCounter}</strong> pending task</p>
    <p>
      <strong class="work_color">${workCounter}</strong> work,
      <strong class="personal_color">${personalCounter}</strong> personal
    </p>
  `;
  pendingTasks.innerHTML = pending;
}

//adding new task in the todo list
function renderTasks(savedTasks) {
  tasksList.innerHTML = "";

  const newtasks = savedTasks.map((task) => Todo(task)).join("");

  tasksList.innerHTML = newtasks;
}

function alertOnDone() {
  swal.fire({
    title: "Great Job",
    confirmButtonText: "Keep doing",
    showCloseButton: true,
    imageUrl:
      "https://media.tenor.com/KeSDB2EZjPAAAAAM/leonardo-di-caprio-wolf-of-wall-street.gif",
    imageWidth: 200,
    imageHeight: 200,
  });
}

function handleActionClick(target) {
  const { action, id } = target.dataset;
  console.log(id);
  switch (action) {
    /*   case "edit": {
      const div2 = target.parentNode;
      const li = div2.parentNode;
      const div1 = li.firstChild.nextSibling;
      const label = div1.firstChild.nextSibling;
      console.log(label);
      break;
    } */

    case "delete": {
      deleteFromUI(target);
      deleteFromLocalStorage(id);
      numberOfPendingTasks(savedTasks);
      break;
    }

    case "check": {
      const box = target.firstChild.nextSibling; //accessng the input
      const completed = !box.checked;

      box.checked = completed;
      savedTasks[id].completed = completed;

      if (box.checked) {
        alertOnDone();
        numberOfPendingTasks(savedTasks);
      }
      numberOfPendingTasks(savedTasks);

      saveToLocalStorage(savedTasks);
      break;
    }
  }
}

function saveToLocalStorage(savedTasks) {
  window.localStorage.setItem("tasks", JSON.stringify(savedTasks));
}

function loadFromLocalStorage() {
  const data = localStorage.getItem("tasks");

  if (data) {
    const tasks = JSON.parse(data);
    renderTasks(tasks);
  }
}

function deleteFromLocalStorage(id) {
  // (extra hacky way) can add prop to the objet called delete and set the deleted task value to null then handle it in render  function 
  savedTasks = savedTasks.filter((task) => task.id !== Number(id));

  for (let i = 0; i < savedTasks.length; i++) {
    savedTasks[i].id = i;
  }

  saveToLocalStorage(savedTasks);
  renderTasks(savedTasks); //cuz the error in console on deleting
}

function deleteFromUI(target) {
  const div = target.parentNode;
  const li = div.parentNode;
  li.remove();
}

const clearButton = document.querySelector(".clear_button");
clearButton.addEventListener("click", () => {
  Swal.fire({
    title: "Are you sure you want to Clear all tasks?",
    icon: "warning",
    showDenyButton: true,
    confirmButtonText: "Yes",
    denyButtonText: `No`,
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire("Done!", "", "success");
      savedTasks = [];
      tasksList.innerHTML = "";
      saveToLocalStorage(savedTasks);
      numberOfPendingTasks(savedTasks);
    } else if (result.isDenied) {
      Swal.fire("Nothing changed", "", "info");
    }
  });
});

const logoutButton = document.querySelector(".logout_button");
logoutButton.addEventListener("click", () => {
  Swal.fire({
    title: "Are you sure you want to Logout?",
    icon: "warning",
    showDenyButton: true,
    confirmButtonText: "Yes",
    denyButtonText: `No`,
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      savedTasks = [];
      tasksList.innerHTML = "";
      localStorage.removeItem("userName");
      saveToLocalStorage(savedTasks);
      numberOfPendingTasks(savedTasks);

      Swal.fire({
        title: "You have been logged out!",
        icon: "info",
        confirmButtonText: "Okey",
      }).then((result) => {
        window.location.href = "../index.html";
      });
    } else if (result.isDenied) {
      Swal.fire("Nothing changed", "", "info");
    }
  });
});

window.addEventListener("load", loadFromLocalStorage);
window.addEventListener("load", () => {
  numberOfPendingTasks(savedTasks);
});
