import assert = require("assert");
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import { Action } from "./";
import reducer, { createRoom } from "./room";

describe("room module", () => {

  describe("action creators", () => {
    const store = createStore(reducer, applyMiddleware(
      thunk.withExtraArgument({}),
    ));

    describe("createRoom", () => {
      it("呼び出すと、REQUEST_NEW_ROOM ROOM_JOINED が順に発行される", () => new Promise((resolve, reject) => {
        function* genDispatch(): IterableIterator<void> {
          const act1 = yield;
          if (act1.type !== "local-slideshow/room/NEW_ROOM_REQUESTED") { return reject(act1); }
          const act2 = yield;
          if (act2.type !== "local-slideshow/room/ROOM_JOINED") { return reject(act2); }
          return resolve();
        }
        const dispatch = (genDispatch()).next;
        dispatch();

        type Listener = (action: { type: string }, unsubscribe: () => void) => void;
        let listener: Listener;
        createRoom()(dispatch, () => undefined, { api: {
          subscribe(f: Listener) {
            listener = f;
          },
          requestNewRoom() {
            listener({ type: "ROOM_JOINED" }, () => undefined);
          },
        } as any });
      }));
    });
  });
});
