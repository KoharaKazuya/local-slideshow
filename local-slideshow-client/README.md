# local-slideshow-client

## 使用技術

### 実行時

- `React`: 差分 DOM でリアクティブな UI 構築ライブラリ
- `ReactDOM`: React を DOM にぶちこむやつ
- `Redux`: Flux 実装
- `react-redux`: React + Redux を上手くやるやつ
- `react-router`: React で URL 毎に画面を切り替える (SPA)
- `react-router-redux`: react-router + Redux
- `redux-thunk`: Redux で非同期を扱える action creeator を作れるようにするためのミドルウェア
- `history`: react-router-redux の依存
- `qrcode-generator`: セットアップのため、QRCode を JS で生成する
- `PDF.js`: PDF をブラウザで表示する
- `pdf.js-controller`: PDF.js にページめくりの機能を追加したもの
- `SocketIO (Clinet)`: リアルタイム通信 (websocket など) 抽象化
- `Hammer.JS`: スマホでの操作イベント抽象化
- `screenfull.js`: フルスクリーン API を簡単に扱えるようにするための薄いラッパー

### 開発環境用

#### コア

- `TypeScript`: altJS
- `PostCSS`: altCSS
- `webpack`: モジュールバンドラ

#### 接続 (A + B)

- `awesome-typescript-loader`: webpack + TypeScript
- `postcss-loader`: webpack + PostCSS
- `css-loader`: webpack + CSS
- `mocha-webpack`: webpack + mocha

#### webpack 系

- `html-webpack-plugin`: HTML を出力するプラグイン (style-ext-html-webpack-plugin の依存)
- `extract-text-webpack-plugin`: バンドルの中からテキストをファイルに抽出する (CSS を抽出するため)
- `style-ext-html-webpack-plugin`: 抽出した CSS を Internal CSS 化する
- `style-loader`: バンドルされた CSS テキストを HTML 内に書き込むようにする (extract-text-webpack-plugin がファイル化するが、フォールバックとして使用する)
- `webpack-merge`: webpack 用各環境向け設定ファイル (/webpack/\*.conf.js) をマージするため
- `webpack-dev-server`: 開発時用のローカル HTTP サーバー
- `webpack-dashboard`: 開発時の webpack のコンソール出力を何かカッコよくする
- `bundle-loader`: Webpack バンドルの一部を Code Splitting して動的に読み込むため

#### CSS 系

- `autoprefixer`: ベンダープレフィクスを自動付与
- `postcss-import`: @import 文を使えるように
- `postcss-custom-properties`: 変数が使えるように

#### linter

- `tslint`: TypeScript 用 Linter
- `tslint-react`: React & JSX 用 Linter

#### テスト

- `mocha`: テストフレームワーク
