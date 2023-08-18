import User from "./user";
import Storage from "./storage";

const storage = new Storage();
let currentPage = 'all';
let pages = ['all', 'today', 'week'];

const navHome = document.querySelector('.nav-home');
const navHomeBtns = navHome.querySelectorAll('button');
const navProjects = document.querySelector('.nav-projects');
let navProjectBtns = navProjects.querySelectorAll('button');

let allNavButtons = [];
function addToNavButtons(arr) {
    arr.forEach(button => {
        allNavButtons.push(button);
    })
}

addToNavButtons(navHomeBtns);

handleNavBtnStyling(allNavButtons);

const user = new User();
const savedUser = storage.getUser();
if (savedUser) {
    user.projects = savedUser.projects;
    addMethodsBackToProjects();
    addSavedPages();
}

function addSavedPages() {
    user.projects.forEach(proj => {
        if (proj.name !== 'all' && proj.name !== 'today' && proj.name !== 'week') {
            pages.push(proj.name);
        }
    });
}

window.addEventListener('beforeunload', () => {
    storage.saveUser(user);
})

function addMethodsBackToProjects() {
    user.projects.forEach(project => {
        project.addTask = function (task) {
            this.tasks.push(task);
        }
        project.getTasks = function () {
            return this.tasks;
        }
        project.removeProjTask = function (taskToRemove) {
            this.tasks.forEach((task, i) => {
                if (task.text === taskToRemove.textContent) {
                    this.tasks.splice(i, 1);
                }
            });
        }
    });
}

function loadCurrentPage() {
    const tasksContainer = document.querySelector('.tasks-container');
    tasksContainer.innerHTML = '';

    const currentPageTitle = document.querySelector('#current-page-title');
    currentPageTitle.textContent = currentPage.charAt(0).toUpperCase() + currentPage.slice(1);
    getTasksFromProj();
}

function getTasksFromProj() {
    const createNewTaskBtn = document.querySelector('.create-new-task');
    const delProjectBtn = document.querySelector('.delete-proj');

    user.projects.forEach(project => {
        if (project.name === currentPage) {
            if (project.name === 'today' || project.name === 'week') {
                createNewTaskBtn.style.display = 'none';
                delProjectBtn.style.display = 'none';
                loadHomePageProj(user.projects[0], currentPage); // the 'All' project
                return;
            } else if (project.name === 'all') {
                delProjectBtn.style.display = 'none';
            } else {
                delProjectBtn.style.display = 'inline-block';
            }

            createNewTaskBtn.style.display = 'inline-block';
            let projectTasks = project.tasks;

            projectTasks.forEach(task => {
                createTaskUI(task);
            })
        }
    });
}

function loadHomePageProj(allProj, currentPage) {
    if (currentPage === 'today') {
        let projectTasks = allProj.tasks;
        let now = new Date();
        now.setHours(0, 0, 0, 0);
        let today = new Date(now.getTime() + (24 * 60 * 60 * 1000));
        today.setHours(0, 0, 0, 0);

        projectTasks.forEach(task => {
            let taskDate = new Date(task.date);
            taskDate.setHours(23, 59, 0, 0);

            if (taskDate >= now && taskDate <= today) {
                createTaskUI(task);
            }
        });
    } else if (currentPage === 'week') {
        let projectTasks = allProj.tasks;
        let now = new Date();
        now.setHours(0, 0, 0, 0);
        let weekLater = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

        projectTasks.forEach(task => {
            let taskDate = new Date(task.date);
            taskDate.setHours(0, 0, 0, 0);
            if (taskDate >= now && taskDate <= weekLater) {
                createTaskUI(task);
            }
        });
    }
}

function updateNavProjects() {
    navProjectBtns = navProjects.querySelectorAll('button');
    navProjectBtns.forEach((button, i) => {
        if (button.classList.contains('project')) {
            button.remove();
            allNavButtons.splice(i, 1);
        }
    });

    for (let i = 3; i < user.projects.length; i++) {
        createProjectUI(user.projects[i].name);
    }

    navProjectBtns = navProjects.querySelectorAll('button');
    navProjectBtns.forEach(button => {
        allNavButtons.push(button);
    })
    handleNavBtnStyling(allNavButtons);
}

function createProjectUI(text) {
    const projectBtn = document.createElement('button');
    projectBtn.classList.add('btn');
    projectBtn.classList.add('project');
    projectBtn.textContent = text;

    navProjects.appendChild(projectBtn);
}

function deleteProj(projToDel) {
    projToDel = projToDel.charAt(0).toLowerCase() + projToDel.slice(1);
    const allProjects = navProjects.querySelectorAll('button');

    user.projects.forEach((project, i) => {
        if (project.name === projToDel) {
            user.projects.splice(i, 1)
            pages.splice(i, 1);
        }
    });

    allProjects.forEach((project, i) => {
        if (project.textContent === projToDel) {
            project.innerHTML = '';
            project.remove();
            if (pages[i + 3]) {
                currentPage = pages[i + 3];
            } else {
                currentPage = pages[0];
            }
        }
    });

    loadCurrentPage();
}

function main() {
    updateNavProjects();
    const createNewTaskBtn = document.querySelector('.create-new-task');
    createNewTaskBtn.addEventListener('click', createNewTask);

    const deleteProject = document.querySelector('.delete-proj');
    deleteProject.addEventListener('click', (e) => {
        deleteProj(e.target.parentElement.querySelector('#current-page-title').textContent);
    });

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
    });
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
            saveToObject();
            loadCurrentPage();
        }
    });

    button.addEventListener("blur", function () {
        button.contentEditable = false;
        saveToObject();
        loadCurrentPage();
    });

    function saveToObject() {
        if (button.classList.contains('task-text')) {
            taskObj.text = button.textContent;
        } else if (button.classList.contains('task-date')) {
            taskObj.date = button.textContent;
        }
    }
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

function handleNavBtnStyling(buttons) {
    function clickHandler() {
        buttons.forEach(otherButton => {
            if (otherButton !== this) {
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