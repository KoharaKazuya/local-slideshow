import assert = require("assert");

import reducer, { notifyAlert, popNotification, NotificationAlert } from "./notification";

describe("notification module", () => {
  describe("reducer", () => {
    describe("PUSH_NOTIFICATION action", () => {
      const action = notifyAlert("Test");

      it("初回の呼び出しで一つだけの通知になる", () => {
        const ret = reducer(undefined, action);
        assert(ret.length === 1);
        assert(ret[0].type === "NotificationAlert");
        assert((ret[0] as NotificationAlert).message === "Test");
      });

      it("複数回の呼び出しで連結される", () => {
        const ret = reducer(reducer(undefined, action), action);
        assert(ret.length === 2);
      });
    });

    describe("POP_NOTIFICATION action", () => {
      const action = popNotification();

      it("POP できないときはないもしない", () => {
        const ret = reducer(undefined, action);
        assert(ret.length === 0);
      });

      it("Notification を先頭から一つ減らす", () => {
        const twoAlert = reducer(reducer(undefined, notifyAlert("1")), notifyAlert("2"));
        const ret = reducer(twoAlert, popNotification());
        assert(ret.length === 1);
        assert((ret[0] as NotificationAlert).message === "2");
      });
    });
  });
});
