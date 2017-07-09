import * as React from "react";

import { Dialog } from "../Dialog";
import { HeaderFooterLayout } from "../HeaderFooterLayout";
import { Slideshow } from "../Slideshow";
import { Dropzone } from "../Dropzone";
import { Toolbar } from "../Toolbar";
import { SetupLink } from "../SetupLink";
import { Loading } from "../Loading";
import { Fullscreen } from "../Fullscreen";
import { Tutorial } from "../Tutorial";

const styles = require("./Home.css");

export interface Props {
  /**
   * 初期化時
   */
  onDidMount?: () => void;
  /**
   * スライドのデータが与えられたか
   */
  hasSlideData: boolean;
  /**
   * スライドがフルスクリーン状態か
   */
  isSlideFullscreen: boolean;
  /**
   * スライドのフルスクリーン状態が終了したときに呼ばれる
   */
  onSlideFullscreenStopped: () => void;
  /**
   * アラートメッセージ (表示が必要なければ null)
   */
  alertMessage: string | null;
  /**
   * セットアップリンクダイアログが表示状態か
   */
  setupLinkVisibility: boolean;
  /**
   * チュートリアルダイアログが表示状態か
   */
  tutorialVisibility: boolean;
  /**
   * ダイアログを閉じるように入力されたときに呼ばれる
   */
  onDialogCloseRequest: () => void;
  /**
   * 参加している部屋 ID
   */
  roomId: number | null;
}

export class Home extends React.Component<Props> {
  public componentDidMount() {
    if (this.props.onDidMount) { this.props.onDidMount(); }
  }

  public render() {
    const dialog = (() => {
      if (this.props.alertMessage) {
        return (
          <Dialog
            title="Note"
            visible={ true }
            onHideRequest={ this.props.onDialogCloseRequest }
          >
            <div>{ this.props.alertMessage }</div>
          </Dialog>
        );
      }
      if (this.props.setupLinkVisibility) {
        return (
          <Dialog
            title="Setup Link"
            visible={ true }
            onHideRequest={ this.props.onDialogCloseRequest }
          >
            { this.props.roomId === null
              ? <Loading />
              : <SetupLink href={ `${ window.location.origin }/controller/${ this.props.roomId }` } /> }
          </Dialog>
        );
      }
      if (this.props.tutorialVisibility) {
        return (
          <Dialog
            title="Tutorial"
            visible={ true }
            onHideRequest={ this.props.onDialogCloseRequest }
          >
            <Tutorial />
          </Dialog>
        );
      }
      return <Dialog title="" visible={ false } />;
    })();

    return (
      <div>
        <HeaderFooterLayout
          footer={ <Toolbar /> }
        >
          { this.props.hasSlideData ?
            <Fullscreen
              active={ this.props.isSlideFullscreen }
              onFullscreenStopped={ this.props.onSlideFullscreenStopped }
            >
              <Slideshow />
            </Fullscreen> :
            <Dropzone /> }
        </HeaderFooterLayout>
        { dialog }
      </div>
    );
  }
}
