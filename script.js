// Getting and storing needed elements for modification
const column = document.querySelectorAll(".column-header");
const taskList = document.querySelectorAll(".task-list");

const countTodo = document.getElementById("count-todo");
const countProg = document.getElementById("count-prog");
const countDone = document.getElementById("count-done");

const taskInput = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");

const listTodo = document.getElementById("list-todo");
const listProg = document.getElementById("list-prog");
const listDone = document.getElementById("list-done");

// Store the specified dragged element
let draggedEl = null;

// Function to update count of the number of task in each column
function updateCounts() {
    column.forEach((el, i) => {
        const badge = el.querySelector(".col-count");
        const count = taskList[i].getElementsByClassName("task-card").length;
        badge.textContent = count;
    })
}

// Stored all columns in an array respectively, then added event listener to each of them
const lists = [listTodo, listProg, listDone];
lists.forEach(list => {
    list.addEventListener("dragover", (event) => {
        event.preventDefault();
    })
    list.addEventListener("drop", () => {
        list.appendChild(draggedEl);
        if (list === listDone) {
            draggedEl.classList.add("done-task");
        } else {
            draggedEl.classList.remove("done-task");
        }
        updateCounts();
    })
})

// Checks for key hits and create a task
taskInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        createTask();
    }
})

// Checks for clicks and create a task
addBtn.addEventListener("click", () => {
    createTask();
})

// Function to create tasks
function createTask() {
    const text = taskInput.value.trim(); // Trims values from the input
    if (!text) return; // Checks for empty inputs

    const formatted = text[0].toUpperCase() + text.slice(1); // Format value from input for presentation

    // Create the "li" element
    const li = document.createElement("li");
    li.classList.add("task-card");
    li.setAttribute("draggable", "true");
    // Add event listeners to the "li" element
    li.addEventListener("dragstart", () => {
        draggedEl = li;
        li.classList.add("dragging");
    })
    li.addEventListener("dragend", () => {
        li.classList.remove("dragging");
    })

    // Create the "p" element to present the formatted input value
    const p = document.createElement("p");
    p.classList.add("task-text");
    p.textContent = formatted;

    // Create a div to hold button(s)
    const taskActions = document.createElement("div");
    taskActions.classList.add("task-actions");

    // Create the "delete" button
    const delBtn = document.createElement("button");
    delBtn.classList.add("del-btn");
    delBtn.innerHTML = "<img class='del-icon' src='./images-and-icons/delete-btn.png'>";
    // Add a click event to the delete button
    delBtn.addEventListener("click", () => {
        li.remove();
        updateCounts();
    })

    // Append all elements as one and send to the webpage
    li.append(p);
    taskActions.append(delBtn);
    li.append(taskActions);
    listTodo.appendChild(li);

    // Empty the input field
    taskInput.value = "";
    
    // Update count
    updateCounts();
}