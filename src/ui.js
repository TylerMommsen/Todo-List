import User from "./user";

const user = new User();
let currentPage = 'all';
let pages = ['all', 'today', 'week'];

function loadCurrentPage() {
    const tasksContainer = document.querySelector('.tasks-container');
    tasksContainer.innerHTML = '';

    const currentPageTitle = document.querySelector('#current-page-title');
    currentPageTitle.textContent = currentPage.charAt(0).toUpperCase() + currentPage.slice(1);
    getTasksFromProj();
}

function getTasksFromProj() {
    user.projects.forEach(project => {
        if (project.name === currentPage) {
            let projectTasks = project.tasks;

            projectTasks.forEach(task => {
                createTaskUI(task);
            })
        }
    });
}

function updateNavProjects() {
    navProjectBtns.forEach((button) => {
        button.remove();
    })

    for (let i = 3; i < pages.length; i++) {
        createProjectUI(pages[i]);
    }

    navProjectBtns = navProjects.querySelectorAll('button');
    handleNavBtnStyling(navProjectBtns);
}

function createProjectUI(text) {
    const projectBtn = document.createElement('button');
    projectBtn.classList.add('btn');
    projectBtn.classList.add('project');
    projectBtn.textContent = text;

    navProjects.appendChild(projectBtn);
}

function main() {
    const createNewTaskBtn = document.querySelector('.create-new-task');
    createNewTaskBtn.addEventListener('click', createNewTask);

    const createNewProjectBtn = document.querySelector('.create-new-project');
    createNewProjectBtn.addEventListener('click', createNewProject);
}

const darkOverlay = document.querySelector('.dark-overlay');
const taskText = document.querySelector('#task-text');
const taskDate = document.querySelector('#task-date');
const createTaskPopup = document.querySelector('.create-task-popup');

const projName = document.querySelector('#project-name');
const createProjectPopup = document.querySelector('.create-project-popup');

function createNewTask() {
    createTaskPopup.style.display = 'flex';
    darkOverlay.style.display = 'block';
    taskDate.value = '';
    taskText.value = '';
}

function createNewProject() {
    createProjectPopup.style.display = 'flex';
    darkOverlay.style.display = 'block';
    projName.value = '';
}

createTaskPopup.addEventListener('submit', (e) => {
    e.preventDefault();
    let text = taskText.value;
    let date = taskDate.value;
    if (taskDate.value === '') {
        date = 'YYYY/MM/DD';
    }
    let task = user.createNewTask(text, date);
    user.projects.forEach(project => {
        if (project.name === currentPage) {
            project.addTask(task);
        }
    })
    loadCurrentPage();

    createTaskPopup.style.display = 'none';
    darkOverlay.style.display = 'none';
});

createProjectPopup.addEventListener('submit', (e) => {
    e.preventDefault();
    let name = projName.value;
    user.createNewProject(name);
    pages.push(name);
    updateNavProjects();
    currentPage = name;
    loadCurrentPage();

    createProjectPopup.style.display = 'none';
    darkOverlay.style.display = 'none';
});

const cancelProjectPopupBtn = document.querySelector('#cancelProjPopupBtn');
cancelProjectPopupBtn.addEventListener('click', (e) => {
    e.preventDefault();
    createProjectPopup.style.display = 'none';
    darkOverlay.style.display = 'none';
});

const cancelTaskPopupBtn = document.querySelector('#cancelTaskPopupBtn');
cancelTaskPopupBtn.addEventListener('click', (e) => {
    e.preventDefault();
    createTaskPopup.style.display = 'none';
    darkOverlay.style.display = 'none';
});

function editTask(button, taskObj) {
    button.contentEditable = true;
    button.focus();

    button.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            button.contentEditable = false;
        }
    });

    button.addEventListener("blur", function () {
        button.contentEditable = false;
    });
}

function createTaskUI(taskObj) {
    const tasksContainer = document.querySelector('.tasks-container');
    const task = document.createElement('div');
    const leftSide = document.createElement('div');
    const rightSide = document.createElement('div');
    const completeBtn = document.createElement('button');
    const removeBtn = document.createElement('button');
    const taskText = document.createElement('div');
    const taskDate = document.createElement('div');

    task.classList.add('task');
    leftSide.classList.add('task-complete-and-text');
    rightSide.classList.add('task-date-and-remove');
    completeBtn.classList.add('green-btn');
    completeBtn.classList.add('btn');
    removeBtn.classList.add('red-btn');
    removeBtn.classList.add('btn');
    taskText.classList.add('task-text');
    taskDate.classList.add('task-date');
    taskText.classList.add('btn');
    taskDate.classList.add('btn');

    taskText.textContent = taskObj.text;
    taskDate.textContent = taskObj.date;
    completeBtn.textContent = "Complete"
    removeBtn.textContent = "Remove"

    taskText.addEventListener('click', () => {
        editTask(taskText, taskObj);
    });
    taskDate.addEventListener('click', () => {
        editTask(taskDate, taskObj);
    });

    completeBtn.addEventListener('click', () => {
        user.removeTask(taskText, currentPage);
        task.remove();

        loadCurrentPage();
    });

    removeBtn.addEventListener('click', () => {
        user.removeTask(taskText, currentPage);
        task.remove();
        loadCurrentPage();
    });

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
let navProjectBtns = navProjects.querySelectorAll('button');

handleNavBtnStyling(navHomeBtns);
handleNavBtnStyling(navProjectBtns);

function handleNavBtnStyling(buttons) {
    function clickHandler() {
        buttons.forEach(otherButton => {
            if (otherButton !== this) {
                if (otherButton.textContent.startsWith('- ')) {
                    otherButton.textContent = otherButton.textContent.slice(2);
                }
                otherButton.removeAttribute('nav-btn-clicked');
            }
        });
    
        currentPage = this.textContent.toLowerCase();
        this.setAttribute('nav-btn-clicked', 'true');
        loadCurrentPage();
    }

    buttons.forEach(button => {
        button.removeEventListener('click', clickHandler);
        button.addEventListener('click', clickHandler);
    });
}

export default function loadPage() {
    loadCurrentPage();
    main();
}