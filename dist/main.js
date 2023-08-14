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
let pages = ['all', 'today', 'week'];

function loadAll() {
    const tasksContainer = document.querySelector('.tasks-container');
    tasksContainer.innerHTML = '';
    user.tasks.forEach(function (task) {
        createTaskUI(task);
    });
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
    user.createNewTask(text, date);
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
let navProjectBtns = navProjects.querySelectorAll('button');

handleNavBtnStyling(navHomeBtns);
handleNavBtnStyling(navProjectBtns);

// function handleNavBtnStyling(buttons) {
//     buttons.forEach((button) => {
//         button.removeEventListener('mouseenter', () => {
//             if (!button.textContent.startsWith('- ')) {
//                 button.textContent = '- ' + button.textContent;
//             }
//         });
//         button.removeEventListener('mouseleave', () => {
//             if (button.getAttribute('nav-btn-clicked') !== 'true') {
//                 button.textContent = button.textContent.slice(2);
//             }
//         });
    
//         button.removeEventListener('click', () => {
//             buttons.forEach(otherButtons => {
//                 if (otherButtons !== button) {
//                     if (otherButtons.textContent.startsWith('- ')) {
//                         otherButtons.textContent = otherButtons.textContent.slice(2);
//                     }
//                     otherButtons.removeAttribute('nav-btn-clicked');
//                 }
//             });
    
//             button.setAttribute('nav-btn-clicked', 'true');
//         });
//     })

//     buttons.forEach((button) => {
//         button.addEventListener('mouseenter', () => {
//             if (!button.textContent.startsWith('- ')) {
//                 button.textContent = '- ' + button.textContent;
//             }
//         });
    
//         button.addEventListener('mouseleave', () => {
//             if (button.getAttribute('nav-btn-clicked') !== 'true') {
//                 button.textContent = button.textContent.slice(2);
//             }
//         });
    
//         button.addEventListener('click', () => {
//             buttons.forEach(otherButtons => {
//                 if (otherButtons !== button) {
//                     if (otherButtons.textContent.startsWith('- ')) {
//                         otherButtons.textContent = otherButtons.textContent.slice(2);
//                     }
//                     otherButtons.removeAttribute('nav-btn-clicked');
//                 }
//             });
    
//             button.setAttribute('nav-btn-clicked', 'true');
//         });
//     });
// }

function handleNavBtnStyling(buttons) {
    function mouseEnterHandler() {
        if (!this.textContent.startsWith('- ')) {
            this.textContent = '- ' + this.textContent;
        }
    }
    
    function mouseLeaveHandler() {
        if (this.getAttribute('nav-btn-clicked') !== 'true') {
            this.textContent = this.textContent.slice(2);
        }
    }
    
    function clickHandler() {
        buttons.forEach(otherButton => {
            if (otherButton !== this) {
                if (otherButton.textContent.startsWith('- ')) {
                    otherButton.textContent = otherButton.textContent.slice(2);
                }
                otherButton.removeAttribute('nav-btn-clicked');
            }
        });
    
        this.setAttribute('nav-btn-clicked', 'true');
    }

    buttons.forEach(button => {
        button.removeEventListener('mouseenter', mouseEnterHandler);
        button.removeEventListener('mouseleave', mouseLeaveHandler);
        button.removeEventListener('click', clickHandler);

        button.addEventListener('mouseenter', mouseEnterHandler);
        button.addEventListener('mouseleave', mouseLeaveHandler);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNONEI7O0FBRTVCLCtDQUFRLEciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvcHJvamVjdC5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvdGFzay5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvdWkuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3VzZXIuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNzIFByb2plY3Qge1xuICAgIGNvbnN0cnVjdG9yKG5hbWUsIHRhc2tzID0gW10pIHtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy50YXNrcyA9IHRhc2tzO1xuICAgIH1cblxuICAgIGFkZFRhc2sodGFzaykge1xuICAgICAgICB0aGlzLnRhc2tzLnB1c2godGFzayk7XG4gICAgfVxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFRhc2sge1xuICAgIGNvbnN0cnVjdG9yKHRleHQsIGRhdGUsIHByb2plY3QgPSAnYWxsJykge1xuICAgICAgICB0aGlzLnRleHQgPSB0ZXh0O1xuICAgICAgICB0aGlzLmRhdGUgPSBkYXRlO1xuICAgICAgICB0aGlzLnByb2plY3QgPSBwcm9qZWN0O1xuICAgIH1cblxuICAgIGVkaXRUZXh0KG5ld1RleHQpIHtcbiAgICAgICAgdGhpcy50ZXh0ID0gbmV3VGV4dDtcbiAgICB9XG5cbiAgICBlZGl0RGF0ZShuZXdEYXRlKSB7XG4gICAgICAgIHRoaXMuZGF0ZSA9IG5ld0RhdGU7XG4gICAgfVxufSIsImltcG9ydCBVc2VyIGZyb20gXCIuL3VzZXJcIjtcblxuY29uc3QgdXNlciA9IG5ldyBVc2VyKCk7XG5sZXQgY3VycmVudFBhZ2UgPSAnYWxsJztcbmxldCBwYWdlcyA9IFsnYWxsJywgJ3RvZGF5JywgJ3dlZWsnXTtcblxuZnVuY3Rpb24gbG9hZEFsbCgpIHtcbiAgICBjb25zdCB0YXNrc0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YXNrcy1jb250YWluZXInKTtcbiAgICB0YXNrc0NvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcbiAgICB1c2VyLnRhc2tzLmZvckVhY2goZnVuY3Rpb24gKHRhc2spIHtcbiAgICAgICAgY3JlYXRlVGFza1VJKHRhc2spO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBsb2FkQ3VycmVudFBhZ2UoKSB7XG4gICAgc3dpdGNoIChjdXJyZW50UGFnZSkge1xuICAgICAgICBjYXNlICdhbGwnOlxuICAgICAgICAgICAgbG9hZEFsbCgpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ3RvZGF5JzpcbiAgICAgICAgICAgIGxvYWRUb2RheSgpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ3dlZWsnOlxuICAgICAgICAgICAgbG9hZFdlZWsoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgbG9hZEFsbCgpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgfVxufVxuXG5mdW5jdGlvbiB1cGRhdGVOYXZQcm9qZWN0cygpIHtcbiAgICBuYXZQcm9qZWN0QnRucy5mb3JFYWNoKChidXR0b24pID0+IHtcbiAgICAgICAgYnV0dG9uLnJlbW92ZSgpO1xuICAgIH0pXG5cbiAgICBmb3IgKGxldCBpID0gMzsgaSA8IHBhZ2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNyZWF0ZVByb2plY3RVSShwYWdlc1tpXSk7XG4gICAgfVxuICAgIFxuICAgIG5hdlByb2plY3RCdG5zID0gbmF2UHJvamVjdHMucXVlcnlTZWxlY3RvckFsbCgnYnV0dG9uJyk7XG4gICAgaGFuZGxlTmF2QnRuU3R5bGluZyhuYXZQcm9qZWN0QnRucyk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVByb2plY3RVSSh0ZXh0KSB7XG4gICAgY29uc3QgcHJvamVjdEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIHByb2plY3RCdG4uY2xhc3NMaXN0LmFkZCgnYnRuJyk7XG4gICAgcHJvamVjdEJ0bi5jbGFzc0xpc3QuYWRkKCdwcm9qZWN0Jyk7XG4gICAgcHJvamVjdEJ0bi50ZXh0Q29udGVudCA9IHRleHQ7XG5cbiAgICBuYXZQcm9qZWN0cy5hcHBlbmRDaGlsZChwcm9qZWN0QnRuKTtcbn1cblxuZnVuY3Rpb24gbWFpbigpIHtcbiAgICBjb25zdCBjcmVhdGVOZXdUYXNrQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNyZWF0ZS1uZXctdGFzaycpO1xuICAgIGNyZWF0ZU5ld1Rhc2tCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjcmVhdGVOZXdUYXNrKTtcblxuICAgIGNvbnN0IGNyZWF0ZU5ld1Byb2plY3RCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY3JlYXRlLW5ldy1wcm9qZWN0Jyk7XG4gICAgY3JlYXRlTmV3UHJvamVjdEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNyZWF0ZU5ld1Byb2plY3QpO1xufVxuXG5jb25zdCBkYXJrT3ZlcmxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kYXJrLW92ZXJsYXknKTtcbmNvbnN0IHRhc2tUZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Rhc2stdGV4dCcpO1xuY29uc3QgdGFza0RhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGFzay1kYXRlJyk7XG5jb25zdCBjcmVhdGVUYXNrUG9wdXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY3JlYXRlLXRhc2stcG9wdXAnKTtcblxuY29uc3QgcHJvak5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdC1uYW1lJyk7XG5jb25zdCBjcmVhdGVQcm9qZWN0UG9wdXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY3JlYXRlLXByb2plY3QtcG9wdXAnKTtcblxuZnVuY3Rpb24gY3JlYXRlTmV3VGFzaygpIHtcbiAgICBjcmVhdGVUYXNrUG9wdXAuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcbiAgICBkYXJrT3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICB0YXNrRGF0ZS52YWx1ZSA9ICcnO1xuICAgIHRhc2tUZXh0LnZhbHVlID0gJyc7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZU5ld1Byb2plY3QoKSB7XG4gICAgY3JlYXRlUHJvamVjdFBvcHVwLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XG4gICAgZGFya092ZXJsYXkuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgcHJvak5hbWUudmFsdWUgPSAnJztcbn1cblxuY3JlYXRlVGFza1BvcHVwLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIChlKSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGxldCB0ZXh0ID0gdGFza1RleHQudmFsdWU7XG4gICAgbGV0IGRhdGUgPSB0YXNrRGF0ZS52YWx1ZTtcbiAgICB1c2VyLmNyZWF0ZU5ld1Rhc2sodGV4dCwgZGF0ZSk7XG4gICAgbG9hZEN1cnJlbnRQYWdlKCk7XG5cbiAgICBjcmVhdGVUYXNrUG9wdXAuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICBkYXJrT3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xufSk7XG5cbmNyZWF0ZVByb2plY3RQb3B1cC5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZSkgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBsZXQgbmFtZSA9IHByb2pOYW1lLnZhbHVlO1xuICAgIHVzZXIuY3JlYXRlTmV3UHJvamVjdChuYW1lKTtcbiAgICBwYWdlcy5wdXNoKG5hbWUpO1xuICAgIHVwZGF0ZU5hdlByb2plY3RzKCk7XG4gICAgY3VycmVudFBhZ2UgPSBuYW1lO1xuXG4gICAgY3JlYXRlUHJvamVjdFBvcHVwLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgZGFya092ZXJsYXkuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbn0pO1xuXG5jb25zdCBjYW5jZWxQcm9qZWN0UG9wdXBCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2FuY2VsUHJvalBvcHVwQnRuJyk7XG5jYW5jZWxQcm9qZWN0UG9wdXBCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBjcmVhdGVQcm9qZWN0UG9wdXAuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICBkYXJrT3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xufSk7XG5cbmNvbnN0IGNhbmNlbFRhc2tQb3B1cEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjYW5jZWxUYXNrUG9wdXBCdG4nKTtcbmNhbmNlbFRhc2tQb3B1cEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNyZWF0ZVRhc2tQb3B1cC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIGRhcmtPdmVybGF5LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG59KTtcblxuZnVuY3Rpb24gY3JlYXRlVGFza1VJKHRhc2tPYmopIHtcbiAgICBjb25zdCB0YXNrc0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YXNrcy1jb250YWluZXInKTtcbiAgICBjb25zdCB0YXNrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY29uc3QgbGVmdFNpZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb25zdCByaWdodFNpZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb25zdCBjb21wbGV0ZUJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIGNvbnN0IHJlbW92ZUJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIGNvbnN0IHRhc2tUZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgIGNvbnN0IHRhc2tEYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuXG4gICAgdGFzay5jbGFzc0xpc3QuYWRkKCd0YXNrJyk7XG4gICAgbGVmdFNpZGUuY2xhc3NMaXN0LmFkZCgndGFzay1jb21wbGV0ZS1hbmQtdGV4dCcpO1xuICAgIHJpZ2h0U2lkZS5jbGFzc0xpc3QuYWRkKCd0YXNrLWRhdGUtYW5kLXJlbW92ZScpO1xuICAgIGNvbXBsZXRlQnRuLmNsYXNzTGlzdC5hZGQoJ2dyZWVuLWJ0bicpO1xuICAgIGNvbXBsZXRlQnRuLmNsYXNzTGlzdC5hZGQoJ2J0bicpO1xuICAgIHJlbW92ZUJ0bi5jbGFzc0xpc3QuYWRkKCdyZWQtYnRuJyk7XG4gICAgcmVtb3ZlQnRuLmNsYXNzTGlzdC5hZGQoJ2J0bicpO1xuICAgIHRhc2tUZXh0LmNsYXNzTGlzdC5hZGQoJ3Rhc2stdGV4dCcpO1xuICAgIHRhc2tEYXRlLmNsYXNzTGlzdC5hZGQoJ3Rhc2stZGF0ZScpO1xuXG4gICAgdGFza1RleHQudGV4dENvbnRlbnQgPSB0YXNrT2JqLnRleHQ7XG4gICAgdGFza0RhdGUudGV4dENvbnRlbnQgPSB0YXNrT2JqLmRhdGU7XG4gICAgY29tcGxldGVCdG4udGV4dENvbnRlbnQgPSBcIkNvbXBsZXRlXCJcbiAgICByZW1vdmVCdG4udGV4dENvbnRlbnQgPSBcIlJlbW92ZVwiXG5cbiAgICBjb21wbGV0ZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgdXNlci5yZW1vdmVUYXNrKHRhc2tUZXh0KTtcbiAgICAgICAgdGFzay5yZW1vdmUoKTtcbiAgICAgICAgbG9hZEN1cnJlbnRQYWdlKCk7XG4gICAgfSlcblxuICAgIHJlbW92ZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgdXNlci5yZW1vdmVUYXNrKHRhc2tUZXh0KTtcbiAgICAgICAgdGFzay5yZW1vdmUoKTtcbiAgICAgICAgbG9hZEN1cnJlbnRQYWdlKCk7XG4gICAgfSlcblxuICAgIGxlZnRTaWRlLmFwcGVuZENoaWxkKGNvbXBsZXRlQnRuKTtcbiAgICBsZWZ0U2lkZS5hcHBlbmRDaGlsZCh0YXNrVGV4dCk7XG4gICAgcmlnaHRTaWRlLmFwcGVuZENoaWxkKHRhc2tEYXRlKTtcbiAgICByaWdodFNpZGUuYXBwZW5kQ2hpbGQocmVtb3ZlQnRuKTtcbiAgICB0YXNrLmFwcGVuZENoaWxkKGxlZnRTaWRlKTtcbiAgICB0YXNrLmFwcGVuZENoaWxkKHJpZ2h0U2lkZSk7XG5cbiAgICB0YXNrc0NvbnRhaW5lci5hcHBlbmRDaGlsZCh0YXNrKTtcbn1cblxuY29uc3QgbmF2SG9tZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uYXYtaG9tZScpO1xuY29uc3QgbmF2SG9tZUJ0bnMgPSBuYXZIb21lLnF1ZXJ5U2VsZWN0b3JBbGwoJ2J1dHRvbicpO1xuY29uc3QgbmF2UHJvamVjdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmF2LXByb2plY3RzJyk7XG5sZXQgbmF2UHJvamVjdEJ0bnMgPSBuYXZQcm9qZWN0cy5xdWVyeVNlbGVjdG9yQWxsKCdidXR0b24nKTtcblxuaGFuZGxlTmF2QnRuU3R5bGluZyhuYXZIb21lQnRucyk7XG5oYW5kbGVOYXZCdG5TdHlsaW5nKG5hdlByb2plY3RCdG5zKTtcblxuLy8gZnVuY3Rpb24gaGFuZGxlTmF2QnRuU3R5bGluZyhidXR0b25zKSB7XG4vLyAgICAgYnV0dG9ucy5mb3JFYWNoKChidXR0b24pID0+IHtcbi8vICAgICAgICAgYnV0dG9uLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCAoKSA9PiB7XG4vLyAgICAgICAgICAgICBpZiAoIWJ1dHRvbi50ZXh0Q29udGVudC5zdGFydHNXaXRoKCctICcpKSB7XG4vLyAgICAgICAgICAgICAgICAgYnV0dG9uLnRleHRDb250ZW50ID0gJy0gJyArIGJ1dHRvbi50ZXh0Q29udGVudDtcbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgfSk7XG4vLyAgICAgICAgIGJ1dHRvbi5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgKCkgPT4ge1xuLy8gICAgICAgICAgICAgaWYgKGJ1dHRvbi5nZXRBdHRyaWJ1dGUoJ25hdi1idG4tY2xpY2tlZCcpICE9PSAndHJ1ZScpIHtcbi8vICAgICAgICAgICAgICAgICBidXR0b24udGV4dENvbnRlbnQgPSBidXR0b24udGV4dENvbnRlbnQuc2xpY2UoMik7XG4vLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgIH0pO1xuICAgIFxuLy8gICAgICAgICBidXR0b24ucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4vLyAgICAgICAgICAgICBidXR0b25zLmZvckVhY2gob3RoZXJCdXR0b25zID0+IHtcbi8vICAgICAgICAgICAgICAgICBpZiAob3RoZXJCdXR0b25zICE9PSBidXR0b24pIHtcbi8vICAgICAgICAgICAgICAgICAgICAgaWYgKG90aGVyQnV0dG9ucy50ZXh0Q29udGVudC5zdGFydHNXaXRoKCctICcpKSB7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBvdGhlckJ1dHRvbnMudGV4dENvbnRlbnQgPSBvdGhlckJ1dHRvbnMudGV4dENvbnRlbnQuc2xpY2UoMik7XG4vLyAgICAgICAgICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgICAgICAgICAgb3RoZXJCdXR0b25zLnJlbW92ZUF0dHJpYnV0ZSgnbmF2LWJ0bi1jbGlja2VkJyk7XG4vLyAgICAgICAgICAgICAgICAgfVxuLy8gICAgICAgICAgICAgfSk7XG4gICAgXG4vLyAgICAgICAgICAgICBidXR0b24uc2V0QXR0cmlidXRlKCduYXYtYnRuLWNsaWNrZWQnLCAndHJ1ZScpO1xuLy8gICAgICAgICB9KTtcbi8vICAgICB9KVxuXG4vLyAgICAgYnV0dG9ucy5mb3JFYWNoKChidXR0b24pID0+IHtcbi8vICAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCAoKSA9PiB7XG4vLyAgICAgICAgICAgICBpZiAoIWJ1dHRvbi50ZXh0Q29udGVudC5zdGFydHNXaXRoKCctICcpKSB7XG4vLyAgICAgICAgICAgICAgICAgYnV0dG9uLnRleHRDb250ZW50ID0gJy0gJyArIGJ1dHRvbi50ZXh0Q29udGVudDtcbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgfSk7XG4gICAgXG4vLyAgICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgKCkgPT4ge1xuLy8gICAgICAgICAgICAgaWYgKGJ1dHRvbi5nZXRBdHRyaWJ1dGUoJ25hdi1idG4tY2xpY2tlZCcpICE9PSAndHJ1ZScpIHtcbi8vICAgICAgICAgICAgICAgICBidXR0b24udGV4dENvbnRlbnQgPSBidXR0b24udGV4dENvbnRlbnQuc2xpY2UoMik7XG4vLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgIH0pO1xuICAgIFxuLy8gICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4vLyAgICAgICAgICAgICBidXR0b25zLmZvckVhY2gob3RoZXJCdXR0b25zID0+IHtcbi8vICAgICAgICAgICAgICAgICBpZiAob3RoZXJCdXR0b25zICE9PSBidXR0b24pIHtcbi8vICAgICAgICAgICAgICAgICAgICAgaWYgKG90aGVyQnV0dG9ucy50ZXh0Q29udGVudC5zdGFydHNXaXRoKCctICcpKSB7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBvdGhlckJ1dHRvbnMudGV4dENvbnRlbnQgPSBvdGhlckJ1dHRvbnMudGV4dENvbnRlbnQuc2xpY2UoMik7XG4vLyAgICAgICAgICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgICAgICAgICAgb3RoZXJCdXR0b25zLnJlbW92ZUF0dHJpYnV0ZSgnbmF2LWJ0bi1jbGlja2VkJyk7XG4vLyAgICAgICAgICAgICAgICAgfVxuLy8gICAgICAgICAgICAgfSk7XG4gICAgXG4vLyAgICAgICAgICAgICBidXR0b24uc2V0QXR0cmlidXRlKCduYXYtYnRuLWNsaWNrZWQnLCAndHJ1ZScpO1xuLy8gICAgICAgICB9KTtcbi8vICAgICB9KTtcbi8vIH1cblxuZnVuY3Rpb24gaGFuZGxlTmF2QnRuU3R5bGluZyhidXR0b25zKSB7XG4gICAgZnVuY3Rpb24gbW91c2VFbnRlckhhbmRsZXIoKSB7XG4gICAgICAgIGlmICghdGhpcy50ZXh0Q29udGVudC5zdGFydHNXaXRoKCctICcpKSB7XG4gICAgICAgICAgICB0aGlzLnRleHRDb250ZW50ID0gJy0gJyArIHRoaXMudGV4dENvbnRlbnQ7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgZnVuY3Rpb24gbW91c2VMZWF2ZUhhbmRsZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLmdldEF0dHJpYnV0ZSgnbmF2LWJ0bi1jbGlja2VkJykgIT09ICd0cnVlJykge1xuICAgICAgICAgICAgdGhpcy50ZXh0Q29udGVudCA9IHRoaXMudGV4dENvbnRlbnQuc2xpY2UoMik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgZnVuY3Rpb24gY2xpY2tIYW5kbGVyKCkge1xuICAgICAgICBidXR0b25zLmZvckVhY2gob3RoZXJCdXR0b24gPT4ge1xuICAgICAgICAgICAgaWYgKG90aGVyQnV0dG9uICE9PSB0aGlzKSB7XG4gICAgICAgICAgICAgICAgaWYgKG90aGVyQnV0dG9uLnRleHRDb250ZW50LnN0YXJ0c1dpdGgoJy0gJykpIHtcbiAgICAgICAgICAgICAgICAgICAgb3RoZXJCdXR0b24udGV4dENvbnRlbnQgPSBvdGhlckJ1dHRvbi50ZXh0Q29udGVudC5zbGljZSgyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgb3RoZXJCdXR0b24ucmVtb3ZlQXR0cmlidXRlKCduYXYtYnRuLWNsaWNrZWQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgXG4gICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCduYXYtYnRuLWNsaWNrZWQnLCAndHJ1ZScpO1xuICAgIH1cblxuICAgIGJ1dHRvbnMuZm9yRWFjaChidXR0b24gPT4ge1xuICAgICAgICBidXR0b24ucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsIG1vdXNlRW50ZXJIYW5kbGVyKTtcbiAgICAgICAgYnV0dG9uLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCBtb3VzZUxlYXZlSGFuZGxlcik7XG4gICAgICAgIGJ1dHRvbi5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIGNsaWNrSGFuZGxlcik7XG5cbiAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCBtb3VzZUVudGVySGFuZGxlcik7XG4gICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgbW91c2VMZWF2ZUhhbmRsZXIpO1xuICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbGlja0hhbmRsZXIpO1xuICAgIH0pO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBsb2FkUGFnZSgpIHtcbiAgICBsb2FkQ3VycmVudFBhZ2UoKTtcbiAgICBtYWluKCk7XG59IiwiaW1wb3J0IFRhc2sgZnJvbSBcIi4vdGFza1wiO1xuaW1wb3J0IFByb2plY3QgZnJvbSBcIi4vcHJvamVjdFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVc2VyIHtcbiAgICBjb25zdHJ1Y3Rvcih0YXNrcyA9IFtdLCBwcm9qZWN0cyA9IFtdKSB7XG4gICAgICAgIHRoaXMudGFza3MgPSB0YXNrcztcbiAgICAgICAgdGhpcy5wcm9qZWN0cyA9IHByb2plY3RzO1xuICAgIH1cblxuICAgIGNyZWF0ZU5ld1Rhc2sodGV4dCwgZGF0ZSkge1xuICAgICAgICBsZXQgbmV3VGFzayA9IG5ldyBUYXNrKHRleHQsIGRhdGUpO1xuICAgICAgICB0aGlzLnRhc2tzLnB1c2gobmV3VGFzayk7XG4gICAgfVxuXG4gICAgcmVtb3ZlVGFzayh0ZXh0KSB7XG4gICAgICAgIHRoaXMudGFza3MuZm9yRWFjaCgodmFsdWUsIGkpID0+IHtcbiAgICAgICAgICAgIGlmICh0ZXh0LnRleHRDb250ZW50ID09PSB2YWx1ZS50ZXh0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy50YXNrcy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgY3JlYXRlTmV3UHJvamVjdChuYW1lKSB7XG4gICAgICAgIHRoaXMucHJvamVjdHMucHVzaChuZXcgUHJvamVjdChuYW1lKSlcbiAgICB9XG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgbG9hZFBhZ2UgZnJvbSBcIi4vdWlcIjtcblxubG9hZFBhZ2UoKTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=