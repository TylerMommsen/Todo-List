export default class Task {
    constructor(text, date) {
        this.text = text;
        this.date = date;
    }

    editText(newText) {
        this.text = newText;
    }

    editDate(newDate) {
        this.date = newDate;
    }
}