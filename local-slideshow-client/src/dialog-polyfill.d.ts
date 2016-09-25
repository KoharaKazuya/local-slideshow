declare module 'dialog-polyfill' {

  const dialogPolyfill: {
    registerDialog: Function;
  };

  export = dialogPolyfill;
}

declare interface Element {
  showDialog: Function;
}
