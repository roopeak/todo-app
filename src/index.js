import './styles.css';
import { UI } from "./modules/ui";

document.addEventListener('DOMContentLoaded', () => {
	UI.setupUI();
	UI.loadProjects();
	UI.loadTodos();
})