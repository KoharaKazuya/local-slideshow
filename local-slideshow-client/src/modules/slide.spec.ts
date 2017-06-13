import assert = require("assert");
import reducer, { addSlide, setSlideInfo, nextPage, prevPage } from "./slide";

describe("slide module", () => {
  describe("reducer", () => {
    describe("ADD_SLIDE action", () => {
      const fileData = new Uint8Array([1, 2, 3]);
      const action = addSlide(fileData);

      it("1 回だけの呼び出しだとエラーなし", () => {
        const ret = reducer(undefined, action);
        assert(ret.fileData === fileData);
      });

      it("2 回以上の呼び出しで例外", () => {
        const atonce = reducer(undefined, action);
        assert.throws(() => reducer(atonce, action));
      });
    });

    describe("SET_SLIDE_INFO action", () => {
      const action = setSlideInfo(100);

      it("ページ数が設定できる", () => {
        const ret = reducer(undefined, action);
        assert(ret.pageSize === 100);
      });

      it("ページ数に負の値を入れるとエラー", () => {
        assert.throws(() => reducer(undefined, setSlideInfo(-1)));
      });
    });

    describe("NEXT_PAGE action", () => {
      const action = nextPage();
      const state = reducer(undefined, setSlideInfo(10));

      it("次のページに進む", () => {
        const ret = reducer(state, action);
        assert(ret.page === 2);
      });

      it("最後のページ以降は進まない", () => {
        let s = state;
        for (let i = 0; i < 100; i += 1) {
          s = reducer(s, action);
        }
        assert(s.page === 10);
      });
    });

    describe("PREV_PAGE action", () => {
      const action = prevPage();
      const state = reducer(reducer(undefined, setSlideInfo(10)), nextPage());

      it("前のページに戻る", () => {
        const ret = reducer(state, action);
        assert(ret.page === 1);
      });

      it("最初のページ以降は戻らない", () => {
        const ret = reducer(reducer(state, action), action);
        assert(ret.page === 1);
      });
    });
  });
});
