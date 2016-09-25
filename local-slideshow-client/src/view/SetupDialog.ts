export default class SetupDialog {
  constructor() {
    const setupButton = document.querySelector("#js-show-setup-modal-button");
    const dialog = document.querySelector("#setup-dialog");
    const backdrop = document.querySelector("#setup-dialog-backdrop");
    setupButton.addEventListener("click", () => {
      backdrop.classList.add("active");
      dialog.classList.add("active");
    });
    backdrop.addEventListener("click", () => {
      dialog.classList.remove("active");
      backdrop.classList.remove("active");
    });
  }

  set roomId(id: number) {
    const hrefWithoutPath = location.href.replace(/([^:/])\/.*$/, "$1");
    const href = `${ hrefWithoutPath }/#/controller/${ id }`;
    const link = document.querySelector("#control-link");
    link.textContent = href;
    link.setAttribute("href", href);

    // tslint:disable-next-line:no-unused-new
    new QRCode(document.querySelector("#setup-qrcode"), href);

    const progress = document.querySelector("#dialog-progress");
    progress.classList.remove("active");
  }
}
