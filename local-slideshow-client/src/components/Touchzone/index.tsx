/*

スマホ端末でユーザーのジェスチャー入力を受け付ける

*/

import { connect } from "react-redux";
import { Touchzone as StatelessTouchzone } from "./Touchzone";

import { nextPageRequest, prevPageRequest } from "../../modules/slide";

const dispatchToProps = {
  onNext: nextPageRequest,
  onPrev: prevPageRequest,
};

export const Touchzone = connect(null, dispatchToProps)(StatelessTouchzone);
