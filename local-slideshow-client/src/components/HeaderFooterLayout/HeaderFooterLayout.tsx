import * as React from "react";

const styles = require("./HeaderFooterLayout.css");

export interface Props {
  header?: React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode;
}

export const HeaderFooterLayout: React.StatelessComponent<Props> = (props: Props) => (
  <div className={ styles.container }>
    <div className={ styles.header }>{ props.header }</div>
    <div className={ styles.content }>{ props.children }</div>
    <div className={ styles.footer }>{ props.footer }</div>
  </div>
);
