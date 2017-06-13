import { FluxStandardAction } from "flux-standard-action";
import { ThunkAction } from "redux-thunk";
import { ApiUtils } from "../apiutils/ApiUtils";

export type Action = AddSlide | SetSlideInfo | NextPage | PrevPage | StartFullscreen | StopFullscreen;
interface AddSlide extends FluxStandardAction<{
  fileData: Uint8Array,
}, {}> {
  type: "local-slideshow/slide/ADD_SLIDE";
}
interface SetSlideInfo extends FluxStandardAction<{
  size: number;
}, {}> {
  type: "local-slideshow/slide/SET_SLIDE_INFO";
}
interface NextPage extends FluxStandardAction<{}, {}> {
  type: "local-slideshow/slide/NEXT_PAGE";
}
interface PrevPage extends FluxStandardAction<{}, {}> {
  type: "local-slideshow/slide/PREV_PAGE";
}
interface StartFullscreen extends FluxStandardAction<{}, {}> {
  type: "local-slideshow/slide/START_FULLSCREEN";
}
interface StopFullscreen extends FluxStandardAction<{}, {}> {
  type: "local-slideshow/slide/STOP_FULLSCREEN";
}

export type State = Readonly<{
  fileData: Uint8Array | null,
  page: number;
  pageSize: number;
  fullscreen: boolean;
}>;
export const InitialState: State = {
  fileData: null,
  page: 0,
  pageSize: 0,
  fullscreen: false,
};

export default function reducer(state: State = InitialState, action: Action): State {
  switch (action.type) {
    case "local-slideshow/slide/ADD_SLIDE": {
      if (state.fileData !== null) {
        throw new Error(`this action "${ action.type }" cannot be called twice`);
      }

      return Object.assign({}, state, {
        fileData: action.payload.fileData,
      });
    }
    case "local-slideshow/slide/SET_SLIDE_INFO": {
      if (action.payload.size < 0 ) {
        throw new Error(`set ${ action.payload.size } to page size because of negative value`);
      }
      return Object.assign({}, state, {
        page: 1,
        pageSize: action.payload.size,
      });
    }
    case "local-slideshow/slide/NEXT_PAGE": {
      return Object.assign({}, state, {
        page: Math.min(state.page + 1, state.pageSize),
      });
    }
    case "local-slideshow/slide/PREV_PAGE": {
      return Object.assign({}, state, {
        page: Math.max(state.page - 1, 1),
      });
    }
    case "local-slideshow/slide/START_FULLSCREEN": {
      if (!state.fileData) { return state; }
      return Object.assign({}, state, {
        fullscreen: true,
      });
    }
    case "local-slideshow/slide/STOP_FULLSCREEN": {
      return Object.assign({}, state, {
        fullscreen: false,
      });
    }
    default: {
      return state;
    }
  }
}

/**
 * スライドを追加する
 *
 * @param fileData スライドファイルのバイナリデータ
 */
export function addSlide(fileData: Uint8Array): AddSlide {
  return {
    type: "local-slideshow/slide/ADD_SLIDE",
    payload: { fileData },
    meta: {},
  };
}

/**
 * スライド情報の設定
 *
 * @param size スライドの全ページ数
 */
export function setSlideInfo(size: number): SetSlideInfo {
  return {
    type: "local-slideshow/slide/SET_SLIDE_INFO",
    payload: { size },
    meta: {},
  };
}

/**
 * スライドのページめくり
 */
export function nextPage(): NextPage {
  return {
    type: "local-slideshow/slide/NEXT_PAGE",
    payload: {},
    meta: {},
  };
}

/**
 * スライドのページもどし
 */
export function prevPage(): PrevPage {
  return {
    type: "local-slideshow/slide/PREV_PAGE",
    payload: {},
    meta: {},
  };
}

/**
 * スライドのページめくり
 */
export function nextPageRequest(): ThunkAction<void, void, { api: ApiUtils }> {
  return (dispatch, getState, { api }) => {
    api.requestNextPage();
  };
}

/**
 * スライドのページもどし
 */
export function prevPageRequest(): ThunkAction<void, void, { api: ApiUtils }> {
  return (dispatch, getState, { api }) => {
    api.requestPrevPage();
  };
}

/**
 * スライドのフルスクリーン化の開始
 */
export function startFullscreen(): StartFullscreen {
  return {
    type: "local-slideshow/slide/START_FULLSCREEN",
    payload: {},
    meta: {},
  };
}

/**
 * スライドのフルスクリーン化の終了
 */
export function stopFullscreen(): StopFullscreen {
  return {
    type: "local-slideshow/slide/STOP_FULLSCREEN",
    payload: {},
    meta: {},
  };
}
