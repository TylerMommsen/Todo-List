/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/project.js":
/*!************************!*\
  !*** ./src/project.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Project)
/* harmony export */ });
class Project {
    constructor(name, tasks = []) {
        this.name = name;
        this.tasks = tasks;
    }

    getTasks() {
        return this.tasks;
    } 

    addTask(task) {
        this.tasks.push(task);
    }

    removeProjTask(taskToRemove) {
        this.tasks.forEach((task, i) => {
            if (task.text === taskToRemove.textContent) {
                this.tasks.splice(i, 1);
            }
        });
    }
}

/***/ }),

/***/ "./src/storage.js":
/*!************************!*\
  !*** ./src/storage.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Storage)
/* harmony export */ });
/* harmony import */ var _task__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./task */ "./src/task.js");
/* harmony import */ var _project__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./project */ "./src/project.js");
/* harmony import */ var _user__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./user */ "./src/user.js");




class Storage {
    saveUser(data) {
        localStorage.setItem('user', JSON.stringify(data));
    }

    getUser() {
        return JSON.parse(localStorage.getItem('user'));
    }
}

/***/ }),

/***/ "./src/task.js":
/*!*********************!*\
  !*** ./src/task.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Task)
/* harmony export */ });
class Task {
    constructor(text, date, project) {
        this.text = text;
        this.date = date;
        this.project = project;
    }

    editText(newText) {
        this.text = newText;
    }

    editDate(newDate) {
        this.date = newDate;
    }
}

/***/ }),

/***/ "./src/ui.js":
/*!*******************!*\
  !*** ./src/ui.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ loadPage)
/* harmony export */ });
/* harmony import */ var _user__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./user */ "./src/user.js");
/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./storage */ "./src/storage.js");



const storage = new _storage__WEBPACK_IMPORTED_MODULE_1__["default"]();
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

const user = new _user__WEBPACK_IMPORTED_MODULE_0__["default"]();
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

    updateSelectedProjectStyling();
}

function updateSelectedProjectStyling() {
    const navProjectBtns = navProjects.querySelectorAll('button');
    navHomeBtns.forEach(button => {
        const buttonText = button.textContent.charAt(0).toLowerCase() + button.textContent.slice(1);
        if (buttonText === currentPage) {
            button.style.fontWeight = 'bold';
        } else {
            button.style.fontWeight = 'normal';
        }
    });

    navProjectBtns.forEach(button => {
        const buttonText = button.textContent.charAt(0).toLowerCase() + button.textContent.slice(1);
        if (buttonText === currentPage) {
            button.style.fontWeight = 'bold';
        } else {
            button.style.fontWeight = 'normal';
        }
    });
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

function loadPage() {
    loadCurrentPage();
    main();
}

/***/ }),

/***/ "./src/user.js":
/*!*********************!*\
  !*** ./src/user.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ User)
/* harmony export */ });
/* harmony import */ var _task__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./task */ "./src/task.js");
/* harmony import */ var _project__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./project */ "./src/project.js");



class User {
    constructor(tasks = [], projects = [new _project__WEBPACK_IMPORTED_MODULE_1__["default"]('all'), new _project__WEBPACK_IMPORTED_MODULE_1__["default"]('today'), new _project__WEBPACK_IMPORTED_MODULE_1__["default"]('week')]) {
        this.tasks = tasks;
        this.projects = projects;
    }

    createNewTask(text, date) {
        let newTask = new _task__WEBPACK_IMPORTED_MODULE_0__["default"](text, date);
        this.tasks.push(newTask);
        return newTask;
    }

    removeTask(text, page) {
        this.tasks.forEach((value, i) => {
            if (text.textContent === value.text) {
                this.tasks.splice(i, 1);
            }
        })

        this.projects.forEach(project => {
            if (project.name === page) {
                project.removeProjTask(text);
            }
        })
    }

    createNewProject(name) {
        this.projects.push(new _project__WEBPACK_IMPORTED_MODULE_1__["default"](name))
    }
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ui */ "./src/ui.js");


