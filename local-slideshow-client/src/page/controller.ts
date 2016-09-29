import ControllerPanel, { ControlEvent } from "../view/ControllerPanel";
import Sender from "../communication/sender";
import MessageDialog from "../view/MessageDialog";

function bootstrap(roomId: number) {
  const touchable = document.querySelector("#touchzone");
  const progress = touchable.querySelector("#auth-progress");
  const pageIcon = touchable.querySelector(".page-icon");
  touchable.classList.remove("inactive");

  const messageDialog = new MessageDialog();

  const sender = new Sender();
  sender.auth(roomId)
    .then(() => {
      const touchController = new ControllerPanel();
      touchController.on(ControlEvent.Prev, () => sender.prevPage());
      touchController.on(ControlEvent.Next, () => sender.nextPage());
    })
    .catch(() => {
      const message = "Failed to establish connection. Please retry.";
      messageDialog.showMessage(message);
    })
    ;

  sender.on("connect", () => {
      touchable.classList.add("active");
      progress.classList.remove("active");
      progress.classList.add("inactive");
      pageIcon.classList.add("active");
  });
  sender.on("disconnect", () => {
      touchable.classList.remove("active");
      progress.classList.remove("inactive");
      progress.classList.add("active");
      pageIcon.classList.remove("active");
  });
  sender.on("lost", () => {
    const message = "Failed to reconnect. Please retry to setup.";
    messageDialog.showMessage(message);
  });
}

export = { bootstrap };
