import { UI } from "./modules/ui";

document.addEventListener('DOMContentLoaded', () => {
UI.setupUI();
UI.loadProjects();

	document.getElementById('addProjectBtn').addEventListener('click', () => {
		const projectName = prompt('Enter project name:');
		if (projectName) UI.addProject(projectName);
	})
})