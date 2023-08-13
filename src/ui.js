import User from "./user";

const user = new User();
let currentPage = 'all';

function loadAll() {
    const tasksContainer = document.querySelector('.tasks-container');
    tasksContainer.innerHTML = '';
    user.tasks.forEach(function (task) {
        createTaskUI(task);
    });
}

function loadToday() {

}

function loadWeek() {

}

function loadCurrentPage() {
    switch (currentPage) {
        case 'all':
            loadAll();
            break;
        case 'today':
            loadToday();
            break;
        case 'week':
            loadWeek();
            break;
        default:
            loadAll();
            break;
    }
}

function main() {
    const createNewTaskBtn = document.querySelector('.create-new-task');
    createNewTaskBtn.addEventListener('click', createNewTask);
}

function createNewTask() {
    createTaskPopup.style.display = 'flex';
    darkOverlay.style.display = 'block';
    taskDate.value = '';
    taskText.value = '';
}

const darkOverlay = document.querySelector('.dark-overlay');
const taskText = document.querySelector('#task-text');
const taskDate = document.querySelector('#task-date');
const createTaskPopup = document.querySelector('.create-task-popup');
createTaskPopup.addEventListener('submit', (e) => {
    e.preventDefault();
    let text = taskText.value;
    let date = taskDate.value;
    user.createNewTask(text, date);
    loadCurrentPage();

    createTaskPopup.style.display = 'none';
    darkOverlay.style.display = 'none';
});

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

    completeBtn.addEventListener('click', () => {
        user.removeTask(taskText);
        task.remove();
        loadCurrentPage();
    })

    removeBtn.addEventListener('click', () => {
        user.removeTask(taskText);
        task.remove();
        loadCurrentPage();
    })

    leftSide.appendChild(completeBtn);
    leftSide.appendChild(taskText);
    rightSide.appendChild(taskDate);
    rightSide.appendChild(removeBtn);
    task.appendChild(leftSide);
    task.appendChild(rightSide);

    tasksContainer.appendChild(task);
}

const navHome = document.querySelector('.nav-home');
const navHomeBtns = navHome.querySelectorAll('button');
const navProjects = document.querySelector('.nav-projects');
const navProjectBtns = navProjects.querySelectorAll('button');

handleNavStyling(navHomeBtns);
handleNavStyling(navProjectBtns);

function handleNavStyling(buttons) {
    buttons.forEach((button) => {
        button.addEventListener('mouseenter', () => {
            if (!button.textContent.startsWith('- ')) {
                button.textContent = '- ' + button.textContent;
            }
        });
    
        button.addEventListener('mouseleave', () => {
            if (button.getAttribute('nav-btn-clicked') !== 'true') {
                button.textContent = button.textContent.slice(2);
            }
        });
    
        button.addEventListener('click', () => {
            buttons.forEach(otherButtons => {
                if (otherButtons !== button) {
                    if (otherButtons.textContent.startsWith('- ')) {
                        otherButtons.textContent = otherButtons.textContent.slice(2);
                    }
                    otherButtons.removeAttribute('nav-btn-clicked');
                }
            });
    
            button.setAttribute('nav-btn-clicked', 'true');
        });
    });
}

export default function loadPage() {
    loadCurrentPage();
    main();
}