(0,_ui__WEBPACK_IMPORTED_MODULE_0__["default"])();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDckIwQjtBQUNNO0FBQ047O0FBRVg7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDWmU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ2QwQjtBQUNNOztBQUVoQyxvQkFBb0IsZ0RBQU87QUFDM0I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTs7QUFFQTs7QUFFQSxpQkFBaUIsNkNBQUk7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUVBQWlFO0FBQ2pFO0FBQ0EsY0FBYztBQUNkO0FBQ0EsY0FBYztBQUNkO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTCxvQkFBb0IsMEJBQTBCO0FBQzlDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVlO0FBQ2Y7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDM1kwQjtBQUNNOztBQUVqQjtBQUNmLDRDQUE0QyxnREFBTyxhQUFhLGdEQUFPLGVBQWUsZ0RBQU87QUFDN0Y7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMEJBQTBCLDZDQUFJO0FBQzlCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBLCtCQUErQixnREFBTztBQUN0QztBQUNBOzs7Ozs7VUNoQ0E7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ040Qjs7QUFFNUIsK0NBQVEsRyIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9wcm9qZWN0LmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9zdG9yYWdlLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy90YXNrLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy91aS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvdXNlci5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJvamVjdCB7XG4gICAgY29uc3RydWN0b3IobmFtZSwgdGFza3MgPSBbXSkge1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLnRhc2tzID0gdGFza3M7XG4gICAgfVxuXG4gICAgZ2V0VGFza3MoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRhc2tzO1xuICAgIH0gXG5cbiAgICBhZGRUYXNrKHRhc2spIHtcbiAgICAgICAgdGhpcy50YXNrcy5wdXNoKHRhc2spO1xuICAgIH1cblxuICAgIHJlbW92ZVByb2pUYXNrKHRhc2tUb1JlbW92ZSkge1xuICAgICAgICB0aGlzLnRhc2tzLmZvckVhY2goKHRhc2ssIGkpID0+IHtcbiAgICAgICAgICAgIGlmICh0YXNrLnRleHQgPT09IHRhc2tUb1JlbW92ZS50ZXh0Q29udGVudCkge1xuICAgICAgICAgICAgICAgIHRoaXMudGFza3Muc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59IiwiaW1wb3J0IFRhc2sgZnJvbSBcIi4vdGFza1wiO1xuaW1wb3J0IFByb2plY3QgZnJvbSBcIi4vcHJvamVjdFwiO1xuaW1wb3J0IFVzZXIgZnJvbSBcIi4vdXNlclwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdG9yYWdlIHtcbiAgICBzYXZlVXNlcihkYXRhKSB7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd1c2VyJywgSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xuICAgIH1cblxuICAgIGdldFVzZXIoKSB7XG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd1c2VyJykpO1xuICAgIH1cbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBUYXNrIHtcbiAgICBjb25zdHJ1Y3Rvcih0ZXh0LCBkYXRlLCBwcm9qZWN0KSB7XG4gICAgICAgIHRoaXMudGV4dCA9IHRleHQ7XG4gICAgICAgIHRoaXMuZGF0ZSA9IGRhdGU7XG4gICAgICAgIHRoaXMucHJvamVjdCA9IHByb2plY3Q7XG4gICAgfVxuXG4gICAgZWRpdFRleHQobmV3VGV4dCkge1xuICAgICAgICB0aGlzLnRleHQgPSBuZXdUZXh0O1xuICAgIH1cblxuICAgIGVkaXREYXRlKG5ld0RhdGUpIHtcbiAgICAgICAgdGhpcy5kYXRlID0gbmV3RGF0ZTtcbiAgICB9XG59IiwiaW1wb3J0IFVzZXIgZnJvbSBcIi4vdXNlclwiO1xuaW1wb3J0IFN0b3JhZ2UgZnJvbSBcIi4vc3RvcmFnZVwiO1xuXG5jb25zdCBzdG9yYWdlID0gbmV3IFN0b3JhZ2UoKTtcbmxldCBjdXJyZW50UGFnZSA9ICdhbGwnO1xubGV0IHBhZ2VzID0gWydhbGwnLCAndG9kYXknLCAnd2VlayddO1xuXG5jb25zdCBuYXZIb21lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5hdi1ob21lJyk7XG5jb25zdCBuYXZIb21lQnRucyA9IG5hdkhvbWUucXVlcnlTZWxlY3RvckFsbCgnYnV0dG9uJyk7XG5jb25zdCBuYXZQcm9qZWN0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uYXYtcHJvamVjdHMnKTtcbmxldCBuYXZQcm9qZWN0QnRucyA9IG5hdlByb2plY3RzLnF1ZXJ5U2VsZWN0b3JBbGwoJ2J1dHRvbicpO1xuXG5sZXQgYWxsTmF2QnV0dG9ucyA9IFtdO1xuZnVuY3Rpb24gYWRkVG9OYXZCdXR0b25zKGFycikge1xuICAgIGFyci5mb3JFYWNoKGJ1dHRvbiA9PiB7XG4gICAgICAgIGFsbE5hdkJ1dHRvbnMucHVzaChidXR0b24pO1xuICAgIH0pXG59XG5cbmFkZFRvTmF2QnV0dG9ucyhuYXZIb21lQnRucyk7XG5cbmhhbmRsZU5hdkJ0blN0eWxpbmcoYWxsTmF2QnV0dG9ucyk7XG5cbmNvbnN0IHVzZXIgPSBuZXcgVXNlcigpO1xuY29uc3Qgc2F2ZWRVc2VyID0gc3RvcmFnZS5nZXRVc2VyKCk7XG5pZiAoc2F2ZWRVc2VyKSB7XG4gICAgdXNlci5wcm9qZWN0cyA9IHNhdmVkVXNlci5wcm9qZWN0cztcbiAgICBhZGRNZXRob2RzQmFja1RvUHJvamVjdHMoKTtcbiAgICBhZGRTYXZlZFBhZ2VzKCk7XG59XG5cbmZ1bmN0aW9uIGFkZFNhdmVkUGFnZXMoKSB7XG4gICAgdXNlci5wcm9qZWN0cy5mb3JFYWNoKHByb2ogPT4ge1xuICAgICAgICBpZiAocHJvai5uYW1lICE9PSAnYWxsJyAmJiBwcm9qLm5hbWUgIT09ICd0b2RheScgJiYgcHJvai5uYW1lICE9PSAnd2VlaycpIHtcbiAgICAgICAgICAgIHBhZ2VzLnB1c2gocHJvai5uYW1lKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignYmVmb3JldW5sb2FkJywgKCkgPT4ge1xuICAgIHN0b3JhZ2Uuc2F2ZVVzZXIodXNlcik7XG59KVxuXG5mdW5jdGlvbiBhZGRNZXRob2RzQmFja1RvUHJvamVjdHMoKSB7XG4gICAgdXNlci5wcm9qZWN0cy5mb3JFYWNoKHByb2plY3QgPT4ge1xuICAgICAgICBwcm9qZWN0LmFkZFRhc2sgPSBmdW5jdGlvbiAodGFzaykge1xuICAgICAgICAgICAgdGhpcy50YXNrcy5wdXNoKHRhc2spO1xuICAgICAgICB9XG4gICAgICAgIHByb2plY3QuZ2V0VGFza3MgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy50YXNrcztcbiAgICAgICAgfVxuICAgICAgICBwcm9qZWN0LnJlbW92ZVByb2pUYXNrID0gZnVuY3Rpb24gKHRhc2tUb1JlbW92ZSkge1xuICAgICAgICAgICAgdGhpcy50YXNrcy5mb3JFYWNoKCh0YXNrLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRhc2sudGV4dCA9PT0gdGFza1RvUmVtb3ZlLnRleHRDb250ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGFza3Muc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIGxvYWRDdXJyZW50UGFnZSgpIHtcbiAgICBjb25zdCB0YXNrc0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YXNrcy1jb250YWluZXInKTtcbiAgICB0YXNrc0NvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcblxuICAgIGNvbnN0IGN1cnJlbnRQYWdlVGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY3VycmVudC1wYWdlLXRpdGxlJyk7XG4gICAgY3VycmVudFBhZ2VUaXRsZS50ZXh0Q29udGVudCA9IGN1cnJlbnRQYWdlLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgY3VycmVudFBhZ2Uuc2xpY2UoMSk7XG4gICAgZ2V0VGFza3NGcm9tUHJvaigpO1xuXG4gICAgdXBkYXRlU2VsZWN0ZWRQcm9qZWN0U3R5bGluZygpO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVTZWxlY3RlZFByb2plY3RTdHlsaW5nKCkge1xuICAgIGNvbnN0IG5hdlByb2plY3RCdG5zID0gbmF2UHJvamVjdHMucXVlcnlTZWxlY3RvckFsbCgnYnV0dG9uJyk7XG4gICAgbmF2SG9tZUJ0bnMuZm9yRWFjaChidXR0b24gPT4ge1xuICAgICAgICBjb25zdCBidXR0b25UZXh0ID0gYnV0dG9uLnRleHRDb250ZW50LmNoYXJBdCgwKS50b0xvd2VyQ2FzZSgpICsgYnV0dG9uLnRleHRDb250ZW50LnNsaWNlKDEpO1xuICAgICAgICBpZiAoYnV0dG9uVGV4dCA9PT0gY3VycmVudFBhZ2UpIHtcbiAgICAgICAgICAgIGJ1dHRvbi5zdHlsZS5mb250V2VpZ2h0ID0gJ2JvbGQnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYnV0dG9uLnN0eWxlLmZvbnRXZWlnaHQgPSAnbm9ybWFsJztcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgbmF2UHJvamVjdEJ0bnMuZm9yRWFjaChidXR0b24gPT4ge1xuICAgICAgICBjb25zdCBidXR0b25UZXh0ID0gYnV0dG9uLnRleHRDb250ZW50LmNoYXJBdCgwKS50b0xvd2VyQ2FzZSgpICsgYnV0dG9uLnRleHRDb250ZW50LnNsaWNlKDEpO1xuICAgICAgICBpZiAoYnV0dG9uVGV4dCA9PT0gY3VycmVudFBhZ2UpIHtcbiAgICAgICAgICAgIGJ1dHRvbi5zdHlsZS5mb250V2VpZ2h0ID0gJ2JvbGQnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYnV0dG9uLnN0eWxlLmZvbnRXZWlnaHQgPSAnbm9ybWFsJztcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBnZXRUYXNrc0Zyb21Qcm9qKCkge1xuICAgIGNvbnN0IGNyZWF0ZU5ld1Rhc2tCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY3JlYXRlLW5ldy10YXNrJyk7XG4gICAgY29uc3QgZGVsUHJvamVjdEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kZWxldGUtcHJvaicpO1xuXG4gICAgdXNlci5wcm9qZWN0cy5mb3JFYWNoKHByb2plY3QgPT4ge1xuICAgICAgICBpZiAocHJvamVjdC5uYW1lID09PSBjdXJyZW50UGFnZSkge1xuICAgICAgICAgICAgaWYgKHByb2plY3QubmFtZSA9PT0gJ3RvZGF5JyB8fCBwcm9qZWN0Lm5hbWUgPT09ICd3ZWVrJykge1xuICAgICAgICAgICAgICAgIGNyZWF0ZU5ld1Rhc2tCdG4uc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICAgICAgICBkZWxQcm9qZWN0QnRuLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgICAgICAgbG9hZEhvbWVQYWdlUHJvaih1c2VyLnByb2plY3RzWzBdLCBjdXJyZW50UGFnZSk7IC8vIHRoZSAnQWxsJyBwcm9qZWN0XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChwcm9qZWN0Lm5hbWUgPT09ICdhbGwnKSB7XG4gICAgICAgICAgICAgICAgZGVsUHJvamVjdEJ0bi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBkZWxQcm9qZWN0QnRuLnN0eWxlLmRpc3BsYXkgPSAnaW5saW5lLWJsb2NrJztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY3JlYXRlTmV3VGFza0J0bi5zdHlsZS5kaXNwbGF5ID0gJ2lubGluZS1ibG9jayc7XG4gICAgICAgICAgICBsZXQgcHJvamVjdFRhc2tzID0gcHJvamVjdC50YXNrcztcblxuICAgICAgICAgICAgcHJvamVjdFRhc2tzLmZvckVhY2godGFzayA9PiB7XG4gICAgICAgICAgICAgICAgY3JlYXRlVGFza1VJKHRhc2spO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBsb2FkSG9tZVBhZ2VQcm9qKGFsbFByb2osIGN1cnJlbnRQYWdlKSB7XG4gICAgaWYgKGN1cnJlbnRQYWdlID09PSAndG9kYXknKSB7XG4gICAgICAgIGxldCBwcm9qZWN0VGFza3MgPSBhbGxQcm9qLnRhc2tzO1xuICAgICAgICBsZXQgbm93ID0gbmV3IERhdGUoKTtcbiAgICAgICAgbm93LnNldEhvdXJzKDAsIDAsIDAsIDApO1xuICAgICAgICBsZXQgdG9kYXkgPSBuZXcgRGF0ZShub3cuZ2V0VGltZSgpICsgKDI0ICogNjAgKiA2MCAqIDEwMDApKTtcbiAgICAgICAgdG9kYXkuc2V0SG91cnMoMCwgMCwgMCwgMCk7XG5cbiAgICAgICAgcHJvamVjdFRhc2tzLmZvckVhY2godGFzayA9PiB7XG4gICAgICAgICAgICBsZXQgdGFza0RhdGUgPSBuZXcgRGF0ZSh0YXNrLmRhdGUpO1xuICAgICAgICAgICAgdGFza0RhdGUuc2V0SG91cnMoMjMsIDU5LCAwLCAwKTtcblxuICAgICAgICAgICAgaWYgKHRhc2tEYXRlID49IG5vdyAmJiB0YXNrRGF0ZSA8PSB0b2RheSkge1xuICAgICAgICAgICAgICAgIGNyZWF0ZVRhc2tVSSh0YXNrKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSBlbHNlIGlmIChjdXJyZW50UGFnZSA9PT0gJ3dlZWsnKSB7XG4gICAgICAgIGxldCBwcm9qZWN0VGFza3MgPSBhbGxQcm9qLnRhc2tzO1xuICAgICAgICBsZXQgbm93ID0gbmV3IERhdGUoKTtcbiAgICAgICAgbm93LnNldEhvdXJzKDAsIDAsIDAsIDApO1xuICAgICAgICBsZXQgd2Vla0xhdGVyID0gbmV3IERhdGUobm93LmdldFRpbWUoKSArIDcgKiAyNCAqIDYwICogNjAgKiAxMDAwKTtcblxuICAgICAgICBwcm9qZWN0VGFza3MuZm9yRWFjaCh0YXNrID0+IHtcbiAgICAgICAgICAgIGxldCB0YXNrRGF0ZSA9IG5ldyBEYXRlKHRhc2suZGF0ZSk7XG4gICAgICAgICAgICB0YXNrRGF0ZS5zZXRIb3VycygwLCAwLCAwLCAwKTtcbiAgICAgICAgICAgIGlmICh0YXNrRGF0ZSA+PSBub3cgJiYgdGFza0RhdGUgPD0gd2Vla0xhdGVyKSB7XG4gICAgICAgICAgICAgICAgY3JlYXRlVGFza1VJKHRhc2spO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZU5hdlByb2plY3RzKCkge1xuICAgIG5hdlByb2plY3RCdG5zID0gbmF2UHJvamVjdHMucXVlcnlTZWxlY3RvckFsbCgnYnV0dG9uJyk7XG4gICAgbmF2UHJvamVjdEJ0bnMuZm9yRWFjaCgoYnV0dG9uLCBpKSA9PiB7XG4gICAgICAgIGlmIChidXR0b24uY2xhc3NMaXN0LmNvbnRhaW5zKCdwcm9qZWN0JykpIHtcbiAgICAgICAgICAgIGJ1dHRvbi5yZW1vdmUoKTtcbiAgICAgICAgICAgIGFsbE5hdkJ1dHRvbnMuc3BsaWNlKGksIDEpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBmb3IgKGxldCBpID0gMzsgaSA8IHVzZXIucHJvamVjdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY3JlYXRlUHJvamVjdFVJKHVzZXIucHJvamVjdHNbaV0ubmFtZSk7XG4gICAgfVxuXG4gICAgbmF2UHJvamVjdEJ0bnMgPSBuYXZQcm9qZWN0cy5xdWVyeVNlbGVjdG9yQWxsKCdidXR0b24nKTtcbiAgICBuYXZQcm9qZWN0QnRucy5mb3JFYWNoKGJ1dHRvbiA9PiB7XG4gICAgICAgIGFsbE5hdkJ1dHRvbnMucHVzaChidXR0b24pO1xuICAgIH0pXG4gICAgaGFuZGxlTmF2QnRuU3R5bGluZyhhbGxOYXZCdXR0b25zKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlUHJvamVjdFVJKHRleHQpIHtcbiAgICBjb25zdCBwcm9qZWN0QnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgcHJvamVjdEJ0bi5jbGFzc0xpc3QuYWRkKCdidG4nKTtcbiAgICBwcm9qZWN0QnRuLmNsYXNzTGlzdC5hZGQoJ3Byb2plY3QnKTtcbiAgICBwcm9qZWN0QnRuLnRleHRDb250ZW50ID0gdGV4dDtcblxuICAgIG5hdlByb2plY3RzLmFwcGVuZENoaWxkKHByb2plY3RCdG4pO1xufVxuXG5mdW5jdGlvbiBkZWxldGVQcm9qKHByb2pUb0RlbCkge1xuICAgIHByb2pUb0RlbCA9IHByb2pUb0RlbC5jaGFyQXQoMCkudG9Mb3dlckNhc2UoKSArIHByb2pUb0RlbC5zbGljZSgxKTtcbiAgICBjb25zdCBhbGxQcm9qZWN0cyA9IG5hdlByb2plY3RzLnF1ZXJ5U2VsZWN0b3JBbGwoJ2J1dHRvbicpO1xuXG4gICAgdXNlci5wcm9qZWN0cy5mb3JFYWNoKChwcm9qZWN0LCBpKSA9PiB7XG4gICAgICAgIGlmIChwcm9qZWN0Lm5hbWUgPT09IHByb2pUb0RlbCkge1xuICAgICAgICAgICAgdXNlci5wcm9qZWN0cy5zcGxpY2UoaSwgMSlcbiAgICAgICAgICAgIHBhZ2VzLnNwbGljZShpLCAxKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgYWxsUHJvamVjdHMuZm9yRWFjaCgocHJvamVjdCwgaSkgPT4ge1xuICAgICAgICBpZiAocHJvamVjdC50ZXh0Q29udGVudCA9PT0gcHJvalRvRGVsKSB7XG4gICAgICAgICAgICBwcm9qZWN0LmlubmVySFRNTCA9ICcnO1xuICAgICAgICAgICAgcHJvamVjdC5yZW1vdmUoKTtcbiAgICAgICAgICAgIGlmIChwYWdlc1tpICsgM10pIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UGFnZSA9IHBhZ2VzW2kgKyAzXTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFBhZ2UgPSBwYWdlc1swXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgbG9hZEN1cnJlbnRQYWdlKCk7XG59XG5cbmZ1bmN0aW9uIG1haW4oKSB7XG4gICAgdXBkYXRlTmF2UHJvamVjdHMoKTtcbiAgICBjb25zdCBjcmVhdGVOZXdUYXNrQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNyZWF0ZS1uZXctdGFzaycpO1xuICAgIGNyZWF0ZU5ld1Rhc2tCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjcmVhdGVOZXdUYXNrKTtcblxuICAgIGNvbnN0IGRlbGV0ZVByb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGVsZXRlLXByb2onKTtcbiAgICBkZWxldGVQcm9qZWN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgZGVsZXRlUHJvaihlLnRhcmdldC5wYXJlbnRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjdXJyZW50LXBhZ2UtdGl0bGUnKS50ZXh0Q29udGVudCk7XG4gICAgfSk7XG5cbiAgICBjb25zdCBjcmVhdGVOZXdQcm9qZWN0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNyZWF0ZS1uZXctcHJvamVjdCcpO1xuICAgIGNyZWF0ZU5ld1Byb2plY3RCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjcmVhdGVOZXdQcm9qZWN0KTtcbn1cblxuY29uc3QgZGFya092ZXJsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGFyay1vdmVybGF5Jyk7XG5jb25zdCB0YXNrVGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0YXNrLXRleHQnKTtcbmNvbnN0IHRhc2tEYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Rhc2stZGF0ZScpO1xuY29uc3QgY3JlYXRlVGFza1BvcHVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNyZWF0ZS10YXNrLXBvcHVwJyk7XG5cbmNvbnN0IHByb2pOYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2plY3QtbmFtZScpO1xuY29uc3QgY3JlYXRlUHJvamVjdFBvcHVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNyZWF0ZS1wcm9qZWN0LXBvcHVwJyk7XG5cbmZ1bmN0aW9uIGNyZWF0ZU5ld1Rhc2soKSB7XG4gICAgY3JlYXRlVGFza1BvcHVwLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XG4gICAgZGFya092ZXJsYXkuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgdGFza0RhdGUudmFsdWUgPSAnJztcbiAgICB0YXNrVGV4dC52YWx1ZSA9ICcnO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVOZXdQcm9qZWN0KCkge1xuICAgIGNyZWF0ZVByb2plY3RQb3B1cC5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xuICAgIGRhcmtPdmVybGF5LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgIHByb2pOYW1lLnZhbHVlID0gJyc7XG59XG5cbmNyZWF0ZVRhc2tQb3B1cC5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZSkgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBsZXQgdGV4dCA9IHRhc2tUZXh0LnZhbHVlO1xuICAgIGxldCBkYXRlID0gdGFza0RhdGUudmFsdWU7XG4gICAgaWYgKHRhc2tEYXRlLnZhbHVlID09PSAnJykge1xuICAgICAgICBkYXRlID0gJ1lZWVkvTU0vREQnO1xuICAgIH1cbiAgICBsZXQgdGFzayA9IHVzZXIuY3JlYXRlTmV3VGFzayh0ZXh0LCBkYXRlKTtcbiAgICB1c2VyLnByb2plY3RzLmZvckVhY2gocHJvamVjdCA9PiB7XG4gICAgICAgIGlmIChwcm9qZWN0Lm5hbWUgPT09IGN1cnJlbnRQYWdlKSB7XG4gICAgICAgICAgICBwcm9qZWN0LmFkZFRhc2sodGFzayk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBsb2FkQ3VycmVudFBhZ2UoKTtcblxuICAgIGNyZWF0ZVRhc2tQb3B1cC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIGRhcmtPdmVybGF5LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG59KTtcblxuY3JlYXRlUHJvamVjdFBvcHVwLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIChlKSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGxldCBuYW1lID0gcHJvak5hbWUudmFsdWU7XG4gICAgdXNlci5jcmVhdGVOZXdQcm9qZWN0KG5hbWUpO1xuICAgIHBhZ2VzLnB1c2gobmFtZSk7XG4gICAgdXBkYXRlTmF2UHJvamVjdHMoKTtcbiAgICBjdXJyZW50UGFnZSA9IG5hbWU7XG4gICAgbG9hZEN1cnJlbnRQYWdlKCk7XG5cbiAgICBjcmVhdGVQcm9qZWN0UG9wdXAuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICBkYXJrT3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xufSk7XG5cbmNvbnN0IGNhbmNlbFByb2plY3RQb3B1cEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjYW5jZWxQcm9qUG9wdXBCdG4nKTtcbmNhbmNlbFByb2plY3RQb3B1cEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNyZWF0ZVByb2plY3RQb3B1cC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIGRhcmtPdmVybGF5LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG59KTtcblxuY29uc3QgY2FuY2VsVGFza1BvcHVwQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NhbmNlbFRhc2tQb3B1cEJ0bicpO1xuY2FuY2VsVGFza1BvcHVwQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgY3JlYXRlVGFza1BvcHVwLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgZGFya092ZXJsYXkuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbn0pO1xuXG5mdW5jdGlvbiBlZGl0VGFzayhidXR0b24sIHRhc2tPYmopIHtcbiAgICBidXR0b24uY29udGVudEVkaXRhYmxlID0gdHJ1ZTtcbiAgICBidXR0b24uZm9jdXMoKTtcblxuICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50LmtleSA9PT0gXCJFbnRlclwiKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgYnV0dG9uLmNvbnRlbnRFZGl0YWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgc2F2ZVRvT2JqZWN0KCk7XG4gICAgICAgICAgICBsb2FkQ3VycmVudFBhZ2UoKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJibHVyXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgYnV0dG9uLmNvbnRlbnRFZGl0YWJsZSA9IGZhbHNlO1xuICAgICAgICBzYXZlVG9PYmplY3QoKTtcbiAgICAgICAgbG9hZEN1cnJlbnRQYWdlKCk7XG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiBzYXZlVG9PYmplY3QoKSB7XG4gICAgICAgIGlmIChidXR0b24uY2xhc3NMaXN0LmNvbnRhaW5zKCd0YXNrLXRleHQnKSkge1xuICAgICAgICAgICAgdGFza09iai50ZXh0ID0gYnV0dG9uLnRleHRDb250ZW50O1xuICAgICAgICB9IGVsc2UgaWYgKGJ1dHRvbi5jbGFzc0xpc3QuY29udGFpbnMoJ3Rhc2stZGF0ZScpKSB7XG4gICAgICAgICAgICB0YXNrT2JqLmRhdGUgPSBidXR0b24udGV4dENvbnRlbnQ7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVRhc2tVSSh0YXNrT2JqKSB7XG4gICAgY29uc3QgdGFza3NDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGFza3MtY29udGFpbmVyJyk7XG4gICAgY29uc3QgdGFzayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGNvbnN0IGxlZnRTaWRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY29uc3QgcmlnaHRTaWRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY29uc3QgY29tcGxldGVCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICBjb25zdCByZW1vdmVCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICBjb25zdCB0YXNrVGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGNvbnN0IHRhc2tEYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICB0YXNrLmNsYXNzTGlzdC5hZGQoJ3Rhc2snKTtcbiAgICBsZWZ0U2lkZS5jbGFzc0xpc3QuYWRkKCd0YXNrLWNvbXBsZXRlLWFuZC10ZXh0Jyk7XG4gICAgcmlnaHRTaWRlLmNsYXNzTGlzdC5hZGQoJ3Rhc2stZGF0ZS1hbmQtcmVtb3ZlJyk7XG4gICAgY29tcGxldGVCdG4uY2xhc3NMaXN0LmFkZCgnZ3JlZW4tYnRuJyk7XG4gICAgY29tcGxldGVCdG4uY2xhc3NMaXN0LmFkZCgnYnRuJyk7XG4gICAgcmVtb3ZlQnRuLmNsYXNzTGlzdC5hZGQoJ3JlZC1idG4nKTtcbiAgICByZW1vdmVCdG4uY2xhc3NMaXN0LmFkZCgnYnRuJyk7XG4gICAgdGFza1RleHQuY2xhc3NMaXN0LmFkZCgndGFzay10ZXh0Jyk7XG4gICAgdGFza0RhdGUuY2xhc3NMaXN0LmFkZCgndGFzay1kYXRlJyk7XG4gICAgdGFza1RleHQuY2xhc3NMaXN0LmFkZCgnYnRuJyk7XG4gICAgdGFza0RhdGUuY2xhc3NMaXN0LmFkZCgnYnRuJyk7XG5cbiAgICB0YXNrVGV4dC50ZXh0Q29udGVudCA9IHRhc2tPYmoudGV4dDtcbiAgICB0YXNrRGF0ZS50ZXh0Q29udGVudCA9IHRhc2tPYmouZGF0ZTtcbiAgICBjb21wbGV0ZUJ0bi50ZXh0Q29udGVudCA9IFwiQ29tcGxldGVcIlxuICAgIHJlbW92ZUJ0bi50ZXh0Q29udGVudCA9IFwiUmVtb3ZlXCJcblxuICAgIHRhc2tUZXh0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBlZGl0VGFzayh0YXNrVGV4dCwgdGFza09iaik7XG4gICAgfSk7XG4gICAgdGFza0RhdGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIGVkaXRUYXNrKHRhc2tEYXRlLCB0YXNrT2JqKTtcbiAgICB9KTtcblxuICAgIGNvbXBsZXRlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICB1c2VyLnJlbW92ZVRhc2sodGFza1RleHQsIGN1cnJlbnRQYWdlKTtcbiAgICAgICAgdGFzay5yZW1vdmUoKTtcblxuICAgICAgICBsb2FkQ3VycmVudFBhZ2UoKTtcbiAgICB9KTtcblxuICAgIHJlbW92ZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgdXNlci5yZW1vdmVUYXNrKHRhc2tUZXh0LCBjdXJyZW50UGFnZSk7XG4gICAgICAgIHRhc2sucmVtb3ZlKCk7XG4gICAgICAgIGxvYWRDdXJyZW50UGFnZSgpO1xuICAgIH0pO1xuXG4gICAgbGVmdFNpZGUuYXBwZW5kQ2hpbGQoY29tcGxldGVCdG4pO1xuICAgIGxlZnRTaWRlLmFwcGVuZENoaWxkKHRhc2tUZXh0KTtcbiAgICByaWdodFNpZGUuYXBwZW5kQ2hpbGQodGFza0RhdGUpO1xuICAgIHJpZ2h0U2lkZS5hcHBlbmRDaGlsZChyZW1vdmVCdG4pO1xuICAgIHRhc2suYXBwZW5kQ2hpbGQobGVmdFNpZGUpO1xuICAgIHRhc2suYXBwZW5kQ2hpbGQocmlnaHRTaWRlKTtcblxuICAgIHRhc2tzQ29udGFpbmVyLmFwcGVuZENoaWxkKHRhc2spO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVOYXZCdG5TdHlsaW5nKGJ1dHRvbnMpIHtcbiAgICBmdW5jdGlvbiBjbGlja0hhbmRsZXIoKSB7XG4gICAgICAgIGJ1dHRvbnMuZm9yRWFjaChvdGhlckJ1dHRvbiA9PiB7XG4gICAgICAgICAgICBpZiAob3RoZXJCdXR0b24gIT09IHRoaXMpIHtcbiAgICAgICAgICAgICAgICBvdGhlckJ1dHRvbi5yZW1vdmVBdHRyaWJ1dGUoJ25hdi1idG4tY2xpY2tlZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICBcbiAgICAgICAgY3VycmVudFBhZ2UgPSB0aGlzLnRleHRDb250ZW50LnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCduYXYtYnRuLWNsaWNrZWQnLCAndHJ1ZScpO1xuICAgICAgICBsb2FkQ3VycmVudFBhZ2UoKTtcbiAgICB9XG5cbiAgICBidXR0b25zLmZvckVhY2goYnV0dG9uID0+IHtcbiAgICAgICAgYnV0dG9uLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xpY2tIYW5kbGVyKTtcbiAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xpY2tIYW5kbGVyKTtcbiAgICB9KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbG9hZFBhZ2UoKSB7XG4gICAgbG9hZEN1cnJlbnRQYWdlKCk7XG4gICAgbWFpbigpO1xufSIsImltcG9ydCBUYXNrIGZyb20gXCIuL3Rhc2tcIjtcbmltcG9ydCBQcm9qZWN0IGZyb20gXCIuL3Byb2plY3RcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXNlciB7XG4gICAgY29uc3RydWN0b3IodGFza3MgPSBbXSwgcHJvamVjdHMgPSBbbmV3IFByb2plY3QoJ2FsbCcpLCBuZXcgUHJvamVjdCgndG9kYXknKSwgbmV3IFByb2plY3QoJ3dlZWsnKV0pIHtcbiAgICAgICAgdGhpcy50YXNrcyA9IHRhc2tzO1xuICAgICAgICB0aGlzLnByb2plY3RzID0gcHJvamVjdHM7XG4gICAgfVxuXG4gICAgY3JlYXRlTmV3VGFzayh0ZXh0LCBkYXRlKSB7XG4gICAgICAgIGxldCBuZXdUYXNrID0gbmV3IFRhc2sodGV4dCwgZGF0ZSk7XG4gICAgICAgIHRoaXMudGFza3MucHVzaChuZXdUYXNrKTtcbiAgICAgICAgcmV0dXJuIG5ld1Rhc2s7XG4gICAgfVxuXG4gICAgcmVtb3ZlVGFzayh0ZXh0LCBwYWdlKSB7XG4gICAgICAgIHRoaXMudGFza3MuZm9yRWFjaCgodmFsdWUsIGkpID0+IHtcbiAgICAgICAgICAgIGlmICh0ZXh0LnRleHRDb250ZW50ID09PSB2YWx1ZS50ZXh0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy50YXNrcy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG5cbiAgICAgICAgdGhpcy5wcm9qZWN0cy5mb3JFYWNoKHByb2plY3QgPT4ge1xuICAgICAgICAgICAgaWYgKHByb2plY3QubmFtZSA9PT0gcGFnZSkge1xuICAgICAgICAgICAgICAgIHByb2plY3QucmVtb3ZlUHJvalRhc2sodGV4dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgY3JlYXRlTmV3UHJvamVjdChuYW1lKSB7XG4gICAgICAgIHRoaXMucHJvamVjdHMucHVzaChuZXcgUHJvamVjdChuYW1lKSlcbiAgICB9XG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgbG9hZFBhZ2UgZnJvbSBcIi4vdWlcIjtcblxubG9hZFBhZ2UoKTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=