import { Inventory } from "../../interfaces/inventory.interface";
import { Chip } from "../../interfaces/chip.interface";

export class InventoryComponent extends HTMLElement {
  public inventoryHTML: HTMLElement = this;
  public inventory!: Inventory;
  public chip!: Chip
  public menuToggleButton: boolean = false;
  public chipScreen: boolean = true;
  public cellphoneScreen: boolean = false;
  public notebookScreen: boolean = false;
  public currentTopic!: string;

  constructor() {
    super();
  };

  async connectedCallback() { // ciclo de vida do componente
    await this.connectedFiles(); // Carregar HTML e CSS
    this.startForms(); // Agora os elementos existem
    this.loadInventory();  // Pode buscar dados de API 
    this.toggleMenu(); // Ouvir clique no botão do menu    
    this.switchTopics();
  }

  switchTopics(): void {
    const screens = [
      { id: "chip-screen", topic: "chip" },
      { id: "cellphone-screen", topic: "cellphone" },
      { id: "notebook-screen", topic: "notebook" },
    ] as const;

    screens.forEach(({ id, topic }) => {
      const element = this.inventoryHTML.querySelector(`#${id}`) as HTMLElement;

      if (!element) {
        console.error(`Elemento não encontrado: #${id}`);
        return;
      }

      element.addEventListener("click", (event) => {
        event.stopPropagation();

        this.currentTopic = topic; 
        this.updateScreen();
      });
    });
  }

  updateScreen(): void {
    this.chipScreen = false;
    this.cellphoneScreen = false;
    this.notebookScreen = false;

    switch (this.currentTopic) {
      case "chip":
        this.chipScreen = true;
        break;

      case "cellphone":
        this.cellphoneScreen = true;
        break;

      case "notebook":
        this.notebookScreen = true;
        break;
    }

    console.log("página atual:", this.currentTopic);
  }


  public toggleMenu(): void {
    const toggle = this.inventoryHTML.querySelector("#menu-toggle") as HTMLElement;
    const sideMenu = this.inventoryHTML.querySelector(".side-menu") as HTMLElement;

    if (!toggle || !sideMenu) return;

    // Abrir / fechar menu
    toggle.addEventListener("click", (event) => {
      event.stopPropagation(); // impede conflito com click fora
      sideMenu.classList.toggle("open");
    });

    // Fechar ao clicar fora
    document.addEventListener("click", (event) => {
      if (
        sideMenu.classList.contains("open") &&
        !sideMenu.contains(event.target as Node) &&
        !toggle.contains(event.target as Node)
      ) {
        sideMenu.classList.remove("open");
      }
    });
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