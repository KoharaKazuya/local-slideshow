import io = require("socket.io-client");

/**
 * Web API の責任を持つ
 * リモートのサーバーに対してのクエリ、コマンドは全てこの層で抽象化される
 */
export interface ApiUtils {
  /**
   * 通信完了や接続が切れたときなど、状態変更があった場合に通知先として呼ばれる関数を登録する
   */
  subscribe: (f: Listener) => void;
  /**
   * 新規の (遠隔操作端末と接続するための) 部屋を作成するリクエストを送る
   */
  requestNewRoom: () => void;
  /**
   * 既存の (遠隔操作端末と接続するための) 部屋に参加するリクエストを送る
   */
  requestJoinRoom: (roomId: number) => void;
  /**
   * 次のページのリクエストを送る
   */
  requestNextPage: () => void;
  /**
   * 前のページのリクエストを送る
   */
  requestPrevPage: () => void;
}

type Listener = (action: Event, unsubscribe: () => void) => void;

interface MessageRoomJoined {
  type: "ROOM_JOINED";
  payload: {
    roomId: number;
  };
  meta: {};
}
interface MessageNextPage {
  type: "NEXT_PAGE";
  payload: {};
  meta: {};
}
interface MessagePrevPage {
  type: "PREV_PAGE";
  payload: {};
  meta: {};
}
type Message = MessageRoomJoined | MessageNextPage | MessagePrevPage;
interface EventRoomLeft {
  type: "ROOM_LEFT";
  payload: {};
  meta: {};
}
export type Event = Message | EventRoomLeft;

/**
 * ApiUtil 実装
 */
export class ApiUtilsClass implements ApiUtils {
  private listeners: Listener[];
  private roomId: number;

  constructor(private socket: SocketIOClient.Socket) {
    this.listeners = [];
    this.socket.on("message",    this.onMessage.bind(this));
    this.socket.on("disconnect", this.onDisconnect.bind(this));
    this.socket.on("reconnect",  this.onReconnect.bind(this));
  }

  public subscribe(f: Listener): void {
    this.listeners.push(f);
  }

  public requestNewRoom(): void {
    this.socket.send({ type: "NEW_ROOM" });
  }

  public requestJoinRoom(roomId: number): void {
    this.socket.send({ type: "JOIN_ROOM", payload: { roomId } });
  }

  public requestNextPage(): void {
    this.socket.send({ type: "NEXT_PAGE_REQUEST" });
  }

  public requestPrevPage(): void {
    this.socket.send({ type: "PREV_PAGE_REQUEST" });
  }

  private notify(action: Event): void {
    const unsubscribers: Listener[] = [];
    for (const f of this.listeners) {
      f(action, () => unsubscribers.push(f));
    }
    this.listeners = this.listeners.filter((f) => {
      for (const u of unsubscribers) {
        if (f === u) { return false; }
      }
      return true;
    });
  }

  private onMessage(message: Message): void {
    this.notify(message);
    if (message.type === "ROOM_JOINED") {
      this.roomId = message.payload.roomId;
    }
  }

  private onDisconnect(): void {
    this.notify({
      type: "ROOM_LEFT",
      payload: {},
      meta: {},
    });
  }

  private onReconnect(): void {
    if (!this.roomId) { return; }
    this.requestJoinRoom(this.roomId);
  }
}
