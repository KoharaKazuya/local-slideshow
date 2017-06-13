import * as React from "react";

const styles = require("./Link.css");

export interface Props {
  /**
   * リンク先ターゲット URL
   */
  to: string;
  /**
   * リンククリック時に呼ばれる (内部リンクのときのみ)
   */
  onClick?: (target: string) => void;
}

export const Link: React.StatelessComponent<Props> = ({ children, to, onClick }) => {
  const isExternalTarget = /^([^:/]*:)?\/\//.test(to);
  if (isExternalTarget) {
    return <a className={ styles.link } href={ to } target="_blank">{ children }</a>;
  } else {
    return <a className={ styles.link } onClick={ () => onClick && onClick(to) }>{ children }</a>;
  }
};
