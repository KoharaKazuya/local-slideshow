/*

子要素をフルスクリーン化する機能を与える

active プロパティでフルスクリーンの切り替えができるインターフェースを取っているが
ブラウザの API の仕様上、active={ true } に切り替える操作は
ユーザー入力による（同期的な）呼び出しでなければならない

```
<Fullscreen active={ trueOrFalse } onFullscreenStopped={ () => {...} }>
  <h2>Sample Target</h2>
  <p>Sample Content</p>
</Fullscreen>
```

*/

import { connect } from "react-redux";

import { notifyAlert } from "../../modules/notification";
import { Fullscreen as StatelessFullscreen } from "./Fullscreen";

interface Props {
  /**
   * フルスクリーン化中かどうか
   */
  active: boolean;
  /**
   * フルスクリーン化が終了されたときに呼ばれる
   */
  onFullscreenStopped: () => void;
}

const dispatchToProps = {
  onFullscreenAPINotSupport: notifyAlert,
};

export const Fullscreen =
  connect<void, typeof dispatchToProps, Props>(null, dispatchToProps)(StatelessFullscreen as any);
