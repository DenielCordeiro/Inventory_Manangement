import { Inventory } from "../../interfaces/inventory.interface";
import { Chip } from "../../interfaces/chip.interface";

export class InventoryComponent extends HTMLElement {
  public inventoryHTML: HTMLElement = this;
  public inventory!: Inventory;
  public chip!: Chip
  public menuToggleButton: boolean = false; 

  constructor() {
    super();
  };

  async connectedCallback() { // ciclo de vida do componente
    await this.connectedFiles(); // Inserir HTML e CSS no shadow
    this.startForms(); // Agora os elementos existem
    this.loadInventory();  // Pode buscar dados de API   
    this.toggleMenu(); // Menu lateral      
  }

  public toggleMenu(): void {
  }

  async connectedFiles(): Promise<void> {
    const html = await fetch("/components/inventory/inventory.component.html")
      .then(res => res.text());

    const inventoryCss = await fetch("/components/inventory/inventory.component.css")
      .then(res => res.text());

    const menuCss = await fetch("/components/side_menu/side_menu.component.css")
      .then(res => res.text());

    this.inventoryHTML.innerHTML = `
      <style>${inventoryCss}</style>
      <style>${menuCss}</style>
      ${html}
    `;
  }

  async loadInventory(): Promise<Inventory> {
    try {
      const res = await fetch("/inventory");
      this.inventory = await res.json();
    } catch (err) {
      console.error('Erro ao carregar JSON:', err);
    }
    
    return this.inventory;
  }

  async startForms(): Promise<void> {
  const formChip = this.inventoryHTML.querySelector("#create-chip-form") as HTMLFormElement;

  if (!formChip) return;

  formChip.addEventListener("submit", async (event) => {
    event.preventDefault();

    const chip: Chip = {
      model: (this.inventoryHTML.querySelector("#chip-model") as HTMLInputElement).value,
      ICCID: Number((this.inventoryHTML.querySelector("#chip-iccid") as HTMLInputElement).value),
      hlr: (this.inventoryHTML.querySelector("#chip-hlr") as HTMLInputElement).value,
      line: (this.inventoryHTML.querySelector("#chip-line") as HTMLInputElement).value,
    };

    await this.createChip(chip);
    formChip.reset();
  });
}


  async createChip(chip: Chip): Promise<Chip> {
    console.log("Creating chip:", chip);
    
    return chip;
  }
}

customElements.define("inventory-component", InventoryComponent);