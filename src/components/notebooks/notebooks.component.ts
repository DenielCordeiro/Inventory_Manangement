import { Notebook } from "../../interfaces/notebook.interface";

export class NotebooksComponent {
    notebooks: Notebook[] = [];

    constructor() {
        this.loadNotebooks();
    }

    async loadNotebooks(): Promise<void> {
        try {
            const response = await fetch('/src/assets/notebooks.json');
            this.notebooks = await response.json();
        } catch (error) {
            console.error('Error loading notebooks:', error);
        }
    }
}

new NotebooksComponent();