import User from "./user";

function loadAllTasks(user) {
    let allUserTasks = user.tasks;

    allUserTasks.forEach(function(value) {
        createTaskUI(value);
    });
}

function main(user) {
    // creating tasks 
    const darkOverlay = document.querySelector('.dark-overlay');
    const createTaskPopup = document.querySelector('.create-task-popup');
    const createNewTaskBtn = document.querySelector('.create-new-task');
    const taskText = document.querySelector('#task-text');
    const taskDate = document.querySelector('#task-date');

    createNewTaskBtn.addEventListener('click', () => {
        createTaskPopup.style.display = 'flex';
        darkOverlay.style.display = 'block';

        createTaskPopup.addEventListener('submit', (e) => {
            e.preventDefault();
            let text = taskText.value;
            let date = taskDate.value;
            user.createNewTask(text, date);
            loadAllTasks(user);
            createTaskPopup.style.display = 'none';
            darkOverlay.style.display = 'none';
        });
    });
}

function createTaskUI(taskObj) {
    const tasksContainer = document.querySelector('.tasks-container');
    const task = document.createElement('div');
    const leftSide = document.createElement('div');
    const rightSide = document.createElement('div');
    const completeBtn = document.createElement('button');
    const removeBtn = document.createElement('button');
    const taskText = document.createElement('p');
    const taskDate = document.createElement('p');

    task.classList.add('task');
    leftSide.classList.add('task-complete-and-text');
    rightSide.classList.add('task-date-and-remove');
    completeBtn.classList.add('green-btn');
    completeBtn.classList.add('btn');
    removeBtn.classList.add('red-btn');
    removeBtn.classList.add('btn');
    taskText.classList.add('task-text');
    taskDate.classList.add('task-date');

    taskText.textContent = taskObj.text;
    taskDate.textContent = taskObj.date;
    completeBtn.textContent = "Complete"
    removeBtn.textContent = "Remove"

    leftSide.appendChild(completeBtn);
    leftSide.appendChild(taskText);
    rightSide.appendChild(taskDate);
    rightSide.appendChild(removeBtn);
    task.appendChild(leftSide);
    task.appendChild(rightSide);

    tasksContainer.appendChild(task);
}

export default function loadPage() {
    main(user);
    loadAllTasks(user);
}