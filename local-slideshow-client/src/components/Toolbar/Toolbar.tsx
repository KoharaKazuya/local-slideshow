import * as React from "react";

const styles = require("./Toolbar.css");

export interface Props {
  /**
   * スライドが使用可能状態か
   */
  isSlideReady: boolean;
  /**
   * セットアップ ボタンをクリックした時に呼ばれる
   */
  onClickSetup: () => void;
  /**
   * フルスクリーン ボタンをクリックした時に呼ばれる
   */
  onClickFullscreen: () => void;
  /**
   * チュートリアル ボタンをクリックした時に呼ばれる
   */
  onClickTutorial: () => void;
  /**
   * 通知メッセージが発生した時
   */
  onNotify: (message: string) => void;
}

export const Toolbar: React.StatelessComponent<Props> = (props: Props) => (
  <div className={ styles.toolbar }>
    <a className={ styles.toolbarButton } onClick={ props.onClickSetup }>
      <i className="material-icons">phonelink_setup</i>
      <div>Setup</div>
    </a>
    <a
      className={ styles.toolbarButton }
      onClick={ () => props.isSlideReady ?
        props.onClickFullscreen() : props.onNotify("Drop and drop your PDF file into screen first.") }
    >
      <i className="material-icons">settings_overscan</i>
      <div>Fullscreen</div>
    </a>
    <a className={ styles.toolbarButton } onClick={ props.onClickTutorial }>
      <i className="material-icons">live_help</i>
      <div>Tutorial</div>
    </a>
    <a className={ styles.toolbarButton } href="/">
      <i className="material-icons">clear</i>
      <div>Reset</div>
    </a>
  </div>
);
