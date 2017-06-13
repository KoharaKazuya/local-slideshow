import * as React from "react";

import { Touchzone } from "../Touchzone";
import { Loading } from "../Loading";

const styles = require("./Controller.css");

interface Props {
  /**
   * 初期化時
   */
  onDidMount?: () => void;
  /**
   * 遠隔操作用のコネクションが生きているか
   */
  connected: boolean;
}

export class Controller extends React.Component<Props> {
  public componentDidMount() {
    if (this.props.onDidMount) { this.props.onDidMount(); }
  }

  public render() {
    return this.props.connected ? <Touchzone /> : <Loading />;
  }
}
