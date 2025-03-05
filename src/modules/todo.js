export class Todo {
	constructor(title, dueDate, priority) {
		this.title = title;
		this.dueDate = dueDate;
		this.priority = priority;
		this.completed = false;
		this.id = Date.now().toString();
	}

	toggleComplete() {
		this.completed = !this.completed;
	}
}