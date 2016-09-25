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
      touchable.classList.add("active");
      progress.classList.remove("active");
      progress.classList.add("inactive");
      pageIcon.classList.add("active");

      const touchController = new ControllerPanel();
      touchController.on(ControlEvent.Prev, () => sender.prevPage());
      touchController.on(ControlEvent.Next, () => sender.nextPage());
    })
    .catch(() => {
      const message = "Failed to establish connection. Please retry.";
      messageDialog.showMessage(message);
    })
    ;
}

export = { bootstrap };
