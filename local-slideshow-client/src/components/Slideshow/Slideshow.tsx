import * as React from "react";
import PDFController = require("pdf.js-controller");

const styles = require("./Slideshow.css");

/**
 * スライドデータの情報
 */
export interface SlideProps {
  /**
   * スライドの全ページ数
   */
  numOfPages: number;
}

export enum ArrowKeyDirection {
  LEFT = 37, UP = 38, RIGHT = 39, DOWN = 40,
}

export interface Props {
  /**
   * スライドのデータ
   */
  slideFileData: Uint8Array | null;
  /**
   * スライドのデータが読み込まれたら呼ばれる
   */
  onSlideReady?: (props: SlideProps) => void;
  /**
   * スライドのページ
   */
  page: number;
  /**
   * 矢印キーが押されたら呼ばれる
   */
  onArrowKeyPress?: (key: ArrowKeyDirection) => void;
}

export class Slideshow extends React.Component<Props> {

  private container: HTMLElement | undefined;
  private pdfController: PDFController;
  private slideLoaded: boolean = false;

  public componentDidMount() {
    this.initPDFController();
    this.addKeyEventListener();
  }

  public componentWillReceiveProps(nextProps: Readonly<Props>) {
    if (this.slideLoaded) {
      this.pdfController.renderPage(nextProps.page).then(() => {
        this.pdfController.pageNum = nextProps.page;
      });
    }
  }

  public shouldComponentUpdate() {
    return false;
  }

  public render() {
    return (
      <div
        ref={ (div) => {
          if (!div) { return; }
          this.container = div;
        } }
      />
    );
  }

  private initPDFController(): void {
    if (!this.pdfController && this.container) {
      this.pdfController = new PDFController({
        container: this.container,
      });
      window.addEventListener("resize", () => this.pdfController.fitItSize());
    }
    if (this.pdfController && !this.slideLoaded) {
      this.slideLoaded = true;
      /*

      Redux Action に巨大データを含めると stringify の処理が重くなってしまうため、
      代わりにグローバル変数を用いてデータの受け渡しを行う

      */
      // this.pdfController.loadDocument(this.props.slideFileData);
      this.pdfController
        .loadDocument((window as any)["__local-slideshow_slide-file-data__"])
        .then(() => this.props.onSlideReady && this.props.onSlideReady({
          numOfPages: this.pdfController.pdfDoc.numPages,
        }))
        ;
    }
  }

  private addKeyEventListener(): void {
    document.onkeydown = (event) => {
      if (event.shiftKey || event.ctrlKey || event.metaKey) {
        return;
      }
      if (!(event.keyCode in ArrowKeyDirection)) {
        return;
      }

      event.preventDefault();
      if (!this.props.onArrowKeyPress) { return; }
      this.props.onArrowKeyPress(event.keyCode);
    };
  }
}
