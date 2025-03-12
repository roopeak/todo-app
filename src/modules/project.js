export class Project {
	constructor (name) {
		this.name = name;
		this.todos = [];
		this.id = Date.now().toString();
	}

	addTodo(todo) {
		this.todos.push(todo);
	}

	removeTodo(todoId) {
		this.todos = this.todos.filter(todo => todo.id !== todoId);
	}
}