import React from "react";
import { render } from "react-dom";
import { HashRouter, Switch, Route } from "react-router-dom";
import { HomePage } from "./components/Homepage.js";

render(
  <HashRouter>
    <Switch>
      {console.log("WE ARE HERE")}
      <Route exact path="/" component={HomePage} />
    </Switch>
  </HashRouter>,
  document.getElementById("main")
);
