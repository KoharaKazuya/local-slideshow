import * as React from "react";
import * as screenfull from "screenfull";

const styles = require("./Fullscreen.css");

export interface Props {
  /**
   * フルスクリーン化中かどうか
   */
  active: boolean;
  /**
   * フルスクリーン化が終了されたときに呼ばれる
   */
  onFullscreenStopped: () => void;
  /**
   * フルスクリーン API に対応していない場合に呼ばれる
   */
  onFullscreenAPINotSupport?: (message: string) => void;
}

export class Fullscreen extends React.Component<Props> {
  private elem: HTMLElement | null;

  public componentDidMount() {
    screenfull.onchange(() => {
      if (!screenfull.isFullscreen) { this.props.onFullscreenStopped(); }
    });
  }

  public componentDidUpdate(prevProps: Readonly<Props>) {
    if (prevProps.active === this.props.active) { return; }
    if (this.props.active && !screenfull.enabled) {
      if (this.props.onFullscreenAPINotSupport) {
        const message = "Fullscreen API not supported. Please use the latest version browsers.";
        this.props.onFullscreenAPINotSupport(message);
      }
      this.props.onFullscreenStopped();
      return;
    }
    if (!this.elem) {
      this.props.onFullscreenStopped();
      return;
    }

    if (this.props.active) {
      screenfull.request(this.elem);
    } else {
      screenfull.exit();
    }
  }

  public render() {
    return (
      <div ref={ (div) => this.elem = div }>
        { this.props.children }
      </div>
    );
  }
}
