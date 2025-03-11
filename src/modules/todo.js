export class Todo {
	constructor(title, dueDate) {
		this.title = title;
		this.dueDate = dueDate;
		this.completed = false;
		this.id = Date.now().toString();
	}

	static changeDate(newDueDate) {
		this.dueDate = newDueDate;
	}
}