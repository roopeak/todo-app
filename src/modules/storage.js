import { Project } from "./project";

export class Storage {
	static saveProjects(projects) {
		localStorage.setItem('projects', JSON.stringify(projects));
	}

	static getProjects() {
		const projects = JSON.parse(localStorage.getItem('projects')) || [];
		return projects.map(proj => Object.assign(new Project(proj.name), proj));
	}

	static saveAllTodos(todos) {
		localStorage.setItem('allTodos', JSON.stringify(todos));
	}

	static getAllTodos() {
		return JSON.parse(localStorage.getItem('allTodos')) || [];
	}

	static removeTodo(todoId, projectId) {
		if (projectId) {
			const projects = Storage.getProjects();
			let project = projects.find(project => project.id === projectId);
			
			if (project) {
				const todo = project.todos.find(todo => todo.id === todoId);
				project.removeTodo(todo.id);
				Storage.saveProjects(projects);
			}
		}

		let todos = Storage.getAllTodos();
		console.log('Todos before remove: ', todos);
		todos = todos.filter(todo => todo.id !== todoId);
		Storage.saveAllTodos(todos);
		console.log('Todos after remove: ', todos);
	}
}