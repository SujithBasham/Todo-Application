let todoItemsContainer = document.getElementById('todoItemsContainer');

// Function to get the To-Do list from local storage
function getTodoListFromLocalStorage() {
    let stringifiedTodoList = localStorage.getItem("todoList");
    let parsedTodoList = JSON.parse(stringifiedTodoList);
    if (parsedTodoList === null) {
        return [];
    } else {
        return parsedTodoList;
    }
}

// Initialize the To-Do list and count
let todoList = getTodoListFromLocalStorage();
let todoCount = todoList.length;

// Function to delete a To-Do item
function onDeleteTodo(todoId) {
    let todoElement = document.getElementById(todoId);
    todoItemsContainer.removeChild(todoElement);

    // Remove item from the todoList array
    todoList = todoList.filter(todo => 'todo' + todo.uniqueNo !== todoId);
    // Save the updated list to local storage
    localStorage.setItem("todoList", JSON.stringify(todoList));
}

// Function to change the status of a To-Do item
function onTodoStatusChanged(checkboxId, labelId) {
    let checkboxElement = document.getElementById(checkboxId);
    let labelElement = document.getElementById(labelId);
    labelElement.classList.toggle("checked");

    // Update the checked status in the todoList array
    let todoIndex = todoList.findIndex(todo => 'checkbox' + todo.uniqueNo === checkboxId);
    if (todoIndex !== -1) {
        todoList[todoIndex].isChecked = checkboxElement.checked;
        // Save the updated list to local storage
        localStorage.setItem("todoList", JSON.stringify(todoList));
    }
}

// Function to create and append a To-Do item
function createAndAppendTodo(todo) {
    let checkboxId = 'checkbox' + todo.uniqueNo;
    let labelId = 'label' + todo.uniqueNo;
    let todoId = "todo" + todo.uniqueNo;
    let todoElement = document.createElement("li");
    todoElement.classList.add("todo-item-container", "d-flex", "flex-row");
    todoElement.id = todoId;
    todoItemsContainer.appendChild(todoElement);

    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.id = checkboxId;
    inputElement.classList.add("checkbox-input");
    inputElement.checked = todo.isChecked || false; // Maintain the checked state
    todoElement.appendChild(inputElement);

    inputElement.onclick = function () {
        onTodoStatusChanged(checkboxId, labelId);
    }

    let labelContainer = document.createElement("div");
    labelContainer.classList.add("label-container", 'd-flex', 'flex-row');
    todoElement.appendChild(labelContainer);

    let labelElement = document.createElement('label');
    labelElement.setAttribute("for", checkboxId);
    labelElement.classList.add("checkbox-label");
    labelElement.textContent = todo.text;
    labelElement.id = labelId;
    if (todo.isChecked) {
        labelElement.classList.add("checked");
    }
    labelContainer.appendChild(labelElement);

    let deleteContainer = document.createElement('div');
    deleteContainer.classList.add("delete-icon-container");
    labelContainer.appendChild(deleteContainer);

    let deleteIcon = document.createElement('i');
    deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");
    deleteIcon.onclick = function () {
        onDeleteTodo(todoId);
    }
    deleteContainer.appendChild(deleteIcon);
}

// Loop through the To-Do list and create elements
for (let eachItem of todoList) {
    createAndAppendTodo(eachItem);
}

// Function to add a new To-Do item
function onAddTodo() {
    let userInputElement = document.getElementById('todoUserInput');
    let userInputValue = userInputElement.value.trim(); // Trim the input value to remove extra spaces
    if (userInputValue === "") {
        alert("Enter Valid Text");
        return;
    }
    todoCount = todoCount + 1;
    let newTodo = {
        text: userInputValue,
        uniqueNo: todoCount,
        isChecked: false // Default to unchecked
    }
    todoList.push(newTodo);
    createAndAppendTodo(newTodo);
    userInputElement.value = "";
    // Save updated list to local storage
    localStorage.setItem("todoList", JSON.stringify(todoList));
}

// Adding event listeners to the buttons
let addTodoButton = document.getElementById("addTodoButton");
let saveTodoButton = document.getElementById("saveTodoButton");

addTodoButton.onclick = function () {
    onAddTodo();
}

saveTodoButton.onclick = function () {
    localStorage.setItem("todoList", JSON.stringify(todoList));
}
