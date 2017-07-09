/*

ハイパーリンクを提供する
通常、HTML a タグで表現されるものをこのアプリ用にカスタマイズしたもの

@prop to リンク先 URL
         指定が相対パスか絶対パスかでクリック時の挙動が変わり、
         相対パスの場合は、history API による HTTP リクエストのない画面遷移
         絶対パスの場合は target="_blank" による別タブ表示

## 例

```html
<Link to="/about">このページは？</Link>
```

*/

import { connect } from "react-redux";
import { push } from "react-router-redux";

import { Link as StatelessLink, Props as LinkProps } from "./Link";

interface Props {
  /**
   * リンク先 URL
   */
  to: string;
}

const dispatchToProps: {
  onClick?: (target: string) => void;
} = {
  onClick: push,
};

export const Link = connect<void, typeof dispatchToProps, Props>(null as any, dispatchToProps as any)(StatelessLink);
