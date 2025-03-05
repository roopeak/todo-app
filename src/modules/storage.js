import { Project } from "./project";

export class Storage {
	static saveProjects(projects) {
		localStorage.setItem('projects', JSON.stringify(projects));
	}

	static getProjects() {
		const projects = JSON.parse(localStorage.getItem('projects')) || [];
		return projects.map(proj => Object.assign(new Project(proj.name), proj));
	}

	static saveStandaloneTodos(todos) {
		localStorage.setItem('standaloneTodos', JSON.stringify(todos));
	}

	static getStandaloneTodos() {
		return JSON.parse(localStorage.getItem('standaloneTodos')) || [];
	}
}