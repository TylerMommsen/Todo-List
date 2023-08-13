import Task from "./task";

export default class User {
    constructor(tasks = [], projects = []) {
        this.tasks = tasks;
        this.projects = projects;
    }

    createNewTask(text, date) {
        let newTask = new Task(text, date);
        this.tasks.push(newTask);
    }

    removeTask(text) {
        this.tasks.forEach((value, i) => {
            if (text.textContent === value.text) {
                this.tasks.splice(i, 1);
            }
        })
    }
}