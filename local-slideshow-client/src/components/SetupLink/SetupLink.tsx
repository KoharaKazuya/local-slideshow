import * as React from "react";
import qrcode_converter from "./qrcode_converter";

import { Link } from "../Link";

const styles = require("./SetupLink.css");

export interface Props {
  /**
   * セットアップリンク (フルの URL)
   */
  href: string;
}

export const SetupLink: React.StatelessComponent<Props> = (props) => (
  <div>
    <Link to={ props.href }>{ props.href }</Link>
    <img className={ styles.qrcode } src={ qrcode_converter(props.href) } />
    <div>
      Open this link on your smartphone.
      Also you can open the link by <Link to="https://en.wikipedia.org/wiki/QR_code">QR code</Link>.
    </div>
  </div>
);
