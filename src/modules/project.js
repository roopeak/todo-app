export class Project {
	constructor (name) {
		this.name = name;
		this.todos = [];
		this.id = Date.now().toString();
	}

	addTodo(todo) {
		console.log(todo)
		this.todos.push(todo);
	}

	removeTodo(todoId) {
		console.log('Todos before remove: ', this.todos)
		this.todos = this.todos.filter(todo => todo.id !== todoId);
		console.log('Todos after remove: ', this.todos);
	}
}