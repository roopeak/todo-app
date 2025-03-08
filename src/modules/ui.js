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
			<div id='todoList'></div>
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
		todoContainer.innerHTML = `<button id='addTodoBtn'>Add todo</button>`;
	
		if (project) {
			const projectHeader = document.createElement('h1');
			projectHeader.textContent = project.name;

			todoContainer.appendChild(projectHeader);
			project.todos.forEach(todo => {
				const todoItem = document.createElement('div', 'todo-item');
				todoItem.innerHTML = `
					<button class='check-todo' data-todo-id='${todo.id}'>Check</button>
					<strong>${todo.title}</strong>
					<input type='date' id='dueDate'>
				`;
				todoContainer.appendChild(todoItem);
			});

			document.getElementById('addTodoBtn').addEventListener('click', () => {
				const title = prompt('Enter task name:');
				UI.addTodo(title, project.name);
			});

			document.querySelectorAll(".check-todo").forEach(button => {
				button.addEventListener("click", (event) => {
						const todoId = event.target.dataset.todoId;
						UI.removeTodo(todoId, projectId);
				});
			});
		} else {
			this.loadAllTodos();
		}
	}

	static addTodo(title, projectName) {
		if (projectName) {
			const projects = Storage.getProjects();
			let project = projects.find(project => project.name === projectName);

			if (project) {
				const todo = new Todo(title, 'not set', 'normal');
				project.addTodo(todo);
				Storage.saveProjects(projects);
				UI.loadTodos(project.id);
				return;
			}
		}

		const todo = new Todo(title, 'not set', 'normal');
		const todos = Storage.getAllTodos();
		todos.push(todo);
		Storage.saveAllTodos(todos);
		UI.loadAllTodos();
	}

	static loadAllTodos() {
		const todoContainer = document.getElementById('todoList');
		todoContainer.innerHTML = `<button id='addTodoBtn'>Add todo</button>`;

		const todos = Storage.getAllTodos();
		todos.forEach(todo => {
			const todoElement = document.createElement('div');
			todoElement.classList.add('todo-item');
			todoElement.innerHTML = `
				<button class='check-todo' data-todo-id='${todo.id}'>Check</button>
				<strong>${todo.title}</strong>
				<input type='date' id='dueDate'>
			`;
			todoContainer.appendChild(todoElement);
		})

		document.getElementById('addTodoBtn').addEventListener('click', () => {
			const title = prompt('Enter task name:');
			UI.addTodo(title);
		});

		document.querySelectorAll(".check-todo").forEach(button => {
			button.addEventListener("click", (event) => {
				const todoId = event.target.dataset.todoId;
				UI.removeTodo(todoId);
			});
		});
	}

	static removeTodo(todoId, projectId) {
		if (projectId) {
			const projects = Storage.getProjects();
			let project = projects.find(project => project.id === projectId);
			project.removeTodo(todoId);
			Storage.removeTodo(todoId, projectId);
			UI.loadTodos(projectId);
		} else {
			Storage.removeTodo(todoId);
			UI.loadAllTodos();
		}
	}
}