import { Cellphone } from '../../interfaces/cellphone.interface';

export class CellphonesComponent {
    cellphones: Cellphone[] = [];

    constructor() {
        this.loadData();    
    }

    async loadData() {
        try {
            const response = await fetch('/src/assets/cellphones.json'); 
            this.cellphones = await response.json();
        } catch (err) {
            console.error('Erro ao carregar JSON:', err);
        }
    }
}

new CellphonesComponent();