export class Project {
	constructor (name) {
		this.name = name;
		this.todos = [];
		this.id = Date.now().toString();
	}

	addTodo(todo) {
		this.todos.push(todo);
	}
}