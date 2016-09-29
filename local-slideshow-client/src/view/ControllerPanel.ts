import Hammer = require("hammerjs");

const recognizers: RecognizerTuple[] = [
  [Hammer.Tap],
  [Hammer.Swipe],
  [Hammer.Pinch],
];

export enum ControlEvent {
  Prev,
  Next,
}

export default class ControllerPanel {
  private hammer: HammerManager;
  private prevEventListeners: Function[] = [];
  private nextEventListeners: Function[] = [];

  constructor() {
    const touchable = document.querySelector("#touchzone") as HTMLElement;
    this.hammer = new Hammer(touchable, { recognizers });

    this.hammer.on("tap", () => this.emit(ControlEvent.Next));
    this.hammer.on("swiperight", () => this.emit(ControlEvent.Prev));
    this.hammer.on("swipeleft", () => this.emit(ControlEvent.Next));

    document.onkeydown = event => {
      if (event.shiftKey || event.ctrlKey || event.metaKey) {
        return;
      }

      const code = event.keyCode;
      if (code === 37) {  // LEFT
        event.preventDefault();
        this.emit(ControlEvent.Prev);
      } else if (code === 39) {  // RIGHT
        event.preventDefault();
        this.emit(ControlEvent.Next);
      }
    };
  }

  public on(eventName: ControlEvent, callback: Function): void {
    if (eventName === ControlEvent.Prev) { this.prevEventListeners.push(callback); }
    if (eventName === ControlEvent.Next) { this.nextEventListeners.push(callback); }
  }

  private emit(eventName: ControlEvent): void {
    if (eventName === ControlEvent.Prev) { this.prevEventListeners.forEach(f => f()); }
    if (eventName === ControlEvent.Next) { this.nextEventListeners.forEach(f => f()); }
  }
}
