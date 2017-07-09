/*

このアプリケーションの主要な機能な一覧となるナビゲーションバー

*/

import { connect } from "react-redux";
import { Toolbar as StatelessToolbar } from "./Toolbar";

import { RootState } from "../../modules";
import { notifySetupLink, notifyAlert, notifyTutorial } from "../../modules/notification";
import { startFullscreen } from "../../modules/slide";

const mapStateToProps = (state: RootState) => ({
  isSlideReady: state.slide.fileData instanceof Uint8Array,
});
const dispatchToProps = {
  onClickSetup: notifySetupLink,
  onClickFullscreen: startFullscreen,
  onClickTutorial: notifyTutorial,
  onNotify: notifyAlert,
};

export const Toolbar = connect(mapStateToProps, dispatchToProps)(StatelessToolbar);
