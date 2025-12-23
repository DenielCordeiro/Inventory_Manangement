export class ChipModal {
  private modal: HTMLDialogElement | null;
  private openBtn: HTMLElement | null;
  private closeBtn: HTMLElement | null;

  constructor() {
    this.modal = document.getElementById("myModal") as HTMLDialogElement | null;
    this.openBtn = document.getElementById("openModalBtn");
    this.closeBtn = document.getElementById("closeModalBtn");

    this.init();
  }

  private init(): void {
    if (!this.modal || !this.openBtn || !this.closeBtn) {
      console.warn("Modal ou botões não encontrados no DOM");
      return;
    }

    // Abrir modal
    this.openBtn.addEventListener("click", () => {
      this.modal?.showModal();
    });

    // Fechar modal pelo botão
    this.closeBtn.addEventListener("click", () => {
      this.modal?.close();
    });

    // Fechar modal clicando fora (backdrop)
    this.modal.addEventListener("click", (event: MouseEvent) => {
      if (event.target === this.modal) {
        this.modal?.close();
      }
    });
  }
  
}
