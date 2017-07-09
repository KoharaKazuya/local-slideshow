/*

PDF をドラッグアンドドロップで指定できるエリア
ここの全てがドロップ可能エリアとなる

この要素があった場所に PDF 表示がされる想定だが、PDF スライドショーの仕事は
このコンポーネントは担当しない

*/

import { connect } from "react-redux";
import { Dropzone as StatelessDropzone } from "./Dropzone";

import { addSlide } from "../../modules/slide";
import { notifyAlert } from "../../modules/notification";

const dispatchToProps = {
  onFileAPINotSupport: notifyAlert,
  onFileChanged: addSlide,
};

export const Dropzone = connect(null, dispatchToProps)(StatelessDropzone);
