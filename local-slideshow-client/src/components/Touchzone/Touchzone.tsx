import * as React from "react";
import Hammer = require("hammerjs");

const styles = require("./Touchzone.css");

interface Props {
  /**
   * ユーザーが "次へ" ジェスチャー入力をしたときに呼ばれる
   */
  onNext: () => void;
  /**
   * ユーザーが "前へ" ジェスチャー入力をしたときに呼ばれる
   */
  onPrev: () => void;
}

interface State {
  /**
   * (ユーザー入力のフィードバックのための) 発光中か
   */
  flashing: boolean;
}

export class Touchzone extends React.Component<Props, State> {
  private touchZoneElement: HTMLElement;
  private hammer: HammerManager;
  private flashTimer: number;

  constructor(props: Props) {
    super(props);

    this.state = { flashing: false };
  }

  public componentDidMount() {
    this.hammer = new Hammer(this.touchZoneElement, {
      recognizers: [
        [Hammer.Tap],
        [Hammer.Swipe, { direction: Hammer.DIRECTION_HORIZONTAL }],
      ],
    });

    this.hammer.on("tap",        this.next.bind(this));
    this.hammer.on("swipeleft",  this.next.bind(this));
    this.hammer.on("swiperight", this.prev.bind(this));
  }

  public componentWillUnmount() {
    this.hammer.destroy();
  }

  public render() {
    return (
      <div
        className={ styles.touchzone }
        ref={ (div) => {
          if (!div) { return; }
          this.touchZoneElement = div;
        } }
      >
        <div className={ `${ styles.pageIcon } ${ this.state.flashing ? styles.active : "" }` }>
          <i className="material-icons">touch_app</i>
          <div>Swipe to flip through slides.</div>
        </div>
      </div>
    );
  }

  private next(): void {
    this.props.onNext();
    this.flash();
  }

  private prev(): void {
    this.props.onPrev();
    this.flash();
  }

  private flash(): void {
    if (this.flashTimer) { clearTimeout(this.flashTimer); }
    this.setState({ flashing: true });
    this.flashTimer = window.setTimeout(() => this.setState({ flashing: false }), 100);
  }
}
