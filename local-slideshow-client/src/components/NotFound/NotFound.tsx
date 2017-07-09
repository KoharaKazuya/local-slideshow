import * as React from "react";

import { Link } from "../Link";

const styles = require("./NotFound.css");

// tslint:disable-next-line:no-empty-interface
export interface Props {
}

export const NotFound: React.StatelessComponent<Props> = (props: Props) => (
  <div className={ styles.container }>
    <div className={ styles.hero }>
      <i className="material-icons">priority_high</i>
      <div>Page Not Found</div>
    </div>
    <div className={ styles.navigation }>
      <Link to="/">back to home</Link>
    </div>
  </div>
);
