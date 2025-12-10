import { Chip } from "../../interfaces/chip.interface";
import { Inventory } from "../../interfaces/inventory.interface";

export class InventoryComponent extends HTMLElement {
  private shadow = this.attachShadow({ mode: "open" });
  public inventory!: Inventory;
  public chip!: Chip;

  constructor() {
    super();

    this.loadInventory();
    this.connectedFiles();
  };

  async connectedFiles(): Promise<void> {
    const html = await fetch("./inventory.component.html")
      .then(res => res.text());

    const css = await fetch("./inventory.component.css")
      .then(res => res.text());

    this.shadow.innerHTML = `<style>${css}</style>${html}`;
  }

  async loadInventory(): Promise<Inventory> {
    try {
      const res = await fetch("/inventory");
      this.inventory = await res.json();

      console.log('Estoque completo:', this.inventory);
      console.log('Chips:', this.inventory.chips);
      console.log('Celulares:', this.inventory.cellPhones);
      console.log('Notebooks:', this.inventory.notebooks);
    } catch (err) {
      console.error('Erro ao carregar JSON:', err);
    }
    
    return this.inventory;
  }
}

customElements.define("inventory-component", InventoryComponent);