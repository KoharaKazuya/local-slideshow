import * as React from "react";
import { Switch, Route } from "react-router";

import { NotFound } from "../NotFound";
import { LazyLoader } from "./LazyLoader";

const HomeLoader = require("bundle-loader?lazy!../Home");
const ControllerLoader = require("bundle-loader?lazy!../Controller");
const styles = require("./App.css");

// tslint:disable-next-line:no-empty-interface
interface Props {
}

export const App: React.StatelessComponent<Props> = (props) => (
  <Switch>
    <Route
      exact={ true }
      path="/"
      render={ () => (
        <LazyLoader
          loader={ HomeLoader }
          render={ ({ Home }) => <Home /> }
        />
      ) }
    />
    <Route
      path="/controller/:roomId(\\d+)"
      render={ ({ match }) => (
        <LazyLoader
          loader={ ControllerLoader }
          render={ ({ Controller }) => <Controller roomId={ Number(match.params.roomId) } /> }
        />
      ) }
    />
    <Route component={ NotFound as any } />
  </Switch>
);
