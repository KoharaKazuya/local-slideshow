/*

ホーム画面 (スライドやフッターのコントロールパネルなど)

*/

import { connect } from "react-redux";
import { Home as StatelessHome } from "./Home";

import { RootState } from "../../modules";
import { createRoom } from "../../modules/room";
import { popNotification } from "../../modules/notification";
import { stopFullscreen } from "../../modules/slide";

const mapStateToProps = (rootState: RootState) => {
  let alertMessage: string | null = null;
  let setupLinkVisibility: boolean = false;
  let tutorialVisibility: boolean = false;
  if (rootState.notification.length > 0) {
    const latestNotification = rootState.notification[0];
    if (latestNotification.type === "NotificationAlert") {
      alertMessage = latestNotification.message;
    }
    if (latestNotification.type === "NotificationSetupLink") {
      setupLinkVisibility = true;
    }
    if (latestNotification.type === "NotificationTutorial") {
      tutorialVisibility = true;
    }
  }

  return {
    hasSlideData: rootState.slide.fileData instanceof Uint8Array,
    alertMessage,
    setupLinkVisibility,
    tutorialVisibility,
    roomId: rootState.room.joinedRoomId,
    isSlideFullscreen: rootState.slide.fullscreen,
  };
};
const dispatchToProps = {
  onDidMount: createRoom,
  onDialogCloseRequest: popNotification,
  onSlideFullscreenStopped: stopFullscreen,
};

export const Home = connect(mapStateToProps, dispatchToProps)(StatelessHome);
