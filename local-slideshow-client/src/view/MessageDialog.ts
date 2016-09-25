export default class MessageDialog {
  private dialog: Element;
  private backdrop: Element;

  constructor() {
    this.dialog = document.querySelector("#message-dialog");
    this.backdrop = document.querySelector("#message-dialog-backdrop");

    this.backdrop.addEventListener("click", () => {
      this.dialog.classList.remove("active");
      this.backdrop.classList.remove("active");
    });
  }

  public showMessage(message: string) {
    this.backdrop.classList.add("active");
    this.dialog.classList.add("active");

    const content = this.dialog.querySelector(".dialog-content");
    content.textContent = message;
  }
}
