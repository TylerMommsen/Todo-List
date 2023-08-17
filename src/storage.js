import Task from "./task";
import Project from "./project";
import User from "./user";

export default class Storage {
    saveUser(data) {
        localStorage.setItem('user', JSON.stringify(data));
    }

    getUser() {
        return JSON.parse(localStorage.getItem('user'));
    }
}