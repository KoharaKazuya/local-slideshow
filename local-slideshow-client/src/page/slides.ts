import { bootstrap as viewBootstrap } from "../view";
import SetupDialog from "../view/SetupDialog";
import MessageDialog from "../view/MessageDialog";
import Fullscreener from "../view/Fullscreener";
import Receiver from "../communication/receiver";

function bootstrap() {
  const controller = viewBootstrap();
  const receiver = new Receiver();

  receiver.on("prevpage", () => controller.pdfDoc && controller.prevPage());
  receiver.on("nextpage", () => controller.pdfDoc && controller.nextPage());

  const setupDialog = new SetupDialog();
  receiver.getRoomId().then(roomId => setupDialog.roomId = roomId);

  const messageDialog = new MessageDialog();

  // tslint:disable-next-line:no-unused-new
  new Fullscreener(messageDialog);
}

export = { bootstrap };
