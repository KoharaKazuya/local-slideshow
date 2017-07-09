import { Store } from "redux";

import { ApiUtils, Event } from "../apiutils/ApiUtils";

export function connect(store: Store<any>, api: ApiUtils): void {
  api.subscribe((event: Event) => {
    switch (event.type) {
      case "NEXT_PAGE":
      case "PREV_PAGE":
        store.dispatch(Object.assign({}, event, {
          type: `local-slideshow/slide/${ event.type }`,
        }));
        break;
      default:
        store.dispatch(Object.assign({}, event, {
          type: `local-slideshow/room/${ event.type }`,
        }));
    }
  });
}
