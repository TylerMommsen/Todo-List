import Task from "./tasks";

export default class User {
    constructor(tasks = [], projects = []) {
        this.tasks = tasks;
        this.projects = projects;
    }

    createNewTask(text, date) {
        let newTask = new Task(text, date);
        this.tasks.push(newTask);
    }
}