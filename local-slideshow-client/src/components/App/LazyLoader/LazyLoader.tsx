import * as React from "react";

import { Loading } from "../../Loading";

interface Props {
  // 読み込み処理
  loader: (loadedCallback: (mod: any) => void) => void;
  // 描画処理
  render: (mod: any) => JSX.Element | null | false;
}

interface State {
  // 読み込み後モジュール
  mod: any;
}

export class LazyLoader extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      mod: null,
    };
  }

  public componentWillMount() {
    this.load(this.props);
  }

  public componentWillReceiveProps(nextProps: Props) {
    if (nextProps.loader !== this.props.loader) {
      this.load(nextProps);
    }
  }

  public render() {
    if (this.state.mod === null) {
      return <Loading />;
    } else {
      return this.props.render(this.state.mod);
    }
  }

  private load(props: Props): void {
    this.setState({
      mod: null,
    });

    props.loader((mod: any) => {
      this.setState({ mod });
    });
  }
}
