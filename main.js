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

    addTask(task) {
        this.tasks.push(task);
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
    constructor(text, date, project = 'all') {
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
    console.log('called');
    createProjectPopup.style.display = 'flex';
    darkOverlay.style.display = 'block';
    projName.value = '';
}

createTaskPopup.addEventListener('submit', (e) => {
    e.preventDefault();
    let text = taskText.value;
    let date = taskDate.value;
    user.createNewTask(text, date);
    loadCurrentPage();

    createTaskPopup.style.display = 'none';
    darkOverlay.style.display = 'none';
});

createProjectPopup.addEventListener('submit', (e) => {
    e.preventDefault();
    let name = projName.value;
    user.createNewProject(name);
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

handleNavBtnStyling(navHomeBtns);
handleNavBtnStyling(navProjectBtns);

function handleNavBtnStyling(buttons) {
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
    constructor(tasks = [], projects = []) {
        this.tasks = tasks;
        this.projects = projects;
    }

    createNewTask(text, date) {
        let newTask = new _task__WEBPACK_IMPORTED_MODULE_0__["default"](text, date);
        this.tasks.push(newTask);
    }

    removeTask(text) {
        this.tasks.forEach((value, i) => {
            if (text.textContent === value.text) {
                this.tasks.splice(i, 1);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDVGU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDZDBCOztBQUUxQixpQkFBaUIsNkNBQUk7QUFDckI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0w7O0FBRWU7QUFDZjtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUM5TDBCO0FBQ007O0FBRWpCO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwwQkFBMEIsNkNBQUk7QUFDOUI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0EsK0JBQStCLGdEQUFPO0FBQ3RDO0FBQ0E7Ozs7OztVQ3pCQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTjRCOztBQUU1QiwrQ0FBUSxHIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3Byb2plY3QuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3Rhc2suanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3VpLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy91c2VyLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBjbGFzcyBQcm9qZWN0IHtcbiAgICBjb25zdHJ1Y3RvcihuYW1lLCB0YXNrcyA9IFtdKSB7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMudGFza3MgPSB0YXNrcztcbiAgICB9XG5cbiAgICBhZGRUYXNrKHRhc2spIHtcbiAgICAgICAgdGhpcy50YXNrcy5wdXNoKHRhc2spO1xuICAgIH1cbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBUYXNrIHtcbiAgICBjb25zdHJ1Y3Rvcih0ZXh0LCBkYXRlLCBwcm9qZWN0ID0gJ2FsbCcpIHtcbiAgICAgICAgdGhpcy50ZXh0ID0gdGV4dDtcbiAgICAgICAgdGhpcy5kYXRlID0gZGF0ZTtcbiAgICAgICAgdGhpcy5wcm9qZWN0ID0gcHJvamVjdDtcbiAgICB9XG5cbiAgICBlZGl0VGV4dChuZXdUZXh0KSB7XG4gICAgICAgIHRoaXMudGV4dCA9IG5ld1RleHQ7XG4gICAgfVxuXG4gICAgZWRpdERhdGUobmV3RGF0ZSkge1xuICAgICAgICB0aGlzLmRhdGUgPSBuZXdEYXRlO1xuICAgIH1cbn0iLCJpbXBvcnQgVXNlciBmcm9tIFwiLi91c2VyXCI7XG5cbmNvbnN0IHVzZXIgPSBuZXcgVXNlcigpO1xubGV0IGN1cnJlbnRQYWdlID0gJ2FsbCc7XG5cbmZ1bmN0aW9uIGxvYWRBbGwoKSB7XG4gICAgY29uc3QgdGFza3NDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGFza3MtY29udGFpbmVyJyk7XG4gICAgdGFza3NDb250YWluZXIuaW5uZXJIVE1MID0gJyc7XG4gICAgdXNlci50YXNrcy5mb3JFYWNoKGZ1bmN0aW9uICh0YXNrKSB7XG4gICAgICAgIGNyZWF0ZVRhc2tVSSh0YXNrKTtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gbG9hZFRvZGF5KCkge1xuXG59XG5cbmZ1bmN0aW9uIGxvYWRXZWVrKCkge1xuXG59XG5cbmZ1bmN0aW9uIGxvYWRDdXJyZW50UGFnZSgpIHtcbiAgICBzd2l0Y2ggKGN1cnJlbnRQYWdlKSB7XG4gICAgICAgIGNhc2UgJ2FsbCc6XG4gICAgICAgICAgICBsb2FkQWxsKCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAndG9kYXknOlxuICAgICAgICAgICAgbG9hZFRvZGF5KCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnd2Vlayc6XG4gICAgICAgICAgICBsb2FkV2VlaygpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBsb2FkQWxsKCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICB9XG59XG5cbmZ1bmN0aW9uIG1haW4oKSB7XG4gICAgY29uc3QgY3JlYXRlTmV3VGFza0J0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jcmVhdGUtbmV3LXRhc2snKTtcbiAgICBjcmVhdGVOZXdUYXNrQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY3JlYXRlTmV3VGFzayk7XG5cbiAgICBjb25zdCBjcmVhdGVOZXdQcm9qZWN0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNyZWF0ZS1uZXctcHJvamVjdCcpO1xuICAgIGNyZWF0ZU5ld1Byb2plY3RCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjcmVhdGVOZXdQcm9qZWN0KTtcbn1cblxuY29uc3QgZGFya092ZXJsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGFyay1vdmVybGF5Jyk7XG5jb25zdCB0YXNrVGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0YXNrLXRleHQnKTtcbmNvbnN0IHRhc2tEYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Rhc2stZGF0ZScpO1xuY29uc3QgY3JlYXRlVGFza1BvcHVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNyZWF0ZS10YXNrLXBvcHVwJyk7XG5cbmNvbnN0IHByb2pOYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2plY3QtbmFtZScpO1xuY29uc3QgY3JlYXRlUHJvamVjdFBvcHVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNyZWF0ZS1wcm9qZWN0LXBvcHVwJyk7XG5cbmZ1bmN0aW9uIGNyZWF0ZU5ld1Rhc2soKSB7XG4gICAgY3JlYXRlVGFza1BvcHVwLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XG4gICAgZGFya092ZXJsYXkuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgdGFza0RhdGUudmFsdWUgPSAnJztcbiAgICB0YXNrVGV4dC52YWx1ZSA9ICcnO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVOZXdQcm9qZWN0KCkge1xuICAgIGNvbnNvbGUubG9nKCdjYWxsZWQnKTtcbiAgICBjcmVhdGVQcm9qZWN0UG9wdXAuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcbiAgICBkYXJrT3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICBwcm9qTmFtZS52YWx1ZSA9ICcnO1xufVxuXG5jcmVhdGVUYXNrUG9wdXAuYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgKGUpID0+IHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgbGV0IHRleHQgPSB0YXNrVGV4dC52YWx1ZTtcbiAgICBsZXQgZGF0ZSA9IHRhc2tEYXRlLnZhbHVlO1xuICAgIHVzZXIuY3JlYXRlTmV3VGFzayh0ZXh0LCBkYXRlKTtcbiAgICBsb2FkQ3VycmVudFBhZ2UoKTtcblxuICAgIGNyZWF0ZVRhc2tQb3B1cC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIGRhcmtPdmVybGF5LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG59KTtcblxuY3JlYXRlUHJvamVjdFBvcHVwLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIChlKSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGxldCBuYW1lID0gcHJvak5hbWUudmFsdWU7XG4gICAgdXNlci5jcmVhdGVOZXdQcm9qZWN0KG5hbWUpO1xuICAgIGxvYWRDdXJyZW50UGFnZSgpO1xuXG4gICAgY3JlYXRlUHJvamVjdFBvcHVwLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgZGFya092ZXJsYXkuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbn0pO1xuXG5jb25zdCBjYW5jZWxQcm9qZWN0UG9wdXBCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2FuY2VsUHJvalBvcHVwQnRuJyk7XG5jYW5jZWxQcm9qZWN0UG9wdXBCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBjcmVhdGVQcm9qZWN0UG9wdXAuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICBkYXJrT3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xufSk7XG5cbmNvbnN0IGNhbmNlbFRhc2tQb3B1cEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjYW5jZWxUYXNrUG9wdXBCdG4nKTtcbmNhbmNlbFRhc2tQb3B1cEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNyZWF0ZVRhc2tQb3B1cC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIGRhcmtPdmVybGF5LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG59KTtcblxuZnVuY3Rpb24gY3JlYXRlVGFza1VJKHRhc2tPYmopIHtcbiAgICBjb25zdCB0YXNrc0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YXNrcy1jb250YWluZXInKTtcbiAgICBjb25zdCB0YXNrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY29uc3QgbGVmdFNpZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb25zdCByaWdodFNpZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb25zdCBjb21wbGV0ZUJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIGNvbnN0IHJlbW92ZUJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIGNvbnN0IHRhc2tUZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgIGNvbnN0IHRhc2tEYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuXG4gICAgdGFzay5jbGFzc0xpc3QuYWRkKCd0YXNrJyk7XG4gICAgbGVmdFNpZGUuY2xhc3NMaXN0LmFkZCgndGFzay1jb21wbGV0ZS1hbmQtdGV4dCcpO1xuICAgIHJpZ2h0U2lkZS5jbGFzc0xpc3QuYWRkKCd0YXNrLWRhdGUtYW5kLXJlbW92ZScpO1xuICAgIGNvbXBsZXRlQnRuLmNsYXNzTGlzdC5hZGQoJ2dyZWVuLWJ0bicpO1xuICAgIGNvbXBsZXRlQnRuLmNsYXNzTGlzdC5hZGQoJ2J0bicpO1xuICAgIHJlbW92ZUJ0bi5jbGFzc0xpc3QuYWRkKCdyZWQtYnRuJyk7XG4gICAgcmVtb3ZlQnRuLmNsYXNzTGlzdC5hZGQoJ2J0bicpO1xuICAgIHRhc2tUZXh0LmNsYXNzTGlzdC5hZGQoJ3Rhc2stdGV4dCcpO1xuICAgIHRhc2tEYXRlLmNsYXNzTGlzdC5hZGQoJ3Rhc2stZGF0ZScpO1xuXG4gICAgdGFza1RleHQudGV4dENvbnRlbnQgPSB0YXNrT2JqLnRleHQ7XG4gICAgdGFza0RhdGUudGV4dENvbnRlbnQgPSB0YXNrT2JqLmRhdGU7XG4gICAgY29tcGxldGVCdG4udGV4dENvbnRlbnQgPSBcIkNvbXBsZXRlXCJcbiAgICByZW1vdmVCdG4udGV4dENvbnRlbnQgPSBcIlJlbW92ZVwiXG5cbiAgICBjb21wbGV0ZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgdXNlci5yZW1vdmVUYXNrKHRhc2tUZXh0KTtcbiAgICAgICAgdGFzay5yZW1vdmUoKTtcbiAgICAgICAgbG9hZEN1cnJlbnRQYWdlKCk7XG4gICAgfSlcblxuICAgIHJlbW92ZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgdXNlci5yZW1vdmVUYXNrKHRhc2tUZXh0KTtcbiAgICAgICAgdGFzay5yZW1vdmUoKTtcbiAgICAgICAgbG9hZEN1cnJlbnRQYWdlKCk7XG4gICAgfSlcblxuICAgIGxlZnRTaWRlLmFwcGVuZENoaWxkKGNvbXBsZXRlQnRuKTtcbiAgICBsZWZ0U2lkZS5hcHBlbmRDaGlsZCh0YXNrVGV4dCk7XG4gICAgcmlnaHRTaWRlLmFwcGVuZENoaWxkKHRhc2tEYXRlKTtcbiAgICByaWdodFNpZGUuYXBwZW5kQ2hpbGQocmVtb3ZlQnRuKTtcbiAgICB0YXNrLmFwcGVuZENoaWxkKGxlZnRTaWRlKTtcbiAgICB0YXNrLmFwcGVuZENoaWxkKHJpZ2h0U2lkZSk7XG5cbiAgICB0YXNrc0NvbnRhaW5lci5hcHBlbmRDaGlsZCh0YXNrKTtcbn1cblxuY29uc3QgbmF2SG9tZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uYXYtaG9tZScpO1xuY29uc3QgbmF2SG9tZUJ0bnMgPSBuYXZIb21lLnF1ZXJ5U2VsZWN0b3JBbGwoJ2J1dHRvbicpO1xuY29uc3QgbmF2UHJvamVjdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmF2LXByb2plY3RzJyk7XG5jb25zdCBuYXZQcm9qZWN0QnRucyA9IG5hdlByb2plY3RzLnF1ZXJ5U2VsZWN0b3JBbGwoJ2J1dHRvbicpO1xuXG5oYW5kbGVOYXZCdG5TdHlsaW5nKG5hdkhvbWVCdG5zKTtcbmhhbmRsZU5hdkJ0blN0eWxpbmcobmF2UHJvamVjdEJ0bnMpO1xuXG5mdW5jdGlvbiBoYW5kbGVOYXZCdG5TdHlsaW5nKGJ1dHRvbnMpIHtcbiAgICBidXR0b25zLmZvckVhY2goKGJ1dHRvbikgPT4ge1xuICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsICgpID0+IHtcbiAgICAgICAgICAgIGlmICghYnV0dG9uLnRleHRDb250ZW50LnN0YXJ0c1dpdGgoJy0gJykpIHtcbiAgICAgICAgICAgICAgICBidXR0b24udGV4dENvbnRlbnQgPSAnLSAnICsgYnV0dG9uLnRleHRDb250ZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICBcbiAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCAoKSA9PiB7XG4gICAgICAgICAgICBpZiAoYnV0dG9uLmdldEF0dHJpYnV0ZSgnbmF2LWJ0bi1jbGlja2VkJykgIT09ICd0cnVlJykge1xuICAgICAgICAgICAgICAgIGJ1dHRvbi50ZXh0Q29udGVudCA9IGJ1dHRvbi50ZXh0Q29udGVudC5zbGljZSgyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgXG4gICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIGJ1dHRvbnMuZm9yRWFjaChvdGhlckJ1dHRvbnMgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChvdGhlckJ1dHRvbnMgIT09IGJ1dHRvbikge1xuICAgICAgICAgICAgICAgICAgICBpZiAob3RoZXJCdXR0b25zLnRleHRDb250ZW50LnN0YXJ0c1dpdGgoJy0gJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG90aGVyQnV0dG9ucy50ZXh0Q29udGVudCA9IG90aGVyQnV0dG9ucy50ZXh0Q29udGVudC5zbGljZSgyKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBvdGhlckJ1dHRvbnMucmVtb3ZlQXR0cmlidXRlKCduYXYtYnRuLWNsaWNrZWQnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICBcbiAgICAgICAgICAgIGJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ25hdi1idG4tY2xpY2tlZCcsICd0cnVlJyk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBsb2FkUGFnZSgpIHtcbiAgICBsb2FkQ3VycmVudFBhZ2UoKTtcbiAgICBtYWluKCk7XG59IiwiaW1wb3J0IFRhc2sgZnJvbSBcIi4vdGFza1wiO1xuaW1wb3J0IFByb2plY3QgZnJvbSBcIi4vcHJvamVjdFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVc2VyIHtcbiAgICBjb25zdHJ1Y3Rvcih0YXNrcyA9IFtdLCBwcm9qZWN0cyA9IFtdKSB7XG4gICAgICAgIHRoaXMudGFza3MgPSB0YXNrcztcbiAgICAgICAgdGhpcy5wcm9qZWN0cyA9IHByb2plY3RzO1xuICAgIH1cblxuICAgIGNyZWF0ZU5ld1Rhc2sodGV4dCwgZGF0ZSkge1xuICAgICAgICBsZXQgbmV3VGFzayA9IG5ldyBUYXNrKHRleHQsIGRhdGUpO1xuICAgICAgICB0aGlzLnRhc2tzLnB1c2gobmV3VGFzayk7XG4gICAgfVxuXG4gICAgcmVtb3ZlVGFzayh0ZXh0KSB7XG4gICAgICAgIHRoaXMudGFza3MuZm9yRWFjaCgodmFsdWUsIGkpID0+IHtcbiAgICAgICAgICAgIGlmICh0ZXh0LnRleHRDb250ZW50ID09PSB2YWx1ZS50ZXh0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy50YXNrcy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgY3JlYXRlTmV3UHJvamVjdChuYW1lKSB7XG4gICAgICAgIHRoaXMucHJvamVjdHMucHVzaChuZXcgUHJvamVjdChuYW1lKSlcbiAgICB9XG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgbG9hZFBhZ2UgZnJvbSBcIi4vdWlcIjtcblxubG9hZFBhZ2UoKTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=