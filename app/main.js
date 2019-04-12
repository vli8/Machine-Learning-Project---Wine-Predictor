import React from "react";
import { render } from "react-dom";
import { HashRouter, Switch, Route } from "react-router-dom";
import HomePage from "./components/Homepage.js";
import { Provider } from "react-redux";
import store from "./store";
import AllWines from "./components/AllWines";
import SingleWine from "./components/SingleWine";
render(
  <Provider store={store}>
    <HashRouter>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/wines" component={AllWines} />
        <Route exact path="/wines/:id" component={SingleWine} />
      </Switch>
    </HashRouter>
  </Provider>,
  document.getElementById("main")
);
