import * as React from "react";
import * as ReactDOM from "react-dom";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import createHistory from "history/createBrowserHistory";
import { ConnectedRouter, routerReducer, routerMiddleware } from "react-router-redux";

import { Provider } from "react-redux";
import { App } from "./components/App";
import ApiUtils from "./apiutils";
import { connect } from "./apiutils/ApiUtilsConnector";
import reducers from "./modules";
import { createRoom } from "./modules/room";

const history = createHistory();
const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer,
  }),
  compose(
    applyMiddleware(
      thunk.withExtraArgument({ api: ApiUtils }),
      routerMiddleware(history),
    ),
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ ? (window as any).__REDUX_DEVTOOLS_EXTENSION__() : (f: any) => f,
  ),
);
connect(store, ApiUtils);

ReactDOM.render(
  <Provider store={ store }>
    <ConnectedRouter history={ history }>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById("app"),
);
