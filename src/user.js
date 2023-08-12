import Task from "./tasks";

class User {
    constructor(tasks = [], projects = []) {
        this.tasks = tasks;
        this.projects = projects;
    }

    createNewTask(text, date) {
        let newTask = new Task(text, date);
        this.tasks.push(newTask);
    }
}

let user = new User();

export default user;