
const taskInput = document.getElementById('taskInput');
 const taskList = document.getElementById('taskList');

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        const li = document.createElement('li');
        li.textContent = taskText;
        taskList.appendChild(li);
        taskInput.value = '';

        li.addEventListener('click', completeTask);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', deleteTask);
        li.appendChild(deleteBtn);

        saveTasksToLocalStorage();
    }
}

function completeTask(event) {
    const task = event.target;
    task.classList.toggle('completed');
    saveTasksToLocalStorage();
}

function deleteTask(event) {
    const task = event.target.parentElement;
    taskList.removeChild(task);
    saveTasksToLocalStorage();
}

function saveTasksToLocalStorage() {
    const tasks = [];
    const taskItems = taskList.getElementsByTagName('li');

    for (let i = 0; i < taskItems.length; i++) {
        tasks.push(taskItems[i].textContent);
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    if (tasks) {
        tasks.forEach(taskText => {
            const li = document.createElement('li');
            li.textContent = taskText;
            taskList.appendChild(li);
            li.addEventListener('click', completeTask);

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.addEventListener('click', deleteTask);
            li.appendChild(deleteBtn);
        });
    }
}

loadTasksFromLocalStorage();

document.getElementById('addTaskBtn').addEventListener('click', addTask);




