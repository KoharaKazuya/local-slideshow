import * as React from "react";

const styles = require("./Tutorial.css");

// tslint:disable-next-line:no-empty-interface
interface Props {
}

interface State {
  /**
   * チュートリアルの進行度合いを表すページ番号 (1 始まり)
   */
  pageNum: number;
}

export class Tutorial extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { pageNum: 1 };
  }

  public render() {
    const nextPageElem = (
      <div
        className={ styles.nextButton }
        onClick={ () => this.setState({ pageNum: this.state.pageNum + 1 }) }
      >
        NEXT
      </div>
    );
    switch (this.state.pageNum) {
      case 1:
        return (
          <div>
            <img src={ require("./images/tutorial-1.png") } width="256" height="240" />
            <div className={ styles.message }>Drag your PDF file into the screen for the slideshow.</div>
            { nextPageElem }
          </div>
        );
      case 2:
        return (
          <div>
            <img src={ require("./images/tutorial-2.png") } width="256" height="240" />
            <div className={ styles.message }>Click "Setup" button at the bottom of the screen.</div>
            { nextPageElem }
          </div>
        );
      case 3:
        return (
          <div>
            <img src={ require("./images/tutorial-3.png") } width="256" height="240" />
            <div className={ styles.message }>
              Open setup link on your smartphone. (QR code is useful to send the link to your smartphone)
            </div>
            { nextPageElem }
          </div>
        );
      case 4:
        return (
          <div>
            <img src={ require("./images/tutorial-4.png") } width="256" height="240" />
            <div className={ styles.message }>Control the slideshow by your swipes or taps.</div>
          </div>
        );
      default:
        throw new Error("Unknown page number on tutorial");
    }
  }
}
