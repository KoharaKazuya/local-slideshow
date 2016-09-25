import io = require("socket.io-client");

type MessageRoomJoined = {
  type: string;
  roomId: number;
};
type MessagePageControl = {
  type: string;
  action: string;
}
type Message = MessageRoomJoined | MessagePageControl;

export default class Receiver {
  private socket: SocketIOClient.Socket;
  private roomIdPromise: Promise<number>;
  private prevPageHandlers: Function[] = [];
  private nextPageHandlers: Function[] = [];

  constructor() {
    this.socket = io("/");

    this.roomIdPromise = new Promise((resolve) => {
      this.socket.on("message", (message: Message) => {
        if (message.type === "ROOM_JOINED") {
          resolve((message as MessageRoomJoined).roomId);
        }
        if (message.type === "PAGE_CONTROL") {
          const action = (message as MessagePageControl).action;
          if (action === "PREV") { this.prevPageHandlers.forEach(f => f()); };
          if (action === "NEXT") { this.nextPageHandlers.forEach(f => f()); };
        }
      });
    });

    this.socket.on("connect", () => {
      this.socket.send({ type: "NEW_ROOM" });
    });
  }

  public on(eventName: string, handler: Function) {
    if (eventName === "prevpage") {
      this.prevPageHandlers.push(handler);
    }
    if (eventName === "nextpage") {
      this.nextPageHandlers.push(handler);
    }
  }

  public async getRoomId(): Promise<number> {
    return await this.roomIdPromise;
  }
}
