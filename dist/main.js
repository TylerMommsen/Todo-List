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
        })
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


const user = new _user__WEBPACK_IMPORTED_MODULE_0__["default"]();
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
    const createNewTaskBtn = document.querySelector('.create-new-task');
    user.projects.forEach(project => {
        if (project.name === currentPage) {
            if (project.name === 'today' || project.name === 'week') {
                createNewTaskBtn.style.display = 'none';
                loadHomePageProj(user.projects[0], currentPage); // the 'All' project
                return;
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
    allNavButtons.forEach((button, i) => {
        if (button.classList.contains('project')) {
            button.remove();
            allNavButtons.splice(i, 1);
        }
    });

    for (let i = 3; i < pages.length; i++) {
        createProjectUI(pages[i]);
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
addToNavButtons(navProjectBtns);

handleNavBtnStyling(allNavButtons);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDckJlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ2QwQjs7QUFFMUIsaUJBQWlCLDZDQUFJO0FBQ3JCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlFQUFpRTtBQUNqRTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUwsb0JBQW9CLGtCQUFrQjtBQUN0QztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRWU7QUFDZjtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUN4UzBCO0FBQ007O0FBRWpCO0FBQ2YsNENBQTRDLGdEQUFPLGFBQWEsZ0RBQU8sZUFBZSxnREFBTztBQUM3RjtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwwQkFBMEIsNkNBQUk7QUFDOUI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0EsK0JBQStCLGdEQUFPO0FBQ3RDO0FBQ0E7Ozs7OztVQ2hDQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTjRCOztBQUU1QiwrQ0FBUSxHIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3Byb2plY3QuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3Rhc2suanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3VpLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy91c2VyLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBjbGFzcyBQcm9qZWN0IHtcbiAgICBjb25zdHJ1Y3RvcihuYW1lLCB0YXNrcyA9IFtdKSB7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMudGFza3MgPSB0YXNrcztcbiAgICB9XG5cbiAgICBnZXRUYXNrcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudGFza3M7XG4gICAgfSBcblxuICAgIGFkZFRhc2sodGFzaykge1xuICAgICAgICB0aGlzLnRhc2tzLnB1c2godGFzayk7XG4gICAgfVxuXG4gICAgcmVtb3ZlUHJvalRhc2sodGFza1RvUmVtb3ZlKSB7XG4gICAgICAgIHRoaXMudGFza3MuZm9yRWFjaCgodGFzaywgaSkgPT4ge1xuICAgICAgICAgICAgaWYgKHRhc2sudGV4dCA9PT0gdGFza1RvUmVtb3ZlLnRleHRDb250ZW50KSB7XG4gICAgICAgICAgICAgICAgdGhpcy50YXNrcy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFRhc2sge1xuICAgIGNvbnN0cnVjdG9yKHRleHQsIGRhdGUsIHByb2plY3QpIHtcbiAgICAgICAgdGhpcy50ZXh0ID0gdGV4dDtcbiAgICAgICAgdGhpcy5kYXRlID0gZGF0ZTtcbiAgICAgICAgdGhpcy5wcm9qZWN0ID0gcHJvamVjdDtcbiAgICB9XG5cbiAgICBlZGl0VGV4dChuZXdUZXh0KSB7XG4gICAgICAgIHRoaXMudGV4dCA9IG5ld1RleHQ7XG4gICAgfVxuXG4gICAgZWRpdERhdGUobmV3RGF0ZSkge1xuICAgICAgICB0aGlzLmRhdGUgPSBuZXdEYXRlO1xuICAgIH1cbn0iLCJpbXBvcnQgVXNlciBmcm9tIFwiLi91c2VyXCI7XG5cbmNvbnN0IHVzZXIgPSBuZXcgVXNlcigpO1xubGV0IGN1cnJlbnRQYWdlID0gJ2FsbCc7XG5sZXQgcGFnZXMgPSBbJ2FsbCcsICd0b2RheScsICd3ZWVrJ107XG5cbmZ1bmN0aW9uIGxvYWRDdXJyZW50UGFnZSgpIHtcbiAgICBjb25zdCB0YXNrc0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YXNrcy1jb250YWluZXInKTtcbiAgICB0YXNrc0NvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcblxuICAgIGNvbnN0IGN1cnJlbnRQYWdlVGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY3VycmVudC1wYWdlLXRpdGxlJyk7XG4gICAgY3VycmVudFBhZ2VUaXRsZS50ZXh0Q29udGVudCA9IGN1cnJlbnRQYWdlLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgY3VycmVudFBhZ2Uuc2xpY2UoMSk7XG4gICAgZ2V0VGFza3NGcm9tUHJvaigpO1xufVxuXG5mdW5jdGlvbiBnZXRUYXNrc0Zyb21Qcm9qKCkge1xuICAgIGNvbnN0IGNyZWF0ZU5ld1Rhc2tCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY3JlYXRlLW5ldy10YXNrJyk7XG4gICAgdXNlci5wcm9qZWN0cy5mb3JFYWNoKHByb2plY3QgPT4ge1xuICAgICAgICBpZiAocHJvamVjdC5uYW1lID09PSBjdXJyZW50UGFnZSkge1xuICAgICAgICAgICAgaWYgKHByb2plY3QubmFtZSA9PT0gJ3RvZGF5JyB8fCBwcm9qZWN0Lm5hbWUgPT09ICd3ZWVrJykge1xuICAgICAgICAgICAgICAgIGNyZWF0ZU5ld1Rhc2tCdG4uc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICAgICAgICBsb2FkSG9tZVBhZ2VQcm9qKHVzZXIucHJvamVjdHNbMF0sIGN1cnJlbnRQYWdlKTsgLy8gdGhlICdBbGwnIHByb2plY3RcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjcmVhdGVOZXdUYXNrQnRuLnN0eWxlLmRpc3BsYXkgPSAnaW5saW5lLWJsb2NrJztcbiAgICAgICAgICAgIGxldCBwcm9qZWN0VGFza3MgPSBwcm9qZWN0LnRhc2tzO1xuXG4gICAgICAgICAgICBwcm9qZWN0VGFza3MuZm9yRWFjaCh0YXNrID0+IHtcbiAgICAgICAgICAgICAgICBjcmVhdGVUYXNrVUkodGFzayk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIGxvYWRIb21lUGFnZVByb2ooYWxsUHJvaiwgY3VycmVudFBhZ2UpIHtcbiAgICBpZiAoY3VycmVudFBhZ2UgPT09ICd0b2RheScpIHtcbiAgICAgICAgbGV0IHByb2plY3RUYXNrcyA9IGFsbFByb2oudGFza3M7XG4gICAgICAgIGxldCBub3cgPSBuZXcgRGF0ZSgpO1xuICAgICAgICBub3cuc2V0SG91cnMoMCwgMCwgMCwgMCk7XG4gICAgICAgIGxldCB0b2RheSA9IG5ldyBEYXRlKG5vdy5nZXRUaW1lKCkgKyAoMjQgKiA2MCAqIDYwICogMTAwMCkpO1xuICAgICAgICB0b2RheS5zZXRIb3VycygwLCAwLCAwLCAwKTtcblxuICAgICAgICBwcm9qZWN0VGFza3MuZm9yRWFjaCh0YXNrID0+IHtcbiAgICAgICAgICAgIGxldCB0YXNrRGF0ZSA9IG5ldyBEYXRlKHRhc2suZGF0ZSk7XG4gICAgICAgICAgICB0YXNrRGF0ZS5zZXRIb3VycygyMywgNTksIDAsIDApO1xuXG4gICAgICAgICAgICBpZiAodGFza0RhdGUgPj0gbm93ICYmIHRhc2tEYXRlIDw9IHRvZGF5KSB7XG4gICAgICAgICAgICAgICAgY3JlYXRlVGFza1VJKHRhc2spO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKGN1cnJlbnRQYWdlID09PSAnd2VlaycpIHtcbiAgICAgICAgbGV0IHByb2plY3RUYXNrcyA9IGFsbFByb2oudGFza3M7XG4gICAgICAgIGxldCBub3cgPSBuZXcgRGF0ZSgpO1xuICAgICAgICBub3cuc2V0SG91cnMoMCwgMCwgMCwgMCk7XG4gICAgICAgIGxldCB3ZWVrTGF0ZXIgPSBuZXcgRGF0ZShub3cuZ2V0VGltZSgpICsgNyAqIDI0ICogNjAgKiA2MCAqIDEwMDApO1xuXG4gICAgICAgIHByb2plY3RUYXNrcy5mb3JFYWNoKHRhc2sgPT4ge1xuICAgICAgICAgICAgbGV0IHRhc2tEYXRlID0gbmV3IERhdGUodGFzay5kYXRlKTtcbiAgICAgICAgICAgIHRhc2tEYXRlLnNldEhvdXJzKDAsIDAsIDAsIDApO1xuICAgICAgICAgICAgaWYgKHRhc2tEYXRlID49IG5vdyAmJiB0YXNrRGF0ZSA8PSB3ZWVrTGF0ZXIpIHtcbiAgICAgICAgICAgICAgICBjcmVhdGVUYXNrVUkodGFzayk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gdXBkYXRlTmF2UHJvamVjdHMoKSB7XG4gICAgYWxsTmF2QnV0dG9ucy5mb3JFYWNoKChidXR0b24sIGkpID0+IHtcbiAgICAgICAgaWYgKGJ1dHRvbi5jbGFzc0xpc3QuY29udGFpbnMoJ3Byb2plY3QnKSkge1xuICAgICAgICAgICAgYnV0dG9uLnJlbW92ZSgpO1xuICAgICAgICAgICAgYWxsTmF2QnV0dG9ucy5zcGxpY2UoaSwgMSk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGZvciAobGV0IGkgPSAzOyBpIDwgcGFnZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY3JlYXRlUHJvamVjdFVJKHBhZ2VzW2ldKTtcbiAgICB9XG5cbiAgICBuYXZQcm9qZWN0QnRucyA9IG5hdlByb2plY3RzLnF1ZXJ5U2VsZWN0b3JBbGwoJ2J1dHRvbicpO1xuICAgIG5hdlByb2plY3RCdG5zLmZvckVhY2goYnV0dG9uID0+IHtcbiAgICAgICAgYWxsTmF2QnV0dG9ucy5wdXNoKGJ1dHRvbik7XG4gICAgfSlcbiAgICBoYW5kbGVOYXZCdG5TdHlsaW5nKGFsbE5hdkJ1dHRvbnMpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVQcm9qZWN0VUkodGV4dCkge1xuICAgIGNvbnN0IHByb2plY3RCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICBwcm9qZWN0QnRuLmNsYXNzTGlzdC5hZGQoJ2J0bicpO1xuICAgIHByb2plY3RCdG4uY2xhc3NMaXN0LmFkZCgncHJvamVjdCcpO1xuICAgIHByb2plY3RCdG4udGV4dENvbnRlbnQgPSB0ZXh0O1xuXG4gICAgbmF2UHJvamVjdHMuYXBwZW5kQ2hpbGQocHJvamVjdEJ0bik7XG59XG5cbmZ1bmN0aW9uIG1haW4oKSB7XG4gICAgY29uc3QgY3JlYXRlTmV3VGFza0J0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jcmVhdGUtbmV3LXRhc2snKTtcbiAgICBjcmVhdGVOZXdUYXNrQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY3JlYXRlTmV3VGFzayk7XG5cbiAgICBjb25zdCBjcmVhdGVOZXdQcm9qZWN0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNyZWF0ZS1uZXctcHJvamVjdCcpO1xuICAgIGNyZWF0ZU5ld1Byb2plY3RCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjcmVhdGVOZXdQcm9qZWN0KTtcbn1cblxuY29uc3QgZGFya092ZXJsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGFyay1vdmVybGF5Jyk7XG5jb25zdCB0YXNrVGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0YXNrLXRleHQnKTtcbmNvbnN0IHRhc2tEYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Rhc2stZGF0ZScpO1xuY29uc3QgY3JlYXRlVGFza1BvcHVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNyZWF0ZS10YXNrLXBvcHVwJyk7XG5cbmNvbnN0IHByb2pOYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2plY3QtbmFtZScpO1xuY29uc3QgY3JlYXRlUHJvamVjdFBvcHVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNyZWF0ZS1wcm9qZWN0LXBvcHVwJyk7XG5cbmZ1bmN0aW9uIGNyZWF0ZU5ld1Rhc2soKSB7XG4gICAgY3JlYXRlVGFza1BvcHVwLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XG4gICAgZGFya092ZXJsYXkuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgdGFza0RhdGUudmFsdWUgPSAnJztcbiAgICB0YXNrVGV4dC52YWx1ZSA9ICcnO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVOZXdQcm9qZWN0KCkge1xuICAgIGNyZWF0ZVByb2plY3RQb3B1cC5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xuICAgIGRhcmtPdmVybGF5LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgIHByb2pOYW1lLnZhbHVlID0gJyc7XG59XG5cbmNyZWF0ZVRhc2tQb3B1cC5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZSkgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBsZXQgdGV4dCA9IHRhc2tUZXh0LnZhbHVlO1xuICAgIGxldCBkYXRlID0gdGFza0RhdGUudmFsdWU7XG4gICAgaWYgKHRhc2tEYXRlLnZhbHVlID09PSAnJykge1xuICAgICAgICBkYXRlID0gJ1lZWVkvTU0vREQnO1xuICAgIH1cbiAgICBsZXQgdGFzayA9IHVzZXIuY3JlYXRlTmV3VGFzayh0ZXh0LCBkYXRlKTtcbiAgICB1c2VyLnByb2plY3RzLmZvckVhY2gocHJvamVjdCA9PiB7XG4gICAgICAgIGlmIChwcm9qZWN0Lm5hbWUgPT09IGN1cnJlbnRQYWdlKSB7XG4gICAgICAgICAgICBwcm9qZWN0LmFkZFRhc2sodGFzayk7XG4gICAgICAgIH1cbiAgICB9KVxuICAgIGxvYWRDdXJyZW50UGFnZSgpO1xuXG4gICAgY3JlYXRlVGFza1BvcHVwLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgZGFya092ZXJsYXkuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbn0pO1xuXG5jcmVhdGVQcm9qZWN0UG9wdXAuYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgKGUpID0+IHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgbGV0IG5hbWUgPSBwcm9qTmFtZS52YWx1ZTtcbiAgICB1c2VyLmNyZWF0ZU5ld1Byb2plY3QobmFtZSk7XG4gICAgcGFnZXMucHVzaChuYW1lKTtcbiAgICB1cGRhdGVOYXZQcm9qZWN0cygpO1xuICAgIGN1cnJlbnRQYWdlID0gbmFtZTtcbiAgICBsb2FkQ3VycmVudFBhZ2UoKTtcblxuICAgIGNyZWF0ZVByb2plY3RQb3B1cC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIGRhcmtPdmVybGF5LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG59KTtcblxuY29uc3QgY2FuY2VsUHJvamVjdFBvcHVwQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NhbmNlbFByb2pQb3B1cEJ0bicpO1xuY2FuY2VsUHJvamVjdFBvcHVwQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgY3JlYXRlUHJvamVjdFBvcHVwLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgZGFya092ZXJsYXkuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbn0pO1xuXG5jb25zdCBjYW5jZWxUYXNrUG9wdXBCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2FuY2VsVGFza1BvcHVwQnRuJyk7XG5jYW5jZWxUYXNrUG9wdXBCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBjcmVhdGVUYXNrUG9wdXAuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICBkYXJrT3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xufSk7XG5cbmZ1bmN0aW9uIGVkaXRUYXNrKGJ1dHRvbiwgdGFza09iaikge1xuICAgIGJ1dHRvbi5jb250ZW50RWRpdGFibGUgPSB0cnVlO1xuICAgIGJ1dHRvbi5mb2N1cygpO1xuXG4gICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICBpZiAoZXZlbnQua2V5ID09PSBcIkVudGVyXCIpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBidXR0b24uY29udGVudEVkaXRhYmxlID0gZmFsc2U7XG4gICAgICAgICAgICBzYXZlVG9PYmplY3QoKTtcbiAgICAgICAgICAgIGxvYWRDdXJyZW50UGFnZSgpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImJsdXJcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICBidXR0b24uY29udGVudEVkaXRhYmxlID0gZmFsc2U7XG4gICAgICAgIHNhdmVUb09iamVjdCgpO1xuICAgICAgICBsb2FkQ3VycmVudFBhZ2UoKTtcbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIHNhdmVUb09iamVjdCgpIHtcbiAgICAgICAgaWYgKGJ1dHRvbi5jbGFzc0xpc3QuY29udGFpbnMoJ3Rhc2stdGV4dCcpKSB7XG4gICAgICAgICAgICB0YXNrT2JqLnRleHQgPSBidXR0b24udGV4dENvbnRlbnQ7XG4gICAgICAgIH0gZWxzZSBpZiAoYnV0dG9uLmNsYXNzTGlzdC5jb250YWlucygndGFzay1kYXRlJykpIHtcbiAgICAgICAgICAgIHRhc2tPYmouZGF0ZSA9IGJ1dHRvbi50ZXh0Q29udGVudDtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlVGFza1VJKHRhc2tPYmopIHtcbiAgICBjb25zdCB0YXNrc0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YXNrcy1jb250YWluZXInKTtcbiAgICBjb25zdCB0YXNrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY29uc3QgbGVmdFNpZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb25zdCByaWdodFNpZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb25zdCBjb21wbGV0ZUJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIGNvbnN0IHJlbW92ZUJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIGNvbnN0IHRhc2tUZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY29uc3QgdGFza0RhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgIHRhc2suY2xhc3NMaXN0LmFkZCgndGFzaycpO1xuICAgIGxlZnRTaWRlLmNsYXNzTGlzdC5hZGQoJ3Rhc2stY29tcGxldGUtYW5kLXRleHQnKTtcbiAgICByaWdodFNpZGUuY2xhc3NMaXN0LmFkZCgndGFzay1kYXRlLWFuZC1yZW1vdmUnKTtcbiAgICBjb21wbGV0ZUJ0bi5jbGFzc0xpc3QuYWRkKCdncmVlbi1idG4nKTtcbiAgICBjb21wbGV0ZUJ0bi5jbGFzc0xpc3QuYWRkKCdidG4nKTtcbiAgICByZW1vdmVCdG4uY2xhc3NMaXN0LmFkZCgncmVkLWJ0bicpO1xuICAgIHJlbW92ZUJ0bi5jbGFzc0xpc3QuYWRkKCdidG4nKTtcbiAgICB0YXNrVGV4dC5jbGFzc0xpc3QuYWRkKCd0YXNrLXRleHQnKTtcbiAgICB0YXNrRGF0ZS5jbGFzc0xpc3QuYWRkKCd0YXNrLWRhdGUnKTtcbiAgICB0YXNrVGV4dC5jbGFzc0xpc3QuYWRkKCdidG4nKTtcbiAgICB0YXNrRGF0ZS5jbGFzc0xpc3QuYWRkKCdidG4nKTtcblxuICAgIHRhc2tUZXh0LnRleHRDb250ZW50ID0gdGFza09iai50ZXh0O1xuICAgIHRhc2tEYXRlLnRleHRDb250ZW50ID0gdGFza09iai5kYXRlO1xuICAgIGNvbXBsZXRlQnRuLnRleHRDb250ZW50ID0gXCJDb21wbGV0ZVwiXG4gICAgcmVtb3ZlQnRuLnRleHRDb250ZW50ID0gXCJSZW1vdmVcIlxuXG4gICAgdGFza1RleHQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIGVkaXRUYXNrKHRhc2tUZXh0LCB0YXNrT2JqKTtcbiAgICB9KTtcbiAgICB0YXNrRGF0ZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgZWRpdFRhc2sodGFza0RhdGUsIHRhc2tPYmopO1xuICAgIH0pO1xuXG4gICAgY29tcGxldGVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIHVzZXIucmVtb3ZlVGFzayh0YXNrVGV4dCwgY3VycmVudFBhZ2UpO1xuICAgICAgICB0YXNrLnJlbW92ZSgpO1xuXG4gICAgICAgIGxvYWRDdXJyZW50UGFnZSgpO1xuICAgIH0pO1xuXG4gICAgcmVtb3ZlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICB1c2VyLnJlbW92ZVRhc2sodGFza1RleHQsIGN1cnJlbnRQYWdlKTtcbiAgICAgICAgdGFzay5yZW1vdmUoKTtcbiAgICAgICAgbG9hZEN1cnJlbnRQYWdlKCk7XG4gICAgfSk7XG5cbiAgICBsZWZ0U2lkZS5hcHBlbmRDaGlsZChjb21wbGV0ZUJ0bik7XG4gICAgbGVmdFNpZGUuYXBwZW5kQ2hpbGQodGFza1RleHQpO1xuICAgIHJpZ2h0U2lkZS5hcHBlbmRDaGlsZCh0YXNrRGF0ZSk7XG4gICAgcmlnaHRTaWRlLmFwcGVuZENoaWxkKHJlbW92ZUJ0bik7XG4gICAgdGFzay5hcHBlbmRDaGlsZChsZWZ0U2lkZSk7XG4gICAgdGFzay5hcHBlbmRDaGlsZChyaWdodFNpZGUpO1xuXG4gICAgdGFza3NDb250YWluZXIuYXBwZW5kQ2hpbGQodGFzayk7XG59XG5cbmNvbnN0IG5hdkhvbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmF2LWhvbWUnKTtcbmNvbnN0IG5hdkhvbWVCdG5zID0gbmF2SG9tZS5xdWVyeVNlbGVjdG9yQWxsKCdidXR0b24nKTtcbmNvbnN0IG5hdlByb2plY3RzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5hdi1wcm9qZWN0cycpO1xubGV0IG5hdlByb2plY3RCdG5zID0gbmF2UHJvamVjdHMucXVlcnlTZWxlY3RvckFsbCgnYnV0dG9uJyk7XG5cbmxldCBhbGxOYXZCdXR0b25zID0gW107XG5mdW5jdGlvbiBhZGRUb05hdkJ1dHRvbnMoYXJyKSB7XG4gICAgYXJyLmZvckVhY2goYnV0dG9uID0+IHtcbiAgICAgICAgYWxsTmF2QnV0dG9ucy5wdXNoKGJ1dHRvbik7XG4gICAgfSlcbn1cblxuYWRkVG9OYXZCdXR0b25zKG5hdkhvbWVCdG5zKTtcbmFkZFRvTmF2QnV0dG9ucyhuYXZQcm9qZWN0QnRucyk7XG5cbmhhbmRsZU5hdkJ0blN0eWxpbmcoYWxsTmF2QnV0dG9ucyk7XG5cbmZ1bmN0aW9uIGhhbmRsZU5hdkJ0blN0eWxpbmcoYnV0dG9ucykge1xuICAgIGZ1bmN0aW9uIGNsaWNrSGFuZGxlcigpIHtcbiAgICAgICAgYnV0dG9ucy5mb3JFYWNoKG90aGVyQnV0dG9uID0+IHtcbiAgICAgICAgICAgIGlmIChvdGhlckJ1dHRvbiAhPT0gdGhpcykge1xuICAgICAgICAgICAgICAgIGlmIChvdGhlckJ1dHRvbi50ZXh0Q29udGVudC5zdGFydHNXaXRoKCctICcpKSB7XG4gICAgICAgICAgICAgICAgICAgIG90aGVyQnV0dG9uLnRleHRDb250ZW50ID0gb3RoZXJCdXR0b24udGV4dENvbnRlbnQuc2xpY2UoMik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG90aGVyQnV0dG9uLnJlbW92ZUF0dHJpYnV0ZSgnbmF2LWJ0bi1jbGlja2VkJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIFxuICAgICAgICBjdXJyZW50UGFnZSA9IHRoaXMudGV4dENvbnRlbnQudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ25hdi1idG4tY2xpY2tlZCcsICd0cnVlJyk7XG4gICAgICAgIGxvYWRDdXJyZW50UGFnZSgpO1xuICAgIH1cblxuICAgIGJ1dHRvbnMuZm9yRWFjaChidXR0b24gPT4ge1xuICAgICAgICBidXR0b24ucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbGlja0hhbmRsZXIpO1xuICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbGlja0hhbmRsZXIpO1xuICAgIH0pO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBsb2FkUGFnZSgpIHtcbiAgICBsb2FkQ3VycmVudFBhZ2UoKTtcbiAgICBtYWluKCk7XG59IiwiaW1wb3J0IFRhc2sgZnJvbSBcIi4vdGFza1wiO1xuaW1wb3J0IFByb2plY3QgZnJvbSBcIi4vcHJvamVjdFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVc2VyIHtcbiAgICBjb25zdHJ1Y3Rvcih0YXNrcyA9IFtdLCBwcm9qZWN0cyA9IFtuZXcgUHJvamVjdCgnYWxsJyksIG5ldyBQcm9qZWN0KCd0b2RheScpLCBuZXcgUHJvamVjdCgnd2VlaycpXSkge1xuICAgICAgICB0aGlzLnRhc2tzID0gdGFza3M7XG4gICAgICAgIHRoaXMucHJvamVjdHMgPSBwcm9qZWN0cztcbiAgICB9XG5cbiAgICBjcmVhdGVOZXdUYXNrKHRleHQsIGRhdGUpIHtcbiAgICAgICAgbGV0IG5ld1Rhc2sgPSBuZXcgVGFzayh0ZXh0LCBkYXRlKTtcbiAgICAgICAgdGhpcy50YXNrcy5wdXNoKG5ld1Rhc2spO1xuICAgICAgICByZXR1cm4gbmV3VGFzaztcbiAgICB9XG5cbiAgICByZW1vdmVUYXNrKHRleHQsIHBhZ2UpIHtcbiAgICAgICAgdGhpcy50YXNrcy5mb3JFYWNoKCh2YWx1ZSwgaSkgPT4ge1xuICAgICAgICAgICAgaWYgKHRleHQudGV4dENvbnRlbnQgPT09IHZhbHVlLnRleHQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRhc2tzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcblxuICAgICAgICB0aGlzLnByb2plY3RzLmZvckVhY2gocHJvamVjdCA9PiB7XG4gICAgICAgICAgICBpZiAocHJvamVjdC5uYW1lID09PSBwYWdlKSB7XG4gICAgICAgICAgICAgICAgcHJvamVjdC5yZW1vdmVQcm9qVGFzayh0ZXh0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBjcmVhdGVOZXdQcm9qZWN0KG5hbWUpIHtcbiAgICAgICAgdGhpcy5wcm9qZWN0cy5wdXNoKG5ldyBQcm9qZWN0KG5hbWUpKVxuICAgIH1cbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBsb2FkUGFnZSBmcm9tIFwiLi91aVwiO1xuXG5sb2FkUGFnZSgpOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==