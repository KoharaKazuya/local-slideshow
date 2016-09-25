// tslint:disable:no-reference
/// <reference path="../node_modules/@types/screenfull/index.d.ts" />
/// <reference path="./require.d.ts" />
/// <reference path="./pdf.js-controller.d.ts" />
/// <reference path="./qrcode.d.ts" />
/// <reference path="./dialog-polyfill.d.ts" />
// tslint:enable

import "pdf.js-controller/css/pdf-slide.scss";
import "./index.scss";

const captured = location.href.match(/#([^?]*)/);
const path = captured && captured.length > 1 ? captured[1] : "";

// tslint:disable:no-var-requires
const controllerCaps = path.match(/^\/controller\/(\d+)$/);
if (controllerCaps && controllerCaps.length > 1) {
  const roomId = Number(controllerCaps[1]);
  require(["./page/controller"], () => {
    const page: any = require("./page/controller");
    page.bootstrap(roomId);
  });
} else {
  require(["./page/slides"], () => {
    const page: any = require("./page/slides");
    page.bootstrap();
  });
}
