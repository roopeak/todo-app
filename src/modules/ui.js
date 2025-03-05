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
			</aside>
			<div id='todoList'>
				<button id='addTodoBtn'>Add todo</button>
			</div>
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
		} else {
			projects.project.todos.forEach(todo => {
				const todoItem = document.createElement('div', 'todo-item');
				todoItem.innerHTML = `<strong>${todo.title}</strong> - ${dueDate}`;
				todoContainer.appendChild(todoItem);
			})
		}
	}

	static addTodo(title, description, dueDate, priority) {
		const todo = new Todo(title, description, dueDate, priority);
		const todos = Storage.getStandaloneTodos();
		todos.push(todo);
		Storage.saveStandaloneTodos(todos);
		UI.loadTodos();
	}

	static loadTodos() {
		const todoContainer = document.getElementById('todoList');
		todoContainer.innerHTML = '';

		const todos = Storage.getStandaloneTodos();
		todos.forEach(todo => {
			const todoElement = document.createElement('div', 'todo-item');
			todoElement.innerHTML = `<strong>${todo.title}</strong> - ${todo.dueDate}`;
			todoContainer.appendChild(todoElement);
		})
	}
}