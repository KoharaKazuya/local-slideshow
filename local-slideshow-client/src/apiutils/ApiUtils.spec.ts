import { ApiUtilsClass } from "./ApiUtils";
import assert = require("assert");
import "socket.io-client";

describe("ApiUtils", () => {
  let handlers: Array<(_: any) => void>;
  let socket: SocketIOClient.Socket;

  beforeEach(() => {
    handlers = [];
    socket = {
      on(name: string, h: (_: any) => void) { handlers.push(h); },
      send(act: any) {
        if (act.type === "NEW_ROOM") {
          for (const handler of handlers) {
            handler({ type: "ROOM_JOINED",  payload: { roomId: 123 }, meta: {} });
          }
        }
      },
    } as any;
  });

  describe("subscribe", () => {
    it("通知を受け取れる", () => {
      const api = new ApiUtilsClass(socket);
      // TODO
    });
  });

  describe("requestNewRoom", () => {
    describe("Socket.IO が通信に成功する場合", () => {
      it("部屋 ID を返す", () => new Promise((resolve, reject) => {
        const api = new ApiUtilsClass(socket);
        api.subscribe((action, unsubscribe) => {
          action.type === "ROOM_JOINED" ? resolve() : reject();
          unsubscribe();
        });
        api.requestNewRoom();
      }));
    });
  });
});
