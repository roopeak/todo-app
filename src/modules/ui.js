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
		// console.log('Projects loaded: ', projects);
	}

	static addProject(name) {
		const project = new Project(name);
		const projects = Storage.getProjects();
		projects.push(project);
		Storage.saveProjects(projects);
		UI.loadProjects();
	}

	static loadTodos(projectId, date) {
		const projects = Storage.getProjects();
		const todos = Storage.getAllTodos();
		console.log(projects);
		const project = projects.find(p => p.id === projectId);
		const todoContainer = document.getElementById('todoList');
		todoContainer.innerHTML = `<button id='addTodoBtn'>Add todo</button>`;
	
		document.getElementById('addTodoBtn').addEventListener('click', () => {
			const title = prompt('Enter task name:');
			if (project) {
				UI.addTodo(title, project.name);
			} else {
				UI.addTodo(title);
			}
		});

		if (project) {
			const projectHeader = document.createElement('h1');
			projectHeader.textContent = project.name;

			todoContainer.appendChild(projectHeader);
			project.todos.forEach(todo => {
				const todoItem = document.createElement('div', 'todo-item');
				todoItem.innerHTML = `
					<button class='check-todo' data-todo-id='${todo.id}'>Check</button>
					<strong>${todo.title}</strong>
					<p class='due-date'>${todo.dueDate}</p>
				`;
				todoContainer.appendChild(todoItem);

				document.querySelectorAll(".check-todo").forEach(button => {
					button.addEventListener("click", (event) => {
						const todoId = event.target.dataset.todoId;
						UI.removeTodo(todoId);
					});
				});
		
				document.querySelectorAll('.due-date').forEach(dueDate => {
					dueDate.addEventListener('click', () => {
						const dateInput = document.createElement('input');
						dateInput.type = 'date';
						dateInput.valueAsDate = new Date(todo.dueDate);
	
						dateInput.addEventListener('change', () => {
							let input = dateInput.value;
							let dateEntered = new Date(input);
							todo.dueDate = UI.parseDate(dateEntered);
							Storage.saveProjects(projects);
							Storage.saveAllTodos(todos);
							UI.loadTodos(project.id);
							console.log('Projects after change: ', projects);
							console.log('Todos after change: ', todos);
						})
	
						dueDate.replaceWith(dateInput);
					})
				});
			});

			return;
		}

		if (todos) {
			if (date) {
				todos.forEach(todo => {
					if (todo.dueDate === date) {
						const todoElement = document.createElement('div');
						todoElement.classList.add('todo-item');
						todoElement.innerHTML = `
							<button class='check-todo' data-todo-id='${todo.id}'>Check</button>
							<strong>${todo.title}</strong>
							<p class='due-date'>${todo.dueDate}</p>
						`;
						todoContainer.appendChild(todoElement);
						
						document.querySelectorAll(".check-todo").forEach(button => {
							button.addEventListener("click", (event) => {
								const todoId = event.target.dataset.todoId;
								UI.removeTodo(todoId);
							});
						});

						const dueDate = document.querySelector('.due-date');
						const oldDate = todo.dueDate;
	
						document.querySelectorAll('.due-date').forEach(dueDate => {
							dueDate.addEventListener('click', () => {
								const dateInput = document.createElement('input');
								dateInput.type = 'date';
								dateInput.valueAsDate = new Date(todo.dueDate);
		
								dateInput.addEventListener('change', () => {
									let input = dateInput.value;
									let dateEntered = new Date(input);
									todo.dueDate = UI.parseDate(dateEntered);
									Storage.saveProjects(projects);
									Storage.saveAllTodos(todos);
									UI.loadTodos();
								})
		
								dueDate.replaceWith(dateInput);
							})
						});
					}
				})
			} else {
				todos.forEach(todo => {
					const todoElement = document.createElement('div');
					todoElement.classList.add('todo-item');
					todoElement.innerHTML = `
						<button class='check-todo' data-todo-id='${todo.id}'>Check</button>
						<strong>${todo.title}</strong>
						<p class='due-date'>${todo.dueDate}</p>
					`;
					todoContainer.appendChild(todoElement);

					document.querySelectorAll(".check-todo").forEach(button => {
						button.addEventListener("click", (event) => {
							const todoId = event.target.dataset.todoId;
							UI.removeTodo(todoId);
						});
					});
	
					document.querySelectorAll('.due-date').forEach(dueDate => {
						dueDate.addEventListener('click', () => {
							const dateInput = document.createElement('input');
							dateInput.type = 'date';
							dateInput.valueAsDate = new Date(todo.dueDate);
	
							dateInput.addEventListener('change', () => {
								let input = dateInput.value;
								let dateEntered = new Date(input);
								todo.dueDate = UI.parseDate(dateEntered);
								Storage.saveAllTodos(todos);
								UI.loadTodos();
							})
	
							dueDate.replaceWith(dateInput);
							dateInput.focus();
						})
					});
				})
			}
		}
	}

	static addTodo(title, projectName) {
		if (projectName) {
			const projects = Storage.getProjects();
			let project = projects.find(project => project.name === projectName);

			if (project) {
				const todo = new Todo(title, 'not set', 'normal');
				project.addTodo(todo);

				const todos = Storage.getAllTodos();
				todos.push(todo);
				
				Storage.saveProjects(projects);
				Storage.saveAllTodos(todos);
				UI.loadTodos(project.id);
				console.log(projects);
			}
			console.log('Projects after add: ', projects);
		} else {
			const todo = new Todo(title, 'not set', 'normal');
			const todos = Storage.getAllTodos();
			todos.push(todo);
			Storage.saveAllTodos(todos);
			UI.loadTodos();
		}
	}

	static removeTodo(todoId) {
    const projects = Storage.getProjects();
    console.log('Projects before remove: ', projects);
    let projectId = null;

    for (let project of projects) {
			if (project.todos && project.todos.some(todo => todo.id === todoId)) {
				projectId = project.id;
				break;
			}
    }

    if (projectId) {
			let project = projects.find(project => projectId === project.id);
			if (project) {
				project.removeTodo(todoId);
				Storage.saveProjects(projects);
				console.log('Projects after project todo remove: ', projects);
				UI.loadTodos(project.id);
			}
    }

    Storage.removeTodo(todoId);
    UI.loadTodos();
    console.log('Projects after global todo remove: ', projects);
	}

	static parseDate(date) {
		const months = {
			Jan: '01',
			Feb: '02',
			Mar: '03',
			Apr: '04',
			May: '05',
			Jun: '06',
			Jul: '07',
			Aug: '08',
			Sep: '09',
			Oct: '10',
			Nov: '11',
			Dec: '12',
		};
	
		date = date.toString().split(' ');
		const day = date[2];
		const month = months[date[1]];
		const year = date[3];

		// console.log(`${day}/${month}/${year}`);
		return `${day}/${month}/${year}`;
	}
}