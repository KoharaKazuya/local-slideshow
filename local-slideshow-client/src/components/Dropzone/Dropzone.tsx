import * as React from "react";

const styles = require("./Dropzone.css");

interface Props {
  /**
   * (ドラッグアンドドロップ操作を実現するための) File API をサポートしていなかったときに、
   * メッセージ付きで通知されるためのコールバック
   */
  onFileAPINotSupport: (message: string) => void;
  /**
   * ファイルデータが読み込まれたときに呼び出されるコールバック
   */
  onFileChanged: (data: Uint8Array) => void;
}

interface State {
  /**
   * (ドラッグアンドドロップ操作を実現するための) File API をサポートしているかどうか
   */
  fileAPISupport: boolean;
  /**
   * ドラッグアンドドロップ操作中でマウスがこのコンポーネント上に乗っているか
   */
  dragover: boolean;
}

export class Dropzone extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      fileAPISupport: false,
      dragover: false,
    };
  }

  public componentDidMount() {
    this.checkFileAPISupport();
  }

  public render() {
    const isPageIconActive = this.state.fileAPISupport && this.state.dragover;
    return (
      <div
        className={ styles.dropzone }
        onDragOver={ (e) => this.onDragOver(e) }
        onDragLeave={ (e) => this.onDragLeave(e) }
        onDrop={ (e) => this.onDrop(e) }
      >
        <div className={ `${ styles.pageIcon } ${ isPageIconActive ? styles.active : "" }` }>
          <i className="material-icons">picture_as_pdf</i>
          <div>Drag your PDF file and drop here.</div>
        </div>
      </div>
    );
  }

  private checkFileAPISupport(): void {
    // Check for the various File API support.
    if (!File || !FileReader || !FileList || !Blob) {
      const message = "The File APIs are not fully supported in this browser.";
      this.props.onFileAPINotSupport(message);
      return;
    }
    this.setState({ fileAPISupport: true });
  }

  private onDragOver(e: React.DragEvent<Element>): void {
    e.stopPropagation();
    e.preventDefault();

    e.dataTransfer.dropEffect = "copy";
    this.setState({ dragover: true });
  }

  private onDragLeave(e: React.DragEvent<Element>): void {
    this.setState({ dragover: false });
  }

  private onDrop(e: React.DragEvent<Element>): void {
    e.stopPropagation();
    e.preventDefault();

    this.setState({ dragover: false });

    const files = e.dataTransfer.files;
    if (files.length === 0) { return; }
    const file = files[0];
    const fileReader = new FileReader();
    fileReader.onload = () => {
      const buf = new Uint8Array(fileReader.result);
      /*

      Redux Action に巨大データを含めると stringify の処理が重くなってしまうため、
      代わりにグローバル変数を用いてデータの受け渡しを行う

      */
      // this.props.onFileChanged(buf);
      (window as any)["__local-slideshow_slide-file-data__"] = buf;
      this.props.onFileChanged(new Uint8Array([]));
    };
    fileReader.readAsArrayBuffer(file);
  }
}
