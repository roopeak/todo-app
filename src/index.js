import './styles.css';
import { UI } from "./modules/ui";

document.addEventListener('DOMContentLoaded', () => {
	UI.setupUI();
	UI.loadProjects();

	document.getElementById('addProjectBtn').addEventListener('click', () => {
		const projectName = prompt('Enter project name:');
		if (projectName) UI.addProject(projectName);
	})

	document.getElementById('addTodoBtn').addEventListener('click', () => {
		const title = prompt('Enter task name:');

		UI.addTodo(title);
	})
})