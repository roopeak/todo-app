import './styles.css';
import { UI } from "./modules/ui";

document.addEventListener('DOMContentLoaded', () => {
	UI.setupUI();
	UI.loadProjects();
	UI.loadTodos();

	document.getElementById('addProjectBtn').addEventListener('click', () => {
		const projectName = prompt('Enter project name:');
		if (projectName) UI.addProject(projectName);
	});

	document.getElementById('allTodosBtn').addEventListener('click', () => {
		UI.loadTodos();
	});

	document.getElementById('todayBtn').addEventListener('click', () => {
		const date = UI.parseDate(new Date());
		console.log(date)
		UI.loadTodos(null, date);
	});
})