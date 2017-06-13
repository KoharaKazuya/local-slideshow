import { ThunkAction } from "redux-thunk";
import { FluxStandardAction } from "flux-standard-action";
import { ApiUtils, Event as ApiUtilsEvent } from "../apiutils/ApiUtils";

export type Action = RequestNewRoom | RoomJoined | RoomLeft;
interface RequestNewRoom extends FluxStandardAction<{}, {}> {
  type: "local-slideshow/room/NEW_ROOM_REQUESTED";
}
interface RoomJoined extends FluxStandardAction<{
  roomId: number;
}, {}> {
  type: "local-slideshow/room/ROOM_JOINED";
}
interface RoomLeft extends FluxStandardAction<{
  roomId: number;
}, {}> {
  type: "local-slideshow/room/ROOM_LEFT";
}

export type State = Readonly<{
  /**
   * 現在接続している部屋 ID
   * (接続していない場合は null)
   */
  joinedRoomId: number | null;
}>;
export const InitialState: State = {
  joinedRoomId: null,
};

export default function reducer(state: State = InitialState, action: Action): State {
  switch (action.type) {
    case "local-slideshow/room/ROOM_JOINED": {
      return Object.assign({}, state, {
        joinedRoomId: action.payload.roomId,
      });
    }
    case "local-slideshow/room/ROOM_LEFT": {
      return Object.assign({}, state, {
        joinedRoomId: null,
      });
    }
    default: {
      return state;
    }
  }
}

/**
 * 遠隔端末からの操作を受け付けるため、部屋を作る
 */
export function createRoom(): ThunkAction<void, void, { api: ApiUtils }> {
  return (dispatch, getState, { api }) => {
    dispatch({
      type: "local-slideshow/room/NEW_ROOM_REQUESTED",
      payload: {},
      meta: {},
    });
    api.subscribe((event: ApiUtilsEvent, unsubscribe: () => void) => {
      dispatch(Object.assign({}, event, {
        type: `local-slideshow/room/${ event.type }`,
      }));
    });
    api.requestNewRoom();
  };
}

/**
 * 遠隔操作を送信するため、部屋に入る
 */
export function joinRoom(roomId: number): ThunkAction<void, void, { api: ApiUtils }> {
  return (dispatch, getState, { api }) => {
    dispatch({
      type: "local-slideshow/room/JOIN_ROOM_REQUESTED",
      payload: {},
      meta: {},
    });
    api.requestJoinRoom(roomId);
  };
}
