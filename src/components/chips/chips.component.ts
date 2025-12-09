import { Chip } from "../../interfaces/chip.interface";

export class ChipsComponent extends HTMLElement {
  private shadow = this.attachShadow({ mode: "open" });
  public chips: Chip[] = [];
  public chip!: Chip;

  constructor() {
    super();

    this.loadChips();
  };

  async connectedFiles(): Promise<void> {
    const html = await fetch("components/chips/chips.component.html")
      .then(res => res.text());

    const css = await fetch("components/chips/chips.component.css")
      .then(res => res.text());

    this.shadow.innerHTML = `<style>${css}</style>${html}`;
  }

  async loadChips(): Promise<Chip[]> {
    try {
      const res = await fetch("/chips");
      this.chips = await res.json();
    } catch (err) {
      console.error('Erro ao carregar JSON:', err);
    }
    
    return this.chips;
  }

  async createChip(chip: Chip): Promise<Chip> {
    this.chips.push(chip);

    try {
      await fetch("/chips", {
        method: "POST",
        body: JSON.stringify(this.chips),
        headers: { "Content-Type": "application/json" }
      });

    } catch (err) {
      console.error('Erro ao carregar chips antes de criar novo chip:', err);
    }
  
    return chip;
  }
}

customElements.define("chips-component", ChipsComponent);