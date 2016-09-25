import io = require("socket.io-client");

type MessageRoomJoined = {
  type: string;
  roomId: number;
}

export default class Sender {
  private socket: SocketIOClient.Socket;

  constructor() {
    this.socket = io("/");
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

    return Promise.race([authenticatedPromise, timeoutPromise]);
  }

  public prevPage(): void {
    this.socket.send({ action: "PREV", type: "PAGE_CONTROL" });
  }

  public nextPage(): void {
    this.socket.send({ action: "NEXT", type: "PAGE_CONTROL" });
  }
}
