import { ThunkAction } from "redux-thunk";
import { FluxStandardAction } from "flux-standard-action";

export type Notification = NotificationAlert | NotificationSetupLink | NotificationTutorial;
export interface NotificationAlert {
  type: "NotificationAlert";
  message: string;
}
export interface NotificationSetupLink {
  type: "NotificationSetupLink";
}
export interface NotificationTutorial {
  type: "NotificationTutorial";
}

export type Action = PushNotification | PopNotification;
interface PushNotification extends FluxStandardAction<Notification, {}> {
  type: "local-slideshow/notification/PUSH_NOTIFICATION";
}
interface PopNotification extends FluxStandardAction<{}, {}> {
  type: "local-slideshow/notification/POP_NOTIFICATION";
}

export type State = Notification[];
export const InitialState: State = [];

export default function reducer(state: State = InitialState, action: Action): State {
  switch (action.type) {
    case "local-slideshow/notification/PUSH_NOTIFICATION": {
      return [...state, action.payload];
    }
    case "local-slideshow/notification/POP_NOTIFICATION": {
      return state.slice(1);
    }
    default: {
      return state;
    }
  }
}

/**
 * アラート通知を登録する
 */
export function notifyAlert(message: string): PushNotification {
  return {
    type: "local-slideshow/notification/PUSH_NOTIFICATION",
    payload: {
      type: "NotificationAlert",
      message,
    },
    meta: {},
  };
}

/**
 * セットアップリンク通知を登録する
 */
export function notifySetupLink(roomId: number): PushNotification {
  return {
    type: "local-slideshow/notification/PUSH_NOTIFICATION",
    payload: {
      type: "NotificationSetupLink",
    },
    meta: {},
  };
}

/**
 * チュートリアル通知を登録する
 */
export function notifyTutorial(roomId: number): PushNotification {
  return {
    type: "local-slideshow/notification/PUSH_NOTIFICATION",
    payload: {
      type: "NotificationTutorial",
    },
    meta: {},
  };
}

/**
 * 通知を一つ捨てる
 */
export function popNotification(): PopNotification {
  return {
    type: "local-slideshow/notification/POP_NOTIFICATION",
    payload: {},
    meta: {},
  };
}
