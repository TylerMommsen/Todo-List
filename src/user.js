import Task from "./task";
import Project from "./project";

export default class User {
    constructor(projects = []) {
        this.projects = projects;
        this.projects.push(new Project('all'));
        this.projects.push(new Project('today'));
        this.projects.push(new Project('week'));
    }

    createNewTask(text, date) {
        let newTask = new Task(text, date);
        return newTask;
    }

    removeTask(text, page) {
        this.projects.forEach(project => {
            if (project.name === page) {
                project.removeProjTask(text);
            }
        });
    }

    createNewProject(name) {
        this.projects.push(new Project(name))
    }
}