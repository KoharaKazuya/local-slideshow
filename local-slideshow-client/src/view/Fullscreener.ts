import MessageDialog from "./MessageDialog";

export default class Fullscreener {
  constructor(messageDialog: MessageDialog) {
    const slides = document.querySelector("#slides");
    const button = document.querySelector("#js-fullscreen-button");
    button.addEventListener("click", event => {
      event.preventDefault();
      event.stopPropagation();

      if (!screenfull.enabled) {
        const message = "Fullscreen API not supported. Please use the latest version browsers.";
        console.error(message);
        messageDialog.showMessage(message);
        return;
      }

      // TODO: 判定方法の変更 DOM 経由はよくない
      const dropzone = document.querySelector("#dropzone");
      if (dropzone.classList.contains("active")) {
        messageDialog.showMessage("Drop and drop your PDF file into screen first.");
        return;
      }

      slides.addEventListener(screenfull.raw.fullscreenerror, err => {
        messageDialog.showMessage("Fail to fullscreen");
        console.error(err);
      });
      screenfull.request(slides);
    });
  }
}
