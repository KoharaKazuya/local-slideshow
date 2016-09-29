import io = require("socket.io-client");
import { EventEmitter2 } from "eventemitter2";

type MessageRoomJoined = {
  type: string;
  roomId: number;
}

export default class Sender extends EventEmitter2 {
  private socket: SocketIOClient.Socket;

  constructor() {
    super();
    this.socket = io("/");

    this.socket.on("disconnect", () => this.emit("disconnect"));
    this.socket.on("reconnect", () => this.emit("connect"));
    this.socket.on("reconnect_failed", () => this.emit("lost"));
  }

  public auth(roomId: number): Promise<void> {
    const authenticatedPromise = new Promise((resolve, reject) => {
      this.socket.on("message", (message: MessageRoomJoined) => {
        if (message.type === "ROOM_JOINED") { resolve(); }
      });
      this.socket.send({ type: "JOIN_ROOM", roomId });
    });
    const timeoutPromise = new Promise((resolve, reject) => {
      setTimeout(reject, 10000);
    });

    return Promise.race([authenticatedPromise, timeoutPromise]).then(() => this.emit("connect"));
  }

  public prevPage(): void {
    this.socket.send({ action: "PREV", type: "PAGE_CONTROL" });
  }

  public nextPage(): void {
    this.socket.send({ action: "NEXT", type: "PAGE_CONTROL" });
  }
}
