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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNONEI7O0FBRTVCLCtDQUFRLEciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvcHJvamVjdC5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvdGFzay5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvdWkuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3VzZXIuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNzIFByb2plY3Qge1xuICAgIGNvbnN0cnVjdG9yKG5hbWUsIHRhc2tzID0gW10pIHtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy50YXNrcyA9IHRhc2tzO1xuICAgIH1cblxuICAgIGdldFRhc2tzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy50YXNrcztcbiAgICB9IFxuXG4gICAgYWRkVGFzayh0YXNrKSB7XG4gICAgICAgIHRoaXMudGFza3MucHVzaCh0YXNrKTtcbiAgICB9XG5cbiAgICByZW1vdmVQcm9qVGFzayh0YXNrVG9SZW1vdmUpIHtcbiAgICAgICAgdGhpcy50YXNrcy5mb3JFYWNoKCh0YXNrLCBpKSA9PiB7XG4gICAgICAgICAgICBpZiAodGFzay50ZXh0ID09PSB0YXNrVG9SZW1vdmUudGV4dENvbnRlbnQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRhc2tzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGFzayB7XG4gICAgY29uc3RydWN0b3IodGV4dCwgZGF0ZSwgcHJvamVjdCkge1xuICAgICAgICB0aGlzLnRleHQgPSB0ZXh0O1xuICAgICAgICB0aGlzLmRhdGUgPSBkYXRlO1xuICAgICAgICB0aGlzLnByb2plY3QgPSBwcm9qZWN0O1xuICAgIH1cblxuICAgIGVkaXRUZXh0KG5ld1RleHQpIHtcbiAgICAgICAgdGhpcy50ZXh0ID0gbmV3VGV4dDtcbiAgICB9XG5cbiAgICBlZGl0RGF0ZShuZXdEYXRlKSB7XG4gICAgICAgIHRoaXMuZGF0ZSA9IG5ld0RhdGU7XG4gICAgfVxufSIsImltcG9ydCBVc2VyIGZyb20gXCIuL3VzZXJcIjtcblxuY29uc3QgdXNlciA9IG5ldyBVc2VyKCk7XG5sZXQgY3VycmVudFBhZ2UgPSAnYWxsJztcbmxldCBwYWdlcyA9IFsnYWxsJywgJ3RvZGF5JywgJ3dlZWsnXTtcblxuZnVuY3Rpb24gbG9hZEN1cnJlbnRQYWdlKCkge1xuICAgIGNvbnN0IHRhc2tzQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRhc2tzLWNvbnRhaW5lcicpO1xuICAgIHRhc2tzQ29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xuXG4gICAgY29uc3QgY3VycmVudFBhZ2VUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjdXJyZW50LXBhZ2UtdGl0bGUnKTtcbiAgICBjdXJyZW50UGFnZVRpdGxlLnRleHRDb250ZW50ID0gY3VycmVudFBhZ2UuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBjdXJyZW50UGFnZS5zbGljZSgxKTtcbiAgICBnZXRUYXNrc0Zyb21Qcm9qKCk7XG59XG5cbmZ1bmN0aW9uIGdldFRhc2tzRnJvbVByb2ooKSB7XG4gICAgdXNlci5wcm9qZWN0cy5mb3JFYWNoKHByb2plY3QgPT4ge1xuICAgICAgICBpZiAocHJvamVjdC5uYW1lID09PSBjdXJyZW50UGFnZSkge1xuICAgICAgICAgICAgbGV0IHByb2plY3RUYXNrcyA9IHByb2plY3QudGFza3M7XG5cbiAgICAgICAgICAgIHByb2plY3RUYXNrcy5mb3JFYWNoKHRhc2sgPT4ge1xuICAgICAgICAgICAgICAgIGNyZWF0ZVRhc2tVSSh0YXNrKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlTmF2UHJvamVjdHMoKSB7XG4gICAgbmF2UHJvamVjdEJ0bnMuZm9yRWFjaCgoYnV0dG9uKSA9PiB7XG4gICAgICAgIGJ1dHRvbi5yZW1vdmUoKTtcbiAgICB9KVxuXG4gICAgZm9yIChsZXQgaSA9IDM7IGkgPCBwYWdlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjcmVhdGVQcm9qZWN0VUkocGFnZXNbaV0pO1xuICAgIH1cblxuICAgIG5hdlByb2plY3RCdG5zID0gbmF2UHJvamVjdHMucXVlcnlTZWxlY3RvckFsbCgnYnV0dG9uJyk7XG4gICAgaGFuZGxlTmF2QnRuU3R5bGluZyhuYXZQcm9qZWN0QnRucyk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVByb2plY3RVSSh0ZXh0KSB7XG4gICAgY29uc3QgcHJvamVjdEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIHByb2plY3RCdG4uY2xhc3NMaXN0LmFkZCgnYnRuJyk7XG4gICAgcHJvamVjdEJ0bi5jbGFzc0xpc3QuYWRkKCdwcm9qZWN0Jyk7XG4gICAgcHJvamVjdEJ0bi50ZXh0Q29udGVudCA9IHRleHQ7XG5cbiAgICBuYXZQcm9qZWN0cy5hcHBlbmRDaGlsZChwcm9qZWN0QnRuKTtcbn1cblxuZnVuY3Rpb24gbWFpbigpIHtcbiAgICBjb25zdCBjcmVhdGVOZXdUYXNrQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNyZWF0ZS1uZXctdGFzaycpO1xuICAgIGNyZWF0ZU5ld1Rhc2tCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjcmVhdGVOZXdUYXNrKTtcblxuICAgIGNvbnN0IGNyZWF0ZU5ld1Byb2plY3RCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY3JlYXRlLW5ldy1wcm9qZWN0Jyk7XG4gICAgY3JlYXRlTmV3UHJvamVjdEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNyZWF0ZU5ld1Byb2plY3QpO1xufVxuXG5jb25zdCBkYXJrT3ZlcmxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kYXJrLW92ZXJsYXknKTtcbmNvbnN0IHRhc2tUZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Rhc2stdGV4dCcpO1xuY29uc3QgdGFza0RhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGFzay1kYXRlJyk7XG5jb25zdCBjcmVhdGVUYXNrUG9wdXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY3JlYXRlLXRhc2stcG9wdXAnKTtcblxuY29uc3QgcHJvak5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdC1uYW1lJyk7XG5jb25zdCBjcmVhdGVQcm9qZWN0UG9wdXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY3JlYXRlLXByb2plY3QtcG9wdXAnKTtcblxuZnVuY3Rpb24gY3JlYXRlTmV3VGFzaygpIHtcbiAgICBjcmVhdGVUYXNrUG9wdXAuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcbiAgICBkYXJrT3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICB0YXNrRGF0ZS52YWx1ZSA9ICcnO1xuICAgIHRhc2tUZXh0LnZhbHVlID0gJyc7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZU5ld1Byb2plY3QoKSB7XG4gICAgY3JlYXRlUHJvamVjdFBvcHVwLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XG4gICAgZGFya092ZXJsYXkuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgcHJvak5hbWUudmFsdWUgPSAnJztcbn1cblxuY3JlYXRlVGFza1BvcHVwLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIChlKSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGxldCB0ZXh0ID0gdGFza1RleHQudmFsdWU7XG4gICAgbGV0IGRhdGUgPSB0YXNrRGF0ZS52YWx1ZTtcbiAgICBpZiAodGFza0RhdGUudmFsdWUgPT09ICcnKSB7XG4gICAgICAgIGRhdGUgPSAnWVlZWS9NTS9ERCc7XG4gICAgfVxuICAgIGxldCB0YXNrID0gdXNlci5jcmVhdGVOZXdUYXNrKHRleHQsIGRhdGUpO1xuICAgIHVzZXIucHJvamVjdHMuZm9yRWFjaChwcm9qZWN0ID0+IHtcbiAgICAgICAgaWYgKHByb2plY3QubmFtZSA9PT0gY3VycmVudFBhZ2UpIHtcbiAgICAgICAgICAgIHByb2plY3QuYWRkVGFzayh0YXNrKTtcbiAgICAgICAgfVxuICAgIH0pXG4gICAgbG9hZEN1cnJlbnRQYWdlKCk7XG5cbiAgICBjcmVhdGVUYXNrUG9wdXAuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICBkYXJrT3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xufSk7XG5cbmNyZWF0ZVByb2plY3RQb3B1cC5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZSkgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBsZXQgbmFtZSA9IHByb2pOYW1lLnZhbHVlO1xuICAgIHVzZXIuY3JlYXRlTmV3UHJvamVjdChuYW1lKTtcbiAgICBwYWdlcy5wdXNoKG5hbWUpO1xuICAgIHVwZGF0ZU5hdlByb2plY3RzKCk7XG4gICAgY3VycmVudFBhZ2UgPSBuYW1lO1xuICAgIGxvYWRDdXJyZW50UGFnZSgpO1xuXG4gICAgY3JlYXRlUHJvamVjdFBvcHVwLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgZGFya092ZXJsYXkuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbn0pO1xuXG5jb25zdCBjYW5jZWxQcm9qZWN0UG9wdXBCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2FuY2VsUHJvalBvcHVwQnRuJyk7XG5jYW5jZWxQcm9qZWN0UG9wdXBCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBjcmVhdGVQcm9qZWN0UG9wdXAuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICBkYXJrT3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xufSk7XG5cbmNvbnN0IGNhbmNlbFRhc2tQb3B1cEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjYW5jZWxUYXNrUG9wdXBCdG4nKTtcbmNhbmNlbFRhc2tQb3B1cEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNyZWF0ZVRhc2tQb3B1cC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIGRhcmtPdmVybGF5LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG59KTtcblxuZnVuY3Rpb24gZWRpdFRhc2soYnV0dG9uLCB0YXNrT2JqKSB7XG4gICAgYnV0dG9uLmNvbnRlbnRFZGl0YWJsZSA9IHRydWU7XG4gICAgYnV0dG9uLmZvY3VzKCk7XG5cbiAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIGlmIChldmVudC5rZXkgPT09IFwiRW50ZXJcIikge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGJ1dHRvbi5jb250ZW50RWRpdGFibGUgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJibHVyXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgYnV0dG9uLmNvbnRlbnRFZGl0YWJsZSA9IGZhbHNlO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVUYXNrVUkodGFza09iaikge1xuICAgIGNvbnN0IHRhc2tzQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRhc2tzLWNvbnRhaW5lcicpO1xuICAgIGNvbnN0IHRhc2sgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb25zdCBsZWZ0U2lkZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGNvbnN0IHJpZ2h0U2lkZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGNvbnN0IGNvbXBsZXRlQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgY29uc3QgcmVtb3ZlQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgY29uc3QgdGFza1RleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb25zdCB0YXNrRGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgdGFzay5jbGFzc0xpc3QuYWRkKCd0YXNrJyk7XG4gICAgbGVmdFNpZGUuY2xhc3NMaXN0LmFkZCgndGFzay1jb21wbGV0ZS1hbmQtdGV4dCcpO1xuICAgIHJpZ2h0U2lkZS5jbGFzc0xpc3QuYWRkKCd0YXNrLWRhdGUtYW5kLXJlbW92ZScpO1xuICAgIGNvbXBsZXRlQnRuLmNsYXNzTGlzdC5hZGQoJ2dyZWVuLWJ0bicpO1xuICAgIGNvbXBsZXRlQnRuLmNsYXNzTGlzdC5hZGQoJ2J0bicpO1xuICAgIHJlbW92ZUJ0bi5jbGFzc0xpc3QuYWRkKCdyZWQtYnRuJyk7XG4gICAgcmVtb3ZlQnRuLmNsYXNzTGlzdC5hZGQoJ2J0bicpO1xuICAgIHRhc2tUZXh0LmNsYXNzTGlzdC5hZGQoJ3Rhc2stdGV4dCcpO1xuICAgIHRhc2tEYXRlLmNsYXNzTGlzdC5hZGQoJ3Rhc2stZGF0ZScpO1xuICAgIHRhc2tUZXh0LmNsYXNzTGlzdC5hZGQoJ2J0bicpO1xuICAgIHRhc2tEYXRlLmNsYXNzTGlzdC5hZGQoJ2J0bicpO1xuXG4gICAgdGFza1RleHQudGV4dENvbnRlbnQgPSB0YXNrT2JqLnRleHQ7XG4gICAgdGFza0RhdGUudGV4dENvbnRlbnQgPSB0YXNrT2JqLmRhdGU7XG4gICAgY29tcGxldGVCdG4udGV4dENvbnRlbnQgPSBcIkNvbXBsZXRlXCJcbiAgICByZW1vdmVCdG4udGV4dENvbnRlbnQgPSBcIlJlbW92ZVwiXG5cbiAgICB0YXNrVGV4dC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgZWRpdFRhc2sodGFza1RleHQsIHRhc2tPYmopO1xuICAgIH0pO1xuICAgIHRhc2tEYXRlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBlZGl0VGFzayh0YXNrRGF0ZSwgdGFza09iaik7XG4gICAgfSk7XG5cbiAgICBjb21wbGV0ZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgdXNlci5yZW1vdmVUYXNrKHRhc2tUZXh0LCBjdXJyZW50UGFnZSk7XG4gICAgICAgIHRhc2sucmVtb3ZlKCk7XG5cbiAgICAgICAgbG9hZEN1cnJlbnRQYWdlKCk7XG4gICAgfSk7XG5cbiAgICByZW1vdmVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIHVzZXIucmVtb3ZlVGFzayh0YXNrVGV4dCwgY3VycmVudFBhZ2UpO1xuICAgICAgICB0YXNrLnJlbW92ZSgpO1xuICAgICAgICBsb2FkQ3VycmVudFBhZ2UoKTtcbiAgICB9KTtcblxuICAgIGxlZnRTaWRlLmFwcGVuZENoaWxkKGNvbXBsZXRlQnRuKTtcbiAgICBsZWZ0U2lkZS5hcHBlbmRDaGlsZCh0YXNrVGV4dCk7XG4gICAgcmlnaHRTaWRlLmFwcGVuZENoaWxkKHRhc2tEYXRlKTtcbiAgICByaWdodFNpZGUuYXBwZW5kQ2hpbGQocmVtb3ZlQnRuKTtcbiAgICB0YXNrLmFwcGVuZENoaWxkKGxlZnRTaWRlKTtcbiAgICB0YXNrLmFwcGVuZENoaWxkKHJpZ2h0U2lkZSk7XG5cbiAgICB0YXNrc0NvbnRhaW5lci5hcHBlbmRDaGlsZCh0YXNrKTtcbn1cblxuY29uc3QgbmF2SG9tZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uYXYtaG9tZScpO1xuY29uc3QgbmF2SG9tZUJ0bnMgPSBuYXZIb21lLnF1ZXJ5U2VsZWN0b3JBbGwoJ2J1dHRvbicpO1xuY29uc3QgbmF2UHJvamVjdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmF2LXByb2plY3RzJyk7XG5sZXQgbmF2UHJvamVjdEJ0bnMgPSBuYXZQcm9qZWN0cy5xdWVyeVNlbGVjdG9yQWxsKCdidXR0b24nKTtcblxuaGFuZGxlTmF2QnRuU3R5bGluZyhuYXZIb21lQnRucyk7XG5oYW5kbGVOYXZCdG5TdHlsaW5nKG5hdlByb2plY3RCdG5zKTtcblxuZnVuY3Rpb24gaGFuZGxlTmF2QnRuU3R5bGluZyhidXR0b25zKSB7XG4gICAgZnVuY3Rpb24gY2xpY2tIYW5kbGVyKCkge1xuICAgICAgICBidXR0b25zLmZvckVhY2gob3RoZXJCdXR0b24gPT4ge1xuICAgICAgICAgICAgaWYgKG90aGVyQnV0dG9uICE9PSB0aGlzKSB7XG4gICAgICAgICAgICAgICAgaWYgKG90aGVyQnV0dG9uLnRleHRDb250ZW50LnN0YXJ0c1dpdGgoJy0gJykpIHtcbiAgICAgICAgICAgICAgICAgICAgb3RoZXJCdXR0b24udGV4dENvbnRlbnQgPSBvdGhlckJ1dHRvbi50ZXh0Q29udGVudC5zbGljZSgyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgb3RoZXJCdXR0b24ucmVtb3ZlQXR0cmlidXRlKCduYXYtYnRuLWNsaWNrZWQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgXG4gICAgICAgIGN1cnJlbnRQYWdlID0gdGhpcy50ZXh0Q29udGVudC50b0xvd2VyQ2FzZSgpO1xuICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZSgnbmF2LWJ0bi1jbGlja2VkJywgJ3RydWUnKTtcbiAgICAgICAgbG9hZEN1cnJlbnRQYWdlKCk7XG4gICAgfVxuXG4gICAgYnV0dG9ucy5mb3JFYWNoKGJ1dHRvbiA9PiB7XG4gICAgICAgIGJ1dHRvbi5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIGNsaWNrSGFuZGxlcik7XG4gICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsaWNrSGFuZGxlcik7XG4gICAgfSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGxvYWRQYWdlKCkge1xuICAgIGxvYWRDdXJyZW50UGFnZSgpO1xuICAgIG1haW4oKTtcbn0iLCJpbXBvcnQgVGFzayBmcm9tIFwiLi90YXNrXCI7XG5pbXBvcnQgUHJvamVjdCBmcm9tIFwiLi9wcm9qZWN0XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVzZXIge1xuICAgIGNvbnN0cnVjdG9yKHRhc2tzID0gW10sIHByb2plY3RzID0gW25ldyBQcm9qZWN0KCdhbGwnKSwgbmV3IFByb2plY3QoJ3RvZGF5JyksIG5ldyBQcm9qZWN0KCd3ZWVrJyldKSB7XG4gICAgICAgIHRoaXMudGFza3MgPSB0YXNrcztcbiAgICAgICAgdGhpcy5wcm9qZWN0cyA9IHByb2plY3RzO1xuICAgIH1cblxuICAgIGNyZWF0ZU5ld1Rhc2sodGV4dCwgZGF0ZSkge1xuICAgICAgICBsZXQgbmV3VGFzayA9IG5ldyBUYXNrKHRleHQsIGRhdGUpO1xuICAgICAgICB0aGlzLnRhc2tzLnB1c2gobmV3VGFzayk7XG4gICAgICAgIHJldHVybiBuZXdUYXNrO1xuICAgIH1cblxuICAgIHJlbW92ZVRhc2sodGV4dCwgcGFnZSkge1xuICAgICAgICB0aGlzLnRhc2tzLmZvckVhY2goKHZhbHVlLCBpKSA9PiB7XG4gICAgICAgICAgICBpZiAodGV4dC50ZXh0Q29udGVudCA9PT0gdmFsdWUudGV4dCkge1xuICAgICAgICAgICAgICAgIHRoaXMudGFza3Muc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuXG4gICAgICAgIHRoaXMucHJvamVjdHMuZm9yRWFjaChwcm9qZWN0ID0+IHtcbiAgICAgICAgICAgIGlmIChwcm9qZWN0Lm5hbWUgPT09IHBhZ2UpIHtcbiAgICAgICAgICAgICAgICBwcm9qZWN0LnJlbW92ZVByb2pUYXNrKHRleHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGNyZWF0ZU5ld1Byb2plY3QobmFtZSkge1xuICAgICAgICB0aGlzLnByb2plY3RzLnB1c2gobmV3IFByb2plY3QobmFtZSkpXG4gICAgfVxufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IGxvYWRQYWdlIGZyb20gXCIuL3VpXCI7XG5cbmxvYWRQYWdlKCk7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9