import { Inventory } from "../../interfaces/inventory.interface";
import { Chip } from "../../interfaces/chip.interface";

export class InventoryComponent extends HTMLElement {
  private shadow = this.attachShadow({ mode: "open" });
  public inventory!: Inventory;
  public chip!: Chip;

  constructor() {
    super();
  };


  async connectedCallback() { // ciclo de vida do componente
    await this.connectedFiles();  // Inserir HTML e CSS no shadow
    this.startForms();              // Agora os elementos existem
    this.loadInventory();         // Pode buscar dados de API           
  }

  async connectedFiles(): Promise<void> {
    const html = await fetch("/components/inventory/inventory.component.html")
      .then(res => res.text());

    const css = await fetch("/components/inventory/inventory.component.css")
      .then(res => res.text());

    this.shadow.innerHTML = `<style>${css}</style>${html}`;
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
    const formChip = this.shadow.querySelector("#create-chip-form") as HTMLFormElement;
    

    if (!formChip) return;

    formChip.addEventListener("submit", async (event) => {
      event.preventDefault(); // Evita reload da página

      const chip: Chip = {
        model: (this.shadow.querySelector("#chip-model") as HTMLInputElement).value,
        ICCID: Number((this.shadow.querySelector("#chip-iccid") as HTMLInputElement).value),
        hlr: (this.shadow.querySelector("#chip-hlr") as HTMLInputElement).value,
        line: (this.shadow.querySelector("#chip-line") as HTMLInputElement).value,
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