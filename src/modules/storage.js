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
		todos = todos.filter(todo => todo.id !== todoId);
		Storage.saveAllTodos(todos);
	}

	static removeProject(projectId) {
		let projects = Storage.getProjects();
		projects = projects.filter(project => project.id !== projectId);
		Storage.saveProjects(projects);
	}
}