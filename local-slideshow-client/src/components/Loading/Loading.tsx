import * as React from "react";

const styles = require("./Loading.css");

export const Loading: React.StatelessComponent<{}> = (props) => (
  <div className={ styles.progress }>
    <div className={ styles.progressBar } />
  </div>
);
