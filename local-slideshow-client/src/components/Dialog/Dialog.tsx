import * as React from "react";

import { HeaderFooterLayout } from "../HeaderFooterLayout";

const styles = require("./Dialog.css");

export interface Props {
  /**
   * ダイアログの表示コンテンツ
   */
  children?: React.ReactNode;
  /**
   * ダイアログタイトル
   */
  title: string;
  /**
   * ダイアログが表示状態か
   */
  visible: boolean;
  /**
   * ダイアログを閉じる要求が発生したときに呼ばれる
   */
  onHideRequest?: () => void;
}

export const Dialog: React.StatelessComponent<Props> = (props: Props) => (
  <div className={ `${ styles.container } ${ props.visible ? styles.visible : "" }` }>
    <div
      className={ styles.backdrop }
      onClick={ props.onHideRequest }
    />
    <div className={ styles.dialog }>
      <header className={ styles.title }>{ props.title }</header>
      <main className={ styles.content }>
        { props.children }
      </main>
      <footer className={ styles.footer }>
        <div className={ styles.button} onClick={ props.onHideRequest }>OK</div>
      </footer>
    </div>
  </div>
);
