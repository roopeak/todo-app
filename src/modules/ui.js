import { Project } from "./project";
import { Todo } from "./todo";
import { Storage } from "./storage";

export class UI {
	static setupUI() {
		const container = document.querySelector('.container');
		container.innerHTML = `
			<header>
				<h1>Todo App</h1>
			</header>
			<aside class='sidebar'>
				<div id='viewBtns'>
					<button id='allTodosBtn'>All todos</button>
					<button id='todayBtn'>Today</button>
					<button id='thisWeekBtn'>This week</button>
				</div>
				<div id='projectsContainer'>
					<button id='addProjectBtn'>Add Project</button>
					<div id='projectList'></div>
				</div>
				<div id='todoList'></div>
			</aside>
		`;
	}

	static loadProjects() {
		const projects = Storage.getProjects();
		const projectContainer = document.getElementById('projectList');
		projectContainer.innerHTML = '';

		projects.forEach(project => {
			const projectCard = document.createElement('div', 'project-item');
			projectCard.textContent = project.name;
			projectCard.dataset.id = project.id;
			projectCard.addEventListener('click', () => UI.loadTodos(project.id));
			projectContainer.appendChild(projectCard);
		})

		// Console log for debugging
		console.log('Projects loaded: ', projects);
	}

	static addProject(name) {
		const project = new Project(name);
		const projects = Storage.getProjects();
		projects.push(project);
		Storage.saveProjects(projects);
		UI.loadProjects();
	}

	static loadTodos(projectId) {
		const projects = Storage.getProjects();
		const project = projects.find(p => p.id === projectId);
		const todoContainer = document.getElementById('todoList');
		todoContainer.innerHTML = '';
	
		if (project) {
			project.todos.forEach(todo => {
				const todoItem = document.createElement('div', 'todo-item');
				todoItem.innerHTML = `<strong>${todo.title}</strong> - ${dueDate}`;
				todoContainer.appendChild(todoItem);
			});
		}
	}
}