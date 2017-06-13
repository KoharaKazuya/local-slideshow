import { combineReducers } from "redux";
import { FluxStandardAction } from "flux-standard-action";

import slide, { State as SlideState, Action as SlideAction } from "./slide";
import notification, { State as NotificationState, Action as NotificationAction } from "./notification";
import room, { State as RoomState, Action as RoomAction } from "./room";

export type RootState = Readonly<{
  slide: SlideState;
  notification: NotificationState;
  room: RoomState;
}>;

export default { slide, notification, room };

export type Action = FluxStandardAction<any, any> & (
  SlideAction
| NotificationAction
| RoomAction
);
